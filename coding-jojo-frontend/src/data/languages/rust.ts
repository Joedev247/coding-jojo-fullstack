// Rust language data for coding-jojo platform
export const rustData = {
  description:
    "Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety.",
  topics: [
    {
      id: "rust-introduction",
      title: "Rust Introduction",
      content: `
        <h2>What is Rust?</h2>
        <p>Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety.</p>
        <ul>
          <li>Rust is widely used in the industry</li>
          <li>Rust has a large community and ecosystem</li>
          <li>Rust offers powerful features and capabilities</li>
          <li>Rust is continuously evolving with new updates</li>
        </ul>
        
        <h3>Rust Features</h3>
        <p>Rust provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `fn main() {
    println!("Hello, World!");
    
    // Basic function
    println!("{}", greet("World"));
}

fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}`,
      tryItCode: `// Try Rust here
fn main() {
    println!("Hello, World!");
    
    // Basic function
    println!("{}", greet("World"));

// Add your own code here`,
      language: "rust",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "rust-getting-started",
      title: "Getting Started with Rust",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Rust and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Rust development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Rust syntax and concepts</li>
          <li>Build your first Rust project</li>
          <li>Explore Rust libraries and frameworks</li>
        </ul>
      `,
      codeExample: `fn main() {
    println!("Hello, World!");
    
    // Basic function
    println!("{}", greet("World"));
}

fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}`,
      tryItCode: `// Practice Rust basics
fn main() {
    println!("Hello, World!");
    
    // Basic function
    println!("{}", greet("World"));
}

fn greet(name: &str) -> String {

// Try modifying this code`,
      language: "rust",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default rustData;