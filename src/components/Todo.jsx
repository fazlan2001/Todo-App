import React, { useEffect, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems';
import { useRef } from 'react';

function Todo(){

  const InputRef = useRef()
  const [todoList, settodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

  const add = () => {
    
    const inputText = InputRef.current.value.trim();

    if(inputText === ""){
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      iscompleted:false,
    }

    settodoList((prev) =>{
     return [newTodo,...prev]
   });

  

    InputRef.current.value = "";
  }

  const deleteTodo = (id) => {
    settodoList((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  }

  const toggle = (id) => {
    settodoList((prev) => {
      return prev.map((todo)=>{
        if(todo.id === id){
          return {...todo, iscompleted:!todo.iscompleted}
        }
        return todo;
      })
    })
  }

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todoList));
    
  },[todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      
      {/* --------title-------- */}
      <div className='flex items-center mt-7 gap-2'>
        <img src={todo_icon} alt="" className='w-8'/>
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
      </div>

      {/* -------input box ------- */}
      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={InputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
         type="text" placeholder='Add your task' />
        <button onClick={add} className='border-none rounded-full bg-amber-950 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
      </div>

      {/* -------doto list ------- */}

      <div>
        {todoList.map((Todo)=>{
          return <TodoItems key={Todo.id} text={Todo.text} id ={Todo.id} iscompleted={Todo.iscompleted} deleteTodo={deleteTodo} toggle={toggle}/>
        })}
      </div>

    </div>

  )
}

export default Todo;