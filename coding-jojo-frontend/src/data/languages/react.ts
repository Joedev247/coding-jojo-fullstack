// React language data for coding-jojo platform
export const reactData = {
  description:
    "React is a JavaScript library for building user interfaces, particularly web applications. It's maintained by Facebook and allows developers to create reusable UI components.",
  topics: [
    {
      id: "react-introduction",
      title: "React Introduction",
      content: `
        <h2>What is React?</h2>
        <p>React is a JavaScript library for building user interfaces.</p>
        <ul>
          <li>React is component-based</li>
          <li>React uses a virtual DOM for efficient updates</li>
          <li>React follows a declarative approach</li>
          <li>React can be used for web and mobile applications</li>
        </ul>
        
        <h3>React Components</h3>
        <p>Everything in React is a component - reusable pieces of UI.</p>
      `,
      codeExample: `import React from 'react';

// Functional Component
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}

// Component with useState Hook
function Counter() {
    const [count, setCount] = React.useState(0);
    
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

// Main App Component
function App() {
    return (
        <div>
            <Welcome name="Alice" />
            <Welcome name="Bob" />
            <Counter />
        </div>
    );
}

export default App;`,
      tryItCode: `import React from 'react';

// Create your first React component
function MyComponent() {
    const [message, setMessage] = React.useState("Hello React!");
    
    return (
        <div>
            <h1>{message}</h1>
            <button onClick={() => setMessage("React is awesome!")}>
                Change Message
            </button>
        </div>
    );
}

// Try creating more components
export default MyComponent;`,
      language: "jsx",
      difficulty: "intermediate" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default reactData;
