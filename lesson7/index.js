const fs = require('fs');
const express = require('express');
const fetch = require('node-fetch');
const {v4} = require('uuid');
const bodyParser = require('body-parser');

const BASE_URL = 'https://mock-api-builder.vercel.app/api/schema/get';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let data = fetch(`${BASE_URL}/602c166a89c4a60009ef7046`)
            .then(result => result.json())
            .then(result =>{
                data = result;
            });

app.get('/', (req, res) => {
    res.json(data);
});

app.post('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./basket.js'));
    data.push({
        productName: req.body.productName,
        price: req.body.price,
        id: v4()
    });
    fs.writeFileSync('basket.js', JSON.stringify(data));
    res.statusCode;
});


app.listen(3000, () => {
    console.log('Success');

});