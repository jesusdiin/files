import React, { useState } from 'react';

const DragAndDropFolder = () => {
    const [files, setFiles] = useState([]);
    const [folderPath, setFolderPath] = useState('');

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        
        const items = event.dataTransfer.items;
        let newFiles = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i].webkitGetAsEntry();

            if (item) {
                if (item.isDirectory) {
                    setFolderPath(item.fullPath); // Set the folder path
                    console.log('Ruta de la carpeta:', item.fullPath);
                    readDirectory(item, newFiles);
                } else {
                    displayFile(item, newFiles);
                }
            }
        }
    };

    const readDirectory = (directoryEntry, newFiles) => {
        const dirReader = directoryEntry.createReader();
        dirReader.readEntries((entries) => {
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                if (entry.isDirectory) {
                    readDirectory(entry, newFiles);
                } else {
                    displayFile(entry, newFiles);
                }
            }
            setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles, ...newFiles];
                console.log('Archivos actuales:', updatedFiles);
                return updatedFiles;
            });
        });
    };

    const displayFile = (fileEntry, newFiles) => {
        fileEntry.file((file) => {
            const filePath = file.webkitRelativePath || file.name;
            newFiles.push(filePath);
            console.log('Archivo encontrado:', filePath);
        });
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
            <ul id="file-list">
                {files.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
        </div>
    );
};

export default DragAndDropFolder;
