// Docker language data for coding-jojo platform
export const dockerData = {
  description:
    "Docker is a platform for developing, shipping, and running applications using containerization technology.",
  topics: [
    {
      id: "docker-introduction",
      title: "Docker Introduction",
      content: `
        <h2>What is Docker?</h2>
        <p>Docker is a platform for developing, shipping, and running applications using containerization technology.</p>
        <ul>
          <li>Docker is widely used in the industry</li>
          <li>Docker has a large community and ecosystem</li>
          <li>Docker offers powerful features and capabilities</li>
          <li>Docker is continuously evolving with new updates</li>
        </ul>
        
        <h3>Docker Features</h3>
        <p>Docker provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `# Docker Hello World
# Dockerfile
FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

# Build and run
docker build -t hello-app .
docker run -p 3000:3000 hello-app`,
      tryItCode: `// Try Docker here
# Docker Hello World
# Dockerfile
FROM node:alpine
WORKDIR /app
COPY . .

// Add your own code here`,
      language: "bash",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "docker-getting-started",
      title: "Getting Started with Docker",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Docker and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Docker development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Docker syntax and concepts</li>
          <li>Build your first Docker project</li>
          <li>Explore Docker libraries and frameworks</li>
        </ul>
      `,
      codeExample: `# Docker Hello World
# Dockerfile
FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

# Build and run
docker build -t hello-app .
docker run -p 3000:3000 hello-app`,
      tryItCode: `// Practice Docker basics
# Docker Hello World
# Dockerfile
FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

// Try modifying this code`,
      language: "bash",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default dockerData;