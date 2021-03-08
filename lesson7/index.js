const fs = require('fs');
const express = require('express');
const fetch = require('node-fetch');
const {v4} = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');

const BASE_URL = 'https://mock-api-builder.vercel.app/api/schema/get';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());



let data = fetch(`${BASE_URL}/602c166a89c4a60009ef7046`)
            .then(result => result.json())
            .then(result =>{
                data = result;
            });

const corsOptions = {
    origin: '*'
}

app.get('/', cors(corsOptions), (req, res) => {
    // danger method. CORS disabled!
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.json(data);
    res.statusCode = 200;
});

app.post('/', cors(corsOptions), (req, res) => {
    // danger method. CORS disabled!
    // req.setHeader('Access-Control-Allow-Origin', '*');
    // req.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    const file = fs.readFileSync('basket.json');
    const newData = {
        productName: req.body['productName'],
        price: req.body['price'],
        id: req.body['id'],
    };
    const tmpJSON = JSON.parse(file);
    tmpJSON.push(req.body);
    
    fs.writeFileSync('basket.json', JSON.stringify(tmpJSON), (err) => {
        if (err) {
          res.send('{"result": 0}');
          res.status(200).send();
        } else {
          res.send('{"result": 1}');
          res.status(200).send();
        }
      });
});


app.listen(3000, () => {
    console.log('Success');

});