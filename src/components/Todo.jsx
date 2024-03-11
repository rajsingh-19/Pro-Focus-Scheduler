import React, { useEffect, useState } from "react";
import "../styles/Todo.css";
import { v4 as uuid } from "uuid";
import { MdDeleteForever } from "react-icons/md";

const Todo = () => {
  const [todo, setTodo] = useState();
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const userTodo = JSON.parse(localStorage.getItem("todo"));
    userTodo && setTodoList(userTodo);
  }, []);

  const handleInputOnchange = (event) => {
    setTodo(event.target.value);
  };

  const handleInput = (event) => {
    if(event.key === "Enter"  && event.target.value.length > 0) {
      const updatedTodoList = [...todoList, {_id: uuid(), todo, isCompleted: false }];
      setTodoList(updatedTodoList);
      setTodo("");
      localStorage.setItem("todo", JSON.stringify(updatedTodoList));
    }
  };

  const handleTodoCheckbox = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      id === todo._id ? {...todo, isCompleted: !todo.isCompleted} : todo
    );
      setTodoList(updatedTodoList);
      localStorage.setItem("todo", JSON.stringify
      (updatedTodoList));
  };

  const handleTodoDelete = (id) => {
    const updatedTodoList = todoList.filter(({_id}) => _id !== id );
    setTodoList(updatedTodoList);
    localStorage.setItem("todo", JSON.stringify(updatedTodoList));
  }

  return (
    <div className="todoContainer">
        <p className="text-center italic text4 pb5">Tasks</p>
      <div>
        <input type="text" className="todoInputs text4 primary text-center" value={todo} onChange={handleInputOnchange} onKeyDown={handleInput} />
      </div>
      <div className="todoListContainer">
        {
          todoList && todoList.map(({todo, _id, isCompleted}) => {
            return (
              <div key={_id} className="todoItemsContainer flex items-center">
                <label className={`${isCompleted ? "strike" : ""}  primary todoLabel text3 cursor`} >
                  <input type="checkbox" className="todoCheckbox" onChange={() => handleTodoCheckbox(_id)} checked={isCompleted} />
                  {todo}
                </label>
                <button className="todoDel" onClick={() => handleTodoDelete(_id)}>
                <MdDeleteForever className='todoDel cursor'/>
                </button>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Todo;
