// Django language data for coding-jojo platform
export const djangoData = {
  description:
    "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.",
  topics: [
    {
      id: "django-introduction",
      title: "Django Introduction",
      content: `
        <h2>What is Django?</h2>
        <p>Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.</p>
        <ul>
          <li>Django is widely used in the industry</li>
          <li>Django has a large community and ecosystem</li>
          <li>Django offers powerful features and capabilities</li>
          <li>Django is continuously evolving with new updates</li>
        </ul>
        
        <h3>Django Features</h3>
        <p>Django provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `# Django Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
      tryItCode: `// Try Django here
# Django Hello World
print("Hello, World!")

# Basic example
def greet(name):

// Add your own code here`,
      language: "python",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "django-getting-started",
      title: "Getting Started with Django",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Django and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Django development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Django syntax and concepts</li>
          <li>Build your first Django project</li>
          <li>Explore Django libraries and frameworks</li>
        </ul>
      `,
      codeExample: `# Django Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
      tryItCode: `// Practice Django basics
# Django Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))

// Try modifying this code`,
      language: "python",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default djangoData;