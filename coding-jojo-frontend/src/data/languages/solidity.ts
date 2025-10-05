// Solidity language data for coding-jojo platform
export const solidityData = {
  description:
    "Solidity is an object-oriented programming language for writing smart contracts on various blockchain platforms.",
  topics: [
    {
      id: "solidity-introduction",
      title: "Solidity Introduction",
      content: `
        <h2>What is Solidity?</h2>
        <p>Solidity is an object-oriented programming language for writing smart contracts on various blockchain platforms.</p>
        <ul>
          <li>Solidity is widely used in the industry</li>
          <li>Solidity has a large community and ecosystem</li>
          <li>Solidity offers powerful features and capabilities</li>
          <li>Solidity is continuously evolving with new updates</li>
        </ul>
        
        <h3>Solidity Features</h3>
        <p>Solidity provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message = "Hello, World!";
    
    function greet(string memory name) public pure returns (string memory) {
        return string(abi.encodePacked("Hello, ", name, "!"));
    }
}`,
      tryItCode: `// Try Solidity here
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message = "Hello, World!";

// Add your own code here`,
      language: "solidity",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "solidity-getting-started",
      title: "Getting Started with Solidity",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of Solidity and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>Solidity development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn Solidity syntax and concepts</li>
          <li>Build your first Solidity project</li>
          <li>Explore Solidity libraries and frameworks</li>
        </ul>
      `,
      codeExample: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message = "Hello, World!";
    
    function greet(string memory name) public pure returns (string memory) {
        return string(abi.encodePacked("Hello, ", name, "!"));
    }
}`,
      tryItCode: `// Practice Solidity basics
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message = "Hello, World!";
    
    function greet(string memory name) public pure returns (string memory) {
        return string(abi.encodePacked("Hello, ", name, "!"));

// Try modifying this code`,
      language: "solidity",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default solidityData;