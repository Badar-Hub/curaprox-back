const bodyParser = require("body-parser");
const express = require("express");
var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
const connection = require("./DAL/connection");
const ProductModel = require("./DAL/models/product.model");
const CategoryModel = require("./DAL/models/category.model");
const serveStatic = require("serve-static");
// parse application/x-www-form-urlencoded
const app = express();
let port = 80;

var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();

// replace this with the location to save uploaded files
var upload_path = __dirname + "/admin/files/prod-images/";

// express.static("/admin/files");

// parse application/json
app.use("/", serveStatic(__dirname + "/dist"));
app.use("/admin", serveStatic(__dirname + "/dist-back"));
app.use("/admin/files", serveStatic(__dirname + "/admin/files"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api/products", (req, res) => {
  ProductModel.find((err, data) => {
    if (!err) {
      let result = [];
      data.forEach((p, i) => {
        CategoryModel.findById(p.category_id, (err1, data1) => {
          if (!err1) {
            p.category = data1.title;
          }
          if (i == data.length - 1) {
            res.json(data);
          }
        });
      });
    } else {
      res.status(400).send(err);
    }
  });
});

app.get("/api/product/:id", (req, res) => {
  ProductModel.findById(req.params.id, (err, data) => {
    if (!err) {
      CategoryModel.findById(data.category_id, (err1, data1) => {
        if (!err1) {
          data.category = data1.title;
        }
        res.json(data);
      });
    } else {
      res.status(400).send(err);
    }
  });
});

app.get("/api/product/:id/related", (req, res) => {
  ProductModel.findById(req.params.id, (err, data) => {
    if (!err) {
      ProductModel.find({ category_id: data.category_id }, (err10, data10) => {
        if (!err10) {
          data10 = data10.filter((x) => x._id != data.id);
          res.json(data10);
        } else res.status(400).send(err10);
      });
    } else res.status(400).send(err);
  });
});

app.post("/api/product", multipartMiddleware, (req, res) => {
  let product = new ProductModel(req.body);
  console.log(req.body);
  let file = req.files.file;
  console.log(file);
  if (file) {
    var oldpath = file.path;
    let len = fs.readdirSync(upload_path).length;
    var newpath = upload_path + len + path.extname(file.name);
    while (fs.existsSync(newpath)) {
      len++;
      newpath = upload_path + len + path.extname(file.name);
    }

    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      // you may respond with another html page
      product.img = "files/prod-images/" + len + path.extname(file.name);
      product.save((err, data) => {
        if (!err) res.json(data);
        else {
          res.status(400).send(err);
        }
      });
    });
  }
});

app.put("/api/product/:id", multipartMiddleware, (req, res) => {
  let file = req.files.file;
  let updated = { ...req.body };
  if (file) {
    var oldpath = file.path;

    let len = fs.readdirSync(upload_path).length;
    var newpath = upload_path + len + path.extname(file.name);
    while (fs.existsSync(newpath)) {
      len++;
      newpath = upload_path + len + path.extname(file.name);
    }

    fs.renameSync(oldpath, newpath);
    updated.img = "files/prod-images/" + len + path.extname(file.name);
    console.log(updated);
  }
  ProductModel.findByIdAndUpdate(
    { _id: req.params.id },
    updated,
    { upsert: true },
    (err, data) => {
      if (err) {
        res.status(400).send("Error Occured");
      } else {
        if (fs.existsSync("admin/" + data.img))
          fs.unlinkSync("admin/" + data.img);

        res.status(200).send("Product Updated");
      }
    }
  );
});

app.delete("/api/product/:id", (req, res) => {
  ProductModel.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(400).send("Error Occured");
      console.log(err);
    } else {
      if (data && data.img && fs.existsSync("admin/" + data.img))
        fs.unlinkSync("admin/" + data.img);

      res.status(200).send("Product Deleated!");
    }
  });
});

//Categories

app.get("/api/categories", (req, res) => {
  CategoryModel.find((err, data) => {
    if (!err) res.json(data);
  });
});

app.post("/api/categories", multipartMiddleware, (req, res) => {
  let category = new CategoryModel(req.body);
      category.save((err, data) => {
        if (!err) res.json(data);
        else {
          res.status(400).send(err);
        }
      });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
