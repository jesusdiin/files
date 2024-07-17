import React, { useState } from 'react';
import toValidUrl from './libs/createValidateUrl';

const DragAndDropFolder = () => {
    const [files, setFiles] = useState([]);
    const [folderName, setFolderName] = useState('');
    const [fileStructure, setFileStructure] = useState({ subcarpetas: [], archivos: [] });

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        
        const items = event.dataTransfer.items;
        let newFiles = [];
        let newFileStructure = { subcarpetas: [], archivos: [] };
    
        for (let i = 0; i < items.length; i++) {
            const item = items[i].webkitGetAsEntry();
    
            if (item) {
                if (item.isDirectory) {
                    const folderName = item.name;
                    setFolderName(folderName);
                    await readDirectory(item, newFiles, newFileStructure);
                    // Perform POST with folder name and files
                    await postFolderName(folderName, newFileStructure.subcarpetas, newFileStructure.archivos);

                    console.log('Archivos actuales:', newFiles);
                } else {
                    await displayFile(item, newFiles, newFileStructure);
                }
            }
        }

        const json = JSON.stringify(newFileStructure, null, 2);
        //saveJsonToFile(json);

        setFiles(newFiles);
        setFileStructure(newFileStructure);
    };

    const readDirectory = (directoryEntry, newFiles, newFileStructure) => {
        return new Promise((resolve) => {
            const dirReader = directoryEntry.createReader();
            newFileStructure.subcarpetas.push(directoryEntry.fullPath);
            dirReader.readEntries(async (entries) => {
                for (let i = 0; i < entries.length; i++) {
                    const entry = entries[i];
                    if (entry.isDirectory) {
                        await readDirectory(entry, newFiles, newFileStructure);
                    } else {
                        await displayFile(entry, newFiles, newFileStructure);
                    }
                }
                resolve();
            });
        });
    };

    const displayFile = (fileEntry, newFiles, newFileStructure) => {
        return new Promise((resolve) => {
            fileEntry.file((file) => {
                const filePath = file.webkitRelativePath || file.name;
                newFiles.push(filePath);
                const ext = file.name.split('.').pop().toLowerCase();
                newFileStructure.archivos.push({ nombre: file.name, ruta: filePath, extension: `.${ext}` });
                resolve();
            });
        });
    };

    const postFolderName = async (folderName, subcarpetas, archivos) => {
        const rutaValidated = toValidUrl(folderName);

        const nuevaCarpeta = {
            nombre: folderName,
            status: true,
            rutarelativa: "",
            ruta: rutaValidated,
            subcarpetas: subcarpetas,
            archivos: archivos
        };
    
        try {
            const response = await fetch('http://localhost:3001/addCarpeta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaCarpeta),
            });
            if (response.ok) {
                console.log('Nombre de carpeta y archivos enviados correctamente.');
            } else {
                console.error('Error al enviar el nombre de carpeta y archivos.');
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
