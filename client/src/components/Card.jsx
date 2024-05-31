import React, { useState, useEffect } from 'react';

function Card() {
  const [fileList, setFileList] = useState([]);

  // Función para obtener y almacenar los datos del JSON
  useEffect(() => {
    fetch('http://localhost:3001/list')
      .then(response => response.json())
      .then(data => setFileList(data))
      .catch(error => console.error('Error al obtener el JSON:', error));
  }, []);

  // Función para renderizar una tarjeta de archivo
  const renderFileCard = (file, index) => {
    return (
      <div key={index} className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            <div className="badge badge-secondary">{file}</div>
          </h2>
          <p>{file}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {fileList.map((file, index) => renderFileCard(file, index))}
    </>
  );
}

export default Card;
