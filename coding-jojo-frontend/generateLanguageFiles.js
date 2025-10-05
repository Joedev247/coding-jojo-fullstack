// Script to generate template files for all programming languages
const fs = require('fs');
const path = require('path');

// List of all programming languages and technologies from the navbar
const languages = [
  { name: "C++", key: "cpp", description: "C++ is a general-purpose programming language that supports procedural, object-oriented, and generic programming." },
  { name: "C#", key: "csharp", description: "C# is a modern, object-oriented programming language developed by Microsoft for the .NET framework." },
  { name: "PHP", key: "php", description: "PHP is a popular server-side scripting language designed for web development but also used as a general-purpose programming language." },
  { name: "Ruby", key: "ruby", description: "Ruby is a dynamic, open source programming language with a focus on simplicity and productivity." },
  { name: "Go", key: "go", description: "Go is an open source programming language developed by Google that makes it easy to build simple, reliable, and efficient software." },
  { name: "Rust", key: "rust", description: "Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety." },
  { name: "Swift", key: "swift", description: "Swift is a powerful and intuitive programming language for iOS, macOS, watchOS, and tvOS app development." },
  { name: "Kotlin", key: "kotlin", description: "Kotlin is a modern programming language that makes developers happier. It's concise, safe, interoperable with Java and Android." },
  { name: "Dart", key: "dart", description: "Dart is a client-optimized programming language for fast apps on any platform, primarily used with Flutter." },
  { name: "Scala", key: "scala", description: "Scala is a modern multi-paradigm programming language designed to express common programming patterns in a concise, elegant, and type-safe way." },
  { name: "R", key: "r", description: "R is a programming language and free software environment for statistical computing and graphics." },
  { name: "MATLAB", key: "matlab", description: "MATLAB is a programming language and platform for scientific computing, data analysis, and algorithm development." },
  { name: "Vue.js", key: "vuejs", description: "Vue.js is a progressive JavaScript framework for building user interfaces and single-page applications." },
  { name: "Angular", key: "angular", description: "Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google." },
  { name: "Node.js", key: "nodejs", description: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine for building server-side applications." },
  { name: "Next.js", key: "nextjs", description: "Next.js is a React framework that enables functionality such as server-side rendering and generating static websites." },
  { name: "Svelte", key: "svelte", description: "Svelte is a radical new approach to building user interfaces with a compile-time optimized framework." },
  { name: "Express.js", key: "expressjs", description: "Express.js is a minimal and flexible Node.js web application framework that provides robust features for web applications." },
  { name: "Django", key: "django", description: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design." },
  { name: "Flask", key: "flask", description: "Flask is a lightweight WSGI web application framework in Python designed to make getting started quick and easy." },
  { name: "Spring Boot", key: "springboot", description: "Spring Boot is a Java framework that makes it easy to create stand-alone, production-grade Spring-based applications." },
  { name: "Laravel", key: "laravel", description: "Laravel is a web application framework with expressive, elegant syntax for PHP web development." },
  { name: "Ruby on Rails", key: "rubyonrails", description: "Ruby on Rails is a server-side web application framework written in Ruby under the MIT License." },
  { name: "ASP.NET", key: "aspnet", description: "ASP.NET is a free, cross-platform framework for building modern cloud-based web applications." },
  { name: "React Native", key: "reactnative", description: "React Native is a framework for building native mobile applications using React and JavaScript." },
  { name: "Flutter", key: "flutter", description: "Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop." },
  { name: "Ionic", key: "ionic", description: "Ionic is a complete open-source SDK for hybrid mobile app development using web technologies." },
  { name: "Xamarin", key: "xamarin", description: "Xamarin is a Microsoft-owned San Francisco-based software company founded for cross-platform mobile app development." },
  { name: "Unity", key: "unity", description: "Unity is a cross-platform game engine developed by Unity Technologies for creating games and interactive content." },
  { name: "Unreal Engine", key: "unrealengine", description: "Unreal Engine is a game engine developed by Epic Games, first showcased in the 1998 first-person shooter game Unreal." },
  { name: "MongoDB", key: "mongodb", description: "MongoDB is a source-available cross-platform document-oriented database program classified as a NoSQL database." },
  { name: "PostgreSQL", key: "postgresql", description: "PostgreSQL is a free and open-source relational database management system emphasizing extensibility and SQL compliance." },
  { name: "MySQL", key: "mysql", description: "MySQL is an open-source relational database management system widely used for web applications." },
  { name: "Redis", key: "redis", description: "Redis is an open source, in-memory data structure store, used as a database, cache, and message broker." },
  { name: "Firebase", key: "firebase", description: "Firebase is a platform developed by Google for creating mobile and web applications with real-time database and hosting." },
  { name: "Supabase", key: "supabase", description: "Supabase is an open source Firebase alternative that provides a backend-as-a-service with PostgreSQL database." },
  { name: "AWS", key: "aws", description: "Amazon Web Services (AWS) is a comprehensive cloud computing platform provided by Amazon." },
  { name: "Azure", key: "azure", description: "Microsoft Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications." },
  { name: "Google Cloud", key: "googlecloud", description: "Google Cloud Platform is a suite of cloud computing services that runs on the same infrastructure that Google uses." },
  { name: "Docker", key: "docker", description: "Docker is a platform for developing, shipping, and running applications using containerization technology." },
  { name: "Kubernetes", key: "kubernetes", description: "Kubernetes is an open-source container-orchestration system for automating computer application deployment, scaling, and management." },
  { name: "DevOps", key: "devops", description: "DevOps is a set of practices that combines software development and IT operations to shorten development lifecycle." },
  { name: "Machine Learning", key: "machinelearning", description: "Machine Learning is a method of data analysis that automates analytical model building using algorithms that iteratively learn from data." },
  { name: "Data Science", key: "datascience", description: "Data Science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge from data." },
  { name: "AI", key: "ai", description: "Artificial Intelligence (AI) is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans." },
  { name: "Deep Learning", key: "deeplearning", description: "Deep Learning is part of a broader family of machine learning methods based on artificial neural networks." },
  { name: "TensorFlow", key: "tensorflow", description: "TensorFlow is a free and open-source software library for machine learning and artificial intelligence." },
  { name: "PyTorch", key: "pytorch", description: "PyTorch is an open source machine learning library based on the Torch library, used for computer vision and natural language processing." },
  { name: "Blockchain", key: "blockchain", description: "Blockchain is a growing list of records, called blocks, that are linked and secured using cryptography." },
  { name: "Web3", key: "web3", description: "Web3 refers to a new iteration of the World Wide Web based on blockchain technology, featuring decentralization and token-based economics." },
  { name: "Solidity", key: "solidity", description: "Solidity is an object-oriented programming language for writing smart contracts on various blockchain platforms." },
  { name: "Ethereum", key: "ethereum", description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality." },
  { name: "Bitcoin", key: "bitcoin", description: "Bitcoin is a cryptocurrency invented by an unknown person or group of people using the name Satoshi Nakamoto." },
  { name: "DeFi", key: "defi", description: "Decentralized Finance (DeFi) refers to a blockchain-based form of finance that does not rely on central financial intermediaries." },
  { name: "Cybersecurity", key: "cybersecurity", description: "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks." },
  { name: "Ethical Hacking", key: "ethicalhacking", description: "Ethical hacking involves an authorized attempt to gain unauthorized access to a computer system, application, or data." },
  { name: "Network Security", key: "networksecurity", description: "Network security involves access control policies and practices adopted to prevent and monitor unauthorized access to computer networks." },
  { name: "Cloud Security", key: "cloudsecurity", description: "Cloud security refers to the technologies, policies, controls, and services that protect cloud data, applications, and infrastructure." },
  { name: "UI/UX Design", key: "uiuxdesign", description: "UI/UX Design focuses on enhancing user satisfaction by improving the usability, accessibility, and pleasure in human-computer interaction." },
  { name: "Figma", key: "figma", description: "Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features." },
  { name: "Adobe XD", key: "adobexd", description: "Adobe XD is a vector-based user experience design tool for web apps and mobile apps, developed and published by Adobe Inc." },
  { name: "Sketch", key: "sketch", description: "Sketch is a vector graphics editor for macOS developed by the Dutch company Bohemian Coding." },
  { name: "Photoshop", key: "photoshop", description: "Adobe Photoshop is a raster graphics editor developed and published by Adobe Inc. for Windows and macOS." },
  { name: "Illustrator", key: "illustrator", description: "Adobe Illustrator is a vector graphics editor and design program developed and marketed by Adobe Inc." }
];

function generateLanguageTemplate(language) {
  const { name, key, description } = language;
  
  // Determine appropriate language for code examples
  let codeLanguage = key;
  if (key === 'cpp') codeLanguage = 'cpp';
  if (key === 'csharp') codeLanguage = 'csharp';
  if (key === 'nodejs' || key === 'expressjs') codeLanguage = 'javascript';
  if (key === 'reactnative') codeLanguage = 'jsx';
  if (key === 'nextjs' || key === 'vuejs' || key === 'angular' || key === 'svelte') codeLanguage = 'javascript';
  if (key === 'springboot') codeLanguage = 'java';
  if (key === 'laravel') codeLanguage = 'php';
  if (key === 'rubyonrails') codeLanguage = 'ruby';
  if (key === 'aspnet') codeLanguage = 'csharp';
  if (key === 'django' || key === 'flask' || key === 'machinelearning' || key === 'datascience' || key === 'tensorflow' || key === 'pytorch') codeLanguage = 'python';
  if (key === 'postgresql' || key === 'mysql') codeLanguage = 'sql';
  if (key === 'mongodb') codeLanguage = 'javascript';
  if (key === 'aws' || key === 'azure' || key === 'googlecloud' || key === 'docker' || key === 'kubernetes' || key === 'devops') codeLanguage = 'bash';
  if (key === 'solidity') codeLanguage = 'solidity';
  if (key === 'uiuxdesign' || key === 'figma' || key === 'adobexd' || key === 'sketch' || key === 'photoshop' || key === 'illustrator') codeLanguage = 'css';

  // Generate appropriate hello world example
  let helloWorldExample = `// ${name} Hello World
console.log("Hello, World!");`;
  
  if (key === 'cpp') {
    helloWorldExample = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`;
  } else if (key === 'csharp' || key === 'aspnet') {
    helloWorldExample = `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`;
  } else if (key === 'java' || key === 'springboot') {
    helloWorldExample = `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;
  } else if (key === 'python' || key === 'django' || key === 'flask' || key === 'machinelearning' || key === 'datascience' || key === 'tensorflow' || key === 'pytorch') {
    helloWorldExample = `# ${name} Hello World
print("Hello, World!")

# Basic example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`;
  } else if (key === 'php' || key === 'laravel') {
    helloWorldExample = `<?php
// ${name} Hello World
echo "Hello, World!";

// Basic function
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("World");
?>`;
  } else if (key === 'ruby' || key === 'rubyonrails') {
    helloWorldExample = `# ${name} Hello World
puts "Hello, World!"

# Basic method
def greet(name)
  "Hello, \#{name}!"
end

puts greet("World")`;
  } else if (key === 'go') {
    helloWorldExample = `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    
    // Basic function
    fmt.Println(greet("World"))
}

func greet(name string) string {
    return "Hello, " + name + "!"
}`;
  } else if (key === 'rust') {
    helloWorldExample = `fn main() {
    println!("Hello, World!");
    
    // Basic function
    println!("{}", greet("World"));
}

fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}`;
  } else if (key === 'swift') {
    helloWorldExample = `import Foundation

print("Hello, World!")

// Basic function
func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

print(greet(name: "World"))`;
  } else if (key === 'kotlin') {
    helloWorldExample = `fun main() {
    println("Hello, World!")
    
    // Basic function
    println(greet("World"))
}

fun greet(name: String): String {
    return "Hello, \$name!"
}`;
  } else if (key === 'dart' || key === 'flutter') {
    helloWorldExample = `void main() {
  print('Hello, World!');
  
  // Basic function
  print(greet('World'));
}

String greet(String name) {
  return 'Hello, \$name!';
}`;
  } else if (key === 'scala') {
    helloWorldExample = `object HelloWorld {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
    
    // Basic function
    println(greet("World"))
  }
  
  def greet(name: String): String = {
    s"Hello, \$name!"
  }
}`;
  } else if (key === 'r') {
    helloWorldExample = `# ${name} Hello World
print("Hello, World!")

# Basic function
greet <- function(name) {
  paste("Hello,", name, "!")
}

print(greet("World"))`;
  } else if (key === 'matlab') {
    helloWorldExample = `% ${name} Hello World
disp('Hello, World!')

% Basic function
function result = greet(name)
    result = sprintf('Hello, %s!', name);
end

disp(greet('World'))`;
  } else if (key === 'solidity') {
    helloWorldExample = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message = "Hello, World!";
    
    function greet(string memory name) public pure returns (string memory) {
        return string(abi.encodePacked("Hello, ", name, "!"));
    }
}`;
  } else if (key === 'postgresql' || key === 'mysql') {
    helloWorldExample = `-- ${name} Hello World
SELECT 'Hello, World!' AS message;

-- Basic query
SELECT 
    CONCAT('Hello, ', 'World') AS greeting,
    NOW() AS current_time;`;
  } else if (key === 'mongodb') {
    helloWorldExample = `// ${name} Hello World
db.messages.insertOne({
    message: "Hello, World!",
    timestamp: new Date()
});

// Basic query
db.messages.find({ message: "Hello, World!" });`;
  } else if (key === 'docker') {
    helloWorldExample = `# ${name} Hello World
# Dockerfile
FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

# Build and run
docker build -t hello-app .
docker run -p 3000:3000 hello-app`;
  } else if (key === 'aws' || key === 'azure' || key === 'googlecloud' || key === 'kubernetes' || key === 'devops') {
    helloWorldExample = `# ${name} Hello World
echo "Hello, World!"

# Basic commands
echo "Welcome to ${name}!"
date
pwd
ls -la`;
  }

  const template = `// ${name} language data for coding-jojo platform
export const ${key}Data = {
  description:
    "${description}",
  topics: [
    {
      id: "${key}-introduction",
      title: "${name} Introduction",
      content: \`
        <h2>What is ${name}?</h2>
        <p>${description}</p>
        <ul>
          <li>${name} is widely used in the industry</li>
          <li>${name} has a large community and ecosystem</li>
          <li>${name} offers powerful features and capabilities</li>
          <li>${name} is continuously evolving with new updates</li>
        </ul>
        
        <h3>${name} Features</h3>
        <p>${name} provides many features that make development efficient and enjoyable.</p>
      \`,
      codeExample: \`${helloWorldExample}\`,
      tryItCode: \`// Try ${name} here
${helloWorldExample.split('\n').slice(0, 5).join('\n')}

// Add your own code here\`,
      language: "${codeLanguage}",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "${key}-getting-started",
      title: "Getting Started with ${name}",
      content: \`
        <h2>Getting Started</h2>
        <p>Learn the basics of ${name} and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>${name} development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn ${name} syntax and concepts</li>
          <li>Build your first ${name} project</li>
          <li>Explore ${name} libraries and frameworks</li>
        </ul>
      \`,
      codeExample: \`${helloWorldExample}\`,
      tryItCode: \`// Practice ${name} basics
${helloWorldExample.split('\n').slice(0, 8).join('\n')}

// Try modifying this code\`,
      language: "${codeLanguage}",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default ${key}Data;`;

  return template;
}

// Generate files
const languagesDir = '/home/justice/Desktop/coding-jojo-app/coding-jojo-frontend/src/data/languages';

languages.forEach(language => {
  const template = generateLanguageTemplate(language);
  const filePath = path.join(languagesDir, `${language.key}.ts`);
  
  try {
    fs.writeFileSync(filePath, template);
    console.log(`Generated: ${language.key}.ts`);
  } catch (error) {
    console.error(`Error generating ${language.key}.ts:`, error.message);
  }
});

console.log('All language template files generated successfully!');
