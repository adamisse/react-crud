const express = require("express");
const toDosRoutes = require("./todos.routes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(toDosRoutes);

app.listen(3030, () => console.log("Server tá on..."));
