// ASP.NET language data for coding-jojo platform
export const aspnetData = {
  description:
    "ASP.NET is a free, cross-platform framework for building modern cloud-based web applications.",
  topics: [
    {
      id: "aspnet-introduction",
      title: "ASP.NET Introduction",
      content: `
        <h2>What is ASP.NET?</h2>
        <p>ASP.NET is a free, cross-platform framework for building modern cloud-based web applications.</p>
        <ul>
          <li>ASP.NET is widely used in the industry</li>
          <li>ASP.NET has a large community and ecosystem</li>
          <li>ASP.NET offers powerful features and capabilities</li>
          <li>ASP.NET is continuously evolving with new updates</li>
        </ul>
        
        <h3>ASP.NET Features</h3>
        <p>ASP.NET provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
      tryItCode: `// Try ASP.NET here
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");

// Add your own code here`,
      language: "csharp",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "aspnet-getting-started",
      title: "Getting Started with ASP.NET",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of ASP.NET and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>ASP.NET development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn ASP.NET syntax and concepts</li>
          <li>Build your first ASP.NET project</li>
          <li>Explore ASP.NET libraries and frameworks</li>
        </ul>
      `,
      codeExample: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
      tryItCode: `// Practice ASP.NET basics
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}

// Try modifying this code`,
      language: "csharp",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default aspnetData;