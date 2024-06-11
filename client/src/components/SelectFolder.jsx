import React, { useState } from 'react';

const SelectFolder = () => {
    const [folderPath, setFolderPath] = useState('');

    const handleFolderChange = (event) => {
        const files = event.target.files;

        if (files.length === 0) {
            setFolderPath('No se seleccionó ninguna carpeta.');
            return;
        }

        const folderPath = files[0].webkitRelativePath.split('/')[0];
        setFolderPath(folderPath);
    };

    return (
        <div>
            <input type="file" webkitdirectory="true" onChange={handleFolderChange} />
            <div>{folderPath && `Ruta de la carpeta seleccionada: ${folderPath}`}</div>
        </div>
    );
};

export default SelectFolder;
