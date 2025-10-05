// Spring Boot language data for coding-jojo platform
export const springbootData = {
  description:
    "Spring Boot is a Java framework that makes it easy to create stand-alone, production-grade Spring-based applications.",
  topics: [
    {
      id: "springboot-introduction",
      title: "Spring Boot Introduction",
      content: `
        <h2>What is Spring Boot?</h2>
        <p>Spring Boot is a Java framework that makes it easy to create stand-alone, production-grade Spring-based applications.</p>
        <ul>
          <li>Spring Boot is widely used in the industry</li>
          <li>Spring Boot has a large community and ecosystem</li>
          <li>Spring Boot offers powerful features and capabilities</li>
          <li>Spring Boot is continuously evolving with new updates</li>
        </ul>
        
        <h3>Spring Boot Features</h3>
        <p>Spring Boot provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      tryItCode: `// Try Spring Boot here
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

// Add your own code here`,
      language: "java",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "springboot-getting-started",
      title: "Getting Started with Spring Boot",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Spring Boot and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Spring Boot development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Spring Boot syntax and concepts</li>
          <li>Build your first Spring Boot project</li>
          <li>Explore Spring Boot libraries and frameworks</li>
        </ul>
      `,
      codeExample: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      tryItCode: `// Practice Spring Boot basics
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

// Try modifying this code`,
      language: "java",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default springbootData;