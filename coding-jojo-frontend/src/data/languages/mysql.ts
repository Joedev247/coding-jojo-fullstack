// MySQL language data for coding-jojo platform
export const mysqlData = {
  description:
    "MySQL is an open-source relational database management system widely used for web applications.",
  topics: [
    {
      id: "mysql-introduction",
      title: "MySQL Introduction",
      content: `
        <h2>What is MySQL?</h2>
        <p>MySQL is an open-source relational database management system widely used for web applications.</p>
        <ul>
          <li>MySQL is widely used in the industry</li>
          <li>MySQL has a large community and ecosystem</li>
          <li>MySQL offers powerful features and capabilities</li>
          <li>MySQL is continuously evolving with new updates</li>
        </ul>
        
        <h3>MySQL Features</h3>
        <p>MySQL provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `-- MySQL Hello World
SELECT 'Hello, World!' AS message;

-- Basic query
SELECT 
    CONCAT('Hello, ', 'World') AS greeting,
    NOW() AS current_time;`,
      tryItCode: `// Try MySQL here
-- MySQL Hello World
SELECT 'Hello, World!' AS message;

-- Basic query
SELECT 

// Add your own code here`,
      language: "sql",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "mysql-getting-started",
      title: "Getting Started with MySQL",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of MySQL and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>MySQL development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn MySQL syntax and concepts</li>
          <li>Build your first MySQL project</li>
          <li>Explore MySQL libraries and frameworks</li>
        </ul>
      `,
      codeExample: `-- MySQL Hello World
SELECT 'Hello, World!' AS message;

-- Basic query
SELECT 
    CONCAT('Hello, ', 'World') AS greeting,
    NOW() AS current_time;`,
      tryItCode: `// Practice MySQL basics
-- MySQL Hello World
SELECT 'Hello, World!' AS message;

-- Basic query
SELECT 
    CONCAT('Hello, ', 'World') AS greeting,
    NOW() AS current_time;

// Try modifying this code`,
      language: "sql",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default mysqlData;