// PHP language data for coding-jojo platform
export const phpData = {
  description:
    "PHP is a popular server-side scripting language designed for web development but also used as a general-purpose programming language.",
  topics: [
    {
      id: "php-introduction",
      title: "PHP Introduction",
      content: `
        <h2>What is PHP?</h2>
        <p>PHP is a popular server-side scripting language designed for web development but also used as a general-purpose programming language.</p>
        <ul>
          <li>PHP is widely used in the industry</li>
          <li>PHP has a large community and ecosystem</li>
          <li>PHP offers powerful features and capabilities</li>
          <li>PHP is continuously evolving with new updates</li>
        </ul>
        
        <h3>PHP Features</h3>
        <p>PHP provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `<?php
// PHP Hello World
echo "Hello, World!";

// Basic function
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("World");
?>`,
      tryItCode: `// Try PHP here
<?php
// PHP Hello World
echo "Hello, World!";

// Basic function

// Add your own code here`,
      language: "php",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "php-getting-started",
      title: "Getting Started with PHP",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of PHP and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>PHP development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn PHP syntax and concepts</li>
          <li>Build your first PHP project</li>
          <li>Explore PHP libraries and frameworks</li>
        </ul>
      `,
      codeExample: `<?php
// PHP Hello World
echo "Hello, World!";

// Basic function
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("World");
?>`,
      tryItCode: `// Practice PHP basics
<?php
// PHP Hello World
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

export default phpData;