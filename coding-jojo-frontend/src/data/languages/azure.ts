// Azure language data for coding-jojo platform
export const azureData = {
  description:
    "Microsoft Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications.",
  topics: [
    {
      id: "azure-introduction",
      title: "Azure Introduction",
      content: `
        <h2>What is Azure?</h2>
        <p>Microsoft Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications.</p>
        <ul>
          <li>Azure is widely used in the industry</li>
          <li>Azure has a large community and ecosystem</li>
          <li>Azure offers powerful features and capabilities</li>
          <li>Azure is continuously evolving with new updates</li>
        </ul>
        
        <h3>Azure Features</h3>
        <p>Azure provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `# Azure Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to Azure!"
date
pwd
ls -la`,
      tryItCode: `// Try Azure here
# Azure Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to Azure!"

// Add your own code here`,
      language: "bash",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "azure-getting-started",
      title: "Getting Started with Azure",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Azure and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Azure development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Azure syntax and concepts</li>
          <li>Build your first Azure project</li>
          <li>Explore Azure libraries and frameworks</li>
        </ul>
      `,
      codeExample: `# Azure Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to Azure!"
date
pwd
ls -la`,
      tryItCode: `// Practice Azure basics
# Azure Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to Azure!"
date
pwd
ls -la

// Try modifying this code`,
      language: "bash",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default azureData;