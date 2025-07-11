import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

// Context creation
const CountContext = createContext();

// Context provider
const CountProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);

  return (
    <CountContext.Provider value={{ count, setCount, logs, setLogs }}>
      {children}
    </CountContext.Provider>
  );
};

// Count display component
const CountDisplay = () => {
  const { count } = useContext(CountContext);
  const prevCount = useRef(count);

  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  return (
    <div style={{ fontSize: '1.2rem' }}>
      <p>Current Count: <strong>{count}</strong></p>
      <p>Previous Count: <strong>{prevCount.current}</strong></p>
    </div>
  );
};

// Counter buttons
const Counter = () => {
  const { count, setCount, logs, setLogs } = useContext(CountContext);

  const handleClick = (type) => {
    const newCount = type === 'increment' ? count + 1 : count - 1;
    const timestamp = new Date().toLocaleTimeString();
    const log = `${type === 'increment' ? 'Incremented' : 'Decremented'} to ${newCount} at ${timestamp}`;

    setCount(newCount);
    setLogs([...logs, log]);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={() => handleClick('increment')} style={btnStyle}>Increment</button>
      <button onClick={() => handleClick('decrement')} style={{ ...btnStyle, backgroundColor: '#ef4444' }}>Decrement</button>
    </div>
  );
};

// Log display
const LogList = () => {
  const { logs } = useContext(CountContext);

  return (
    <div style={{ marginTop: '2rem', textAlign: 'left' }}>
      <h3>Action Logs</h3>
      <ul style={{ paddingLeft: '1rem' }}>
        {logs.map((log, index) => (
          <li key={index} style={{ marginBottom: '4px' }}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

const btnStyle = {
  margin: '0 10px',
  padding: '10px 20px',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

// Main App
export default function App() {
  return (
    <CountProvider>
      <div style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
        fontFamily: 'sans-serif'
      }}>
        <h1>Minimal Counter App</h1>
        <CountDisplay />
        <Counter />
        <LogList />
      </div>
    </CountProvider>
  );
}
