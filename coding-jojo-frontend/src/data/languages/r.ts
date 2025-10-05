// R language data for coding-jojo platform
export const rData = {
  description:
    "R is a programming language and free software environment for statistical computing and graphics.",
  topics: [
    {
      id: "r-introduction",
      title: "R Introduction",
      content: `
        <h2>What is R?</h2>
        <p>R is a programming language and free software environment for statistical computing and graphics.</p>
        <ul>
          <li>R is widely used in the industry</li>
          <li>R has a large community and ecosystem</li>
          <li>R offers powerful features and capabilities</li>
          <li>R is continuously evolving with new updates</li>
        </ul>
        
        <h3>R Features</h3>
        <p>R provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `# R Hello World
print("Hello, World!")

# Basic function
greet <- function(name) {
  paste("Hello,", name, "!")
}

print(greet("World"))`,
      tryItCode: `// Try R here
# R Hello World
print("Hello, World!")

# Basic function
greet <- function(name) {

// Add your own code here`,
      language: "r",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "r-getting-started",
      title: "Getting Started with R",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of R and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>R development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn R syntax and concepts</li>
          <li>Build your first R project</li>
          <li>Explore R libraries and frameworks</li>
        </ul>
      `,
      codeExample: `# R Hello World
print("Hello, World!")

# Basic function
greet <- function(name) {
  paste("Hello,", name, "!")
}

print(greet("World"))`,
      tryItCode: `// Practice R basics
# R Hello World
print("Hello, World!")

# Basic function
greet <- function(name) {
  paste("Hello,", name, "!")
}


// Try modifying this code`,
      language: "r",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default rData;