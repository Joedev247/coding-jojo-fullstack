// PyTorch language data for coding-jojo platform
export const pytorchData = {
  description:
    "PyTorch is an open source machine learning library based on the Torch library, used for computer vision and natural language processing.",
  topics: [
    {
      id: "pytorch-introduction",
      title: "PyTorch Introduction",
      content: `
        <h2>What is PyTorch?</h2>
        <p>PyTorch is an open source machine learning library based on the Torch library, used for computer vision and natural language processing.</p>
        <ul>
          <li>PyTorch is widely used in the industry</li>
          <li>PyTorch has a large community and ecosystem</li>
          <li>PyTorch offers powerful features and capabilities</li>
          <li>PyTorch is continuously evolving with new updates</li>
        </ul>
        
        <h3>PyTorch Features</h3>
        <p>PyTorch provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `# PyTorch Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
      tryItCode: `// Try PyTorch here
# PyTorch Hello World
print("Hello, World!")

# Basic example
def greet(name):

// Add your own code here`,
      language: "python",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "pytorch-getting-started",
      title: "Getting Started with PyTorch",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of PyTorch and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>PyTorch development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn PyTorch syntax and concepts</li>
          <li>Build your first PyTorch project</li>
          <li>Explore PyTorch libraries and frameworks</li>
        </ul>
      `,
      codeExample: `# PyTorch Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
      tryItCode: `// Practice PyTorch basics
# PyTorch Hello World
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

export default pytorchData;