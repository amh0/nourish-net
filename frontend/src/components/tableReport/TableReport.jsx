import React, { useState, useEffect } from "react";
import "./TableReport.css";
import { PencilSimple, Trash, Check, X } from "phosphor-react";

const TableReport = ({
  tableData,
  customClassName,
  onRowButtonClick,
  trash,
}) => {
  const imgPath = "https://nourish-net-api.onrender.com/img/";
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(tableData || []);
  }, [tableData]);

  const handleButtonClick = (id, actionType) => {
    if (onRowButtonClick) {
      onRowButtonClick(id, actionType);
    }
  };

  return (
    <div class="table-container">
      {data.length > 0 ? (
        // <table className="data-table">
        <table className={`data-table ${customClassName}`}>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.keys(row).map((fieldName, colIndex) => (
                  <td key={colIndex}>
                    {fieldName.toLowerCase() === "imagen" ||
                    fieldName.toLowerCase() === "foto" ? (
                      row[fieldName] ? (
                        <img
                          src={`https://nourish-net-api.onrender.com/img/${row[fieldName]}`}
                          alt=""
                          // style={{ width: "80px", height: "80px" }}
                        />
                      ) : (
                        "Sin foto"
                      )
                    ) : (
                      row[fieldName]
                    )}
                  </td>
                ))}
                {onRowButtonClick && (
                  <td>
                    <div className="button-edit-container">
                      <button
                        className="btn-editar"
                        onClick={() =>
                          handleButtonClick(row[Object.keys(row)[0]], "editar")
                        }
                      >
                        <PencilSimple
                          size={20}
                          color="var(--background0)"
                          weight="light"
                        />
                      </button>
                      {trash && (
                        <button
                          className="btn-eliminar"
                          onClick={() =>
                            handleButtonClick(
                              row[Object.keys(row)[0]],
                              "eliminar"
                            )
                          }
                        >
                          <Trash
                            size={20}
                            color="var(--background0)"
                            weight="light"
                          />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay datos para mostrar.</p>
      )}
    </div>
  );
};

export default TableReport;
