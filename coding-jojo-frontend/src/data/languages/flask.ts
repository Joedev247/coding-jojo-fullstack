// Flask language data for coding-jojo platform
export const flaskData = {
  description:
    "Flask is a lightweight WSGI web application framework in Python designed to make getting started quick and easy.",
  topics: [
    {
      id: "flask-introduction",
      title: "Flask Introduction",
      content: `
        <h2>What is Flask?</h2>
        <p>Flask is a lightweight WSGI web application framework in Python designed to make getting started quick and easy.</p>
        <ul>
          <li>Flask is widely used in the industry</li>
          <li>Flask has a large community and ecosystem</li>
          <li>Flask offers powerful features and capabilities</li>
          <li>Flask is continuously evolving with new updates</li>
        </ul>
        
        <h3>Flask Features</h3>
        <p>Flask provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `# Flask Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
      tryItCode: `// Try Flask here
# Flask Hello World
print("Hello, World!")

# Basic example
def greet(name):

// Add your own code here`,
      language: "python",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "flask-getting-started",
      title: "Getting Started with Flask",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Flask and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Flask development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Flask syntax and concepts</li>
          <li>Build your first Flask project</li>
          <li>Explore Flask libraries and frameworks</li>
        </ul>
      `,
      codeExample: `# Flask Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
      tryItCode: `// Practice Flask basics
# Flask Hello World
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

export default flaskData;