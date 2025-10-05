// Go language data for coding-jojo platform
export const goData = {
  description:
    "Go is an open source programming language developed by Google that makes it easy to build simple, reliable, and efficient software.",
  topics: [
    {
      id: "go-introduction",
      title: "Go Introduction",
      content: `
        <h2>What is Go?</h2>
        <p>Go is an open source programming language developed by Google that makes it easy to build simple, reliable, and efficient software.</p>
        <ul>
          <li>Go is widely used in the industry</li>
          <li>Go has a large community and ecosystem</li>
          <li>Go offers powerful features and capabilities</li>
          <li>Go is continuously evolving with new updates</li>
        </ul>
        
        <h3>Go Features</h3>
        <p>Go provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    
    // Basic function
    fmt.Println(greet("World"))
}

func greet(name string) string {
    return "Hello, " + name + "!"
}`,
      tryItCode: `// Try Go here
package main

import "fmt"

func main() {

// Add your own code here`,
      language: "go",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "go-getting-started",
      title: "Getting Started with Go",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Go and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Go development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Go syntax and concepts</li>
          <li>Build your first Go project</li>
          <li>Explore Go libraries and frameworks</li>
        </ul>
      `,
      codeExample: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    
    // Basic function
    fmt.Println(greet("World"))
}

func greet(name string) string {
    return "Hello, " + name + "!"
}`,
      tryItCode: `// Practice Go basics
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    
    // Basic function

// Try modifying this code`,
      language: "go",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default goData;