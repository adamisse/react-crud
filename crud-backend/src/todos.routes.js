// @ts-nocheck
const { response } = require("express");
const express = require("express");

const allToDos = [ { name: "sexo", status: false } ];
const toDosRoutes = express.Router();

//Create
toDosRoutes.post('/todos', (request, response) => {
	// const nome = request.body.name; 
    const { name } = request.body;
    //Faz o bind do objeto retornado, por ex: request.body tem uma propriedade chamada "name"? caso tenha atribui esse valor à variável name;
    allToDos.push({name, status:false});
    return response.status(201).json(allToDos);
});

//Read
toDosRoutes.get('/todos', (request, response) =>{
    return response.status(200).json(allToDos);
})
//Update

//Delete

module.exports = toDosRoutes;