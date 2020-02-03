require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const cursoRouter = require('./src/cursoCRUD/cursoRouter');

const app = express();

const port = process.env.PUERTO || 8000;
const HOST = 'localhost';

app.use(bodyParser.json());

app.use('/cursos', cursoRouter);

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/cursos";

//
mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => { console.log(`Corriendo en port ${port}`) })
    })
    .catch(err => {
        console.log(err);
    });

//app.listen(port, HOST);
//console.log(`Running on http://${HOST}:${port}`);
