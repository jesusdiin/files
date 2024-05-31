import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import pkg from './../../package.json' assert {type: 'json'};
import dotenv from 'dotenv';

const app = express();

dotenv.config();

// eslint-disable-next-line no-undef
app.set('port', Number(process.env.PORT) || 3001);

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.set('pkg', pkg);

app.get('/', (req, res) => {
	res.json({
		name: app.get('pkg').name,
		description: app.get('pkg').description,
		author: app.get('pkg').author,
		version: app.get('pkg').version
	});
});


export default app;