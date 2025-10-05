// Redis language data for coding-jojo platform
export const redisData = {
  description:
    "Redis is an open source, in-memory data structure store, used as a database, cache, and message broker.",
  topics: [
    {
      id: "redis-introduction",
      title: "Redis Introduction",
      content: `
        <h2>What is Redis?</h2>
        <p>Redis is an open source, in-memory data structure store, used as a database, cache, and message broker.</p>
        <ul>
          <li>Redis is widely used in the industry</li>
          <li>Redis has a large community and ecosystem</li>
          <li>Redis offers powerful features and capabilities</li>
          <li>Redis is continuously evolving with new updates</li>
        </ul>
        
        <h3>Redis Features</h3>
        <p>Redis provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `// Redis Hello World
console.log("Hello, World!");`,
      tryItCode: `// Try Redis here
// Redis Hello World
console.log("Hello, World!");

// Add your own code here`,
      language: "redis",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "redis-getting-started",
      title: "Getting Started with Redis",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Redis and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Redis development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Redis syntax and concepts</li>
          <li>Build your first Redis project</li>
          <li>Explore Redis libraries and frameworks</li>
        </ul>
      `,
      codeExample: `// Redis Hello World
console.log("Hello, World!");`,
      tryItCode: `// Practice Redis basics
// Redis Hello World
console.log("Hello, World!");

// Try modifying this code`,
      language: "redis",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default redisData;