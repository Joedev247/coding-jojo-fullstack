// Data Science language data for coding-jojo platform
export const datascienceData = {
  description:
    "Data Science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge from data.",
  topics: [
    {
      id: "datascience-introduction",
      title: "Data Science Introduction",
      content: `
        <h2>What is Data Science?</h2>
        <p>Data Science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge from data.</p>
        <ul>
          <li>Data Science is widely used in the industry</li>
          <li>Data Science has a large community and ecosystem</li>
          <li>Data Science offers powerful features and capabilities</li>
          <li>Data Science is continuously evolving with new updates</li>
        </ul>
        
        <h3>Data Science Features</h3>
        <p>Data Science provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `# Data Science Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
      tryItCode: `// Try Data Science here
# Data Science Hello World
print("Hello, World!")

# Basic example
def greet(name):

// Add your own code here`,
      language: "python",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "datascience-getting-started",
      title: "Getting Started with Data Science",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Data Science and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Data Science development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Data Science syntax and concepts</li>
          <li>Build your first Data Science project</li>
          <li>Explore Data Science libraries and frameworks</li>
        </ul>
      `,
      codeExample: `# Data Science Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
      tryItCode: `// Practice Data Science basics
# Data Science Hello World
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

export default datascienceData;