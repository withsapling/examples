import { Link } from "react-router";
import { useState } from "react";
export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Client Router Page</h1>
      <div className="card">
        <Link to="/">Go to Home</Link>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
}
