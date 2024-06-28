import React, { useState } from 'react';
import axios from 'axios';

const DropZone = () => {
  const [uploading, setUploading] = useState(false);

  const handleDrop = async (event) => {
    event.preventDefault();
    const files = event.dataTransfer.items;
    const folderStructure = [];

    for (const item of files) {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        const relativePath = item.webkitGetAsEntry().fullPath;
        folderStructure.push({ path: relativePath, name: file.name });
      }
    }

    const folderJson = {
      ruta: 'ruta_de_tu_carpeta',
      'nombre de la carpeta': 'nombre_de_tu_carpeta',
      archivos: folderStructure,
    };

    try {
      setUploading(true);
      const response = await axios.post('http://127.0.0.1:3001/webhook/carpeta', folderJson);
      console.log('Response from server:', response.data);
      setUploading(false);
    } catch (error) {
      console.error('Error sending POST request:', error);
      setUploading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: '2px dashed #ccc',
        borderRadius: '4px',
        width: '100%',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {uploading ? 'Uploading...' : 'Drag and drop a folder here'}
    </div>
  );
};

export default DropZone;
