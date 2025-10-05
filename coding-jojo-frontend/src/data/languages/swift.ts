// Swift language data for coding-jojo platform
export const swiftData = {
  description:
    "Swift is a powerful and intuitive programming language for iOS, macOS, watchOS, and tvOS app development.",
  topics: [
    {
      id: "swift-introduction",
      title: "Swift Introduction",
      content: `
        <h2>What is Swift?</h2>
        <p>Swift is a powerful and intuitive programming language for iOS, macOS, watchOS, and tvOS app development.</p>
        <ul>
          <li>Swift is widely used in the industry</li>
          <li>Swift has a large community and ecosystem</li>
          <li>Swift offers powerful features and capabilities</li>
          <li>Swift is continuously evolving with new updates</li>
        </ul>
        
        <h3>Swift Features</h3>
        <p>Swift provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `import Foundation

print("Hello, World!")

// Basic function
func greet(name: String) -> String {
    return "Hello, \(name)!"
}

print(greet(name: "World"))`,
      tryItCode: `// Try Swift here
import Foundation

print("Hello, World!")

// Basic function

// Add your own code here`,
      language: "swift",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "swift-getting-started",
      title: "Getting Started with Swift",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Swift and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Swift development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Swift syntax and concepts</li>
          <li>Build your first Swift project</li>
          <li>Explore Swift libraries and frameworks</li>
        </ul>
      `,
      codeExample: `import Foundation

print("Hello, World!")

// Basic function
func greet(name: String) -> String {
    return "Hello, \(name)!"
}

print(greet(name: "World"))`,
      tryItCode: `// Practice Swift basics
import Foundation

print("Hello, World!")

// Basic function
func greet(name: String) -> String {
    return "Hello, \(name)!"
}

// Try modifying this code`,
      language: "swift",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default swiftData;