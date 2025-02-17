import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Counter } from "./components/counter";

export default function App() {
  return (
    <Router basename="/app">
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center gap-6 p-8">
              <h1 className="text-4xl font-bold text-black">Your React App</h1>
              <Counter />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}
