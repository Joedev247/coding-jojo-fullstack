// Laravel language data for coding-jojo platform
export const laravelData = {
  description:
    "Laravel is a web application framework with expressive, elegant syntax for PHP web development.",
  topics: [
    {
      id: "laravel-introduction",
      title: "Laravel Introduction",
      content: `
        <h2>What is Laravel?</h2>
        <p>Laravel is a web application framework with expressive, elegant syntax for PHP web development.</p>
        <ul>
          <li>Laravel is widely used in the industry</li>
          <li>Laravel has a large community and ecosystem</li>
          <li>Laravel offers powerful features and capabilities</li>
          <li>Laravel is continuously evolving with new updates</li>
        </ul>
        
        <h3>Laravel Features</h3>
        <p>Laravel provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `<?php
// Laravel Hello World
echo "Hello, World!";

// Basic function
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("World");
?>`,
      tryItCode: `// Try Laravel here
<?php
// Laravel Hello World
echo "Hello, World!";

// Basic function

// Add your own code here`,
      language: "php",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "laravel-getting-started",
      title: "Getting Started with Laravel",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Laravel and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Laravel development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Laravel syntax and concepts</li>
          <li>Build your first Laravel project</li>
          <li>Explore Laravel libraries and frameworks</li>
        </ul>
      `,
      codeExample: `<?php
// Laravel Hello World
echo "Hello, World!";

// Basic function
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("World");
?>`,
      tryItCode: `// Practice Laravel basics
<?php
// Laravel Hello World
echo "Hello, World!";

// Basic function
function greet($name) {
    return "Hello, " . $name . "!";
}

// Try modifying this code`,
      language: "php",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default laravelData;