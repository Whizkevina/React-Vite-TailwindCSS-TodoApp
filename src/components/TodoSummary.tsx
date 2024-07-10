import { Todo } from "../types/todo";

interface TodoSummaryProps {
    todos: Todo[];
    deleteAllCompleted: () => void;


}

export default function TodoSummary({
    todos,
    deleteAllCompleted,
 
}: TodoSummaryProps) {
    const completedTodos = todos.filter(todo => todo.completed);

    return (
        <div className="text-center space-y-2">
            <p className="text-sm font-medium">
                {completedTodos.length} / {todos.length} Todo Completed
            </p>
            {completedTodos.length > 0 && completedTodos.length < todos.length && (
                <button onClick={deleteAllCompleted} className="text-sm text-red-500 hover:underline font-medium">
                    Clear Completed
                </button>
            )}
        </div>
    )
}