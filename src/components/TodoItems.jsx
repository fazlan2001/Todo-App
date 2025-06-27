import React from 'react'
import ticked from '../assets/ticked.png'
import unticked from '../assets/unticked.png'
import close from '../assets/close.png'

function TodoItems (props){
  return (
    <div className='flex items-center my-3 gap-2'>
        <div onClick={()=> {
          return props.toggle(props.id)}} className='flex flex-1 items-center cursor-pointer'>
            <img className='w-7' src={props.iscompleted ? ticked:unticked} alt="" />
            <p className={`text-slate-700 ml-4 text-[17px]
              ${props.iscompleted ? "line-through decoration-2": ""}`}>
                {props.text}
                </p>
        </div>

    <img onClick={()=> props.deleteTodo(props.id) } src={close} alt="" className='w-4 cursor-pointer'/>

    </div>
  )
}
export default TodoItems
