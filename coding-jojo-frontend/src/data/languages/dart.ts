// Dart language data for coding-jojo platform
export const dartData = {
  description:
    "Dart is a client-optimized programming language for fast apps on any platform, primarily used with Flutter.",
  topics: [
    {
      id: "dart-introduction",
      title: "Dart Introduction",
      content: `
        <h2>What is Dart?</h2>
        <p>Dart is a client-optimized programming language for fast apps on any platform, primarily used with Flutter.</p>
        <ul>
          <li>Dart is widely used in the industry</li>
          <li>Dart has a large community and ecosystem</li>
          <li>Dart offers powerful features and capabilities</li>
          <li>Dart is continuously evolving with new updates</li>
        </ul>
        
        <h3>Dart Features</h3>
        <p>Dart provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `void main() {
  print('Hello, World!');
  
  // Basic function
  print(greet('World'));
}

String greet(String name) {
  return 'Hello, $name!';
}`,
      tryItCode: `// Try Dart here
void main() {
  print('Hello, World!');
  
  // Basic function
  print(greet('World'));

// Add your own code here`,
      language: "dart",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "dart-getting-started",
      title: "Getting Started with Dart",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Dart and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Dart development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Dart syntax and concepts</li>
          <li>Build your first Dart project</li>
          <li>Explore Dart libraries and frameworks</li>
        </ul>
      `,
      codeExample: `void main() {
  print('Hello, World!');
  
  // Basic function
  print(greet('World'));
}

String greet(String name) {
  return 'Hello, $name!';
}`,
      tryItCode: `// Practice Dart basics
void main() {
  print('Hello, World!');
  
  // Basic function
  print(greet('World'));
}

String greet(String name) {

// Try modifying this code`,
      language: "dart",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default dartData;