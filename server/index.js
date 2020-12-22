const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ebmca.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const MongoClient = require("mongodb").MongoClient;

const port = 5000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

client.connect((err) => {
   const productsCollection = client.db(`${process.env.DB_NAME}`).collection("products");

   app.get("/", (req, res) => {
      res.send("It's working successfully");
   });

   //to add single product
   app.post("/addProduct", (req, res) => {
      const products = req.body;
      productsCollection.insertOne(products).then((result) => {
         res.send(result.insertedCount);
      });
   });

   //to load all products
   app.get("/products", (req, res) => {
      productsCollection.find({}).toArray((err, documents) => {
         res.send(documents);
      });
   });

   //to load products by searching
   app.get("/products", (req, res) => {
      const search = req.query.search;
      console.log(search, "search");
      productsCollection.find({ name: { $regex: search } }).toArray((err, documents) => {
         res.send(documents);
      });
   });

   //to load single product
   app.get("/product/:key", (req, res) => {
      productsCollection.find({ key: req.params.key }).toArray((err, documents) => {
         res.send(documents[0]);
      });
   });

   //to load some products
   app.post("/productsByKeys", (req, res) => {
      const productKeys = req.body;
      productsCollection.find({ key: { $in: productKeys } }).toArray((err, documents) => {
         res.send(documents);
      });
   });
});

app.listen(process.env.PORT || port, () => console.log("listening at 5000"));
