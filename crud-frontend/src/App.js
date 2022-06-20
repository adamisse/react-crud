import './App.css';
import {AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import axios from 'axios';

const arrayTodos = [
  {name: "Testa", status: true},
  {name: "Testandinho", status: false}
]

//Estudar essa atribuição de parâmetro objeto...
const Todos = ({todos}) =>{
  return(
    <div className="todos">
      {todos.map(todo => {
        return(
          <div className="todo"> 
            {/* verifica se o status é true ou false*/}
            <button className='checkbox' style={{backgroundColor: todo.status ? 'lightgreen' : 'White'}}></button>
            <p>{todo.name}</p>
            <button>
              <AiOutlineEdit size={20} />
            </button>
            <button>
              <AiOutlineDelete size={20} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

function App() {
  async function getTodos(){
    const response = await axios.get('http://localhost:5455');
    console.log(response);
  }

  const [todos, setTodos] = useState([])//Estudar esse array?

  //UseEffect irá chamar a função getTodos assim que o componente (app) for montado
  useEffect(() => {
    getTodos();
  })

  return (
    <section className="container">
      <header className='header'>
        <h1>Todo List</h1>
      </header>
      
      <Todos todos={arrayTodos} />
      
      <input className='inputName'></input>
      <button className='newTaskButton'>+ New Task</button>
    </section>
  );
}

export default App;
