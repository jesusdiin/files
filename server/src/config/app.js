import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import pkg from './../../package.json' assert {type: 'json'};
import dotenv from 'dotenv';
import path from 'path'
import listFiles from './../libs/list.lib.js';
import fs from "fs"
import pinedFilesJson from './../json/files.pined.json' assert { type: 'json' };;

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readData = () => {
    const rawData = fs.readFileSync('src/json/files.pined.json');
    return JSON.parse(rawData);
};

// Función para escribir datos al archivo JSON
const writeData = (data) => {
    fs.writeFileSync('src/json/files.pined.json', JSON.stringify(data, null, 2));
};

const app = express();


let carpetasFijas = [
    {
      nombre: 'Escolar',
      status: true,
      ruta: '',
      archivos: []
    }
];

dotenv.config();
// eslint-disable-next-line no-undef
app.set('port', Number(process.env.PORT) || 3001);

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
// Middleware para permitir CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // o el origen específico que desees permitir
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.set('pkg', pkg);

app.get('/', (req, res) => {
	res.json({
		name: app.get('pkg').name,
		description: app.get('pkg').description,
		author: app.get('pkg').author,
		version: app.get('pkg').version
	});
});

console.log(pinedFilesJson)

app.get('/getpined', (req, res) => {
    //res.json(pinedFilesJson);
    const data = readData();
    res.json(data);
})

// Endpoint para agregar una nueva carpeta
app.post('/addCarpeta', (req, res) => {
    const nuevaCarpeta = req.body;
    if (nuevaCarpeta && nuevaCarpeta.nombre) {
      const data = readData();
      data['carpetas fijas'].push(nuevaCarpeta);
      writeData(data);
      res.status(201).json({ message: 'Carpeta agregada', 'carpetas fijas': data['carpetas fijas'] });
    } else {
      res.status(400).json({ message: 'Datos de la carpeta inválidos' });
    }
});

app.get('/list', async (req, res) => {
    res.json(await listFiles('/'))
})

app.post('/saveJson', (req, res) => {
    const { data } = req.body;
    const filePath = path.join(__dirname, '../root/fileStructure.json'); // Utiliza 'path.join' para construir rutas de archivos

    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error('Error al guardar el archivo JSON:', err);
            res.status(500).send('Error al guardar el archivo JSON.');
        } else {
            console.log('Archivo JSON guardado correctamente.');
            res.status(200).send('Archivo JSON guardado correctamente.');
        }
    });
});


export default app;