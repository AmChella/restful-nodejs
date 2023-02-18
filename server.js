const express = require('express');
const app = express();
const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");
const bodyParser = require("body-parser");
const router = require("./routes/RDSInfoRecorder");
const cors = require('cors');
const allowlist = ['http://localhost:3002'];
const users = require("./routes/Users");

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(
    '/docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static('public'))
app.use("/rds", cors(corsOptionsDelegate), router);
app.use("/users", cors(corsOptionsDelegate), users);
app.get("/", (req, res) => {
    res.send("hi");
});

app.listen(3001);