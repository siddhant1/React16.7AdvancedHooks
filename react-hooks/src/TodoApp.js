import React, { useReducer, useState, useContext, useEffect } from "react";
import Context from "./Context";

const appReducer = (state, action) => {
  if (action.type === "ADD") {
    let newState = { ...state };
    newState.todos = newState.todos.concat(action.payload);
    return newState;
  } else if (action.type === "DELETE") {
    let newState = state.todos.filter(todo => todo.id !== action.payload.id);
    return { todos: newState };
  } else if (action.type === "reset") {
    return action.payload;
  }
};

function TodoApp() {
  const [store, dispatch] = useReducer(appReducer, { todos: [] });
  const [input, setInput] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("data");
    dispatch({ type: "reset", payload: { todos: JSON.parse(raw) } });
  }, []);
  useEffect(
    () => {
      localStorage.setItem("data", JSON.stringify(store.todos));
    },
    [store]
  );
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
          if (input === "") {
            alert("Fill something");
            return;
          }
          dispatch({ type: "ADD", payload: { id: Date.now(), text: input } });
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
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
}

function Todo({ todo }) {
  const context = useContext(Context);
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "5fr 1fr",
          border: "1px red"
        }}
      >
        <p>{todo.text}</p>
        <button
          onClick={() => context({ type: "DELETE", payload: { id: todo.id } })}
        >
          &times;
        </button>
      </div>
    </>
  );
}
export default TodoApp;
