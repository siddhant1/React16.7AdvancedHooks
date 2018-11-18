import React, { useReducer, useState, useContext } from "react";
import Context from "./Context";

const appReducer = (state, action) => {
  if (action.type === "ADD") {
    console.log("hey");
    let newState = { ...state };
    newState.todos = newState.todos.concat(action.payload);
    return newState;
  } else if (action.type === "DELETE") {
    return [];
  }
};

function TodoApp() {
  const [store, dispatch] = useReducer(appReducer, { todos: [] });
  const [input, setInput] = useState("");
  return (
    <Context.Provider value={dispatch}>
      <input
        type="text"
        value={input}
        onChange={e => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatch({ type: "ADD", payload: { text: input } });
          setInput("");
        }}
      >
        Add
      </button>
      <TodoList todos={store.todos} />
    </Context.Provider>
  );
}

function TodoList({ todos }) {
  return (
    <>
      {todos.map(todo => (
        <Todo todo={todo} />
      ))}
    </>
  );
}

function Todo({ todo }) {
  const context = useContext(Context);
  console.log(context);
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "5fr 1fr",
          border: "1px red"
        }}
        key={todo.text}
      >
        <p>{todo.text}</p>
        <button onClick={()=>context({ type: "DELETE" })}>&times;</button>
      </div>
    </>
  );
}
export default TodoApp;
