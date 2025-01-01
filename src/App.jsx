import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);

  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), todo, isCompleted: false }]);
      setTodo("");
    }
  };

  const handleUpdate = () => {
    setTodos(todos.map(item => item.id === currentTodoId ? { ...item, todo } : item));
    setTodo("");
    setIsEditing(false);
    setCurrentTodoId(null);
  };

  const handleEdit = (id, currentTodo) => {
    setIsEditing(true);
    setCurrentTodoId(id);
    setTodo(currentTodo);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(todos.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div className="bg-blue-300 min-h-screen flex justify-center">
      <div className="container my-5 rounded-xl p-5 bg-white max-w-7xl">
        <h1 className="text-2xl font-bold mb-5">Todo App</h1>
        <div className="addTodo mb-5 flex items-center w-full">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="flex-grow p-2 border rounded mr-2"
            placeholder="Add your todo"
          />
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="bg-yellow-600 hover:bg-yellow-800 text-white p-2 rounded-full flex items-center justify-center w-10 h-10"
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-full flex items-center justify-center w-10 h-10"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>
        <div className="todos">
          {todos.map(item => (
            <div key={item.id} className="todo flex items-center justify-between mb-3 p-2 border rounded bg-white w-full">
              <div className="flex items-center w-full">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleToggle(item.id)}
                  className="mr-2"
                />
                <span className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item.id, item.todo)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white p-2 rounded-full flex items-center justify-center w-10 h-10"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-full flex items-center justify-center w-10 h-10"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
