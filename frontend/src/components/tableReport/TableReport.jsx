import React, { useState, useEffect } from "react";
import "./TableReport.css";

const TableReport = ({ tableData, customClassName }) => {
  const imgPath = "http://localhost:3001/img/";
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(tableData || []);
  }, [tableData]);

  return (
    <div>
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
                          src={`http://localhost:3001/img/${row[fieldName]}`}
                          alt=""
                          style={{ width: "80px", height: "80px" }}
                        />
                      ) : (
                        "Sin foto"
                      )
                    ) : (
                      row[fieldName]
                    )}
                  </td>
                ))}
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
