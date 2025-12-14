"use client";

import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setTodos((prev) => [...prev, trimmed]);
      setInput("");
    }
  };

  const removeTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleComplete = (index: number) => {
    setTodos((prev) =>
      prev.map((t, i) => (i === index ? (t.startsWith("✓ ") ? t.slice(2) : "✓ " + t) : t))
    );
  };

  return (
    <main className="flex min-h-screen w-full items-start justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 transition-colors duration-300">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Todo List
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            Minimal, clean, and beautiful
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a todo..."
            className="flex-1 rounded-xl border border-gray-300 bg-white/80 px-5 py-3 text-gray-900 placeholder-gray-500 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-lg hover:shadow-blue-100/50 dark:border-gray-600 dark:bg-gray-800/80 dark:text-white dark:placeholder-gray-400 dark:hover:shadow-gray-800/30"
          />
          <button
            onClick={addTodo}
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-white font-medium shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:-translate-y-0.5"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos.length === 0 && (
            <li className="rounded-2xl border border-gray-200 bg-white/50 p-6 text-center text-gray-600 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300">
              No todos yet. Add one above!
            </li>
          )}
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-100/30 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:shadow-gray-800/20"
            >
              <span
                onClick={() => toggleComplete(index)}
                className={`cursor-pointer select-none rounded-md px-3 py-1 transition-colors duration-200 ${todo.startsWith("✓ ") ? "line-through text-gray-500 dark:text-gray-400 bg-gray-100/50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700" : "text-gray-900 dark:text-white bg-blue-50/50 hover:bg-blue-50 dark:bg-blue-900/20 dark:hover:bg-blue-900"}`}
                title="Click to toggle"
              >
                {todo}
              </span>
              <button
                onClick={() => removeTodo(index)}
                className="rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-white font-medium shadow-md transition-all duration-200 hover:from-red-600 hover:to-pink-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}