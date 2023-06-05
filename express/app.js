import express from 'express';
import languages from './languages.json' assert {type: 'json'};
import classes from './classes.json' assert {type: 'json'};
import lessons from './lessons.json' assert {type: 'json'};

// res.set('Content-Type', 'application/json');
// res.set('Access-Control-Allow-Credentials', true);

var app = express();

app.get('/languages', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    res.status(200).json(languages);
});

app.get('/class/:code', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let c = classes.find(c => c.code == req.params.code);
    if(c === undefined) {
        res.status(404).send('The given class code does not exist.');
    } else if(c.chapters === null) {
        res.status(501).send('This page is under construction.');
    } else {
        res.status(200).json(c);
    }
});

app.get('/lesson/:code', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let l = lessons.find(l => l.code == req.params.code);
    if(l === undefined) {
        res.status(404).send('The given lesson code does not exist.');
    } else {
        res.status(200).json(l);
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server side problem.');
});

app.listen(3001);