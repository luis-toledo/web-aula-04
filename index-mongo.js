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
    const frase = {
        autor: req.body.autor,
        frase: req.body.autor
    }
    Frase.create(frase)
        .then((f) => {
            res.send(f);
            res.status(201).send(f);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        })
    
    res.status(201).send();
})

app.post('/variasfrases', (req, res) => {
    const frases = req.body;
    if (!Array.isArray(frases)) {
        return res.status(400).send();
    }

    Frase.insertMany(frases)
        .then((frases) => {
            res.status(201).send(frases);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        });
});


app.delete('/frases/:id', (req, res) => {
    const id = req.params.id;
    Frase.findByIdAndDelete(id)
        .then(() => res.status(200).send())
        .catch(() => res.status(404).send());


})

app.put('frases/:id', (req, res) => {
    const id = req.params.id;
    const f = req.body;

    Frase.findById(id)
        .then((frase) => {
            frase.autor = f.autor;
            frase.frase = f.frase;
            frase.save()
                .then(() => res.status(200).send())
                .catch(() => res.status(500).send())
        })
        .catch(err => {
            console.error(err);
            res.status(404).send();
        })
})

    
const port = 8080;
app.listen(port, (err) => {
    if(err){
        console.error("Erro na aplicação", err);
    }
    console.log(`Aplicação escutando na porta: ${port}`);
})