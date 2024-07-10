import { useState, useEffect } from "react";
import { dummyData } from "../data/todos";
import { Todo } from "../types/todo";

export default function useTodos() {
    const [todos, setTodos] = useState(()=> {
        const storedTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
        return storedTodos.length > 0 ? storedTodos : dummyData;
      });
    
      useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
      },[todos]);
      
    
      function setTodoCompleted(id: number, completed: boolean) {
        // alert(`Todo with id ${id} is now ${completed ? "completed" : "not completed"}`)
        setTodos((prevTodos) => 
          prevTodos.map(todo => (
            todo.id === id? {...todo, completed } : todo))
          );
          
      }
    
      function addTodo(title: string) {
        setTodos((prevTodos) => [ 
          {
            // id: prevTodos.length + 1,
            id: Date.now(), // generate unique id
            title,
            completed: false,
          },
          ...prevTodos,  // rest of the previous todos
        ]);
      }
    
      function deleteTodo(id: number) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      }
    
      function deleteAllCompletedTodos() {
        setTodos(prevTodos => prevTodos.filter(todo =>!todo.completed));
      }

      return { todos, setTodoCompleted, addTodo, deleteTodo, deleteAllCompletedTodos };
}