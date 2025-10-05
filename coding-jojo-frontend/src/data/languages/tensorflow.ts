// TensorFlow language data for coding-jojo platform
export const tensorflowData = {
  description:
    "TensorFlow is a free and open-source software library for machine learning and artificial intelligence.",
  topics: [
    {
      id: "tensorflow-introduction",
      title: "TensorFlow Introduction",
      content: `
        <h2>What is TensorFlow?</h2>
        <p>TensorFlow is a free and open-source software library for machine learning and artificial intelligence.</p>
        <ul>
          <li>TensorFlow is widely used in the industry</li>
          <li>TensorFlow has a large community and ecosystem</li>
          <li>TensorFlow offers powerful features and capabilities</li>
          <li>TensorFlow is continuously evolving with new updates</li>
        </ul>
        
        <h3>TensorFlow Features</h3>
        <p>TensorFlow provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `# TensorFlow Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
      tryItCode: `// Try TensorFlow here
# TensorFlow Hello World
print("Hello, World!")

# Basic example
def greet(name):

// Add your own code here`,
      language: "python",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "tensorflow-getting-started",
      title: "Getting Started with TensorFlow",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of TensorFlow and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>TensorFlow development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn TensorFlow syntax and concepts</li>
          <li>Build your first TensorFlow project</li>
          <li>Explore TensorFlow libraries and frameworks</li>
        </ul>
      `,
      codeExample: `# TensorFlow Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
      tryItCode: `// Practice TensorFlow basics
# TensorFlow Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))

// Try modifying this code`,
      language: "python",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default tensorflowData;