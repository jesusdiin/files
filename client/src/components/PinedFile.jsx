import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DragAndDropFolder from './DragAndDrop.jsx';

const CarpetaComponent = () => {
  const [carpetas, setCarpetas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/getpined');
        const data = await response.json();
        setCarpetas(Object.values(data['carpetas fijas']));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (ruta) => {
    navigate(`/${ruta}`);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {carpetas.map((carpeta, index) => (
        <div key={index} className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl mb-2">{carpeta.nombre}</h2>
          <button className="btn btn-primary" onClick={() => handleOpen(carpeta.ruta)}>Abrir</button>
        </div>
      ))}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl mb-2">Agregar</h2>
        <DragAndDropFolder />
      </div>
    </div>
  );
};

export default CarpetaComponent;
