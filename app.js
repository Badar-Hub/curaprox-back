const bodyParser = require("body-parser");
const express = require("express");
const app = express();
let port = 80;
const connection = require("./DAL/connection");
const ProductModel = require("./DAL/models/product.model");
const serveStatic = require("serve-static");
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// parse application/json
app.use(bodyParser.json());
app.use('/', serveStatic(__dirname + "/dist"));
app.use('/admin', serveStatic(__dirname + "/dist-back"));

app.get("/api/products", (req, res) => {
  ProductModel.find((err, data) => {
    if (!err) res.json(data);
  });
});

app.post("/api/product", (req, res) => {
  let product = new ProductModel(req.body);
  console.log(req.body);
  product.save((err, data) => {
    if (err) res.json(err.message);
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
