const fs = require('fs');
const express = require('express');
const fetch = require('node-fetch');
const { v4 } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');

const BASE_URL = 'https://mock-api-builder.vercel.app/api/schema/get';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let data = fetch(`${BASE_URL}/602c166a89c4a60009ef7046`)
    .then(result => result.json())
    .then(result => {
        data = result;
    });

const corsOptions = {
    origin: '*',
    methods: ['GET', 'OPTIONS', 'POST'],
    allowedHeaders: ['Content-Type',]
}

app.get('/', cors(corsOptions), (req, res) => {
    // danger method. CORS disabled!
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.json(data);
    res.statusCode = 200;
});

app.get('/basket', cors(corsOptions), (req, res) => {
    // danger method. CORS disabled!
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    const file = fs.readFileSync('basket.json');
    // console.info('Basket file', file);
    res.json(JSON.parse(file));
    res.statusCode = 200;
});

app.post('/', cors(corsOptions), (req, res) => {
    // danger method. CORS disabled!
    // req.setHeader('Access-Control-Allow-Origin', '*');
    // req.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    // сервер хранит данные корзины в файле
    const file = fs.readFileSync('basket.json');
    // полученные данные сохраняем в переменную
    const newData = {
        productName: req.body['productName'],
        price: req.body['price'],
        id: req.body['id'],
        quantity: req.body['quantity']
    };
    // переводим файл в переменную (для ясности)
    const tmpJSON = JSON.parse(file);
    // проверяем есть ли в "корзине" новый товар
    const findItem = tmpJSON.find(el => el.id === newData.id);
    // если полученный элемент найден в файле
    if (findItem) {
        // проверяем чему равно кол-во для элемента
        // если не нулевое - обновляем данные
        if (req.body['quantity'] != 0) {
            findItem.quantity = req.body['quantity'];
        }
        // иначе - удаляем из файла элемент
        else {
            let indexForDelete = tmpJSON.indexOf(findItem);
            tmpJSON.splice(indexForDelete, indexForDelete);
        }
        // если же полученного элемента не было в "корзине" - добавляем элемент
    } else {
        tmpJSON.push(newData);
    }

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

app.post('/delete', cors(corsOptions), (req, res) => {
    const newData = {
        productName: req.body['productName'],
        price: req.body['price'],
        id: req.body['id'],
        quantity: req.body['quantity']
    };

    const file = fs.readFileSync('basket.json');
    const tmpJSON = JSON.parse(file);

    const findItem = tmpJSON.find(el => el.id === newData.id);

    if (findItem) {
        let indexForDelete = tmpJSON.indexOf(findItem);
        tmpJSON.splice(indexForDelete, 1);
    }

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
    console.log('Start successfull');
});