// @ts-nocheck
const express = require("express");
const toDosRoutes = express.Router();

const { PrismaClient } = require("@prisma/client") //Pacote escopado (garante que vem de uma organização confiável)
const prisma = new PrismaClient(); //Injetando o prisma via construtor

//Create
toDosRoutes.post('/todos', async(request, response) => {
    const { name } = request.body;
    const todo = await prisma.todo.create({
        data:{
            name
        },
    })
    
    return response.status(201).json(todo);
});

//Read
toDosRoutes.get('/todos', async (request, response) =>{
    const todos = await prisma.todo.findMany();
    return response.status(200).json(todos);
})
//Update

//Delete

module.exports = toDosRoutes;