import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

// Mount the component to the root element
createRoot(document.getElementById('react-component') as HTMLElement).render(
  <Counter />
)

export default function Counter() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  const handleIncrement = () => {
    setCount(count + 1)
  }

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1)
    } else {
      setMessage('Count cannot be less than 0')
    }
  }

  return (
    <div className="counter-container">
      <p className="counter-count">Count: {count}</p>
      <div className="counter-buttons">
        <button className="counter-button" onClick={handleDecrement}>-</button>
        <button className="counter-button" onClick={handleIncrement}>+</button>
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  )
}
