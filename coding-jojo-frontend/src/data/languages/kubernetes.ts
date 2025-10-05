// Kubernetes language data for coding-jojo platform
export const kubernetesData = {
  description:
    "Kubernetes is an open-source container-orchestration system for automating computer application deployment, scaling, and management.",
  topics: [
    {
      id: "kubernetes-introduction",
      title: "Kubernetes Introduction",
      content: `
        <h2>What is Kubernetes?</h2>
        <p>Kubernetes is an open-source container-orchestration system for automating computer application deployment, scaling, and management.</p>
        <ul>
          <li>Kubernetes is widely used in the industry</li>
          <li>Kubernetes has a large community and ecosystem</li>
          <li>Kubernetes offers powerful features and capabilities</li>
          <li>Kubernetes is continuously evolving with new updates</li>
        </ul>
        
        <h3>Kubernetes Features</h3>
        <p>Kubernetes provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `# Kubernetes Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to Kubernetes!"
date
pwd
ls -la`,
      tryItCode: `// Try Kubernetes here
# Kubernetes Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to Kubernetes!"

// Add your own code here`,
      language: "bash",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "kubernetes-getting-started",
      title: "Getting Started with Kubernetes",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Kubernetes and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Kubernetes development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Kubernetes syntax and concepts</li>
          <li>Build your first Kubernetes project</li>
          <li>Explore Kubernetes libraries and frameworks</li>
        </ul>
      `,
      codeExample: `# Kubernetes Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to Kubernetes!"
date
pwd
ls -la`,
      tryItCode: `// Practice Kubernetes basics
# Kubernetes Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to Kubernetes!"
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

export default kubernetesData;