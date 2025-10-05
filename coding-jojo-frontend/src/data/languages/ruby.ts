// Ruby language data for coding-jojo platform
export const rubyData = {
  description:
    "Ruby is a dynamic, open source programming language with a focus on simplicity and productivity.",
  topics: [
    {
      id: "ruby-introduction",
      title: "Ruby Introduction",
      content: `
        <h2>What is Ruby?</h2>
        <p>Ruby is a dynamic, open source programming language with a focus on simplicity and productivity.</p>
        <ul>
          <li>Ruby is widely used in the industry</li>
          <li>Ruby has a large community and ecosystem</li>
          <li>Ruby offers powerful features and capabilities</li>
          <li>Ruby is continuously evolving with new updates</li>
        </ul>
        
        <h3>Ruby Features</h3>
        <p>Ruby provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `# Ruby Hello World
puts "Hello, World!"

# Basic method
def greet(name)
  "Hello, #{name}!"
end

puts greet("World")`,
      tryItCode: `// Try Ruby here
# Ruby Hello World
puts "Hello, World!"

# Basic method
def greet(name)

// Add your own code here`,
      language: "ruby",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "ruby-getting-started",
      title: "Getting Started with Ruby",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Ruby and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Ruby development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Ruby syntax and concepts</li>
          <li>Build your first Ruby project</li>
          <li>Explore Ruby libraries and frameworks</li>
        </ul>
      `,
      codeExample: `# Ruby Hello World
puts "Hello, World!"

# Basic method
def greet(name)
  "Hello, #{name}!"
end

puts greet("World")`,
      tryItCode: `// Practice Ruby basics
# Ruby Hello World
puts "Hello, World!"

# Basic method
def greet(name)
  "Hello, #{name}!"
end


// Try modifying this code`,
      language: "ruby",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default rubyData;