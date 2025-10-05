// MongoDB language data for coding-jojo platform
export const mongodbData = {
  description:
    "MongoDB is a source-available cross-platform document-oriented database program classified as a NoSQL database.",
  topics: [
    {
      id: "mongodb-introduction",
      title: "MongoDB Introduction",
      content: `
        <h2>What is MongoDB?</h2>
        <p>MongoDB is a source-available cross-platform document-oriented database program classified as a NoSQL database.</p>
        <ul>
          <li>MongoDB is widely used in the industry</li>
          <li>MongoDB has a large community and ecosystem</li>
          <li>MongoDB offers powerful features and capabilities</li>
          <li>MongoDB is continuously evolving with new updates</li>
        </ul>
        
        <h3>MongoDB Features</h3>
        <p>MongoDB provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `// MongoDB Hello World
db.messages.insertOne({
    message: "Hello, World!",
    timestamp: new Date()
});

// Basic query
db.messages.find({ message: "Hello, World!" });`,
      tryItCode: `// Try MongoDB here
// MongoDB Hello World
db.messages.insertOne({
    message: "Hello, World!",
    timestamp: new Date()
});

// Add your own code here`,
      language: "javascript",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "mongodb-getting-started",
      title: "Getting Started with MongoDB",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of MongoDB and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>MongoDB development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn MongoDB syntax and concepts</li>
          <li>Build your first MongoDB project</li>
          <li>Explore MongoDB libraries and frameworks</li>
        </ul>
      `,
      codeExample: `// MongoDB Hello World
db.messages.insertOne({
    message: "Hello, World!",
    timestamp: new Date()
});

// Basic query
db.messages.find({ message: "Hello, World!" });`,
      tryItCode: `// Practice MongoDB basics
// MongoDB Hello World
db.messages.insertOne({
    message: "Hello, World!",
    timestamp: new Date()
});

// Basic query
db.messages.find({ message: "Hello, World!" });

// Try modifying this code`,
      language: "javascript",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default mongodbData;