// Flutter language data for coding-jojo platform
export const flutterData = {
  description:
    "Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop.",
  topics: [
    {
      id: "flutter-introduction",
      title: "Flutter Introduction",
      content: `
        <h2>What is Flutter?</h2>
        <p>Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop.</p>
        <ul>
          <li>Flutter is widely used in the industry</li>
          <li>Flutter has a large community and ecosystem</li>
          <li>Flutter offers powerful features and capabilities</li>
          <li>Flutter is continuously evolving with new updates</li>
        </ul>
        
        <h3>Flutter Features</h3>
        <p>Flutter provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `void main() {
  print('Hello, World!');
  
  // Basic function
  print(greet('World'));
}

String greet(String name) {
  return 'Hello, $name!';
}`,
      tryItCode: `// Try Flutter here
void main() {
  print('Hello, World!');
  
  // Basic function
  print(greet('World'));

// Add your own code here`,
      language: "flutter",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "flutter-getting-started",
      title: "Getting Started with Flutter",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Flutter and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Flutter development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Flutter syntax and concepts</li>
          <li>Build your first Flutter project</li>
          <li>Explore Flutter libraries and frameworks</li>
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
      tryItCode: `// Practice Flutter basics
void main() {
  print('Hello, World!');
  
  // Basic function
  print(greet('World'));
}

String greet(String name) {

// Try modifying this code`,
      language: "flutter",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default flutterData;