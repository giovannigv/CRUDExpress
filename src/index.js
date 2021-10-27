const { Router } = require('express')
const express = require('express')
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../swagger.json');

const app = express();
const port = 3000;

app.use(express.json());
app.use(Router().use(require('./user/route')));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`CRUDExpress app listening at http://localhost:${port}`);
});