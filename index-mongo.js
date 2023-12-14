const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Prog. Web - Wello World.");
})

app.get('/frases', (req, res) => {
    res.send(frases);
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