import React, { useState } from 'react';

const DragAndDropFolder = () => {
    const [files, setFiles] = useState([]);
    const [folderName, setFolderName] = useState('');
    const [fileStructure, setFileStructure] = useState({ subcarpetas: [], imagenes: {} });

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        
        const items = event.dataTransfer.items;
        let newFiles = [];
        let newFileStructure = { subcarpetas: [], imagenes: {} };

        for (let i = 0; i < items.length; i++) {
            const item = items[i].webkitGetAsEntry();

            if (item) {
                if (item.isDirectory) {
                    setFolderName(item.name); // Set the folder name
                    console.log('Nombre de la carpeta:', item.name);
                    readDirectory(item, newFiles, newFileStructure);
                } else {
                    displayFile(item, newFiles, newFileStructure);
                }
            }
        }

        // After processing files, save to JSON
        setTimeout(() => {
            const json = JSON.stringify(newFileStructure, null, 2);
            saveJsonToFile(json);
        }, 1000); // Adjust timeout if needed
    };

    const readDirectory = (directoryEntry, newFiles, newFileStructure) => {
        const dirReader = directoryEntry.createReader();
        newFileStructure.subcarpetas.push(directoryEntry.fullPath);
        dirReader.readEntries((entries) => {
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                if (entry.isDirectory) {
                    readDirectory(entry, newFiles, newFileStructure);
                } else {
                    displayFile(entry, newFiles, newFileStructure);
                }
            }
            setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles, ...newFiles];
                console.log('Archivos actuales:', updatedFiles);
                console.log('Estructura de archivos:', newFileStructure);
                return updatedFiles;
            });
            setFileStructure(newFileStructure);
        });
    };

    const displayFile = (fileEntry, newFiles, newFileStructure) => {
        fileEntry.file((file) => {
            const filePath = file.webkitRelativePath || file.name;
            newFiles.push(filePath);
            const ext = file.name.split('.').pop().toLowerCase();
            if (!newFileStructure.imagenes[ext]) {
                newFileStructure.imagenes[ext] = [];
            }
            newFileStructure.imagenes[ext].push({ nombre: file.name, extension: `.${ext}` });
            console.log('Archivo encontrado:', filePath);
        });
    };

    const saveJsonToFile = async (jsonContent) => {
        try {
            const response = await fetch('http://localhost:3001/saveJson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: jsonContent }),
            });
            if (response.ok) {
                console.log('Archivo JSON guardado correctamente.');
            } else {
                console.error('Error al guardar el archivo JSON.');
            }
        } catch (error) {
            console.error('Error en la solicitud fetch:', error);
        }
    };

    return (
        <div>
            <div
                id="drop-area"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                    border: '2px dashed #ccc',
                    padding: '20px',
                    textAlign: 'center',
                }}
            >
                Arrastra una carpeta aquí
            </div>
            {folderName && <h3>Carpeta: {folderName}</h3>}
            <ul id="file-list">
                {files.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
        </div>
    );
};

export default DragAndDropFolder;
