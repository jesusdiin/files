const fs = require('fs');
const path = require('path');
const axios = require('axios');

const directoryPath = './src';
const outputFilePath = './projectStructure.json';
const webhookUrl = 'http://127.0.0.1:3001/webhook/carpeta';

const getDirectoryStructure = (dirPath, folderName) => {
  const structure = {
    ruta: dirPath,
    'nombre de la carpeta': folderName,
    archivos: [],
  };

  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isFile()) {
      structure.archivos.push(item);
    } else if (stats.isDirectory()) {
      const subDirStructure = getDirectoryStructure(itemPath, item);
      structure.archivos.push(subDirStructure);
    }
  });

  return structure;
};

const exportAndSendStructure = async () => {
  const structure = getDirectoryStructure(directoryPath, 'src');
  fs.writeFileSync(outputFilePath, JSON.stringify(structure, null, 2));

  try {
    const response = await axios.post(webhookUrl, structure);
    console.log('Response from server:', response.data);
  } catch (error) {
    console.error('Error sending POST request:', error);
  }
};

exportAndSendStructure();
