// PostgreSQL language data for coding-jojo platform
export const postgresqlData = {
  description:
    "PostgreSQL is a free and open-source relational database management system emphasizing extensibility and SQL compliance.",
  topics: [
    {
      id: "postgresql-introduction",
      title: "PostgreSQL Introduction",
      content: `
        <h2>What is PostgreSQL?</h2>
        <p>PostgreSQL is a free and open-source relational database management system emphasizing extensibility and SQL compliance.</p>
        <ul>
          <li>PostgreSQL is widely used in the industry</li>
          <li>PostgreSQL has a large community and ecosystem</li>
          <li>PostgreSQL offers powerful features and capabilities</li>
          <li>PostgreSQL is continuously evolving with new updates</li>
        </ul>
        
        <h3>PostgreSQL Features</h3>
        <p>PostgreSQL provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `-- PostgreSQL Hello World
SELECT 'Hello, World!' AS message;

-- Basic query
SELECT 
    CONCAT('Hello, ', 'World') AS greeting,
    NOW() AS current_time;`,
      tryItCode: `// Try PostgreSQL here
-- PostgreSQL Hello World
SELECT 'Hello, World!' AS message;

-- Basic query
SELECT 

// Add your own code here`,
      language: "sql",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "postgresql-getting-started",
      title: "Getting Started with PostgreSQL",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of PostgreSQL and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>PostgreSQL development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn PostgreSQL syntax and concepts</li>
          <li>Build your first PostgreSQL project</li>
          <li>Explore PostgreSQL libraries and frameworks</li>
        </ul>
      `,
      codeExample: `-- PostgreSQL Hello World
SELECT 'Hello, World!' AS message;

-- Basic query
SELECT 
    CONCAT('Hello, ', 'World') AS greeting,
    NOW() AS current_time;`,
      tryItCode: `// Practice PostgreSQL basics
-- PostgreSQL Hello World
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

export default postgresqlData;