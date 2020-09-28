const bodyParser = require("body-parser");
const express = require("express");
const app = express();
let port = 8081;
const connection = require('./DAL/connection')
const ProductModel = require('./DAL/models/product.model');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.get("/products", (req, res) => {
    ProductModel.find((err, data) => {
        if (!err) res.json(data);
    })
});

app.post('/product', (req, res) => {
    let product = new ProductModel(req.body);
    console.log(req.body);
    product.save((err, data) => {
        if (err) res.json(err.message);
        res.json(data);
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});