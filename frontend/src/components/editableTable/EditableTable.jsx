import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditableTable.css";
import { PencilSimple, Trash, Check, X } from "phosphor-react";

const EditableTable = ({
  data,
  updateUrl,
  deleteURL,
  addURL,
  onSaveSuccess,
  idnuev,
  btn,
  elim,
  nomBtn,
}) => {
  const [editableIndex, setEditableIndex] = useState(-1);
  const [editedData, setEditedData] = useState(data.length > 0 ? {} : null);
  const [showAddRow, setShowAddRow] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  const [actBtn, setActBtn] = useState(btn);

  useEffect(() => {
    setEditedData(data.length > 0 ? {} : null);
  }, [data]);

  const handleEdit = (index) => {
    setEditableIndex(index);
    setEditedData(data[index]);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${deleteURL}?id=${id}`);
      if (response.status === 200) {
        setEditableIndex(-1);
        setEditedData(data.length > 0 ? {} : null);
        if (onSaveSuccess != null) {
          onSaveSuccess();
        }
      } else {
        console.log("Error al elimiar los datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleAddRow = () => {
    setShowAddRow(true);
    setNewRowData({});
  };

  const handleCancelAddRow = () => {
    setShowAddRow(false);
    setNewRowData({});
  };

  const handleSaveNewRow = async () => {
    console.log(newRowData);
    const rowDataWithId = {
      ...newRowData,
      id: idnuev || "",
    };
    try {
      const response = await axios.post(`${addURL}`, rowDataWithId);
      if (response.status === 200) {
        setShowAddRow(false);
        if (onSaveSuccess != null) {
          onSaveSuccess();
        }
      } else {
        console.log("Error al guardar la nueva fila:", response.statusText);
      }
    } catch (error) {
      console.error("Error al guardar la nueva fila:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (editableIndex !== -1) {
        const response = await axios.put(`${updateUrl}`, editedData);
        if (response.status === 200) {
          setEditableIndex(-1);
          setEditedData(data.length > 0 ? {} : null);
          if (onSaveSuccess != null) {
            onSaveSuccess();
          }
        } else {
          console.log("Error al actualizar los datos:", response.statusText);
        }
      } else {
        console.log("No hay datos editados para guardar.");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div className="editable-table-container">
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((key) => (
                  <td key={key}>
                    {key.startsWith("id") ? (
                      row[key]
                    ) : (
                      <>
                        {editableIndex === index ? (
                          <input
                            type="text"
                            value={
                              editedData && editedData[key]
                                ? editedData[key]
                                : ""
                            }
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                [key]: e.target.value,
                              })
                            }
                          />
                        ) : (
                          row[key]
                        )}
                      </>
                    )}
                  </td>
                ))}

                <td>
                  {editableIndex === index ? (
                    <div className="button-container">
                      <button className="btn-ok" onClick={() => handleSave()}>
                        <Check size={20} color="var(--background0)" />
                        {/* OK */}
                      </button>
                      <button
                        className="btn-cancelar"
                        onClick={() => setEditableIndex(-1)}
                      >
                        {/* X */}
                        <X size="20" color="var(--background0)" />
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() => handleDelete(row[Object.keys(row)[0]])}
                      >
                        {!elim ? (
                          <Trash
                            size={20}
                            color="var(--background0)"
                            weight="light"
                          />
                        ) : (
                          elim
                        )}
                        {/* Eliminar */}
                      </button>
                    </div>
                  ) : (
                    <div className="button-container">
                      <button
                        className="btn-ok"
                        onClick={() => handleEdit(index)}
                      >
                        {" "}
                        <PencilSimple
                          size={20}
                          color="var(--background0)"
                          weight="light"
                        />
                        {/* Editar */}
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() => handleDelete(row[Object.keys(row)[0]])}
                      >
                        {!elim ? (
                          <Trash
                            size={20}
                            color="var(--background0)"
                            weight="light"
                          />
                        ) : (
                          elim
                        )}
                        {/* Eliminar */}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {showAddRow && (
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <td key={key}>
                    {!key.startsWith("id") && (
                      <input
                        type="text"
                        value={newRowData[key] || ""}
                        onChange={(e) =>
                          setNewRowData({
                            ...newRowData,
                            [key]: e.target.value,
                          })
                        }
                      />
                    )}
                  </td>
                ))}
                <td>
                  <div className="button-container">
                    <button
                      className="btn-ok"
                      onClick={() => handleSaveNewRow()}
                    >
                      Guardar
                    </button>
                    <button
                      className="btn-cancelar"
                      onClick={() => handleCancelAddRow()}
                    >
                      Cancelar
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <div>No existen datos</div>
      )}
      {actBtn && (
        <button className="add-button" onClick={() => handleAddRow()}>
          {nomBtn}
        </button>
      )}
    </div>
  );
};

export default EditableTable;
