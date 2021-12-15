const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config({ path: "./config/config.env" });
app.use(express.json());
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//importamos rutas
const transactions = require("./routes/transactions");
// app.use("ruta donde se conectaran las transactiones", transactions);
app.use("/api/v1/transactions", transactions);

//preparar para produccion
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
