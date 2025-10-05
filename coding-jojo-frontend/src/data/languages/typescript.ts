// TypeScript language data for coding-jojo platform
export const typescriptData = {
  description:
    "TypeScript is a strongly typed programming language that builds on JavaScript by adding static type definitions. It compiles to plain JavaScript and runs anywhere JavaScript runs.",
  topics: [
    {
      id: "typescript-introduction",
      title: "TypeScript Introduction",
      content: `
        <h2>What is TypeScript?</h2>
        <p>TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.</p>
        <ul>
          <li>TypeScript adds static typing to JavaScript</li>
          <li>TypeScript code is compiled to JavaScript</li>
          <li>TypeScript provides better IDE support and error checking</li>
          <li>TypeScript is developed and maintained by Microsoft</li>
        </ul>
        
        <h3>TypeScript Benefits</h3>
        <p>TypeScript helps catch errors early and improves code maintainability.</p>
      `,
      codeExample: `// TypeScript with types
function greet(name: string): string {
    return "Hello, " + name;
}

// Variables with types
let message: string = "Hello World";
let count: number = 42;
let isActive: boolean = true;

// Arrays with types
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];

// Interface definition
interface Person {
    name: string;
    age: number;
    isStudent?: boolean; // Optional property
}

// Using the interface
let person: Person = {
    name: "John",
    age: 25,
    isStudent: true
};`,
      tryItCode: `// Try TypeScript basics
function welcome(name: string, age: number): string {
    return \`Welcome \${name}, you are \${age} years old!\`;
}

// Create variables with types
let userName: string = "Alice";
let userAge: number = 28;

// Call the function
console.log(welcome(userName, userAge));

// Try creating your own typed functions`,
      language: "typescript",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
  ],
};

export default typescriptData;
