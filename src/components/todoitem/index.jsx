import React from "react";
import "./style.css"


export default function TodoItem(props){
    const {list, onDeleteButtonClick, onItemClick} = props

    function getBgColor(completed){
        if(completed){
            return "green"
        }
    }

    return (
        <>
            <li
                style = {{backgroundColor: getBgColor(list.Completed)}}
                onClick={() => onItemClick(list.id)}
            >
                {list.title}
            </li> 
            <button 
                onClick={() => onDeleteButtonClick(list.id)}
            >
                Delete
            </button>
        </>
    )
}