// AWS language data for coding-jojo platform
export const awsData = {
  description:
    "Amazon Web Services (AWS) is a comprehensive cloud computing platform provided by Amazon.",
  topics: [
    {
      id: "aws-introduction",
      title: "AWS Introduction",
      content: `
        <h2>What is AWS?</h2>
        <p>Amazon Web Services (AWS) is a comprehensive cloud computing platform provided by Amazon.</p>
        <ul>
          <li>AWS is widely used in the industry</li>
          <li>AWS has a large community and ecosystem</li>
          <li>AWS offers powerful features and capabilities</li>
          <li>AWS is continuously evolving with new updates</li>
        </ul>
        
        <h3>AWS Features</h3>
        <p>AWS provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `# AWS Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to AWS!"
date
pwd
ls -la`,
      tryItCode: `// Try AWS here
# AWS Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to AWS!"

// Add your own code here`,
      language: "bash",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "aws-getting-started",
      title: "Getting Started with AWS",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of AWS and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>AWS development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn AWS syntax and concepts</li>
          <li>Build your first AWS project</li>
          <li>Explore AWS libraries and frameworks</li>
        </ul>
      `,
      codeExample: `# AWS Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to AWS!"
date
pwd
ls -la`,
      tryItCode: `// Practice AWS basics
# AWS Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to AWS!"
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

export default awsData;