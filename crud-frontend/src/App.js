import "./App.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";

const arrayTodos = [
	{ name: "Testa", status: true },
	{ name: "Testandinho", status: false },
];

//Estudar essa atribuição de parâmetro objeto...
const Todos = ({ todos }) => {
	return (
		<div className="todos">
			{todos.map((todo) => {
				return (
					<div className="todo">
						{/* verifica se o status é true ou false*/}
						<button
							className="checkbox"
							style={{ backgroundColor: todo.status ? "lightgreen" : "White" }}
						></button>
						<p>{todo.name}</p>
						<button>
							<AiOutlineEdit size={20} />
						</button>
						<button onClick={() => deleteTodo(todo)}>
							<AiOutlineDelete size={20} />
						</button>
					</div>
				);
			})}
		</div>
	);
};

function App() {
	async function handleWithNewButton() {
		//simplesmente seta como falso ou true... (inverte o estado atual)
		setinputVisibility(!inputVisibility);
	}

	async function getTodos() {
		const response = await axios.get("http://localhost:3030/todos");
		setTodos(response.data);
	}

	async function createTodo() {
		console.log('teste')
    await axios.post("http://localhost:3030/todos", {
			name: inputValue,
		});
		getTodos();
		setinputVisibility(!inputVisibility);
	}

  
  async function deleteTodo(todo){
    await axios.delete(`http://localhost:3030/todos/${todo.id}`)
  }


	const [todos, setTodos] = useState([]); //Estudar esse array.. é o estado inicial? (lista vazia)
	const [inputValue, setInputValue] = useState("");
	const [inputVisibility, setinputVisibility] = useState(true);
	//UseEffect irá chamar a função getTodos assim que o componente (app) for montado
	useEffect(() => {
		getTodos();
	});

	return (
		<section className="container">
			<header className="header">
				<h1>Todo List</h1>
			</header>

			{/* passando um state como props de componente pai pra filho */}
			<Todos todos={todos} />

			<input
				value={inputValue}
				style={{ display: inputVisibility ? "block" : "none" }}
				onChange={(e) => {
					{
						/*Estudar o que é o target do evento (acho que pega o value do input atual...)*/
					}
					setInputValue(e.target.value);
				}}
				className="inputName"
			></input>
			<button
				onClick={inputVisibility ? createTodo : handleWithNewButton}
				className="newTaskButton"
			>
				{inputVisibility ? "Confirm" : "+ New Task"}
			</button>
		</section>
	);
}

export default App;
