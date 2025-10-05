// JavaScript language data for coding-jojo platform
export const javascriptData = {
  description:
    "JavaScript is a programming language that allows you to implement complex features on web pages. It is an essential part of web applications.",
  topics: [
    {
      id: "js-introduction",
      title: "JavaScript Introduction",
      content: `
        <h2>What is JavaScript?</h2>
        <p>JavaScript is a programming language used to make web pages interactive and dynamic.</p>
        <ul>
          <li>JavaScript can update and change both HTML and CSS</li>
          <li>JavaScript can calculate, manipulate and validate data</li>
          <li>JavaScript is easy to learn and widely used</li>
        </ul>
        
        <h3>JavaScript in HTML</h3>
        <p>JavaScript code is placed between &lt;script&gt; and &lt;/script&gt; tags in an HTML document.</p>
      `,
      codeExample: `<!-- JavaScript in HTML -->
<!DOCTYPE html>
<html>
<head>
    <title>My First JavaScript</title>
</head>
<body>

<h1>My First Heading</h1>

<p id="demo">My first paragraph.</p>

<script>
document.getElementById("demo").innerHTML = "Hello JavaScript!";
</script>

</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Practice</title>
</head>
<body>
    <h1>Welcome to JavaScript Practice</h1>
    <p id="demo">This is a demo paragraph.</p>
    
    <script>
        // Change the content of the demo paragraph
        document.getElementById("demo").innerHTML = "JavaScript is fun!";
        
        // Display an alert box
        alert("Welcome to JavaScript practice!");
        
        // Log a message to the console
        console.log("JavaScript is running!");
    </script>
</body>
</html>`,
      language: "javascript",
      difficulty: "beginner" as const,
      estimatedTime: "5 min",
    },
    {
      id: "js-variables",
      title: "JavaScript Variables",
      content: `
        <h2>JavaScript Variables</h2>
        <p>Variables are used to store data values in JavaScript.</p>
        <p>In JavaScript, we use the <code>var</code>, <code>let</code>, and <code>const</code> keywords to declare variables.</p>
        
        <h3>Variable Types:</h3>
        <ul>
          <li><strong>String</strong> - Text values, e.g. <code>"Hello"</code></li>
          <li><strong>Number</strong> - Numeric values, e.g. <code>42</code></li>
          <li><strong>Boolean</strong> - True or false values</li>
          <li><strong>Object</strong> - Complex data structures</li>
          <li><strong>Array</strong> - Ordered lists of values</li>
        </ul>
      `,
      codeExample: `// Declaring variables
var name = "John";    // String variable
let age = 30;        // Number variable
const isStudent = true; // Boolean variable

// Displaying variable values
console.log(name);
console.log(age);
console.log(isStudent);

// Changing variable values
age = 31;
console.log(age);

// String concatenation
var greeting = "Hello, " + name;
console.log(greeting);

// Template literals
var message = \`Hello, \${name}. You are \${age} years old.\`;
console.log(message);`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Variables</title>
</head>
<body>
    <h1>JavaScript Variables Demo</h1>
    
    <script>
        // Declare a variable
        var myName = "Alice";
        
        // Display the variable value
        alert("Hello, " + myName + "!");
        
        // Change the variable value
        myName = "Bob";
        
        // Display the new value
        alert("Hello, " + myName + "!");
    </script>
</body>
</html>`,
      language: "javascript",
      difficulty: "beginner" as const,
      estimatedTime: "5 min",
    },
    // Additional JavaScript topics would continue here...
  ],
};

export default javascriptData;
