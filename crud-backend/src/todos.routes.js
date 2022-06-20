// @ts-nocheck
const express = require('express');
const toDosRoutes = express.Router();

const { PrismaClient } = require('@prisma/client'); //Pacote escopado (garante que vem de uma organização confiável)
const prisma = new PrismaClient(); //Injetando o prisma via construtor

//Create
toDosRoutes.post('/todos', async (request, response) => {
	const { name } = request.body;

	const todo = await prisma.todo.create({
		data: {
			name,
		},
	});

	return response.status(201).json(todo);
});

//Read
toDosRoutes.get('/todos', async (request, response) => {
	const todos = await prisma.todo.findMany();

	return response.status(200).json(todos);
});

//Update
toDosRoutes.put('/todos', async (request, response) => {
	const { id, name, status } = request.body;

	if (!id) {
		return response.status(400).json('Id é um parâmetro obrigatório!');
	}

	const todoAlreadyExists = await prisma.todo.findUnique({ where: { id } });

	//caso não seja nulo
	if (!todoAlreadyExists) {
		return response.status(404).json('Todo não existe');
	}

	//where serve para filtrar (nesse caso, pelo ID)
	const todo = await prisma.todo.update({
		where: {
			id,
		},
		data: {
			name,
			status,
		},
	});

	return response.status(200).json(todo);
});

//Delete
toDosRoutes.delete('/todos/:id', async (request, response) => {
	const { id } = request.params;
	const intId = parseInt(id);

	if (!intId) {
		return response.status(400).json('Id é um parâmetro obrigatório!');
	}

	const todoAlreadyExists = await prisma.todo.findUnique({ where: { id: intId } });

	//caso não seja nulo
	if (!todoAlreadyExists) {
		return response.status(404).json('Todo não existe');
	}

	await prisma.todo.delete({
		where: { id: intId },
	});

	return response.status(200).send();
});

toDosRoutes.get('/todos/:id', async (request, response) =>{
    const { id } = request.params;
    const intId = parseInt(id)

    if (!intId) {
		return response.status(400).json('Id é um parâmetro obrigatório!');
	}

    const todo = await prisma.todo.findUnique({
		where: { id: intId },
	});

	return response.status(200).json(todo);
})

module.exports = toDosRoutes;
