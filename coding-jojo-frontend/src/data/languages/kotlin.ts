// Kotlin language data for coding-jojo platform
export const kotlinData = {
  description:
    "Kotlin is a modern programming language that makes developers happier. It's concise, safe, interoperable with Java and Android.",
  topics: [
    {
      id: "kotlin-introduction",
      title: "Kotlin Introduction",
      content: `
        <h2>What is Kotlin?</h2>
        <p>Kotlin is a modern programming language that makes developers happier. It's concise, safe, interoperable with Java and Android.</p>
        <ul>
          <li>Kotlin is widely used in the industry</li>
          <li>Kotlin has a large community and ecosystem</li>
          <li>Kotlin offers powerful features and capabilities</li>
          <li>Kotlin is continuously evolving with new updates</li>
        </ul>
        
        <h3>Kotlin Features</h3>
        <p>Kotlin provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `fun main() {
    println("Hello, World!")
    
    // Basic function
    println(greet("World"))
}

fun greet(name: String): String {
    return "Hello, $name!"
}`,
      tryItCode: `// Try Kotlin here
fun main() {
    println("Hello, World!")
    
    // Basic function
    println(greet("World"))

// Add your own code here`,
      language: "kotlin",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "kotlin-getting-started",
      title: "Getting Started with Kotlin",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Kotlin and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Kotlin development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Kotlin syntax and concepts</li>
          <li>Build your first Kotlin project</li>
          <li>Explore Kotlin libraries and frameworks</li>
        </ul>
      `,
      codeExample: `fun main() {
    println("Hello, World!")
    
    // Basic function
    println(greet("World"))
}

fun greet(name: String): String {
    return "Hello, $name!"
}`,
      tryItCode: `// Practice Kotlin basics
fun main() {
    println("Hello, World!")
    
    // Basic function
    println(greet("World"))
}

fun greet(name: String): String {

// Try modifying this code`,
      language: "kotlin",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default kotlinData;