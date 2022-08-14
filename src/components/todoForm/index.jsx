import React from "react";
import TodoItem from "../todoitem";
import { useState } from "react";
import { useEffect } from "react";
import "./style.css"

export default function TodoForm(){
    const [list, setList] = useState([])
    const [title, setTitle] = useState('')
    
    useEffect(()=>{
        fetch("https://62f64f35612c13062b4b66e8.mockapi.io/lists")
        .then(resp => resp.json())
        .then(data => setList(data))
    }, [])

    function uploadNewItem(e){
        e.preventDefault()

        const newItem = {}

        if(title){
            newItem.title = title
        } else {
            alert("write smth")
            return;
        }

        fetch("https://62f64f35612c13062b4b66e8.mockapi.io/lists",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem)
        })
        .then((resp) => resp.json())
        .then((data) => setList([...list, data]))
        .then(setTitle(''))
    }

    function onDeleteButtonClick(id) {
        fetch("https://62f64f35612c13062b4b66e8.mockapi.io/lists/"+ id, {
          method: "DELETE",
        });
        const updatedList = list.filter(item => item.id !== id);
        setList(updatedList)
    }

    function doneItem(id){
        const itemTodo = list.find( item => item.id == id)

        const refreshItem = {...itemTodo, Completed: !itemTodo.Completed};

        fetch("https://62f64f35612c13062b4b66e8.mockapi.io/lists/"+ id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(refreshItem)
        });

        setList(list.map((item) => {
            if (item.id == id){
                return refreshItem
            } else return item
        }))

    }

    return(
        <div className="todo">
            <ul>
                {list.map(item =>(
                    <TodoItem
                        key={item.id} 
                        list = {item}
                        onDeleteButtonClick={onDeleteButtonClick}
                        onItemClick = {doneItem}
                    />
                ))}
            </ul>
            <form>
                <input 
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <button 
                    onClick={uploadNewItem}
                >
                    Add item
                </button>
            </form>
        </div>
    );
}