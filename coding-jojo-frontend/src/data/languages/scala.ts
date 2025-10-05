// Scala language data for coding-jojo platform
export const scalaData = {
  description:
    "Scala is a modern multi-paradigm programming language designed to express common programming patterns in a concise, elegant, and type-safe way.",
  topics: [
    {
      id: "scala-introduction",
      title: "Scala Introduction",
      content: `
        <h2>What is Scala?</h2>
        <p>Scala is a modern multi-paradigm programming language designed to express common programming patterns in a concise, elegant, and type-safe way.</p>
        <ul>
          <li>Scala is widely used in the industry</li>
          <li>Scala has a large community and ecosystem</li>
          <li>Scala offers powerful features and capabilities</li>
          <li>Scala is continuously evolving with new updates</li>
        </ul>
        
        <h3>Scala Features</h3>
        <p>Scala provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `object HelloWorld {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
    
    // Basic function
    println(greet("World"))
  }
  
  def greet(name: String): String = {
    s"Hello, $name!"
  }
}`,
      tryItCode: `// Try Scala here
object HelloWorld {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
    
    // Basic function

// Add your own code here`,
      language: "scala",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "scala-getting-started",
      title: "Getting Started with Scala",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Scala and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Scala development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Scala syntax and concepts</li>
          <li>Build your first Scala project</li>
          <li>Explore Scala libraries and frameworks</li>
        </ul>
      `,
      codeExample: `object HelloWorld {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
    
    // Basic function
    println(greet("World"))
  }
  
  def greet(name: String): String = {
    s"Hello, $name!"
  }
}`,
      tryItCode: `// Practice Scala basics
object HelloWorld {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
    
    // Basic function
    println(greet("World"))
  }
  

// Try modifying this code`,
      language: "scala",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default scalaData;