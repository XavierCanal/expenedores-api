const express = require("express");
const v1ProductsRoutes = require("./v1/routes/productRoutes");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/productes", v1ProductsRoutes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
