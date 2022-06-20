const express = require('express');
const toDosRoutes = require('./todos.routes');

const app = express();

app.use(express.json());
app.use(toDosRoutes);

//Select -> SQL
//Read -> CRUD (Create, Read, Update, Delete)
//GET -> Api

app.get('/usuarios/', (req, res) =>{
    return res.json("qualquer coisa");
});

app.listen(3030, () => console.log("Server tá on..."));