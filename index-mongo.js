const express = require('express');
const mongoose = require('mongoose');
const Frase = require('./frase.model');
const app = express();

app.use(express.json());

const db_host = 'localhost';
const db_port = 27017;
const db_db = 'frases';
const db_URI = `mongodb:\/\/${db_host}:${db_port}/${db_db}`

mongoose.connect(db_URI, { useNewUrlParser : true});


app.get('/', (req, res) => {
    res.send("Prog. Web - Wello World.");
})

app.get('/frases', (req, res) => {
    Frase.find({})
        .then((frases) => {
            res.send(frases);
        })
        .catch((err) => {
            res.status(500).send();
        })
})

app.post('/frases', (req, res) => {
    console.log(req.body);
    const frase = req.body;
    frases.push(frase);
    res.status(201).send();
})

app.delete('/frases/:id', (req, res) => {
    const id = req.params.id;
    const index = frases.findIndex((frase) => frase.id == id);
    if(index == -1){
        res.status(404).send();
    } else{
        frases.splice(index, 1);
        res.status(200).send();
    }
    console.log(req.body);

})

app.put('frases/:id', (req, res) => {
    const id = req.params.id;
    const frase = req.body;
    const index = frases.findIndex((frase) => frase.id == id);
    if(index == -1){
        res.status(404).send();
    }else{
        frases[index].autor = frase.autor;
        frases[index].frase = frase.frase;
        res.status(200).send();
    }
})

    
const port = 8080;
app.listen(port, (err) => {
    if(err){
        console.error("Erro na aplicação", err);
    }
    console.log(`Aplicação escutando na porta: ${port}`);
})