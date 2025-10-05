// C# language data for coding-jojo platform
export const csharpData = {
  description:
    "C# is a modern, object-oriented programming language developed by Microsoft for the .NET framework.",
  topics: [
    {
      id: "csharp-introduction",
      title: "C# Introduction",
      content: `
        <h2>What is C#?</h2>
        <p>C# is a modern, object-oriented programming language developed by Microsoft for the .NET framework.</p>
        <ul>
          <li>C# is widely used in the industry</li>
          <li>C# has a large community and ecosystem</li>
          <li>C# offers powerful features and capabilities</li>
          <li>C# is continuously evolving with new updates</li>
        </ul>
        
        <h3>C# Features</h3>
        <p>C# provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
      tryItCode: `// Try C# here
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
      id: "csharp-getting-started",
      title: "Getting Started with C#",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of C# and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>C# development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn C# syntax and concepts</li>
          <li>Build your first C# project</li>
          <li>Explore C# libraries and frameworks</li>
        </ul>
      `,
      codeExample: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
      tryItCode: `// Practice C# basics
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

export default csharpData;