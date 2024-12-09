import { Link } from "react-router";
import { useState } from "react";
export default function Page() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    // this is hitting the Sapling api for the hello response
    const apiUrl = import.meta.env.DEV ? "http://localhost:8080" : "MY_API_URL";
    // you would obviously want to handle siwt
    const response = await fetch(`${apiUrl}/hello`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <Link to="/">Back to Home</Link>
      <h1>Client Router Page</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input placeholder="Enter your name" type="text" name="name" />
          <button type="submit">Say Hi</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
