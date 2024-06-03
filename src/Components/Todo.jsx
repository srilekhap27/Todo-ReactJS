import { useEffect,useState,useRef } from 'react';
import './CSS/Todo.css';
import icon from './Assets/icon.png';
import TodoItems from './TodoItems';

let count = 0
const Todo = () => {

  const [todos,setTodos] = useState([]);
  const inputRef = useRef(null);
  const add = ()=>{
    // ...todo is a spread operator
    setTodos([...todos,{no:count++, text:inputRef.current.value, display:"" }]);
    inputRef.current.value = "";
    localStorage.setItem("todos_count",count);
  }

  // JSON.parse is used to convert data from string to JSON format
  useEffect(()=>{
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count");
  },[]) /* [] are used to execute the function on page reload. */

  /* Since there are tro useEffects,
  To run above useEffect first we should 
  set second useeffect in setTimeout */

  useEffect(()=>{
    // used JSON to convert the JSON data into string format
    setTimeout(()=>{
      console.log(todos);
      localStorage.setItem("todos",JSON.stringify(todos));
    },100);
  },[todos])

  return (
    <div className="todo">
        <div className="todo-header">To-do List
        <img src={icon} alt='' /></div>
        <div className="todo-add">
          <input ref={inputRef} type="text" placeholder="Add Todo List" className="todo-input"/>
          <button onClick ={()=>{add()}} className="todo-add-btn">Add</button>
        </div>
        <div className="todo-list">
          {todos.map((item,index)=>{
            return <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text} />
          })}
        </div>
    </div>
  )
}

export default Todo