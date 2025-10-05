// Bitcoin language data for coding-jojo platform
export const bitcoinData = {
  description:
    "Bitcoin is a cryptocurrency invented by an unknown person or group of people using the name Satoshi Nakamoto.",
  topics: [
    {
      id: "bitcoin-introduction",
      title: "Bitcoin Introduction",
      content: `
        <h2>What is Bitcoin?</h2>
        <p>Bitcoin is a cryptocurrency invented by an unknown person or group of people using the name Satoshi Nakamoto.</p>
        <ul>
          <li>Bitcoin is widely used in the industry</li>
          <li>Bitcoin has a large community and ecosystem</li>
          <li>Bitcoin offers powerful features and capabilities</li>
          <li>Bitcoin is continuously evolving with new updates</li>
        </ul>
        
        <h3>Bitcoin Features</h3>
        <p>Bitcoin provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `// Bitcoin Hello World
console.log("Hello, World!");`,
      tryItCode: `// Try Bitcoin here
// Bitcoin Hello World
console.log("Hello, World!");

// Add your own code here`,
      language: "bitcoin",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "bitcoin-getting-started",
      title: "Getting Started with Bitcoin",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Bitcoin and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Bitcoin development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Bitcoin syntax and concepts</li>
          <li>Build your first Bitcoin project</li>
          <li>Explore Bitcoin libraries and frameworks</li>
        </ul>
      `,
      codeExample: `// Bitcoin Hello World
console.log("Hello, World!");`,
      tryItCode: `// Practice Bitcoin basics
// Bitcoin Hello World
console.log("Hello, World!");

// Try modifying this code`,
      language: "bitcoin",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default bitcoinData;