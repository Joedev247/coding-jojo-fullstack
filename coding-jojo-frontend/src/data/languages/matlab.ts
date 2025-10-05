// MATLAB language data for coding-jojo platform
export const matlabData = {
  description:
    "MATLAB is a programming language and platform for scientific computing, data analysis, and algorithm development.",
  topics: [
    {
      id: "matlab-introduction",
      title: "MATLAB Introduction",
      content: `
        <h2>What is MATLAB?</h2>
        <p>MATLAB is a programming language and platform for scientific computing, data analysis, and algorithm development.</p>
        <ul>
          <li>MATLAB is widely used in the industry</li>
          <li>MATLAB has a large community and ecosystem</li>
          <li>MATLAB offers powerful features and capabilities</li>
          <li>MATLAB is continuously evolving with new updates</li>
        </ul>
        
        <h3>MATLAB Features</h3>
        <p>MATLAB provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `% MATLAB Hello World
disp('Hello, World!')

% Basic function
function result = greet(name)
    result = sprintf('Hello, %s!', name);
end

disp(greet('World'))`,
      tryItCode: `// Try MATLAB here
% MATLAB Hello World
disp('Hello, World!')

% Basic function
function result = greet(name)

// Add your own code here`,
      language: "matlab",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "matlab-getting-started",
      title: "Getting Started with MATLAB",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of MATLAB and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>MATLAB development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn MATLAB syntax and concepts</li>
          <li>Build your first MATLAB project</li>
          <li>Explore MATLAB libraries and frameworks</li>
        </ul>
      `,
      codeExample: `% MATLAB Hello World
disp('Hello, World!')

% Basic function
function result = greet(name)
    result = sprintf('Hello, %s!', name);
end

disp(greet('World'))`,
      tryItCode: `// Practice MATLAB basics
% MATLAB Hello World
disp('Hello, World!')

% Basic function
function result = greet(name)
    result = sprintf('Hello, %s!', name);
end


// Try modifying this code`,
      language: "matlab",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default matlabData;