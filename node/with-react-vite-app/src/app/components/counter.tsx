import React, { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <p className="text-2xl font-bold text-black">Counter</p>
      <div className="text-6xl font-light text-black">{count}</div>
      <div className="flex gap-6">
        <button
          onClick={() => setCount(count - 1)}
          className="w-12 h-12 flex items-center justify-center text-lg border border-black rounded-full hover:bg-black hover:text-white transition-all"
        >
          -
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="w-12 h-12 flex items-center justify-center text-lg border border-black rounded-full hover:bg-black hover:text-white transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
} 