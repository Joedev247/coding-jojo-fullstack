// CSS language data for coding-jojo platform - Professional CSS Tutorial
export const cssData = {
  description:
    "CSS (Cascading Style Sheets) is the cornerstone of modern web design. Master the art of styling web pages with our comprehensive CSS tutorial that covers everything from basic syntax to advanced responsive design techniques.",
  topics: [
    {
      id: "css-introduction",
      title: "CSS Introduction",
      content: `
        <h2>What is CSS?</h2>
        <p>CSS stands for <strong>Cascading Style Sheets</strong>. It is the language used to describe the presentation of HTML documents, controlling layout, colors, fonts, spacing, and visual effects.</p>
        
        <h3>Why CSS Matters</h3>
        <ul>
          <li><strong>Separation of Concerns</strong> - Keeps content (HTML) separate from presentation (CSS)</li>
          <li><strong>Consistency</strong> - Apply uniform styling across multiple pages</li>
          <li><strong>Maintainability</strong> - Easy to update and modify designs</li>
          <li><strong>Performance</strong> - Reduces code redundancy and improves loading times</li>
        </ul>
        <h3>CSS Syntax Structure</h3>

        <p>A CSS rule consists of a <strong>selector</strong> and a <strong>declaration block</strong> containing property-value pairs.</p>
        
        <h3>CSS Integration Methods</h3>
        <ul>
          <li><strong>External</strong> - Link to separate .css files (recommended)</li>
          <li><strong>Internal</strong> - Use &lt;style&gt; tags in HTML head</li>
          <li><strong>Inline</strong> - Apply styles directly to elements</li>
        </ul>
      `,
      codeExample: `/* CSS Syntax Structure */
selector {
    property: value;
    property: value;
}

/* Element styling */
h1 {
    color: #2c3e50;
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
}

/* Class selector */
.highlight {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* ID selector */
#header {
    background-color: #f8f9fa;
    border-bottom: 3px solid #007bff;
    padding: 2rem 0;
}`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional CSS Introduction</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 1rem;
            font-size: 2.5rem;
        }
        
        .highlight {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
        }
        
        #special {
            border-left: 4px solid #007bff;
            padding-left: 1rem;
            color: #495057;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Professional CSS!</h1>
        <p class="highlight">This is a professionally styled highlight box.</p>
        <p id="special">This paragraph demonstrates modern CSS styling techniques.</p>
        <p>Edit the CSS above to experiment with different styles and effects.</p>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "beginner" as const,
      estimatedTime: "8 min",
    },
    {
      id: "css-syntax",
      title: "CSS Syntax",
      content: `
        <h2>CSS Syntax Deep Dive</h2>
        <p>Understanding CSS syntax is fundamental to writing effective stylesheets. Let's explore the anatomy of CSS rules and best practices.</p>
        
        <h3>CSS Rule Structure</h3>
        <ul>
          <li><strong>Selector</strong> - Targets HTML elements to style</li>
          <li><strong>Declaration Block</strong> - Contains style rules wrapped in curly braces</li>
          <li><strong>Property</strong> - The style attribute you want to change</li>
          <li><strong>Value</strong> - The setting for the property</li>
          <li><strong>Declaration</strong> - Property-value pair ending with semicolon</li>
        </ul>
        
        <h3>CSS Comments</h3>
        <p>Use comments to document your CSS and improve code maintainability.</p>
        
        <h3>Best Practices</h3>
        <ul>
          <li>Use consistent indentation (2 or 4 spaces)</li>
          <li>Group related properties together</li>
          <li>Use meaningful class and ID names</li>
          <li>End declarations with semicolons</li>
          <li>Use shorthand properties when possible</li>
        </ul>
      `,
      codeExample: `/* CSS Comment Syntax */
/* This is a single-line comment */

/*
 * This is a multi-line comment
 * Perfect for explaining complex styles
 */

/* Selector and Declaration Block */
.card {
    /* Typography */
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    
    /* Box Model */
    width: 300px;
    padding: 20px;
    margin: 10px auto;
    
    /* Visual */
    background-color: #ffffff;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    /* Transitions */
    transition: all 0.3s ease;
}

/* Pseudo-class example */
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Syntax Practice</title>
    <style>
        /* Global Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            padding: 20px;
        }
        
        /* Card Component */
        .card {
            /* Layout */
            max-width: 400px;
            margin: 20px auto;
            padding: 24px;
            
            /* Visual */
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
            
            /* Animation */
            transition: transform 0.2s ease;
        }
        
        .card:hover {
            transform: scale(1.02);
        }
        
        .card h2 {
            color: #343a40;
            margin-bottom: 12px;
        }
        
        .card p {
            color: #6c757d;
            line-height: 1.6;
        }
        
        /* Button Styles */
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background: linear-gradient(45deg, #007bff, #0056b3);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 16px;
            transition: background 0.3s ease;
        }
        
        .btn:hover {
            background: linear-gradient(45deg, #0056b3, #004085);
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>CSS Syntax Mastery</h2>
        <p>This card demonstrates proper CSS syntax structure, including comments, organization, and best practices for maintainable code.</p>
        <a href="#" class="btn">Learn More</a>
    </div>
    
    <div class="card">
        <h2>Practice Exercise</h2>
        <p>Try modifying the CSS above to create your own card variations. Experiment with colors, spacing, and hover effects.</p>
        <a href="#" class="btn">Get Started</a>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "beginner" as const,
      estimatedTime: "12 min",
    },
    {
      id: "css-selectors",
      title: "CSS Selectors",
      content: `
        <h2>CSS Selectors Mastery</h2>
        <p>CSS selectors are patterns used to select and style HTML elements. Mastering selectors is crucial for precise styling and efficient CSS architecture.</p>
        
        <h3>Basic Selectors</h3>
        <ul>
          <li><strong>Universal Selector (*)</strong> - Selects all elements</li>
          <li><strong>Type Selector</strong> - Selects elements by tag name</li>
          <li><strong>Class Selector (.class)</strong> - Selects elements with specific class</li>
          <li><strong>ID Selector (#id)</strong> - Selects element with specific ID</li>
          <li><strong>Attribute Selector</strong> - Selects elements with specific attributes</li>
        </ul>
        
        <h3>Combinator Selectors</h3>
        <ul>
          <li><strong>Descendant (space)</strong> - Selects nested elements</li>
          <li><strong>Child (>)</strong> - Selects direct children</li>
          <li><strong>Adjacent Sibling (+)</strong> - Selects immediate next sibling</li>
          <li><strong>General Sibling (~)</strong> - Selects all following siblings</li>
        </ul>
        
        <h3>Pseudo-classes and Pseudo-elements</h3>
        <ul>
          <li><strong>:hover, :focus, :active</strong> - Interactive states</li>
          <li><strong>:nth-child(), :first-child, :last-child</strong> - Positional selectors</li>
          <li><strong>::before, ::after</strong> - Generated content</li>
          <li><strong>::first-letter, ::first-line</strong> - Text formatting</li>
        </ul>
        
        <h3>Selector Specificity</h3>
        <p>Understanding specificity helps resolve conflicts when multiple rules target the same element.</p>
      `,
      codeExample: `/* Basic Selectors */
* { margin: 0; padding: 0; } /* Universal */
h1 { color: navy; } /* Type */
.highlight { background: yellow; } /* Class */
#header { font-size: 24px; } /* ID */
[type="text"] { border: 1px solid #ccc; } /* Attribute */

/* Combinator Selectors */
.container p { color: #666; } /* Descendant */
.menu > li { display: inline-block; } /* Child */
h1 + p { margin-top: 0; } /* Adjacent sibling */
h1 ~ p { color: #888; } /* General sibling */

/* Advanced Attribute Selectors */
[href^="https"] { color: green; } /* Starts with */
[href$=".pdf"] { font-weight: bold; } /* Ends with */
[class*="btn"] { padding: 10px; } /* Contains */

/* Pseudo-classes */
a:hover { color: red; }
input:focus { outline: 2px solid blue; }
li:nth-child(odd) { background: #f9f9f9; }
li:first-child { border-top: none; }
li:last-child { border-bottom: none; }

/* Pseudo-elements */
p::first-letter {
    font-size: 2em;
    font-weight: bold;
    color: #007bff;
}

.quote::before {
    content: """;
    font-size: 2em;
    color: #999;
}

.quote::after {
    content: """;
    font-size: 2em;
    color: #999;
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Selectors Demo</title>
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            padding: 20px;
            background: #f8f9fa;
        }
        
        /* Container styles */
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        /* Typography selectors */
        h1 {
            color: #2c3e50;
            margin-bottom: 20px;
            text-align: center;
        }
        
        /* Class selectors */
        .highlight {
            background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
            padding: 10px;
            border-radius: 8px;
            margin: 10px 0;
        }
        
        .success {
            color: #28a745;
            font-weight: bold;
        }
        
        /* ID selector */
        #special {
            border-left: 4px solid #007bff;
            padding-left: 15px;
            font-style: italic;
        }
        
        /* Attribute selectors */
        [data-status="active"] {
            background-color: #d4edda;
            padding: 5px;
            border-radius: 4px;
        }
        
        /* Combinator selectors */
        .menu li {
            list-style: none;
            display: inline-block;
            margin-right: 15px;
        }
        
        .menu > li > a {
            text-decoration: none;
            color: #495057;
            padding: 8px 12px;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        
        /* Pseudo-classes */
        .menu li a:hover {
            background-color: #e9ecef;
            color: #007bff;
        }
        
        .list-item:nth-child(even) {
            background-color: #f8f9fa;
        }
        
        .list-item:first-child {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        
        .list-item:last-child {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        
        /* Pseudo-elements */
        .quote {
            font-style: italic;
            position: relative;
            padding: 20px;
            margin: 20px 0;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .quote::before {
            content: '"';
            position: absolute;
            top: -10px;
            left: 10px;
            font-size: 3em;
            color: #007bff;
            line-height: 1;
        }
        
        .quote::after {
            content: '"';
            position: absolute;
            bottom: -30px;
            right: 10px;
            font-size: 3em;
            color: #007bff;
            line-height: 1;
        }
        
        /* List styles */
        .styled-list {
            margin: 20px 0;
        }
        
        .list-item {
            padding: 12px;
            margin: 2px 0;
            border: 1px solid #dee2e6;
            transition: all 0.3s ease;
        }
        
        .list-item:hover {
            background-color: #e7f3ff;
            border-color: #007bff;
            transform: translateX(5px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>CSS Selectors Showcase</h1>
        
        <p class="highlight">This paragraph uses a class selector with gradient background.</p>
        
        <p id="special">This paragraph is styled with an ID selector.</p>
        
        <p class="success" data-status="active">This paragraph combines class and attribute selectors.</p>
        
        <ul class="menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        
        <div class="quote">
            CSS selectors are the foundation of styling. Master them to write more efficient and maintainable stylesheets.
        </div>
        
        <ul class="styled-list">
            <li class="list-item">First item - notice the rounded top corners</li>
            <li class="list-item">Second item - has even background color</li>
            <li class="list-item">Third item - hover to see transform effect</li>
            <li class="list-item">Fourth item - even background again</li>
            <li class="list-item">Last item - notice the rounded bottom corners</li>
        </ul>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "15 min",
    },
    {
      id: "css-how-to",
      title: "CSS How To",
      content: `
        <h2>How to Add CSS to HTML</h2>
        <p>There are three methods to integrate CSS with HTML documents. Each method has its use cases and best practices.</p>
        
        <h3>1. External CSS (Recommended)</h3>
        <p>Link to external .css files using the &lt;link&gt; tag in the HTML head section.</p>
        <ul>
          <li><strong>Advantages:</strong> Reusable, cacheable, better organization</li>
          <li><strong>Best for:</strong> Production websites, multiple pages</li>
        </ul>
        
        <h3>2. Internal CSS</h3>
        <p>Embed CSS directly in HTML using &lt;style&gt; tags in the head section.</p>
        <ul>
          <li><strong>Advantages:</strong> All code in one file, faster for single pages</li>
          <li><strong>Best for:</strong> Single-page applications, prototyping</li>
        </ul>
        
        <h3>3. Inline CSS</h3>
        <p>Apply styles directly to elements using the style attribute.</p>
        <ul>
          <li><strong>Advantages:</strong> Highest specificity, quick fixes</li>
          <li><strong>Best for:</strong> Dynamic styles, email templates, testing</li>
        </ul>
        
        <h3>CSS Loading Best Practices</h3>
        <ul>
          <li>Place CSS in the &lt;head&gt; to prevent FOUC (Flash of Unstyled Content)</li>
          <li>Use external files for better caching and performance</li>
          <li>Minimize CSS files for production</li>
          <li>Consider critical CSS for above-the-fold content</li>
        </ul>
      `,
      codeExample: `<!-- External CSS -->
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
    <!-- Multiple stylesheets -->
    <link rel="stylesheet" href="reset.css">
    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="responsive.css">
</head>
<body>
    <h1>Styled with External CSS</h1>
</body>
</html>

/* styles.css file */
body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 20px;
}

h1 {
    color: white;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

/* Internal CSS */
<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        
        .card h2 {
            color: #2c3e50;
            margin-bottom: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h2>Internal CSS Example</h2>
            <p>This content is styled with internal CSS.</p>
        </div>
    </div>
</body>
</html>

<!-- Inline CSS -->
<div style="
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
">
    <h2 style="margin: 0 0 10px 0; font-size: 1.5rem;">Inline Styled Element</h2>
    <p style="margin: 0; opacity: 0.9;">This element uses inline CSS for styling.</p>
</div>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Integration Methods</title>
    
    <!-- Internal CSS -->
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        
        /* Header styles */
        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }
        
        .header h1 {
            font-size: 3rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        /* Card grid */
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        /* Internal CSS styled card */
        .card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        .card h3 {
            color: #2c3e50;
            margin-bottom: 16px;
            font-size: 1.3rem;
        }
        
        .card p {
            color: #6c757d;
            line-height: 1.6;
            margin-bottom: 16px;
        }
        
        .badge {
            display: inline-block;
            background: linear-gradient(45deg, #007bff, #0056b3);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        /* External CSS simulation */
        .external-example {
            background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
            color: #2c3e50;
        }
        
        .external-example .badge {
            background: linear-gradient(45deg, #28a745, #20c997);
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .card-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>CSS Integration Methods</h1>
            <p>Discover the three ways to add CSS to your HTML documents</p>
        </header>
        
        <div class="card-grid">
            <!-- Internal CSS Example (styled above) -->
            <div class="card">
                <h3>Internal CSS</h3>
                <p>This card is styled using internal CSS defined in the &lt;style&gt; tag within the HTML document head.</p>
                <span class="badge">Internal</span>
            </div>
            
            <!-- External CSS Example (simulated) -->
            <div class="card external-example">
                <h3>External CSS</h3>
                <p>This card simulates external CSS styling. In real projects, styles would be in separate .css files linked via &lt;link&gt; tags.</p>
                <span class="badge">External</span>
            </div>
            
            <!-- Inline CSS Example -->
            <div class="card" style="
                background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
                color: white;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            ">
                <h3 style="color: white; margin-bottom: 16px;">Inline CSS</h3>
                <p style="color: rgba(255,255,255,0.9); margin-bottom: 16px;">This card uses inline CSS with the style attribute for direct element styling.</p>
                <span style="
                    display: inline-block;
                    background: rgba(255,255,255,0.2);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    backdrop-filter: blur(10px);
                ">Inline</span>
            </div>
        </div>
        
        <div class="card">
            <h3>Best Practices Summary</h3>
            <p><strong>External CSS:</strong> Best for production websites, better caching, easier maintenance.</p>
            <p><strong>Internal CSS:</strong> Good for single pages, prototypes, or when external files aren't practical.</p>
            <p><strong>Inline CSS:</strong> Use sparingly for dynamic styles, quick fixes, or when highest specificity is needed.</p>
            <span class="badge">Pro Tips</span>
        </div>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "css-comments",
      title: "CSS Comments",
      content: `
        <h2>CSS Comments Best Practices</h2>
        <p>CSS comments are essential for creating maintainable, well-documented stylesheets. They help explain complex code, organize sections, and facilitate team collaboration.</p>
        
        <h3>Comment Syntax</h3>
        <p>CSS uses block comments with <code>/* */</code> syntax. Unlike HTML or JavaScript, CSS doesn't support single-line comments.</p>
        
        <h3>Types of CSS Comments</h3>
        <ul>
          <li><strong>Section Headers</strong> - Organize major style sections</li>
          <li><strong>Explanatory Comments</strong> - Explain complex or non-obvious code</li>
          <li><strong>TODO Comments</strong> - Mark future improvements or fixes</li>
          <li><strong>Temporary Comments</strong> - Comment out code for testing</li>
          <li><strong>Documentation Comments</strong> - Describe component usage</li>
        </ul>
        
        <h3>Comment Best Practices</h3>
        <ul>
          <li>Use consistent comment formatting across your project</li>
          <li>Explain the "why" not just the "what"</li>
          <li>Keep comments up-to-date with code changes</li>
          <li>Use comments to separate logical sections</li>
          <li>Document browser-specific hacks or workarounds</li>
          <li>Include author information for complex sections</li>
        </ul>
        
        <h3>CSS Documentation Structure</h3>
        <p>Organize your CSS with a clear structure using comments to create sections for base styles, components, utilities, and responsive design.</p>
      `,
      codeExample: `/*
===============================================
MAIN STYLESHEET - PROJECT NAME v2.1
===============================================
Author: Your Name
Created: 2024-01-15
Last Modified: 2024-08-01
Description: Main stylesheet for responsive website
===============================================
*/

/* 
===================
TABLE OF CONTENTS
===================
1. CSS Reset & Base Styles
2. Typography
3. Layout & Grid
4. Components
   4.1 Navigation
   4.2 Cards
   4.3 Buttons
5. Utilities
6. Media Queries
=================== 
*/

/* ===== 1. CSS RESET & BASE STYLES ===== */
/* Modern CSS reset for consistent cross-browser rendering */
*,
*::before,
*::after {
    box-sizing: border-box; /* Include padding and border in element width */
}

/* Remove default margins for better control */
body, h1, h2, h3, h4, p, ul, ol, li {
    margin: 0;
}

/* ===== 2. TYPOGRAPHY ===== */
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6; /* Improves readability */
    color: #333333;
}

/* 
Fluid typography using clamp() for responsive text
Scales between 1rem and 1.25rem based on viewport width
*/
h1 {
    font-size: clamp(1.75rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.2;
}

/* ===== 4. COMPONENTS ===== */

/* 4.1 Navigation Component */
.navbar {
    /* 
    Sticky navigation with backdrop blur
    Note: backdrop-filter may need prefixes for older browsers
    */
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* Safari support */
    z-index: 1000; /* Ensure nav stays above other content */
}

/* 4.2 Card Component */
.card {
    /* 
    Modern card design with subtle shadow
    Using custom properties for easy theming
    */
    --card-padding: 1.5rem;
    --card-radius: 12px;
    --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    background: white;
    padding: var(--card-padding);
    border-radius: var(--card-radius);
    box-shadow: var(--card-shadow);
    
    /* Smooth hover transition */
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
    transform: translateY(-2px); /* Subtle lift effect */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* 4.3 Button Component */
.btn {
    /* 
    Accessible button with focus states
    Follows WCAG guidelines for color contrast
    */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    
    /* Typography */
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    
    /* Visual design */
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    
    /* Smooth transitions */
    transition: all 0.2s ease;
}

/* Focus state for accessibility */
.btn:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}

/* ===== 5. UTILITIES ===== */
/* Quick utility classes for common styling needs */

/* Spacing utilities */
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 1rem; }
/* Add more as needed */

/* Display utilities */
.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }

/* TODO: Add dark mode support */
/* TODO: Optimize for print styles */
/* TODO: Add high contrast mode support */

/* ===== 6. MEDIA QUERIES ===== */
/* 
Mobile-first responsive design
Breakpoints based on content, not devices
*/

/* Tablet and up */
@media (min-width: 768px) {
    .container {
        max-width: 750px;
    }
    
    /* Adjust navigation for larger screens */
    .navbar {
        padding: 1rem 2rem;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
    }
    
    /* Enable grid layouts on larger screens */
    .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    /* Optimize images and fine details for retina displays */
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    /* Disable animations for users who prefer reduced motion */
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Comments Best Practices</title>
    <style>
        /*
        ===============================================
        CSS COMMENTS DEMONSTRATION STYLESHEET
        ===============================================
        Purpose: Show different types of CSS comments
        and their practical applications
        ===============================================
        */
        
        /* ===== RESET & BASE STYLES ===== */
        /* Remove browser defaults for consistent styling */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        /* ===== LAYOUT CONTAINER ===== */
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        /* ===== HEADER SECTION ===== */
        .header {
            /* 
            Gradient background with overlay text
            Using backdrop for better text readability
            */
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            /* 
            Decorative overlay for visual interest
            Creates subtle texture over gradient background
            */
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            pointer-events: none;
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            position: relative; /* Ensure text appears above overlay */
            z-index: 1;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        /* ===== CONTENT SECTIONS ===== */
        .content {
            padding: 2rem;
        }
        
        /* Comment types demonstration grid */
        .comment-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        /* ===== COMMENT TYPE CARDS ===== */
        .comment-card {
            /* 
            Reusable card component for showcasing different comment types
            Includes hover effects and smooth transitions
            */
            background: #f8f9fa;
            border-radius: 12px;
            padding: 1.5rem;
            border-left: 4px solid #007bff;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .comment-card:hover {
            /* Subtle lift effect on hover */
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            background: white;
        }
        
        /* Different card types with color coding */
        .comment-card.section { border-left-color: #28a745; }
        .comment-card.explanation { border-left-color: #ffc107; }
        .comment-card.todo { border-left-color: #dc3545; }
        .comment-card.documentation { border-left-color: #6f42c1; }
        
        .comment-card h3 {
            color: #2c3e50;
            margin-bottom: 0.75rem;
            font-size: 1.2rem;
        }
        
        .comment-card p {
            color: #6c757d;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        /* Code examples within cards */
        .code-example {
            background: #2d3748;
            color: #e2e8f0;
            padding: 1rem;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            overflow-x: auto;
            margin-bottom: 1rem;
        }
        
        /* Syntax highlighting for comments */
        .comment {
            color: #68d391;
            font-style: italic;
        }
        
        /* ===== BEST PRACTICES SECTION ===== */
        .best-practices {
            background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
            padding: 2rem;
            border-radius: 12px;
            margin-top: 2rem;
        }
        
        .best-practices h3 {
            color: #1565c0;
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .best-practices ul {
            list-style: none;
            padding: 0;
        }
        
        .best-practices li {
            /* 
            Custom bullet points using pseudo-elements
            Creates consistent visual hierarchy
            */
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.5rem;
            color: #424242;
        }
        
        .best-practices li::before {
            /* Custom checkmark bullet */
            content: '✓';
            position: absolute;
            left: 0;
            color: #4caf50;
            font-weight: bold;
        }
        
        /* ===== RESPONSIVE DESIGN ===== */
        /* Mobile adjustments for better readability */
        @media (max-width: 768px) {
            .header {
                padding: 2rem 1rem;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .content {
                padding: 1.5rem;
            }
            
            .comment-grid {
                /* Single column on mobile */
                grid-template-columns: 1fr;
                gap: 1rem;
            }
        }
        
        /* ===== PRINT STYLES ===== */
        /* Optimized styles for printing */
        @media print {
            body {
                background: white;
                font-size: 12pt;
            }
            
            .header {
                background: #f8f9fa !important;
                color: black !important;
                padding: 1rem;
            }
            
            .comment-card {
                /* Prevent cards from breaking across pages */
                break-inside: avoid;
                box-shadow: none;
                border: 1px solid #dee2e6;
            }
        }
        
        /*
        TODO: Add more interactive examples
        TODO: Include CSS preprocessor comment examples
        TODO: Add section on removing comments for production
        
        NOTE: This stylesheet demonstrates various comment types
        and best practices for CSS documentation.
        
        AUTHOR: CSS Tutorial Team
        VERSION: 1.0
        LAST UPDATED: 2024-08-01
        */
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>CSS Comments Mastery</h1>
            <p>Learn how to write professional, maintainable CSS with proper commenting techniques</p>
        </header>
        
        <main class="content">
            <div class="comment-grid">
                <div class="comment-card section">
                    <h3>Section Headers</h3>
                    <p>Organize your CSS into logical sections with clear headers.</p>
                    <div class="code-example">
<span class="comment">/* ===== NAVIGATION STYLES ===== */</span>
.navbar {
    background: white;
    padding: 1rem;
}
                    </div>
                </div>
                
                <div class="comment-card explanation">
                    <h3>Explanatory Comments</h3>
                    <p>Explain complex code, browser hacks, or design decisions.</p>
                    <div class="code-example">
<span class="comment">/* 
Fix for IE11 flexbox min-height bug
Ensures proper flex item sizing
*/</span>
.flex-item {
    min-height: 1px;
}
                    </div>
                </div>
                
                <div class="comment-card todo">
                    <h3>TODO Comments</h3>
                    <p>Mark areas that need future improvements or fixes.</p>
                    <div class="code-example">
<span class="comment">/* TODO: Optimize for mobile devices */</span>
<span class="comment">/* FIXME: Color contrast too low */</span>
.button {
    background: #ccc;
}
                    </div>
                </div>
                
                <div class="comment-card documentation">
                    <h3>Documentation Comments</h3>
                    <p>Document component usage, parameters, and examples.</p>
                    <div class="code-example">
<span class="comment">/*
Card Component
Usage: .card [.card--large] [.card--featured]
Example: &lt;div class="card card--large"&gt;...
*/</span>
.card {
    padding: 1rem;
}
                    </div>
                </div>
            </div>
            
            <div class="best-practices">
                <h3>CSS Commenting Best Practices</h3>
                <ul>
                    <li>Use consistent formatting across your project</li>
                    <li>Explain the "why" behind your code, not just the "what"</li>
                    <li>Keep comments up-to-date with code changes</li>
                    <li>Use section headers to organize large stylesheets</li>
                    <li>Document browser-specific hacks and workarounds</li>
                    <li>Include author information for team projects</li>
                    <li>Remove comments in production builds for smaller file sizes</li>
                    <li>Use tools like stylelint to enforce comment standards</li>
                </ul>
            </div>
        </main>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "beginner" as const,
      estimatedTime: "12 min",
    },
    {
      id: "css-colors",
      title: "CSS Colors",
      content: `
        <h2>CSS Colors Mastery</h2>
        <p>Colors are fundamental to web design. CSS provides multiple ways to define colors, from simple keywords to advanced color functions and custom properties.</p>
        
        <h3>Color Value Types</h3>
        <ul>
          <li><strong>Color Keywords</strong> - Named colors like red, blue, transparent</li>
          <li><strong>Hexadecimal (#)</strong> - Six-digit hex codes (#FF5733, #333)</li>
          <li><strong>RGB/RGBA</strong> - Red, Green, Blue with optional Alpha</li>
          <li><strong>HSL/HSLA</strong> - Hue, Saturation, Lightness with optional Alpha</li>
          <li><strong>CSS Color Functions</strong> - Modern color manipulation functions</li>
        </ul>
        
        <h3>Color Properties</h3>
        <ul>
          <li><strong>color</strong> - Text color</li>
          <li><strong>background-color</strong> - Background color</li>
          <li><strong>border-color</strong> - Border color</li>
          <li><strong>outline-color</strong> - Outline color</li>
          <li><strong>box-shadow</strong> - Shadow colors</li>
        </ul>
        
        <h3>Advanced Color Techniques</h3>
        <ul>
          <li>Color gradients and transitions</li>
          <li>CSS custom properties for color theming</li>
          <li>Color accessibility and contrast</li>
          <li>Modern color spaces and functions</li>
        </ul>
      `,
      codeExample: `/* Color Keywords */
.primary { color: blue; }
.danger { color: red; }
.transparent { background-color: transparent; }

/* Hexadecimal Colors */
.header { 
    background-color: #2c3e50; /* Dark blue-gray */
    color: #ecf0f1; /* Light gray */
}
.accent { border-color: #e74c3c; } /* Red */
.subtle { color: #95a5a6; } /* Gray */

/* RGB and RGBA */
.rgb-example {
    background-color: rgb(52, 152, 219); /* Blue */
    color: rgb(255, 255, 255); /* White */
}
.rgba-example {
    background-color: rgba(231, 76, 60, 0.8); /* Semi-transparent red */
    backdrop-filter: blur(10px);
}

/* HSL and HSLA */
.hsl-primary {
    background-color: hsl(204, 70%, 53%); /* Blue */
}
.hsl-secondary {
    background-color: hsl(348, 80%, 50%); /* Red */
}
.hsl-alpha {
    background-color: hsla(120, 50%, 50%, 0.3); /* Semi-transparent green */
}

/* Modern Color Functions */
.modern-colors {
    /* Color mixing */
    background: color-mix(in srgb, #ff0000 50%, #0000ff);
    
    /* Relative colors */
    --primary: #3498db;
    --primary-light: color(from var(--primary) srgb r g b / 0.7);
    
    /* LCH color space */
    color: lch(50% 30 270); /* Purple in LCH */
}

/* CSS Custom Properties for Theming */
:root {
    /* Light theme */
    --color-primary: #3498db;
    --color-secondary: #2ecc71;
    --color-accent: #e74c3c;
    --color-text: #2c3e50;
    --color-background: #ffffff;
    --color-surface: #f8f9fa;
}

[data-theme="dark"] {
    /* Dark theme */
    --color-primary: #5dade2;
    --color-secondary: #58d68d;
    --color-accent: #ec7063;
    --color-text: #ecf0f1;
    --color-background: #1a1a1a;
    --color-surface: #2c2c2c;
}

/* Using custom properties */
.card {
    background-color: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-primary);
}

/* Gradient Examples */
.gradient-linear {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

.gradient-radial {
    background: radial-gradient(circle at center, #667eea 0%, #764ba2 100%);
}

.gradient-conic {
    background: conic-gradient(from 0deg, #ff0000, #00ff00, #0000ff, #ff0000);
}`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Colors Showcase</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        /* CSS Custom Properties for Color Theming */
        :root {
            --primary: #3498db;
            --secondary: #2ecc71;
            --accent: #e74c3c;
            --warning: #f39c12;
            --text-dark: #2c3e50;
            --text-light: #ecf0f1;
            --bg-light: #ffffff;
            --bg-surface: #f8f9fa;
            --shadow: rgba(0, 0, 0, 0.1);
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            color: var(--text-dark);
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: var(--bg-light);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px var(--shadow);
        }
        
        .header {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--text-light);
            padding: 3rem 2rem;
            text-align: center;
            position: relative;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .content {
            padding: 2rem;
        }
        
        /* Color Demo Grid */
        .color-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .color-card {
            background: var(--bg-surface);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px var(--shadow);
            transition: transform 0.3s ease;
        }
        
        .color-card:hover {
            transform: translateY(-5px);
        }
        
        .color-preview {
            height: 100px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        
        /* Different color examples */
        .hex-example { background-color: #e74c3c; }
        .rgb-example { background-color: rgb(52, 152, 219); }
        .rgba-example { background-color: rgba(46, 204, 113, 0.8); }
        .hsl-example { background-color: hsl(39, 85%, 51%); }
        .hsla-example { background-color: hsla(291, 64%, 42%, 0.9); }
        .gradient-example { 
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4); 
        }
        
        .color-info {
            padding: 1rem;
        }
        
        .color-info h3 {
            color: var(--text-dark);
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }
        
        .color-code {
            background: #2d3748;
            color: #e2e8f0;
            padding: 0.5rem;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            margin: 0.5rem 0;
        }
        
        /* Interactive Color Palette */
        .palette-section {
            margin-top: 2rem;
            padding: 2rem;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 12px;
            color: white;
        }
        
        .palette-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .palette-color {
            height: 80px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .palette-color:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        
        /* Predefined color palette */
        .red { background-color: #e74c3c; }
        .orange { background-color: #f39c12; }
        .yellow { background-color: #f1c40f; }
        .green { background-color: #2ecc71; }
        .blue { background-color: #3498db; }
        .purple { background-color: #9b59b6; }
        .pink { background-color: #e91e63; }
        .teal { background-color: #1abc9c; }
        
        /* Theme Toggle Example */
        .theme-toggle {
            margin-top: 2rem;
            text-align: center;
        }
        
        .toggle-btn {
            background: var(--accent);
            color: var(--text-light);
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .toggle-btn:hover {
            background: color-mix(in srgb, var(--accent) 80%, black);
            transform: translateY(-2px);
        }
        
        /* Accessibility contrast examples */
        .contrast-examples {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .good-contrast {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
        }
        
        .poor-contrast {
            background: #bdc3c7;
            color: #ecf0f1;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .color-grid {
                grid-template-columns: 1fr;
            }
            
            .palette-grid {
                grid-template-columns: repeat(4, 1fr);
            }
            
            .contrast-examples {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>CSS Colors Mastery</h1>
            <p>Explore the complete spectrum of CSS color techniques and best practices</p>
        </header>
        
        <main class="content">
            <div class="color-grid">
                <div class="color-card">
                    <div class="color-preview hex-example">HEX</div>
                    <div class="color-info">
                        <h3>Hexadecimal</h3>
                        <div class="color-code">#e74c3c</div>
                        <p>Most common format, uses 6-digit hex notation.</p>
                    </div>
                </div>
                
                <div class="color-card">
                    <div class="color-preview rgb-example">RGB</div>
                    <div class="color-info">
                        <h3>RGB Values</h3>
                        <div class="color-code">rgb(52, 152, 219)</div>
                        <p>Red, Green, Blue values from 0-255.</p>
                    </div>
                </div>
                
                <div class="color-card">
                    <div class="color-preview rgba-example">RGBA</div>
                    <div class="color-info">
                        <h3>RGBA with Alpha</h3>
                        <div class="color-code">rgba(46, 204, 113, 0.8)</div>
                        <p>RGB with alpha transparency (0-1).</p>
                    </div>
                </div>
                
                <div class="color-card">
                    <div class="color-preview hsl-example">HSL</div>
                    <div class="color-info">
                        <h3>HSL Values</h3>
                        <div class="color-code">hsl(39, 85%, 51%)</div>
                        <p>Hue, Saturation, Lightness format.</p>
                    </div>
                </div>
                
                <div class="color-card">
                    <div class="color-preview hsla-example">HSLA</div>
                    <div class="color-info">
                        <h3>HSLA with Alpha</h3>
                        <div class="color-code">hsla(291, 64%, 42%, 0.9)</div>
                        <p>HSL with alpha transparency.</p>
                    </div>
                </div>
                
                <div class="color-card">
                    <div class="color-preview gradient-example">Gradient</div>
                    <div class="color-info">
                        <h3>Linear Gradient</h3>
                        <div class="color-code">linear-gradient(45deg, #ff6b6b, #4ecdc4)</div>
                        <p>Smooth color transitions.</p>
                    </div>
                </div>
            </div>
            
            <div class="palette-section">
                <h2>Interactive Color Palette</h2>
                <p>Click on any color to see its details</p>
                <div class="palette-grid">
                    <div class="palette-color red">Red</div>
                    <div class="palette-color orange">Orange</div>
                    <div class="palette-color yellow">Yellow</div>
                    <div class="palette-color green">Green</div>
                    <div class="palette-color blue">Blue</div>
                    <div class="palette-color purple">Purple</div>
                    <div class="palette-color pink">Pink</div>
                    <div class="palette-color teal">Teal</div>
                </div>
            </div>
            
            <div class="contrast-examples">
                <div class="good-contrast">
                    <h3>Good Contrast</h3>
                    <p>This text is easily readable with proper contrast ratio (7:1)</p>
                </div>
                <div class="poor-contrast">
                    <h3>Poor Contrast</h3>
                    <p>This text is hard to read due to low contrast ratio (2:1)</p>
                </div>
            </div>
            
            <div class="theme-toggle">
                <button class="toggle-btn" onclick="document.body.style.filter = document.body.style.filter ? '' : 'invert(1) hue-rotate(180deg)'">
                    Toggle Dark Mode
                </button>
            </div>
        </main>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
    {
      id: "css-backgrounds",
      title: "CSS Backgrounds",
      content: `
        <h2>CSS Backgrounds Mastery</h2>
        <p>Backgrounds are crucial for creating visually appealing web designs. CSS provides extensive background properties for colors, images, gradients, and advanced effects.</p>
        
        <h3>Background Properties</h3>
        <ul>
          <li><strong>background-color</strong> - Solid background colors</li>
          <li><strong>background-image</strong> - Background images and gradients</li>
          <li><strong>background-repeat</strong> - How background images repeat</li>
          <li><strong>background-position</strong> - Background image positioning</li>
          <li><strong>background-size</strong> - Background image sizing</li>
          <li><strong>background-attachment</strong> - Scroll behavior</li>
          <li><strong>background-clip</strong> - Background painting area</li>
          <li><strong>background-origin</strong> - Background positioning area</li>
        </ul>
        
        <h3>Modern Background Techniques</h3>
        <ul>
          <li>Multiple background layers</li>
          <li>CSS gradients (linear, radial, conic)</li>
          <li>Background blend modes</li>
          <li>Responsive background images</li>
          <li>CSS patterns and textures</li>
        </ul>
        
        <h3>Background Best Practices</h3>
        <ul>
          <li>Optimize background images for performance</li>
          <li>Use appropriate image formats (WebP, AVIF)</li>
          <li>Implement fallbacks for older browsers</li>
          <li>Consider accessibility and contrast</li>
        </ul>
      `,
      codeExample: `/* Basic Background Properties */
.solid-background {
    background-color: #3498db;
}

.image-background {
    background-image: url('background.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

/* Background Shorthand */
.shorthand-bg {
    background: #f0f0f0 url('pattern.png') repeat-x center top;
}

/* Linear Gradients */
.gradient-linear {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

.gradient-multiple-stops {
    background: linear-gradient(
        135deg,
        #667eea 0%,
        #764ba2 25%,
        #f093fb 50%,
        #f5576c 75%,
        #4facfe 100%
    );
}

/* Radial Gradients */
.gradient-radial {
    background: radial-gradient(
        circle at center,
        #ff9a56 0%,
        #ff6b95 50%,
        #c44569 100%
    );
}

.gradient-ellipse {
    background: radial-gradient(
        ellipse at top left,
        #f093fb 0%,
        #f5576c 100%
    );
}

/* Conic Gradients */
.gradient-conic {
    background: conic-gradient(
        from 0deg at 50% 50%,
        #ff0000 0deg,
        #ff8000 60deg,
        #ffff00 120deg,
        #80ff00 180deg,
        #00ff80 240deg,
        #0080ff 300deg,
        #ff0000 360deg
    );
}

/* Multiple Backgrounds */
.multiple-backgrounds {
    background:
        linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%),
        radial-gradient(circle at top right, rgba(255,107,107,0.3) 0%, transparent 50%),
        linear-gradient(45deg, #667eea 0%, #764ba2 100%);
}

/* Background Size Examples */
.bg-cover {
    background-image: url('hero-image.jpg');
    background-size: cover; /* Covers entire container */
    background-position: center;
    background-repeat: no-repeat;
}

.bg-contain {
    background-image: url('logo.svg');
    background-size: contain; /* Fits within container */
    background-repeat: no-repeat;
    background-position: center;
}

.bg-custom-size {
    background-image: url('pattern.png');
    background-size: 200px 150px; /* Custom dimensions */
    background-repeat: repeat;
}

/* Background Attachment */
.parallax-background {
    background-image: url('parallax-bg.jpg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}

/* Background Clip and Origin */
.clip-text {
    font-size: 4rem;
    font-weight: bold;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.clip-padding {
    background-color: #3498db;
    background-clip: padding-box;
    border: 10px dashed rgba(0,0,0,0.3);
    padding: 20px;
}

/* Blend Modes */
.blend-mode-example {
    background: 
        url('texture.jpg'),
        linear-gradient(45deg, #ff6b6b, #4ecdc4);
    background-blend-mode: multiply;
}

/* Responsive Backgrounds */
.responsive-hero {
    background-image: url('hero-mobile.jpg');
    background-size: cover;
    background-position: center;
    min-height: 50vh;
}

@media (min-width: 768px) {
    .responsive-hero {
        background-image: url('hero-tablet.jpg');
        min-height: 60vh;
    }
}

@media (min-width: 1200px) {
    .responsive-hero {
        background-image: url('hero-desktop.jpg');
        min-height: 80vh;
    }
}

/* CSS Patterns */
.dots-pattern {
    background-image: radial-gradient(circle, #333 1px, transparent 1px);
    background-size: 20px 20px;
}

.stripes-pattern {
    background: repeating-linear-gradient(
        45deg,
        #f0f0f0,
        #f0f0f0 10px,
        #e0e0e0 10px,
        #e0e0e0 20px
    );
}

.checkerboard-pattern {
    background-image:
        linear-gradient(45deg, #black 25%, transparent 25%),
        linear-gradient(-45deg, #black 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #black 75%),
        linear-gradient(-45deg, transparent 75%, #black 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Backgrounds Showcase</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
        }
        
        /* Hero Section with Gradient Background */
        .hero {
            height: 100vh;
            background: linear-gradient(
                135deg,
                #667eea 0%,
                #764ba2 25%,
                #f093fb 50%,
                #f5576c 75%,
                #4facfe 100%
            );
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
            pointer-events: none;
        }
        
        .hero-content {
            position: relative;
            z-index: 1;
        }
        
        .hero h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .hero p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        /* Background Examples Grid */
        .examples-container {
            padding: 4rem 2rem;
            background: #f8f9fa;
        }
        
        .examples-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .bg-example {
            height: 250px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: transform 0.3s ease;
        }
        
        .bg-example:hover {
            transform: translateY(-5px);
        }
        
        .bg-example-label {
            position: absolute;
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
            background: rgba(0,0,0,0.7);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            backdrop-filter: blur(10px);
        }
        
        /* Different Background Examples */
        .linear-gradient {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        }
        
        .radial-gradient {
            background: radial-gradient(circle at center, #ff9a56 0%, #ff6b95 50%, #c44569 100%);
        }
        
        .conic-gradient {
            background: conic-gradient(
                from 0deg,
                #ff0000 0deg,
                #ff8000 60deg,
                #ffff00 120deg,
                #80ff00 180deg,
                #00ff80 240deg,
                #0080ff 300deg,
                #ff0000 360deg
            );
        }
        
        .multiple-backgrounds {
            background:
                linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%),
                radial-gradient(circle at top right, rgba(255,107,107,0.3) 0%, transparent 50%),
                linear-gradient(45deg, #667eea 0%, #764ba2 100%);
        }
        
        .dots-pattern {
            background: 
                radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px),
                linear-gradient(135deg, #6c5ce7, #a29bfe);
            background-size: 20px 20px, 100% 100%;
        }
        
        .stripes-pattern {
            background: 
                repeating-linear-gradient(
                    45deg,
                    rgba(255,255,255,0.1),
                    rgba(255,255,255,0.1) 10px,
                    transparent 10px,
                    transparent 20px
                ),
                linear-gradient(135deg, #fd79a8, #fdcb6e);
        }
        
        /* Text with Background Clip */
        .gradient-text-section {
            padding: 4rem 2rem;
            background: #2c3e50;
            text-align: center;
        }
        
        .gradient-text {
            font-size: 4rem;
            font-weight: 900;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
            background-size: 300% 300%;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            animation: gradientShift 3s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        /* Parallax Section */
        .parallax-section {
            height: 60vh;
            background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
                             url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="%23667eea" points="0,1000 1000,1000 1000,0"/><polygon fill="%23764ba2" points="0,1000 1000,800 1000,1000"/><polygon fill="%23f093fb" points="0,1000 1000,600 1000,1000"/></svg>');
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
        }
        
        .parallax-content h2 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        /* Blend Mode Examples */
        .blend-section {
            padding: 4rem 2rem;
            background: #34495e;
        }
        
        .blend-grid {
            max-width: 800px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
        }
        
        .blend-example {
            height: 200px;
            border-radius: 12px;
            position: relative;
            overflow: hidden;
        }
        
        .blend-multiply {
            background: 
                linear-gradient(45deg, rgba(255,107,107,0.8), rgba(78,205,196,0.8)),
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23333"/></svg>');
            background-blend-mode: multiply;
        }
        
        .blend-screen {
            background: 
                linear-gradient(45deg, rgba(102,126,234,0.8), rgba(118,75,162,0.8)),
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23fff"/></svg>');
            background-blend-mode: screen;
        }
        
        .blend-overlay {
            background: 
                linear-gradient(45deg, rgba(240,147,251,0.8), rgba(245,87,108,0.8)),
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,0 100,50 50,100 0,50" fill="%23333"/></svg>');
            background-blend-mode: overlay;
        }
        
        .blend-label {
            position: absolute;
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 0.5rem;
            border-radius: 4px;
            text-align: center;
            font-weight: bold;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .gradient-text {
                font-size: 2.5rem;
            }
            
            .parallax-section {
                background-attachment: scroll;
                height: 40vh;
            }
            
            .parallax-content h2 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="hero-content">
            <h1>CSS Backgrounds</h1>
            <p>Master the art of background styling with gradients, patterns, and advanced techniques</p>
        </div>
    </section>
    
    <section class="examples-container">
        <div class="examples-grid">
            <div class="bg-example linear-gradient">
                <div class="bg-example-label">Linear Gradient</div>
            </div>
            
            <div class="bg-example radial-gradient">
                <div class="bg-example-label">Radial Gradient</div>
            </div>
            
            <div class="bg-example conic-gradient">
                <div class="bg-example-label">Conic Gradient</div>
            </div>
            
            <div class="bg-example multiple-backgrounds">
                <div class="bg-example-label">Multiple Backgrounds</div>
            </div>
            
            <div class="bg-example dots-pattern">
                <div class="bg-example-label">Dots Pattern</div>
            </div>
            
            <div class="bg-example stripes-pattern">
                <div class="bg-example-label">Stripes Pattern</div>
            </div>
        </div>
    </section>
    
    <section class="gradient-text-section">
        <h2 class="gradient-text">Gradient Text</h2>
        <p style="color: #ecf0f1; margin-top: 1rem;">Background-clip: text creates stunning text effects</p>
    </section>
    
    <section class="parallax-section">
        <div class="parallax-content">
            <h2>Parallax Background</h2>
            <p>Fixed background attachment creates depth and movement</p>
        </div>
    </section>
    
    <section class="blend-section">
        <div class="blend-grid">
            <div class="blend-example blend-multiply">
                <div class="blend-label">Multiply</div>
            </div>
            
            <div class="blend-example blend-screen">
                <div class="blend-label">Screen</div>
            </div>
            
            <div class="blend-example blend-overlay">
                <div class="blend-label">Overlay</div>
            </div>
        </div>
    </section>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "18 min",
    },
    {
      id: "css-borders",
      title: "CSS Borders",
      content: `
        <h2>CSS Borders Mastery</h2>
        <p>Borders are essential for defining element boundaries and creating visual separation. Modern CSS offers extensive border styling capabilities including rounded corners, shadows, and custom designs.</p>
        
        <h3>Border Properties</h3>
        <ul>
          <li><strong>border-width</strong> - Border thickness (thin, medium, thick, or exact values)</li>
          <li><strong>border-style</strong> - Border appearance (solid, dashed, dotted, etc.)</li>
          <li><strong>border-color</strong> - Border color using any CSS color value</li>
          <li><strong>border-radius</strong> - Rounded corners and complex shapes</li>
          <li><strong>border-image</strong> - Custom border images and patterns</li>
        </ul>
        
        <h3>Advanced Border Techniques</h3>
        <ul>
          <li>Individual side borders (top, right, bottom, left)</li>
          <li>Complex border-radius combinations</li>
          <li>Border gradients and images</li>
          <li>CSS shapes with borders</li>
          <li>Interactive border effects</li>
        </ul>
        
        <h3>Border Best Practices</h3>
        <ul>
          <li>Use consistent border styles across components</li>
          <li>Consider border-box sizing for predictable layouts</li>
          <li>Optimize border-radius for different screen sizes</li>
          <li>Combine borders with box-shadows for depth</li>
        </ul>
      `,
      codeExample: `/* Basic Border Properties */
.basic-border {
    border-width: 2px;
    border-style: solid;
    border-color: #3498db;
}

/* Border Shorthand */
.shorthand-border {
    border: 3px dashed #e74c3c; /* width style color */
}

/* Individual Border Sides */
.individual-borders {
    border-top: 4px solid #2ecc71;
    border-right: 2px dotted #f39c12;
    border-bottom: 1px solid #9b59b6;
    border-left: 6px double #1abc9c;
}

/* Border Styles */
.border-styles {
    /* Solid, most common */
    border: 2px solid #333;
    
    /* Dashed */
    border: 2px dashed #666;
    
    /* Dotted */
    border: 2px dotted #999;
    
    /* Double line */
    border: 4px double #c0392b;
    
    /* Groove effect */
    border: 4px groove #8e44ad;
    
    /* Ridge effect */
    border: 4px ridge #27ae60;
    
    /* Inset effect */
    border: 4px inset #f39c12;
    
    /* Outset effect */
    border: 4px outset #e67e22;
}

/* Border Radius - Rounded Corners */
.rounded-corners {
    border: 2px solid #3498db;
    border-radius: 8px; /* All corners */
}

.individual-radius {
    border: 2px solid #e74c3c;
    border-top-left-radius: 20px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 10px;
}

/* Complex Shapes with Border-Radius */
.pill-shape {
    border: 2px solid #2ecc71;
    border-radius: 50px; /* Large value for pill shape */
}

.circle {
    width: 100px;
    height: 100px;
    border: 3px solid #9b59b6;
    border-radius: 50%; /* Perfect circle */
}

.organic-shape {
    border: 2px solid #f39c12;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
}

/* Border with Gradients */
.gradient-border {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    padding: 3px;
    border-radius: 12px;
}

.gradient-border-content {
    background: white;
    border-radius: 9px;
    padding: 20px;
}

/* CSS Border Images */
.border-image-example {
    border: 10px solid transparent;
    border-image: linear-gradient(45deg, #ff6b6b, #4ecdc4) 1;
}

.border-image-pattern {
    border: 15px solid transparent;
    border-image: url('border-pattern.svg') 15 repeat;
}

/* Modern Border Techniques */
.neumorphism-border {
    background: #e0e5ec;
    border-radius: 20px;
    box-shadow: 
        9px 9px 16px #a3b1c6,
        -9px -9px 16px #ffffff;
    border: none;
}

.glassmorphism-border {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
}

/* Interactive Border Effects */
.hover-border {
    border: 2px solid transparent;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.hover-border:hover {
    border-color: #3498db;
    box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
}

.animated-border {
    position: relative;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
}

.animated-border::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #3498db, transparent);
    transition: left 0.5s;
}

.animated-border:hover::before {
    left: 100%;
}

/* Border with Pseudo-elements */
.creative-border {
    position: relative;
    background: white;
    padding: 20px;
}

.creative-border::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    border-radius: 12px;
    z-index: -1;
}

/* Responsive Borders */
.responsive-border {
    border: 1px solid #ddd;
    border-radius: 4px;
}

@media (min-width: 768px) {
    .responsive-border {
        border-width: 2px;
        border-radius: 8px;
    }
}

@media (min-width: 1200px) {
    .responsive-border {
        border-width: 3px;
        border-radius: 12px;
    }
}

/* Border for Form Elements */
.form-input {
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    padding: 12px;
    transition: border-color 0.3s ease;
}

.form-input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-input:invalid {
    border-color: #e74c3c;
}

.form-input:valid {
    border-color: #2ecc71;
}`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Borders Showcase</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: 2rem;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .header h1 {
            font-size: 3rem;
            color: #2c3e50;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        
        .section {
            margin-bottom: 3rem;
        }
        
        .section-title {
            font-size: 1.5rem;
            color: #34495e;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        
        /* Border Examples Grid */
        .examples-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .border-example {
            background: white;
            padding: 2rem;
            text-align: center;
            transition: transform 0.3s ease;
            position: relative;
        }
        
        .border-example:hover {
            transform: translateY(-5px);
        }
        
        .example-label {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        
        .example-description {
            font-size: 0.9rem;
            color: #7f8c8d;
        }
        
        /* Basic Border Styles */
        .solid-border {
            border: 3px solid #3498db;
            border-radius: 8px;
        }
        
        .dashed-border {
            border: 3px dashed #e74c3c;
            border-radius: 8px;
        }
        
        .dotted-border {
            border: 3px dotted #2ecc71;
            border-radius: 8px;
        }
        
        .double-border {
            border: 6px double #9b59b6;
            border-radius: 8px;
        }
        
        .groove-border {
            border: 4px groove #f39c12;
            border-radius: 8px;
        }
        
        .ridge-border {
            border: 4px ridge #1abc9c;
            border-radius: 8px;
        }
        
        /* Shape Examples */
        .shapes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .shape-example {
            background: white;
            padding: 2rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 200px;
        }
        
        .circle-shape {
            width: 80px;
            height: 80px;
            border: 4px solid #e74c3c;
            border-radius: 50%;
            margin-bottom: 1rem;
        }
        
        .pill-shape {
            width: 120px;
            height: 40px;
            border: 3px solid #2ecc71;
            border-radius: 20px;
            margin-bottom: 1rem;
        }
        
        .organic-shape {
            width: 80px;
            height: 80px;
            border: 3px solid #9b59b6;
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            margin-bottom: 1rem;
        }
        
        .star-shape {
            width: 0;
            height: 0;
            border-left: 40px solid transparent;
            border-right: 40px solid transparent;
            border-bottom: 60px solid #f39c12;
            margin-bottom: 1rem;
            position: relative;
        }
        
        .star-shape::after {
            content: '';
            position: absolute;
            left: -40px;
            top: 20px;
            width: 0;
            height: 0;
            border-left: 40px solid transparent;
            border-right: 40px solid transparent;
            border-top: 60px solid #f39c12;
        }
        
        /* Gradient Border Example */
        .gradient-border {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
            padding: 3px;
            border-radius: 16px;
            margin-bottom: 1rem;
        }
        
        .gradient-border-content {
            background: white;
            border-radius: 13px;
            padding: 2rem;
            text-align: center;
        }
        
        /* Animated Borders */
        .animated-border {
            position: relative;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .animated-border::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(52, 152, 219, 0.5), transparent);
            transition: left 0.8s ease;
        }
        
        .animated-border:hover::before {
            left: 100%;
        }
        
        .animated-border:hover {
            border-color: #3498db;
            box-shadow: 0 5px 20px rgba(52, 152, 219, 0.2);
        }
        
        /* Modern Effects */
        .neumorphism {
            background: #e0e5ec;
            border: none;
            border-radius: 20px;
            box-shadow: 
                9px 9px 16px #a3b1c6,
                -9px -9px 16px #ffffff;
        }
        
        .glassmorphism {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
        }
        
        /* Interactive Form Example */
        .form-section {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin-top: 2rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .form-input:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }
        
        .form-input:valid {
            border-color: #2ecc71;
        }
        
        .form-input:invalid:not(:placeholder-shown) {
            border-color: #e74c3c;
        }
        
        .submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .examples-grid {
                grid-template-columns: 1fr;
            }
            
            .shapes-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>CSS Borders Mastery</h1>
            <p>Explore the complete range of CSS border styling techniques</p>
        </header>
        
        <section class="section">
            <h2 class="section-title">Basic Border Styles</h2>
            <div class="examples-grid">
                <div class="border-example solid-border">
                    <div class="example-label">Solid Border</div>
                    <div class="example-description">border: 3px solid #3498db</div>
                </div>
                
                <div class="border-example dashed-border">
                    <div class="example-label">Dashed Border</div>
                    <div class="example-description">border: 3px dashed #e74c3c</div>
                </div>
                
                <div class="border-example dotted-border">
                    <div class="example-label">Dotted Border</div>
                    <div class="example-description">border: 3px dotted #2ecc71</div>
                </div>
                
                <div class="border-example double-border">
                    <div class="example-label">Double Border</div>
                    <div class="example-description">border: 6px double #9b59b6</div>
                </div>
                
                <div class="border-example groove-border">
                    <div class="example-label">Groove Border</div>
                    <div class="example-description">border: 4px groove #f39c12</div>
                </div>
                
                <div class="border-example ridge-border">
                    <div class="example-label">Ridge Border</div>
                    <div class="example-description">border: 4px ridge #1abc9c</div>
                </div>
            </div>
        </section>
        
        <section class="section">
            <h2 class="section-title">Border Shapes & Radius</h2>
            <div class="shapes-grid">
                <div class="shape-example">
                    <div class="circle-shape"></div>
                    <div class="example-label">Circle</div>
                    <div class="example-description">border-radius: 50%</div>
                </div>
                
                <div class="shape-example">
                    <div class="pill-shape"></div>
                    <div class="example-label">Pill Shape</div>
                    <div class="example-description">border-radius: 20px</div>
                </div>
                
                <div class="shape-example">
                    <div class="organic-shape"></div>
                    <div class="example-label">Organic Shape</div>
                    <div class="example-description">Complex border-radius</div>
                </div>
                
                <div class="shape-example">
                    <div class="star-shape"></div>
                    <div class="example-label">CSS Star</div>
                    <div class="example-description">Border triangles</div>
                </div>
            </div>
        </section>
        
        <section class="section">
            <h2 class="section-title">Advanced Border Effects</h2>
            <div class="examples-grid">
                <div class="gradient-border">
                    <div class="gradient-border-content">
                        <div class="example-label">Gradient Border</div>
                        <div class="example-description">Linear gradient background</div>
                    </div>
                </div>
                
                <div class="border-example animated-border">
                    <div class="example-label">Animated Border</div>
                    <div class="example-description">Hover for animation</div>
                </div>
                
                <div class="border-example neumorphism">
                    <div class="example-label">Neumorphism</div>
                    <div class="example-description">Soft shadow effects</div>
                </div>
                
                <div class="border-example glassmorphism">
                    <div class="example-label">Glassmorphism</div>
                    <div class="example-description">Glass-like transparency</div>
                </div>
            </div>
        </section>
        
        <section class="form-section">
            <h2 class="section-title">Interactive Form Borders</h2>
            <form>
                <div class="form-group">
                    <label class="form-label" for="email">Email Address</label>
                    <input class="form-input" type="email" id="email" placeholder="Enter your email" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="password">Password</label>
                    <input class="form-input" type="password" id="password" placeholder="Enter your password" minlength="8" required>
                </div>
                
                <button type="submit" class="submit-btn">Submit Form</button>
            </form>
            <p style="margin-top: 1rem; color: #7f8c8d; font-size: 0.9rem;">
                Notice how borders change color based on input validation states
            </p>
        </section>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "16 min",
    },
    {
      id: "css-margins",
      title: "CSS Margins",
      content: `
        <h2>CSS Margins Mastery</h2>
        <p>Margins create space around elements, outside of their borders. Understanding margin behavior, including margin collapse and auto values, is crucial for effective layout design.</p>
        
        <h3>Margin Properties</h3>
        <ul>
          <li><strong>margin-top</strong> - Top margin space</li>
          <li><strong>margin-right</strong> - Right margin space</li>
          <li><strong>margin-bottom</strong> - Bottom margin space</li>
          <li><strong>margin-left</strong> - Left margin space</li>
          <li><strong>margin</strong> - Shorthand for all sides</li>
        </ul>
        
        <h3>Margin Values</h3>
        <ul>
          <li><strong>Length values</strong> - px, em, rem, vw, vh</li>
          <li><strong>Percentage</strong> - Relative to parent width</li>
          <li><strong>auto</strong> - Automatic centering</li>
          <li><strong>inherit</strong> - Inherit from parent</li>
          <li><strong>Negative values</strong> - Overlap elements</li>
        </ul>
        
        <h3>Margin Collapse</h3>
        <p>Adjacent vertical margins collapse into a single margin equal to the largest of the two margins.</p>
        
        <h3>Centering Techniques</h3>
        <ul>
          <li>Horizontal centering with margin: 0 auto</li>
          <li>Flexbox centering alternatives</li>
          <li>Grid centering methods</li>
        </ul>
      `,
      codeExample: `/* Individual Margin Properties */
.margin-top { margin-top: 20px; }
.margin-right { margin-right: 15px; }
.margin-bottom { margin-bottom: 25px; }
.margin-left { margin-left: 10px; }

/* Margin Shorthand */
.margin-all { margin: 20px; } /* All sides */
.margin-vertical-horizontal { margin: 15px 30px; } /* Top/bottom, left/right */
.margin-three-values { margin: 10px 20px 15px; } /* Top, left/right, bottom */
.margin-four-values { margin: 5px 10px 15px 20px; } /* Top, right, bottom, left */

/* Auto Margins for Centering */
.center-horizontal {
    width: 300px;
    margin: 0 auto; /* Centers horizontally */
}

.center-with-specific-margins {
    width: 200px;
    margin: 50px auto 30px auto; /* Top 50px, sides auto, bottom 30px */
}

/* Percentage Margins */
.percentage-margins {
    margin: 5% 10%; /* 5% top/bottom, 10% left/right */
    /* Percentages are based on parent's width */
}

/* Negative Margins */
.negative-margin {
    margin-top: -10px; /* Overlaps with element above */
    margin-left: -20px; /* Shifts element left */
}

.pull-up {
    margin-top: -50px; /* Pulls element up over previous element */
}

/* Margin Collapse Examples */
.margin-collapse-parent {
    margin-bottom: 30px;
}

.margin-collapse-child {
    margin-top: 20px; /* Will collapse with parent's margin */
    /* Resulting margin will be 30px (larger of the two) */
}

/* Preventing Margin Collapse */
.prevent-collapse {
    padding: 1px; /* Any padding prevents collapse */
    /* or */
    border: 1px solid transparent; /* Any border prevents collapse */
    /* or */
    overflow: hidden; /* Creates new block formatting context */
}

/* Responsive Margins */
.responsive-margins {
    margin: 1rem;
}

@media (min-width: 768px) {
    .responsive-margins {
        margin: 2rem;
    }
}

@media (min-width: 1200px) {
    .responsive-margins {
        margin: 3rem;
    }
}

/* CSS Custom Properties for Consistent Margins */
:root {
    --margin-xs: 0.5rem;
    --margin-sm: 1rem;
    --margin-md: 1.5rem;
    --margin-lg: 2rem;
    --margin-xl: 3rem;
}

.consistent-spacing {
    margin-bottom: var(--margin-md);
}

/* Margin with Flexbox Alternative */
.flex-container {
    display: flex;
    justify-content: center; /* Horizontal centering */
    align-items: center; /* Vertical centering */
    gap: 1rem; /* Space between items instead of margins */
}

/* Logical Margin Properties */
.logical-margins {
    margin-inline: 2rem; /* Left and right in LTR, right and left in RTL */
    margin-block: 1rem; /* Top and bottom */
    margin-inline-start: 1rem; /* Left in LTR, right in RTL */
    margin-inline-end: 2rem; /* Right in LTR, left in RTL */
    margin-block-start: 0.5rem; /* Top */
    margin-block-end: 1.5rem; /* Bottom */
}

/* Common Margin Patterns */
.card-spacing {
    margin-bottom: 2rem; /* Space between cards */
}

.section-spacing {
    margin: 4rem 0; /* Vertical section spacing */
}

.button-group .button {
    margin-right: 1rem; /* Space between buttons */
}

.button-group .button:last-child {
    margin-right: 0; /* Remove margin from last button */
}

/* Alternative using flexbox gap */
.button-group-flex {
    display: flex;
    gap: 1rem; /* Better than margins for button spacing */
}

/* Margin Reset for Lists */
.reset-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

.reset-list li {
    margin-bottom: 0.5rem;
}

.reset-list li:last-child {
    margin-bottom: 0;
}

/* Complex Margin Scenarios */
.sidebar {
    width: 300px;
    margin-right: 2rem;
    float: left;
}

.main-content {
    margin-left: 320px; /* Sidebar width + margin */
}

/* Modern Layout Alternative */
.grid-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem; /* Replace margins with gap */
}

/* Print Margin Considerations */
@media print {
    .page-break {
        page-break-before: always;
        margin-top: 0; /* Reset margins for new page */
    }
    
    .print-margins {
        margin: 1in; /* Printer-friendly margins */
    }
}`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Margins Demonstration</title>
    <style>
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            color: #333;
        }
        
        /* CSS Custom Properties */
        :root {
            --margin-xs: 0.5rem;
            --margin-sm: 1rem;
            --margin-md: 1.5rem;
            --margin-lg: 2rem;
            --margin-xl: 3rem;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
            margin-bottom: 0; /* No margin to demonstrate different spacing techniques */
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin: 0 0 1rem 0; /* Specific margins for heading */
        }
        
        .content {
            padding: 2rem;
        }
        
        /* Margin Examples */
        .example-section {
            margin-bottom: var(--margin-xl);
        }
        
        .section-title {
            color: #2c3e50;
            font-size: 1.5rem;
            margin-bottom: var(--margin-md);
            border-bottom: 2px solid #3498db;
            padding-bottom: 0.5rem;
        }
        
        /* Auto Margin Centering */
        .centered-box {
            width: 200px;
            height: 100px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            margin: var(--margin-md) auto; /* Centers horizontally */
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        
        /* Margin Spacing Examples */
        .spacing-demo {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: var(--margin-lg);
        }
        
        .spacing-box {
            background: #ecf0f1;
            border: 2px solid #bdc3c7;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
            position: relative;
        }
        
        .margin-xs { margin: var(--margin-xs); }
        .margin-sm { margin: var(--margin-sm); }
        .margin-md { margin: var(--margin-md); }
        .margin-lg { margin: var(--margin-lg); }
        
        /* Negative Margin Examples */
        .negative-margin-demo {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: var(--margin-lg);
            position: relative;
        }
        
        .base-element {
            background: #3498db;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        
        .overlapping-element {
            background: #e74c3c;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-top: -0.5rem; /* Overlaps with element above */
            margin-left: 2rem; /* Shifts right */
        }
        
        /* Margin Collapse Demonstration */
        .collapse-demo {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            margin-bottom: var(--margin-lg);
        }
        
        .collapse-parent {
            background: #dff0d8;
            padding: 1rem;
            margin-bottom: 2rem; /* This margin will collapse */
        }
        
        .collapse-child {
            background: #d1ecf1;
            padding: 0.5rem;
            margin-top: 1rem; /* This margin will collapse with parent's */
            margin-bottom: 1rem;
        }
        
        .no-collapse {
            background: #f8d7da;
            padding: 1rem;
            border: 1px solid transparent; /* Prevents collapse */
            margin-top: 2rem;
        }
        
        /* Button Group with Margins */
        .button-group {
            margin-bottom: var(--margin-lg);
        }
        
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-right: 1rem; /* Traditional margin approach */
        }
        
        .btn:last-child {
            margin-right: 0; /* Remove margin from last button */
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        
        /* Flexbox Alternative (Better Practice) */
        .button-group-flex {
            display: flex;
            gap: 1rem; /* Better than margins for spacing */
            margin-bottom: var(--margin-lg);
        }
        
        /* Responsive Margins */
        .responsive-margins {
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            padding: 1rem;
            border-radius: 12px;
            margin: 1rem 0;
        }
        
        @media (min-width: 768px) {
            .responsive-margins {
                margin: 2rem 0;
            }
        }
        
        @media (min-width: 1200px) {
            .responsive-margins {
                margin: 3rem 0;
            }
        }
        
        /* Card Layout with Consistent Margins */
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--margin-md); /* Modern approach */
            margin-bottom: var(--margin-lg);
        }
        
        .card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border: 1px solid #e1e5e9;
        }
        
        .card h3 {
            color: #2c3e50;
            margin-bottom: var(--margin-sm);
        }
        
        .card p {
            color: #7f8c8d;
            margin-bottom: var(--margin-sm);
        }
        
        .card p:last-child {
            margin-bottom: 0; /* Remove margin from last paragraph */
        }
        
        /* Visual Margin Indicators */
        .margin-visualizer {
            position: relative;
            background: #f39c12;
            color: white;
            padding: 1rem;
            margin: 2rem;
            border-radius: 8px;
        }
        
        .margin-visualizer::before {
            content: '';
            position: absolute;
            top: -2rem;
            left: -2rem;
            right: -2rem;
            bottom: -2rem;
            border: 2px dashed #e67e22;
            pointer-events: none;
            border-radius: 8px;
        }
        
        /* Margin Best Practices Examples */
        .best-practices {
            background: #e8f8f5;
            border-left: 4px solid #2ecc71;
            padding: 1.5rem;
            margin-bottom: var(--margin-lg);
        }
        
        .best-practices h3 {
            color: #27ae60;
            margin-bottom: var(--margin-sm);
        }
        
        .best-practices ul {
            margin: 0;
            padding-left: 1.5rem;
        }
        
        .best-practices li {
            margin-bottom: 0.5rem;
        }
        
        .best-practices li:last-child {
            margin-bottom: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>CSS Margins Mastery</h1>
            <p>Master the art of spacing and layout with CSS margins</p>
        </header>
        
        <main class="content">
            <section class="example-section">
                <h2 class="section-title">Auto Margin Centering</h2>
                <div class="centered-box">
                    Centered with<br>margin: 0 auto
                </div>
                <p>The box above is centered using <code>margin: 0 auto</code> which sets top/bottom margins to 0 and left/right margins to auto.</p>
            </section>
            
            <section class="example-section">
                <h2 class="section-title">Margin Spacing Scale</h2>
                <div class="spacing-demo">
                    <div class="spacing-box margin-xs">
                        <strong>Extra Small</strong><br>
                        margin: 0.5rem
                    </div>
                    <div class="spacing-box margin-sm">
                        <strong>Small</strong><br>
                        margin: 1rem
                    </div>
                    <div class="spacing-box margin-md">
                        <strong>Medium</strong><br>
                        margin: 1.5rem
                    </div>
                    <div class="spacing-box margin-lg">
                        <strong>Large</strong><br>
                        margin: 2rem
                    </div>
                </div>
            </section>
            
            <section class="example-section">
                <h2 class="section-title">Negative Margins</h2>
                <div class="negative-margin-demo">
                    <div class="base-element">
                        Base Element
                    </div>
                    <div class="overlapping-element">
                        Overlapping Element (margin-top: -0.5rem, margin-left: 2rem)
                    </div>
                </div>
            </section>
            
            <section class="example-section">
                <h2 class="section-title">Margin Collapse</h2>
                <div class="collapse-demo">
                    <div class="collapse-parent">
                        Parent Element (margin-bottom: 2rem)
                        <div class="collapse-child">
                            Child Element (margin-top: 1rem)<br>
                            <small>The margins collapse to 2rem (the larger value)</small>
                        </div>
                    </div>
                    <div class="no-collapse">
                        This element has a border, which prevents margin collapse
                    </div>
                </div>
            </section>
            
            <section class="example-section">
                <h2 class="section-title">Button Spacing Comparison</h2>
                
                <h3 style="margin-bottom: 0.5rem;">Using Margins (Traditional)</h3>
                <div class="button-group">
                    <button class="btn">Button 1</button>
                    <button class="btn">Button 2</button>
                    <button class="btn">Button 3</button>
                </div>
                
                <h3 style="margin-bottom: 0.5rem;">Using Flexbox Gap (Modern)</h3>
                <div class="button-group-flex">
                    <button class="btn" style="margin-right: 0;">Button 1</button>
                    <button class="btn" style="margin-right: 0;">Button 2</button>
                    <button class="btn" style="margin-right: 0;">Button 3</button>
                </div>
            </section>
            
            <section class="example-section">
                <h2 class="section-title">Responsive Margins</h2>
                <div class="responsive-margins">
                    <strong>This box has responsive margins:</strong><br>
                    • Mobile: 1rem vertical margin<br>
                    • Tablet: 2rem vertical margin<br>
                    • Desktop: 3rem vertical margin<br>
                    <small>Resize your browser to see the effect</small>
                </div>
            </section>
            
            <section class="example-section">
                <h2 class="section-title">Card Layout with Consistent Spacing</h2>
                <div class="card-grid">
                    <div class="card">
                        <h3>Card 1</h3>
                        <p>This card uses consistent margin values from CSS custom properties.</p>
                        <p>Notice how all text elements have proper spacing.</p>
                    </div>
                    <div class="card">
                        <h3>Card 2</h3>
                        <p>Cards are spaced using CSS Grid gap property instead of margins.</p>
                        <p>This is more reliable than margin-based spacing.</p>
                    </div>
                    <div class="card">
                        <h3>Card 3</h3>
                        <p>The last paragraph in each card has its bottom margin removed.</p>
                        <p>This prevents inconsistent spacing at the bottom of cards.</p>
                    </div>
                </div>
            </section>
            
            <section class="example-section">
                <h2 class="section-title">Margin Visualization</h2>
                <div class="margin-visualizer">
                    This element has 2rem margins on all sides.<br>
                    The dashed border shows the margin area.
                </div>
            </section>
            
            <div class="best-practices">
                <h3>Margin Best Practices</h3>
                <ul>
                    <li>Use CSS custom properties for consistent margin values</li>
                    <li>Prefer flexbox gap or grid gap over margins for component spacing</li>
                    <li>Remove bottom margins from last elements to prevent uneven spacing</li>
                    <li>Use margin: 0 auto for horizontal centering of block elements</li>
                    <li>Be aware of margin collapse with adjacent vertical margins</li>
                    <li>Use logical margin properties for international layouts</li>
                    <li>Consider using rem or em units for scalable margins</li>
                    <li>Test margin behavior across different browsers and devices</li>
                </ul>
            </div>
        </main>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "14 min",
    },
    {
      id: "css-padding",
      title: "CSS Padding",
      content: `
        <h2>CSS Padding Mastery</h2>
        <p>Padding creates space inside elements, between the content and the border. Unlike margins, padding is part of the element and affects the element's background and clickable area.</p>
        
        <h3>Padding Properties</h3>
        <ul>
          <li><strong>padding-top</strong> - Top internal spacing</li>
          <li><strong>padding-right</strong> - Right internal spacing</li>
          <li><strong>padding-bottom</strong> - Bottom internal spacing</li>
          <li><strong>padding-left</strong> - Left internal spacing</li>
          <li><strong>padding</strong> - Shorthand for all sides</li>
        </ul>
        
        <h3>Padding vs Margin</h3>
        <ul>
          <li><strong>Padding</strong> - Inside the element, affects background</li>
          <li><strong>Margin</strong> - Outside the element, creates space between elements</li>
          <li><strong>Clickable area</strong> - Padding extends clickable area, margins don't</li>
          <li><strong>Background</strong> - Padding shows background, margins don't</li>
        </ul>
        
        <h3>Box Model Impact</h3>
        <ul>
          <li>Content-box: Padding adds to element dimensions</li>
          <li>Border-box: Padding included in element dimensions</li>
          <li>Box-sizing property affects padding behavior</li>
        </ul>
        
        <h3>Responsive Padding</h3>
        <ul>
          <li>Fluid padding with percentage values</li>
          <li>Viewport-based padding units</li>
          <li>Media query padding adjustments</li>
        </ul>
      `,
      codeExample: `/* Individual Padding Properties */
.padding-top { padding-top: 20px; }
.padding-right { padding-right: 15px; }
.padding-bottom { padding-bottom: 25px; }
.padding-left { padding-left: 10px; }

/* Padding Shorthand */
.padding-all { padding: 20px; } /* All sides */
.padding-vertical-horizontal { padding: 15px 30px; } /* Top/bottom, left/right */
.padding-three-values { padding: 10px 20px 15px; } /* Top, left/right, bottom */
.padding-four-values { padding: 5px 10px 15px 20px; } /* Top, right, bottom, left */

/* Box Model Considerations */
.content-box {
    box-sizing: content-box; /* Default */
    width: 200px; /* Content width only */
    padding: 20px; /* Adds to total width = 240px */
    border: 2px solid #333; /* Adds to total width = 244px */
}

.border-box {
    box-sizing: border-box; /* Recommended */
    width: 200px; /* Total width including padding and border */
    padding: 20px; /* Included in 200px width */
    border: 2px solid #333; /* Included in 200px width */
}

/* Percentage Padding */
.percentage-padding {
    padding: 5% 10%; /* Based on parent's width, not height */
    /* Creates responsive spacing that scales with container */
}

.aspect-ratio-trick {
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 aspect ratio (9/16 = 0.5625) */
    height: 0; /* Collapse height, use padding for dimensions */
    position: relative;
}

.aspect-ratio-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/* Viewport Units for Padding */
.viewport-padding {
    padding: 5vw; /* 5% of viewport width */
    /* Creates consistent visual spacing across screen sizes */
}

.responsive-hero {
    padding: 10vh 5vw; /* Viewport-based padding */
    min-height: 100vh;
}

/* Logical Padding Properties */
.logical-padding {
    padding-inline: 2rem; /* Left and right in LTR */
    padding-block: 1rem; /* Top and bottom */
    padding-inline-start: 1rem; /* Left in LTR, right in RTL */
    padding-inline-end: 2rem; /* Right in LTR, left in RTL */
    padding-block-start: 0.5rem; /* Top */
    padding-block-end: 1.5rem; /* Bottom */
}

/* CSS Custom Properties for Consistent Padding */
:root {
    --padding-xs: 0.5rem;
    --padding-sm: 1rem;
    --padding-md: 1.5rem;
    --padding-lg: 2rem;
    --padding-xl: 3rem;
}

.card {
    padding: var(--padding-md);
}

.button {
    padding: var(--padding-sm) var(--padding-md);
}

/* Component-Specific Padding */
.form-input {
    padding: 12px 16px; /* Comfortable input padding */
    border: 1px solid #ddd;
    border-radius: 4px;
}

.navigation-item {
    padding: 0.75rem 1rem; /* Navigation link padding */
}

.card-content {
    padding: 1.5rem; /* Card internal spacing */
}

.button-primary {
    padding: 0.75rem 1.5rem; /* Button padding for touch targets */
}

/* Responsive Padding Patterns */
.responsive-container {
    padding: 1rem;
}

@media (min-width: 768px) {
    .responsive-container {
        padding: 2rem;
    }
}

@media (min-width: 1200px) {
    .responsive-container {
        padding: 3rem;
    }
}

/* Container with Breakout Elements */
.full-width-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem; /* Horizontal padding for content */
}

.breakout {
    margin-left: -2rem; /* Negative margin to break out of padding */
    margin-right: -2rem;
    padding: 2rem; /* Add padding back for content */
}

/* Padding for Different Content Types */
.text-content {
    padding: 2rem 1.5rem; /* Comfortable reading padding */
    max-width: 65ch; /* Optimal reading line length */
    margin: 0 auto;
}

.image-gallery {
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.gallery-item {
    padding: 0.5rem; /* Minimal padding for images */
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Padding with Background and Borders */
.highlighted-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 3rem 2rem; /* Background extends to padding area */
    border-radius: 12px;
}

.outlined-box {
    border: 2px solid #3498db;
    padding: 1.5rem; /* Space between content and border */
    border-radius: 8px;
}

/* Touch-Friendly Padding */
.touch-friendly {
    padding: 1rem; /* Minimum 44px touch target */
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Print Padding Considerations */
@media print {
    .print-friendly {
        padding: 0.5in; /* Printer-friendly padding */
    }
    
    .no-print-padding {
        padding: 0; /* Remove padding for print */
    }
}

/* Accessibility Considerations */
.focus-visible-padding {
    padding: 0.75rem 1rem;
    transition: padding 0.2s ease;
}

.focus-visible-padding:focus-visible {
    padding: 1rem 1.25rem; /* Increase padding on focus */
    outline: 2px solid #3498db;
    outline-offset: 2px;
}

/* Intrinsic Sizing with Padding */
.intrinsic-size {
    padding: 1rem 2rem;
    display: inline-block; /* Size to content + padding */
    background: #f0f0f0;
    border-radius: 6px;
}

/* Fluid Typography with Padding */
.fluid-text-container {
    padding: clamp(1rem, 5vw, 3rem); /* Fluid padding */
    font-size: clamp(1rem, 2.5vw, 1.5rem); /* Fluid text */
}`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Padding Mastery</title>
    <style>
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        
        /* CSS Custom Properties */
        :root {
            --padding-xs: 0.5rem;
            --padding-sm: 1rem;
            --padding-md: 1.5rem;
            --padding-lg: 2rem;
            --padding-xl: 3rem;
            --color-primary: #3498db;
            --color-secondary: #2ecc71;
            --color-accent: #e74c3c;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: var(--padding-xl) var(--padding-lg);
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin: 0 0 1rem 0;
        }
        
        .main-content {
            padding: var(--padding-lg);
        }
        
        /* Box Model Demonstration */
        .box-model-demo {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: var(--padding-xl);
        }
        
        .box-example {
            text-align: center;
            position: relative;
        }
        
        .content-box-example {
            width: 200px;
            height: 100px;
            background: #ecf0f1;
            border: 4px solid var(--color-primary);
            padding: var(--padding-md);
            box-sizing: content-box;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .border-box-example {
            width: 200px;
            height: 100px;
            background: #ecf0f1;
            border: 4px solid var(--color-secondary);
            padding: var(--padding-md);
            box-sizing: border-box;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .box-label {
            margin-top: 1rem;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .box-details {
            font-size: 0.9rem;
            color: #7f8c8d;
            margin-top: 0.5rem;
        }
        
        /* Padding Scale Demonstration */
        .padding-scale {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
            margin-bottom: var(--padding-xl);
        }
        
        .padding-example {
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            border-radius: 8px;
            text-align: center;
            color: #2c3e50;
            font-weight: bold;
            border: 2px solid rgba(255,255,255,0.3);
        }
        
        .padding-xs { padding: var(--padding-xs); }
        .padding-sm { padding: var(--padding-sm); }
        .padding-md { padding: var(--padding-md); }
        .padding-lg { padding: var(--padding-lg); }
        
        /* Interactive Elements */
        .interactive-section {
            margin-bottom: var(--padding-xl);
        }
        
        .button-demo {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            align-items: center;
            margin-bottom: 2rem;
        }
        
        .btn {
            background: linear-gradient(135deg, var(--color-primary), #2980b9);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        }
        
        .btn-sm { padding: 0.5rem 1rem; }
        .btn-md { padding: 0.75rem 1.5rem; }
        .btn-lg { padding: 1rem 2rem; }
        
        /* Form Elements */
        .form-demo {
            background: #f8f9fa;
            padding: var(--padding-lg);
            border-radius: 12px;
            margin-bottom: var(--padding-xl);
        }
        
        .form-group {
            margin-bottom: var(--padding-md);
        }
        
        .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .form-input:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }
        
        .form-textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 1rem;
            resize: vertical;
            min-height: 100px;
        }
        
        /* Card Layouts */
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--padding-md);
            margin-bottom: var(--padding-xl);
        }
        
        .card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border: 1px solid #e1e5e9;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .card-header {
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
            color: white;
            padding: var(--padding-md) var(--padding-lg);
            font-weight: bold;
        }
        
        .card-content {
            padding: var(--padding-lg);
        }
        
        .card-content h3 {
            margin: 0 0 var(--padding-sm) 0;
            color: #2c3e50;
        }
        
        .card-content p {
            margin: 0 0 var(--padding-sm) 0;
            color: #7f8c8d;
        }
        
        .card-content p:last-child {
            margin-bottom: 0;
        }
        
        /* Aspect Ratio with Padding */
        .aspect-ratio-demo {
            margin-bottom: var(--padding-xl);
        }
        
        .aspect-ratio-container {
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            background: #34495e;
            border-radius: 12px;
            overflow: hidden;
        }
        
        .aspect-ratio-16-9 {
            width: 100%;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            height: 0;
            position: relative;
        }
        
        .aspect-ratio-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
        }
        
        /* Responsive Padding */
        .responsive-hero {
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #feca57 100%);
            color: white;
            text-align: center;
            border-radius: 12px;
            margin-bottom: var(--padding-xl);
            padding: 2rem 1rem;
        }
        
        @media (min-width: 768px) {
            .responsive-hero {
                padding: 4rem 2rem;
            }
        }
        
        @media (min-width: 1200px) {
            .responsive-hero {
                padding: 6rem 3rem;
            }
        }
        
        .responsive-hero h2 {
            font-size: clamp(1.5rem, 4vw, 3rem);
            margin-bottom: 1rem;
        }
        
        /* Best Practices Section */
        .best-practices {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: var(--padding-xl);
            border-radius: 12px;
            margin-bottom: var(--padding-xl);
        }
        
        .best-practices h3 {
            margin-bottom: var(--padding-md);
            font-size: 1.5rem;
        }
        
        .best-practices ul {
            list-style: none;
            padding: 0;
        }
        
        .best-practices li {
            padding: var(--padding-xs) 0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .best-practices li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #2ecc71;
            font-weight: bold;
        }
        
        /* Comparison Section */
        .comparison {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: var(--padding-xl);
        }
        
        .comparison-item {
            padding: var(--padding-lg);
            border-radius: 12px;
            text-align: center;
        }
        
        .padding-demo {
            background: rgba(46, 204, 113, 0.1);
            border: 2px solid var(--color-secondary);
        }
        
        .no-padding-demo {
            background: rgba(231, 76, 60, 0.1);
            border: 2px solid var(--color-accent);
        }
        
        @media (max-width: 768px) {
            .box-model-demo,
            .comparison {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .padding-scale {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>CSS Padding Mastery</h1>
            <p>Master internal spacing and the CSS box model with comprehensive padding techniques</p>
        </header>
        
        <main class="main-content">
            <section>
                <h2 style="margin-bottom: 1.5rem; color: #2c3e50;">Box Model Comparison</h2>
                <div class="box-model-demo">
                    <div class="box-example">
                        <div class="content-box-example">
                            Content Box
                        </div>
                        <div class="box-label">content-box</div>
                        <div class="box-details">
                            Width: 200px + 24px padding + 8px border<br>
                            Total: 232px
                        </div>
                    </div>
                    
                    <div class="box-example">
                        <div class="border-box-example">
                            Border Box
                        </div>
                        <div class="box-label">border-box</div>
                        <div class="box-details">
                            Total width: 200px<br>
                            (includes padding and border)
                        </div>
                    </div>
                </div>
            </section>
            
            <section>
                <h2 style="margin-bottom: 1.5rem; color: #2c3e50;">Padding Scale</h2>
                <div class="padding-scale">
                    <div class="padding-example padding-xs">
                        XS<br>0.5rem
                    </div>
                    <div class="padding-example padding-sm">
                        SM<br>1rem
                    </div>
                    <div class="padding-example padding-md">
                        MD<br>1.5rem
                    </div>
                    <div class="padding-example padding-lg">
                        LG<br>2rem
                    </div>
                </div>
            </section>
            
            <section class="interactive-section">
                <h2 style="margin-bottom: 1.5rem; color: #2c3e50;">Interactive Button Padding</h2>
                <div class="button-demo">
                    <button class="btn btn-sm">Small Button</button>
                    <button class="btn btn-md">Medium Button</button>
                    <button class="btn btn-lg">Large Button</button>
                </div>
                <p style="color: #7f8c8d; margin-bottom: 2rem;">
                    Notice how padding affects button size and touch-friendliness. Larger padding creates better touch targets.
                </p>
            </section>
            
            <section>
                <h2 style="margin-bottom: 1.5rem; color: #2c3e50;">Form Element Padding</h2>
                <div class="form-demo">
                    <div class="form-group">
                        <label class="form-label" for="email">Email Address</label>
                        <input class="form-input" type="email" id="email" placeholder="Enter your email">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="message">Message</label>
                        <textarea class="form-textarea" id="message" placeholder="Enter your message"></textarea>
                    </div>
                    
                    <button class="btn btn-md" style="background: var(--color-secondary);">
                        Submit Form
                    </button>
                </div>
            </section>
            
            <section>
                <h2 style="margin-bottom: 1.5rem; color: #2c3e50;">Card Layout with Consistent Padding</h2>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-header">
                            Header Padding
                        </div>
                        <div class="card-content">
                            <h3>Card Title</h3>
                            <p>This card demonstrates how padding creates comfortable spacing for content.</p>
                            <p>Notice how the background color extends to the padding area.</p>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            Consistent Spacing
                        </div>
                        <div class="card-content">
                            <h3>Design System</h3>
                            <p>Using CSS custom properties ensures consistent padding across components.</p>
                            <p>This creates a cohesive visual rhythm throughout the design.</p>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            Touch Friendly
                        </div>
                        <div class="card-content">
                            <h3>Accessibility</h3>
                            <p>Proper padding ensures interactive elements meet accessibility guidelines.</p>
                            <p>Minimum 44px touch targets improve usability on mobile devices.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="aspect-ratio-demo">
                <h2 style="margin-bottom: 1.5rem; color: #2c3e50;">Aspect Ratio with Padding</h2>
                <div class="aspect-ratio-container">
                    <div class="aspect-ratio-16-9">
                        <div class="aspect-ratio-content">
                            16:9 Aspect Ratio<br>
                            Created with padding-bottom: 56.25%
                        </div>
                    </div>
                </div>
                <p style="text-align: center; margin-top: 1rem; color: #7f8c8d;">
                    This technique uses padding-bottom percentage to maintain aspect ratios
                </p>
            </section>
            
            <section>
                <h2 style="margin-bottom: 1.5rem; color: #2c3e50;">Responsive Padding</h2>
                <div class="responsive-hero">
                    <h2>Responsive Hero Section</h2>
                    <p style="font-size: 1.1rem; opacity: 0.9;">
                        This section uses responsive padding that scales with screen size.<br>
                        Resize your browser to see the effect.
                    </p>
                </div>
            </section>
            
            <section>
                <h2 style="margin-bottom: 1.5rem; color: #2c3e50;">Padding vs No Padding</h2>
                <div class="comparison">
                    <div class="comparison-item padding-demo">
                        <h3>With Proper Padding</h3>
                        <p>This content has comfortable padding that makes it easy to read and creates visual breathing room.</p>
                    </div>
                    
                    <div class="comparison-item no-padding-demo" style="padding: 0;">
                        <h3 style="margin: 0;">Without Padding</h3>
                        <p style="margin: 0;">This content has no padding and feels cramped against the border. It's harder to read and less visually appealing.</p>
                    </div>
                </div>
            </section>
            
            <div class="best-practices">
                <h3>Padding Best Practices</h3>
                <ul>
                    <li>Use box-sizing: border-box for predictable layouts</li>
                    <li>Establish a consistent padding scale using CSS custom properties</li>
                    <li>Ensure interactive elements have sufficient padding for touch targets (min 44px)</li>
                    <li>Use padding instead of margins for component internal spacing</li>
                    <li>Consider percentage padding for responsive aspect ratios</li>
                    <li>Use logical padding properties for international layouts</li>
                    <li>Test padding values across different screen sizes and devices</li>
                    <li>Remember that padding extends the element's background and clickable area</li>
                </ul>
            </div>
        </main>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "16 min",
    },
    {
      id: "css-height-width",
      title: "CSS Height and Width",
      content: `
        <h2>CSS Height and Width Properties</h2>
        <p>The height and width properties control the dimensions of elements. Understanding these properties is essential for creating responsive layouts and controlling element sizing.</p>
        
        <h3>Basic Dimension Properties</h3>
        <ul>
          <li><strong>width</strong> - Sets the element's width</li>
          <li><strong>height</strong> - Sets the element's height</li>
          <li><strong>max-width</strong> - Maximum width constraint</li>
          <li><strong>max-height</strong> - Maximum height constraint</li>
          <li><strong>min-width</strong> - Minimum width constraint</li>
          <li><strong>min-height</strong> - Minimum height constraint</li>
        </ul>
        
        <h3>CSS Units for Dimensions</h3>
        <ul>
          <li><strong>Absolute units</strong> - px, pt, cm, mm, in</li>
          <li><strong>Relative units</strong> - %, em, rem, vw, vh, vmin, vmax</li>
          <li><strong>Keywords</strong> - auto, inherit, initial, unset</li>
          <li><strong>Intrinsic sizing</strong> - fit-content, max-content, min-content</li>
        </ul>
        
        <h3>Responsive Sizing Techniques</h3>
        <ul>
          <li>Viewport units for full-screen layouts</li>
          <li>Percentage-based responsive design</li>
          <li>Intrinsic web design with min/max constraints</li>
          <li>Aspect ratio maintenance</li>
        </ul>
        
        <h3>Modern Sizing Features</h3>
        <ul>
          <li>CSS aspect-ratio property</li>
          <li>Container query units</li>
          <li>Logical sizing properties</li>
          <li>clamp() function for fluid sizing</li>
        </ul>
      `,
      codeExample: `/* Basic Width and Height */
.fixed-size {
    width: 300px;
    height: 200px;
}

.percentage-size {
    width: 100%; /* Full width of parent */
    height: 50%; /* Half height of parent */
}

/* Responsive Design with Max/Min Constraints */
.responsive-container {
    width: 100%;
    max-width: 1200px; /* Prevents too wide on large screens */
    min-width: 320px; /* Prevents too narrow on small screens */
    margin: 0 auto; /* Center the container */
}

.flexible-height {
    min-height: 400px; /* At least 400px tall */
    max-height: 80vh; /* No more than 80% of viewport height */
    overflow: auto; /* Add scrolling if content exceeds max-height */
}

/* Viewport Units for Full-Screen Layouts */
.hero-section {
    width: 100vw; /* Full viewport width */
    height: 100vh; /* Full viewport height */
    min-height: 600px; /* Fallback for very small screens */
}

.sidebar {
    width: 25vw; /* 25% of viewport width */
    min-width: 250px; /* Minimum width */
    max-width: 400px; /* Maximum width */
    height: 100vh; /* Full viewport height */
}

/* Intrinsic Sizing */
.content-sized {
    width: fit-content; /* Size to content */
    max-width: 100%; /* Don't exceed container */
}

.max-content-width {
    width: max-content; /* Size to longest line */
    max-width: 500px; /* Constrain maximum */
}

.min-content-width {
    width: min-content; /* Size to shortest possible */
    min-width: 200px; /* Ensure minimum readability */
}

/* Modern CSS Functions */
.fluid-sizing {
    width: clamp(300px, 50vw, 800px); /* Min 300px, preferred 50vw, max 800px */
    height: clamp(200px, 30vh, 500px); /* Fluid height scaling */
}

.calculated-dimensions {
    width: calc(100% - 40px); /* Full width minus padding */
    height: calc(100vh - 80px); /* Full height minus header/footer */
}

/* Aspect Ratio Maintenance */
.aspect-ratio-16-9 {
    aspect-ratio: 16 / 9; /* Modern aspect ratio property */
    width: 100%;
}

.aspect-ratio-fallback {
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 ratio fallback */
    height: 0;
    position: relative;
}

.aspect-ratio-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/* Container Queries (Modern CSS) */
@container (min-width: 400px) {
    .container-responsive {
        width: 50%; /* Half width when container is wide enough */
    }
}

/* Logical Properties for International Layouts */
.logical-sizing {
    inline-size: 300px; /* Width in horizontal writing mode */
    block-size: 200px; /* Height in horizontal writing mode */
}

/* Responsive Images */
.responsive-image {
    width: 100%;
    height: auto; /* Maintain aspect ratio */
    max-width: 100%; /* Don't exceed container */
}

.square-image {
    width: 200px;
    height: 200px;
    object-fit: cover; /* Crop to fill square */
}

/* Grid and Flexbox Sizing */
.grid-item {
    grid-column: span 2; /* Span 2 grid columns */
    min-height: 200px; /* Minimum height */
}

.flex-item {
    flex: 1; /* Grow to fill available space */
    min-width: 0; /* Allow shrinking below content size */
}

.flex-basis {
    flex-basis: 300px; /* Starting size before growing/shrinking */
    flex-grow: 1; /* Allow growing */
    flex-shrink: 1; /* Allow shrinking */
}

/* Media Query Responsive Sizing */
.responsive-columns {
    width: 100%; /* Mobile: full width */
}

@media (min-width: 768px) {
    .responsive-columns {
        width: 50%; /* Tablet: half width */
    }
}

@media (min-width: 1200px) {
    .responsive-columns {
        width: 33.333%; /* Desktop: one third width */
    }
}

/* Print Sizing */
@media print {
    .print-optimized {
        width: 100% !important;
        max-width: none !important;
        height: auto !important;
    }
}

/* Special Cases */
.iframe-container {
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    position: relative;
}

.iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/* Accessibility Considerations */
.touch-friendly {
    min-height: 44px; /* Minimum touch target size */
    min-width: 44px;
}

/* Performance Optimization */
.gpu-accelerated {
    width: 200px;
    height: 200px;
    will-change: transform; /* Hint for GPU acceleration */
    transform: translateZ(0); /* Force GPU layer */
}

/* Dynamic Sizing with CSS Variables */
:root {
    --container-width: 1200px;
    --sidebar-width: 300px;
    --content-width: calc(var(--container-width) - var(--sidebar-width));
}

.dynamic-layout {
    width: var(--content-width);
    max-width: 100%;
}`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Height and Width Mastery</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        /* CSS Custom Properties */
        :root {
            --container-max-width: 1200px;
            --sidebar-width: 300px;
            --header-height: 80px;
            --padding-base: 1rem;
            --color-primary: #3498db;
            --color-secondary: #2ecc71;
            --color-accent: #e74c3c;
        }
        
        .main-container {
            max-width: var(--container-max-width);
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            min-height: calc(100vh - 40px);
            margin-top: 20px;
            margin-bottom: 20px;
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 2rem;
            text-align: center;
            height: var(--header-height);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            min-height: 120px;
        }
        
        .header h1 {
            font-size: clamp(1.5rem, 4vw, 2.5rem);
            margin-bottom: 0.5rem;
        }
        
        /* Demonstration Sections */
        .demo-section {
            padding: 2rem;
            border-bottom: 1px solid #ecf0f1;
        }
        
        .demo-section:last-child {
            border-bottom: none;
        }
        
        .section-title {
            color: #2c3e50;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid var(--color-primary);
            padding-bottom: 0.5rem;
        }
        
        /* Fixed Dimensions Demo */
        .fixed-demo {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .fixed-box {
            width: 200px;
            height: 150px;
            background: linear-gradient(135deg, var(--color-primary), #2980b9);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            font-weight: bold;
            text-align: center;
        }
        
        /* Responsive Dimensions Demo */
        .responsive-demo {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .responsive-box {
            background: linear-gradient(135deg, var(--color-secondary), #27ae60);
            color: white;
            padding: 2rem 1rem;
            border-radius: 12px;
            text-align: center;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        
        .responsive-box-1 {
            width: 100%;
            max-width: 400px;
        }
        
        .responsive-box-2 {
            width: clamp(200px, 50%, 500px);
        }
        
        .responsive-box-3 {
            width: 100%;
            height: clamp(150px, 20vh, 300px);
        }
        
        /* Viewport Units Demo */
        .viewport-demo {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            height: 300px;
        }
        
        .viewport-box {
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            font-weight: bold;
            text-align: center;
        }
        
        .vw-box {
            width: 30vw;
            min-width: 150px;
            max-width: 300px;
        }
        
        .vh-box {
            width: 200px;
            height: 25vh;
            min-height: 100px;
        }
        
        .vmin-box {
            width: 20vmin;
            height: 20vmin;
            min-width: 100px;
            min-height: 100px;
        }
        
        /* Aspect Ratio Demo */
        .aspect-ratio-demo {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .aspect-ratio-container {
            background: #f8f9fa;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .aspect-16-9 {
            aspect-ratio: 16 / 9;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        
        .aspect-1-1 {
            aspect-ratio: 1 / 1;
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            font-weight: bold;
        }
        
        .aspect-4-3 {
            aspect-ratio: 4 / 3;
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            font-weight: bold;
        }
        
        /* Intrinsic Sizing Demo */
        .intrinsic-demo {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .intrinsic-box {
            background: #e8f8f5;
            border: 2px solid var(--color-secondary);
            border-radius: 8px;
            padding: 1rem;
            color: #27ae60;
            font-weight: bold;
        }
        
        .fit-content {
            width: fit-content;
            max-width: 300px;
        }
        
        .max-content {
            width: max-content;
            max-width: 400px;
        }
        
        .min-content {
            width: min-content;
            min-width: 150px;
        }
        
        /* Responsive Image Demo */
        .image-demo {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .image-container {
            background: #f1c40f;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            text-align: center;
            min-height: 150px;
        }
        
        .responsive-image {
            width: 100%;
            height: auto;
        }
        
        .square-image {
            width: 150px;
            height: 150px;
            object-fit: cover;
        }
        
        .cover-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        
        /* Interactive Resize Demo */
        .resize-demo {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
        }
        
        .resizable-container {
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
            border-radius: 8px;
            padding: 2rem;
            resize: both;
            overflow: auto;
            min-width: 200px;
            min-height: 150px;
            max-width: 100%;
            max-height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-weight: bold;
        }
        
        /* Media Query Demonstration */
        .media-query-demo {
            background: #e8f4f8;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
        }
        
        .responsive-grid {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr; /* Mobile: single column */
        }
        
        .grid-item {
            background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%);
            color: white;
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
            font-weight: bold;
            min-height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        @media (min-width: 768px) {
            .responsive-grid {
                grid-template-columns: 1fr 1fr; /* Tablet: two columns */
            }
        }
        
        @media (min-width: 1200px) {
            .responsive-grid {
                grid-template-columns: 1fr 1fr 1fr; /* Desktop: three columns */
            }
        }
        
        /* Best Practices Section */
        .best-practices {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            border-radius: 12px;
        }
        
        .best-practices h3 {
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .best-practices ul {
            list-style: none;
            padding: 0;
        }
        
        .best-practices li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .best-practices li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #2ecc71;
            font-weight: bold;
        }
        
        /* Responsive Typography */
        .demo-text {
            font-size: 0.9rem;
            color: #666;
            margin-top: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .viewport-demo {
                flex-direction: column;
                height: auto;
            }
            
            .viewport-box {
                width: 100% !important;
                height: 100px;
            }
            
            .intrinsic-demo {
                flex-direction: column;
            }
            
            .intrinsic-box {
                width: 100% !important;
            }
        }
    </style>
</head>
<body>
    <div class="main-container">
        <header class="header">
            <h1>CSS Height and Width Mastery</h1>
            <p>Master element dimensions and responsive sizing techniques</p>
        </header>
        
        <main>
            <section class="demo-section">
                <h2 class="section-title">Fixed Dimensions</h2>
                <div class="fixed-demo">
                    <div class="fixed-box">
                        200px × 150px<br>
                        <span class="demo-text">Fixed Size</span>
                    </div>
                    <div class="fixed-box" style="width: 250px; height: 100px;">
                        250px × 100px<br>
                        <span class="demo-text">Different Fixed</span>
                    </div>
                    <div class="fixed-box" style="width: 180px; height: 180px;">
                        180px × 180px<br>
                        <span class="demo-text">Square</span>
                    </div>
                </div>
                <p style="color: #7f8c8d;">Fixed dimensions use absolute units like pixels and don't adapt to screen size.</p>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Responsive Dimensions</h2>
                <div class="responsive-demo">
                    <div class="responsive-box responsive-box-1">
                        <div>100% width</div>
                        <div class="demo-text">max-width: 400px</div>
                    </div>
                    <div class="responsive-box responsive-box-2">
                        <div>clamp(200px, 50%, 500px)</div>
                        <div class="demo-text">Fluid scaling</div>
                    </div>
                    <div class="responsive-box responsive-box-3">
                        <div>100% width</div>
                        <div class="demo-text">clamp(150px, 20vh, 300px) height</div>
                    </div>
                </div>
                <p style="color: #7f8c8d;">Responsive dimensions adapt to screen size using percentages, viewport units, and CSS functions.</p>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Viewport Units</h2>
                <div class="viewport-demo">
                    <div class="viewport-box vw-box">
                        <div>30vw<br><span class="demo-text">30% of viewport width</span></div>
                    </div>
                    <div class="viewport-box vh-box">
                        <div>25vh<br><span class="demo-text">25% of viewport height</span></div>
                    </div>
                    <div class="viewport-box vmin-box">
                        <div>20vmin<br><span class="demo-text">20% of smaller dimension</span></div>
                    </div>
                </div>
                <p style="color: #7f8c8d;">Viewport units create layouts that scale with the browser window size.</p>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Aspect Ratios</h2>
                <div class="aspect-ratio-demo">
                    <div class="aspect-ratio-container">
                        <div class="aspect-16-9">
                            16:9 Aspect Ratio<br>
                            <span class="demo-text">Perfect for videos</span>
                        </div>
                    </div>
                    <div class="aspect-ratio-container">
                        <div class="aspect-1-1">
                            1:1 Aspect Ratio<br>
                            <span class="demo-text">Perfect square</span>
                        </div>
                    </div>
                    <div class="aspect-ratio-container">
                        <div class="aspect-4-3">
                            4:3 Aspect Ratio<br>
                            <span class="demo-text">Classic display ratio</span>
                        </div>
                    </div>
                </div>
                <p style="color: #7f8c8d;">Modern CSS aspect-ratio property maintains proportions automatically.</p>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Intrinsic Sizing</h2>
                <div class="intrinsic-demo">
                    <div class="intrinsic-box fit-content">
                        fit-content: This box sizes to fit its content but respects max-width
                    </div>
                    <div class="intrinsic-box max-content">
                        max-content: This box sizes to its longest line without wrapping
                    </div>
                    <div class="intrinsic-box min-content">
                        min-content: This box wraps as much as possible while respecting min-width
                    </div>
                </div>
                <p style="color: #7f8c8d;">Intrinsic sizing keywords let elements size themselves based on their content.</p>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Responsive Images</h2>
                <div class="image-demo">
                    <div class="image-container responsive-image">
                        100% width<br>auto height<br>
                        <span class="demo-text">Maintains aspect ratio</span>
                    </div>
                    <div class="image-container square-image">
                        150px × 150px<br>
                        <span class="demo-text">Fixed square</span>
                    </div>
                    <div class="image-container cover-image">
                        100% width<br>200px height<br>
                        <span class="demo-text">object-fit: cover</span>
                    </div>
                </div>
                <p style="color: #7f8c8d;">Different approaches to sizing images for various layout needs.</p>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Interactive Resize</h2>
                <div class="resize-demo">
                    <div class="resizable-container">
                        Drag the corner to resize me!<br>
                        <span class="demo-text">resize: both property</span>
                    </div>
                </div>
                <p style="color: #7f8c8d;">The resize property allows users to manually adjust element dimensions.</p>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Responsive Grid Layout</h2>
                <div class="media-query-demo">
                    <div class="responsive-grid">
                        <div class="grid-item">Grid Item 1</div>
                        <div class="grid-item">Grid Item 2</div>
                        <div class="grid-item">Grid Item 3</div>
                        <div class="grid-item">Grid Item 4</div>
                    </div>
                </div>
                <p style="color: #7f8c8d;">
                    Resize your browser to see the grid adapt:<br>
                    • Mobile: 1 column<br>
                    • Tablet: 2 columns<br>
                    • Desktop: 3 columns
                </p>
            </section>
            
            <div class="best-practices">
                <h3>Height and Width Best Practices</h3>
                <ul>
                    <li>Use relative units (%, vw, vh) for responsive designs</li>
                    <li>Set max-width on containers to prevent overly wide layouts</li>
                    <li>Use min-height instead of height for flexible content areas</li>
                    <li>Implement aspect-ratio for consistent proportions</li>
                    <li>Use clamp() for truly fluid sizing with constraints</li>
                    <li>Consider intrinsic sizing keywords for content-driven layouts</li>
                    <li>Always test across different screen sizes and orientations</li>
                    <li>Use CSS Grid and Flexbox for complex layout scenarios</li>
                    <li>Optimize images with proper sizing attributes</li>
                    <li>Consider accessibility when setting minimum touch target sizes</li>
                </ul>
            </div>
        </main>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "15 min",
    },
    {
      id: "css-box-model",
      title: "CSS Box Model",
      content: `
        <h2>Understanding the CSS Box Model</h2>
        <p>The CSS box model is fundamental to understanding how elements are sized and spaced on a webpage. Every element is essentially a rectangular box with content, padding, borders, and margins.</p>
        
        <h3>Box Model Components</h3>
        <ul>
          <li><strong>Content</strong> - The actual content (text, images, etc.)</li>
          <li><strong>Padding</strong> - Space between content and border</li>
          <li><strong>Border</strong> - Line around the padding and content</li>
          <li><strong>Margin</strong> - Space outside the border</li>
        </ul>
        
        <h3>Box Sizing Models</h3>
        <ul>
          <li><strong>content-box</strong> - Default, width/height applies to content only</li>
          <li><strong>border-box</strong> - Width/height includes padding and border</li>
          <li><strong>inherit</strong> - Inherits box-sizing from parent</li>
        </ul>
        
        <h3>Visual Box Model</h3>
        <p>Total width = margin + border + padding + content + padding + border + margin</p>
        <p>Total height = margin + border + padding + content + padding + border + margin</p>
        
        <h3>Box Model in Different Contexts</h3>
        <ul>
          <li>Block vs inline elements</li>
          <li>Flexbox and Grid impact</li>
          <li>Replaced vs non-replaced elements</li>
          <li>Absolutely positioned elements</li>
        </ul>
        
        <h3>Modern Box Model Features</h3>
        <ul>
          <li>Logical properties for international layouts</li>
          <li>Container queries and box model</li>
          <li>CSS containment and box model</li>
        </ul>
      `,
      codeExample: `/* Default Box Model (content-box) */
.content-box {
    box-sizing: content-box; /* Default value */
    width: 300px; /* Content width only */
    height: 200px; /* Content height only */
    padding: 20px; /* Adds to total size */
    border: 5px solid #333; /* Adds to total size */
    margin: 10px; /* Doesn't affect element size, but affects spacing */
    
    /* Total width = 300px + 20px + 20px + 5px + 5px = 350px */
    /* Total height = 200px + 20px + 20px + 5px + 5px = 250px */
}

/* Border Box Model (Recommended) */
.border-box {
    box-sizing: border-box; /* Modern approach */
    width: 300px; /* Total width including padding and border */
    height: 200px; /* Total height including padding and border */
    padding: 20px; /* Included in width/height */
    border: 5px solid #333; /* Included in width/height */
    margin: 10px; /* Still affects spacing, not size */
    
    /* Content width = 300px - 20px - 20px - 5px - 5px = 250px */
    /* Content height = 200px - 20px - 20px - 5px - 5px = 150px */
}

/* Universal Border Box (Best Practice) */
*,
*::before,
*::after {
    box-sizing: border-box;
}

/* Box Model Visualization Helper */
.debug-box {
    /* Content area */
    background-color: lightblue;
    
    /* Padding area */
    padding: 20px;
    background-clip: content-box; /* Only content gets background */
    
    /* Border area */
    border: 10px solid rgba(255, 0, 0, 0.3);
    
    /* Margin area (invisible) */
    margin: 15px;
    
    /* Visual margin indicator */
    box-shadow: 0 0 0 15px rgba(255, 255, 0, 0.2);
}

/* Demonstrating Different Box Types */
.block-element {
    display: block;
    width: 100%; /* Full width of parent */
    padding: 1rem;
    margin: 1rem 0;
    border: 2px solid #3498db;
    background: #ecf0f1;
}

.inline-element {
    display: inline;
    /* Width and height ignored for inline elements */
    width: 200px; /* Has no effect */
    height: 100px; /* Has no effect */
    padding: 0.5rem 1rem; /* Only horizontal padding affects layout */
    margin: 1rem; /* Only horizontal margin affects layout */
    border: 2px solid #e74c3c;
    background: #fadbd8;
}

.inline-block-element {
    display: inline-block;
    width: 200px; /* Respected */
    height: 100px; /* Respected */
    padding: 1rem;
    margin: 0.5rem;
    border: 2px solid #2ecc71;
    background: #d5f4e6;
    vertical-align: top; /* Align with other inline-block elements */
}

/* Box Model with Flexbox */
.flex-container {
    display: flex;
    gap: 1rem; /* Modern way to add space between flex items */
}

.flex-item {
    flex: 1; /* Grow to fill available space */
    padding: 1rem;
    border: 2px solid #9b59b6;
    background: #f4ecf7;
    
    /* Box model still applies within flex items */
    box-sizing: border-box;
}

/* Box Model with Grid */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem; /* Space between grid items */
}

.grid-item {
    padding: 1rem;
    border: 2px solid #f39c12;
    background: #fef9e7;
    
    /* Box model applies within grid areas */
    box-sizing: border-box;
}

/* Collapsing Margins Example */
.margin-collapse-parent {
    background: #d1ecf1;
    border: 1px solid #bee5eb;
    margin-bottom: 30px; /* This margin... */
}

.margin-collapse-child {
    background: #d4edda;
    border: 1px solid #c3e6cb;
    margin-top: 20px; /* ...collapses with this margin */
    margin-bottom: 20px;
    padding: 1rem;
}

/* Preventing Margin Collapse */
.no-collapse-parent {
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    padding: 1px; /* Prevents margin collapse */
    margin-bottom: 30px;
}

/* Absolutely Positioned Box Model */
.positioned-element {
    position: absolute;
    top: 50px;
    left: 50px;
    width: 200px;
    height: 150px;
    padding: 20px;
    border: 5px solid #17a2b8;
    margin: 10px; /* Affects position calculation */
    background: #d1ecf1;
    box-sizing: border-box;
}

/* Box Model for Form Elements */
.form-input {
    box-sizing: border-box; /* Ensures consistent sizing */
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
    background: white;
    
    /* Focus state */
    transition: border-color 0.3s ease;
}

.form-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

/* Box Model with CSS Variables */
:root {
    --box-padding: 1rem;
    --box-border-width: 2px;
    --box-margin: 1rem;
}

.variable-box {
    padding: var(--box-padding);
    border: var(--box-border-width) solid #6c757d;
    margin: var(--box-margin);
    background: #f8f9fa;
    box-sizing: border-box;
}

/* Responsive Box Model */
.responsive-box {
    width: 100%;
    max-width: 400px;
    padding: 1rem;
    border: 2px solid #28a745;
    margin: 0 auto 2rem auto;
    background: #d4edda;
    box-sizing: border-box;
}

@media (min-width: 768px) {
    .responsive-box {
        padding: 2rem;
        max-width: 600px;
    }
}

/* Box Model Debugging */
.debug-all * {
    box-shadow: inset 0 0 0 1px red !important;
}

.debug-padding {
    background: rgba(0, 255, 0, 0.1) !important;
}

.debug-border {
    border: 1px solid red !important;
}

.debug-margin {
    box-shadow: 0 0 0 1px blue !important;
}

/* Modern Logical Properties */
.logical-box {
    /* Logical equivalents of physical properties */
    inline-size: 300px; /* width in horizontal writing mode */
    block-size: 200px; /* height in horizontal writing mode */
    padding-inline: 1rem; /* left and right padding */
    padding-block: 0.5rem; /* top and bottom padding */
    border-inline: 2px solid #007bff; /* left and right border */
    border-block: 1px solid #007bff; /* top and bottom border */
    margin-inline: auto; /* center horizontally */
    margin-block: 1rem; /* top and bottom margin */
}

/* Print Box Model Considerations */
@media print {
    .print-box {
        box-sizing: border-box;
        width: 100% !important;
        margin: 0 !important;
        padding: 0.5in;
        border: none !important;
        page-break-inside: avoid;
    }
}

/* High DPI / Retina Display Considerations */
@media (-webkit-min-device-pixel-ratio: 2) {
    .retina-box {
        border-width: 0.5px; /* Thinner borders on high DPI displays */
    }
}

/* Container Query Box Model */
@container (min-width: 400px) {
    .container-responsive-box {
        padding: 2rem;
        border-width: 3px;
    }
}`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Box Model Interactive Demo</title>
    <style>
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin: 0 0 1rem 0;
        }
        
        .main-content {
            padding: 2rem;
        }
        
        /* Box Model Visualization */
        .box-model-demo {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            margin-bottom: 3rem;
        }
        
        .box-example {
            text-align: center;
        }
        
        .content-box-visual {
            width: 200px;
            height: 150px;
            margin: 20px auto;
            position: relative;
            
            /* Content area */
            background: #3498db;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            
            /* Padding (shown as lighter blue) */
            padding: 20px;
            background-clip: content-box;
            box-shadow: 
                /* Padding area */
                0 0 0 20px rgba(52, 152, 219, 0.5),
                /* Border area */
                0 0 0 25px #e74c3c,
                /* Margin area (yellow outline) */
                0 0 0 45px rgba(241, 196, 15, 0.3);
            
            /* Border */
            border: 5px solid #e74c3c;
            
            /* Box sizing */
            box-sizing: content-box;
        }
        
        .border-box-visual {
            width: 200px;
            height: 150px;
            margin: 20px auto;
            position: relative;
            
            /* Content area */
            background: #2ecc71;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            
            /* Padding */
            padding: 20px;
            
            /* Border */
            border: 5px solid #e67e22;
            
            /* Margin visualization */
            box-shadow: 0 0 0 20px rgba(241, 196, 15, 0.3);
            
            /* Box sizing */
            box-sizing: border-box;
        }
        
        .box-details {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            font-size: 0.9rem;
            text-align: left;
        }
        
        .box-calculation {
            background: #e9ecef;
            padding: 0.5rem;
            border-radius: 4px;
            margin-top: 0.5rem;
            font-family: monospace;
            font-size: 0.8rem;
        }
        
        /* Interactive Box Model */
        .interactive-section {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 3rem;
        }
        
        .interactive-box {
            width: 250px;
            height: 200px;
            margin: 2rem auto;
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
            color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-weight: bold;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            
            /* Default values */
            padding: 1rem;
            border: 3px solid #333;
            box-sizing: border-box;
        }
        
        .interactive-box:hover {
            padding: 2rem;
            border-width: 6px;
            transform: scale(1.05);
        }
        
        .interactive-box::before {
            content: 'Hover to see changes';
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.8rem;
            color: #666;
        }
        
        /* Element Type Demonstrations */
        .element-types {
            margin-bottom: 3rem;
        }
        
        .section-title {
            color: #2c3e50;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #3498db;
        }
        
        .block-demo {
            background: #d5f4e6;
            border: 3px solid #27ae60;
            padding: 1rem;
            margin: 1rem 0;
            width: 100%;
        }
        
        .inline-demo {
            background: #fadbd8;
            border: 3px solid #e74c3c;
            padding: 0.5rem 1rem;
            margin: 0 1rem;
        }
        
        .inline-block-demo {
            display: inline-block;
            background: #d6eaf8;
            border: 3px solid #3498db;
            padding: 1rem;
            margin: 0.5rem;
            width: 200px;
            height: 100px;
            vertical-align: top;
            text-align: center;
        }
        
        /* Margin Collapse Demo */
        .margin-collapse-section {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 3rem;
        }
        
        .collapse-parent {
            background: #d1ecf1;
            border: 2px solid #bee5eb;
            margin-bottom: 30px;
            position: relative;
        }
        
        .collapse-parent::after {
            content: 'Parent margin-bottom: 30px';
            position: absolute;
            bottom: -15px;
            right: 0;
            font-size: 0.7rem;
            color: #17a2b8;
            background: white;
            padding: 2px 4px;
            border: 1px solid #17a2b8;
            border-radius: 3px;
        }
        
        .collapse-child {
            background: #d4edda;
            border: 2px solid #c3e6cb;
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 1rem;
            position: relative;
        }
        
        .collapse-child::before {
            content: 'Child margin-top: 20px';
            position: absolute;
            top: -15px;
            left: 0;
            font-size: 0.7rem;
            color: #155724;
            background: white;
            padding: 2px 4px;
            border: 1px solid #155724;
            border-radius: 3px;
        }
        
        .actual-margin {
            background: #f8d7da;
            border: 2px solid #f5c6cb;
            padding: 1rem;
            text-align: center;
            font-weight: bold;
            color: #721c24;
        }
        
        /* Flexbox and Grid with Box Model */
        .layout-demos {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        .flex-demo {
            background: #e8f4f8;
            padding: 1rem;
            border-radius: 8px;
        }
        
        .flex-container {
            display: flex;
            gap: 1rem;
        }
        
        .flex-item {
            flex: 1;
            background: #3498db;
            color: white;
            padding: 1rem;
            border: 2px solid #2980b9;
            border-radius: 4px;
            text-align: center;
            font-weight: bold;
        }
        
        .grid-demo {
            background: #f0f8e8;
            padding: 1rem;
            border-radius: 8px;
        }
        
        .grid-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }
        
        .grid-item {
            background: #27ae60;
            color: white;
            padding: 1rem;
            border: 2px solid #1e8449;
            border-radius: 4px;
            text-align: center;
            font-weight: bold;
        }
        
        /* Box Model Controls */
        .controls-section {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 3rem;
        }
        
        .control-box {
            width: 200px;
            height: 150px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 2rem auto;
            transition: all 0.3s ease;
            font-weight: bold;
            text-align: center;
            
            /* Default styling */
            padding: 10px;
            border: 2px solid #333;
            box-sizing: border-box;
        }
        
        .controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .control-group {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid #dee2e6;
        }
        
        .control-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #495057;
        }
        
        .control-group input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ced4da;
            border-radius: 4px;
        }
        
        /* Best Practices */
        .best-practices {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            border-radius: 12px;
        }
        
        .best-practices h3 {
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .best-practices ul {
            list-style: none;
            padding: 0;
        }
        
        .best-practices li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .best-practices li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #2ecc71;
            font-weight: bold;
        }
        
        @media (max-width: 768px) {
            .box-model-demo,
            .layout-demos {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .controls {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>CSS Box Model Interactive Demo</h1>
            <p>Understand how content, padding, borders, and margins work together</p>
        </header>
        
        <main class="main-content">
            <section>
                <h2 class="section-title">Box Model Comparison</h2>
                <div class="box-model-demo">
                    <div>
                        <h3>content-box (Default)</h3>
                        <div class="content-box-visual">
                            Content
                        </div>
                        <div class="box-details">
                            <strong>Width:</strong> 200px (content only)<br>
                            <strong>Padding:</strong> 20px (adds to size)<br>
                            <strong>Border:</strong> 5px (adds to size)<br>
                            <strong>Margin:</strong> 20px (affects spacing)
                            
                            <div class="box-calculation">
                                Total width = 200px + 40px + 10px = 250px<br>
                                Total height = 150px + 40px + 10px = 200px
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3>border-box (Recommended)</h3>
                        <div class="border-box-visual">
                            Content
                        </div>
                        <div class="box-details">
                            <strong>Width:</strong> 200px (includes padding + border)<br>
                            <strong>Padding:</strong> 20px (included in width)<br>
                            <strong>Border:</strong> 5px (included in width)<br>
                            <strong>Margin:</strong> 20px (affects spacing)
                            
                            <div class="box-calculation">
                                Total width = 200px (fixed)<br>
                                Content width = 200px - 40px - 10px = 150px
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="interactive-section">
                <h2 class="section-title">Interactive Box Model</h2>
                <div class="interactive-box">
                    Box Model Demo<br>
                    <small>Watch the box change!</small>
                </div>
                <p style="text-align: center; color: #666;">
                    This box demonstrates how padding and border changes affect the overall appearance
                </p>
            </section>
            
            <section class="element-types">
                <h2 class="section-title">Element Types and Box Model</h2>
                
                <h3>Block Elements</h3>
                <div class="block-demo">
                    This is a block element. It takes the full width and respects all box model properties.
                </div>
                
                <h3>Inline Elements</h3>
                <p>
                    This paragraph contains 
                    <span class="inline-demo">inline elements</span>
                    that only respect horizontal padding and margins.
                    <span class="inline-demo">Another inline element</span>
                    to show the behavior.
                </p>
                
                <h3>Inline-Block Elements</h3>
                <div style="text-align: center; margin: 2rem 0;">
                    <div class="inline-block-demo">
                        Inline-block 1<br>
                        Respects all properties
                    </div>
                    <div class="inline-block-demo">
                        Inline-block 2<br>
                        Flows horizontally
                    </div>
                    <div class="inline-block-demo">
                        Inline-block 3<br>
                        Can have set dimensions
                    </div>
                </div>
            </section>
            
            <section class="margin-collapse-section">
                <h2 class="section-title">Margin Collapse Demo</h2>
                <div class="collapse-parent">
                    <div style="padding: 1rem;">
                        Parent element with bottom margin
                    </div>
                </div>
                <div class="collapse-child">
                    Child element with top margin
                </div>
                <div class="actual-margin">
                    Actual margin between elements: 30px (larger of the two margins)
                </div>
                <p style="margin-top: 1rem; color: #666;">
                    Adjacent vertical margins collapse into a single margin equal to the largest of the two.
                </p>
            </section>
            
            <section>
                <h2 class="section-title">Modern Layout and Box Model</h2>
                <div class="layout-demos">
                    <div class="flex-demo">
                        <h3>Flexbox</h3>
                        <div class="flex-container">
                            <div class="flex-item">Flex 1</div>
                            <div class="flex-item">Flex 2</div>
                            <div class="flex-item">Flex 3</div>
                        </div>
                        <p style="margin-top: 1rem; color: #666; font-size: 0.9rem;">
                            Flexbox uses gap property for spacing instead of margins
                        </p>
                    </div>
                    
                    <div class="grid-demo">
                        <h3>CSS Grid</h3>
                        <div class="grid-container">
                            <div class="grid-item">Grid 1</div>
                            <div class="grid-item">Grid 2</div>
                            <div class="grid-item">Grid 3</div>
                            <div class="grid-item">Grid 4</div>
                        </div>
                        <p style="margin-top: 1rem; color: #666; font-size: 0.9rem;">
                            Grid also uses gap property for consistent spacing
                        </p>
                    </div>
                </div>
            </section>
            
            <div class="best-practices">
                <h3>Box Model Best Practices</h3>
                <ul>
                    <li>Always use box-sizing: border-box for predictable sizing</li>
                    <li>Use CSS reset or normalize to standardize box model behavior</li>
                    <li>Prefer flexbox/grid gap over margins for component spacing</li>
                    <li>Understand margin collapse and how to prevent it when needed</li>
                    <li>Use developer tools to visualize the box model while debugging</li>
                    <li>Consider the box model when creating responsive designs</li>
                    <li>Use logical properties for international layouts</li>
                    <li>Be mindful of box model differences between element types</li>
                    <li>Test your layouts across different browsers and devices</li>
                    <li>Use consistent spacing scales throughout your design system</li>
                </ul>
            </div>
        </main>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "18 min",
    },
    {
      id: "css-rounded-corners",
      title: "CSS Rounded Corners",
      content: `
        <h2>CSS Rounded Corners</h2>
        <p>Create rounded corners using <code>border-radius</code>. Control individual corners with specific properties and create elliptical shapes with different horizontal and vertical radii.</p>
        
        <h3>Border Radius Properties</h3>
        <ul>
          <li><strong>border-radius</strong> - All corners</li>
          <li><strong>border-top-left-radius</strong> - Top left corner</li>
          <li><strong>border-top-right-radius</strong> - Top right corner</li>
          <li><strong>border-bottom-left-radius</strong> - Bottom left corner</li>
          <li><strong>border-bottom-right-radius</strong> - Bottom right corner</li>
        </ul>
      `,
      codeExample: `/* Basic Rounded Corners */
.rounded {
  border-radius: 10px; /* All corners */
}

.specific-corners {
  border-radius: 10px 20px 30px 40px; /* Top-left, top-right, bottom-right, bottom-left */
}

/* Perfect Circle */
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

/* Elliptical Corners */
.elliptical {
  border-radius: 50px / 25px; /* Horizontal / Vertical radius */
}

/* Complex Shapes */
.organic-shape {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
.rounded { border-radius: 15px; background: #4ecdc4; color: white; padding: 20px; margin: 10px; }
.circle { width: 100px; height: 100px; border-radius: 50%; background: #e74c3c; color: white; display: flex; align-items: center; justify-content: center; margin: 10px; }
.elliptical { border-radius: 60px / 30px; background: #f39c12; color: white; padding: 20px; margin: 10px; }
</style>
</head>
<body>
<div class="rounded">Rounded Corners</div>
<div class="circle">Circle</div>
<div class="elliptical">Elliptical</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "10 min",
    },
    {
      id: "css-border-images",
      title: "CSS Border Images",
      content: `
        <h2>CSS Border Images</h2>
        <p>Use images as borders with <code>border-image</code>. Control how images are sliced, scaled, and repeated around element borders for decorative effects.</p>
        
        <h3>Border Image Properties</h3>
        <ul>
          <li><strong>border-image-source</strong> - Image URL or gradient</li>
          <li><strong>border-image-slice</strong> - How to slice the image</li>
          <li><strong>border-image-width</strong> - Border image width</li>
          <li><strong>border-image-repeat</strong> - How to repeat border image</li>
        </ul>
      `,
      codeExample: `/* Gradient Border Image */
.gradient-border {
  border: 3px solid transparent;
  border-image: linear-gradient(45deg, #ff6b6b, #4ecdc4) 1;
}

/* Animated Gradient Border */
.animated-border {
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4) 1;
  animation: gradient-animation 3s ease infinite;
}

@keyframes gradient-animation {
  0% { border-image: linear-gradient(0deg, #ff6b6b, #4ecdc4) 1; }
  50% { border-image: linear-gradient(180deg, #45b7d1, #96ceb4) 1; }
  100% { border-image: linear-gradient(360deg, #ff6b6b, #4ecdc4) 1; }
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
.gradient-border {
  border: 4px solid transparent;
  border-image: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1) 1;
  padding: 20px;
  margin: 20px;
  background: white;
}
.animated-gradient {
  border: 3px solid transparent;
  border-image: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4) 1;
  padding: 20px;
  margin: 20px;
  animation: rotate-gradient 3s linear infinite;
}
@keyframes rotate-gradient {
  0% { border-image: linear-gradient(0deg, #ff6b6b, #4ecdc4) 1; }
  100% { border-image: linear-gradient(360deg, #ff6b6b, #4ecdc4) 1; }
}
</style>
</head>
<body>
<div class="gradient-border">Gradient Border</div>
<div class="animated-gradient">Animated Border</div>
</body>
</html>`,
      language: "css",
      difficulty: "advanced" as const,
      estimatedTime: "10 min",
    },
    {
      id: "css-gradients",
      title: "CSS Gradients",
      content: `
        <h2>CSS Gradients</h2>
        <p>Create smooth color transitions with <code>linear-gradient</code>, <code>radial-gradient</code>, <code>conic-gradient</code>, and <code>repeating</code> variants for stunning visual effects.</p>
        
        <h3>Gradient Types</h3>
        <ul>
          <li><strong>linear-gradient</strong> - Straight line transitions</li>
          <li><strong>radial-gradient</strong> - Circular/elliptical transitions</li>
          <li><strong>conic-gradient</strong> - Rotational transitions</li>
          <li><strong>repeating variants</strong> - Pattern-based gradients</li>
        </ul>
      `,
      codeExample: `/* Linear Gradients */
.linear-gradient {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

.multi-color {
  background: linear-gradient(to right, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%);
}

/* Radial Gradients */
.radial-gradient {
  background: radial-gradient(circle, #ff6b6b, #4ecdc4);
}

/* Conic Gradients */
.conic-gradient {
  background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b);
}

/* Animated Gradient */
.animated-gradient {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient-shift 4s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
.gradient-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.gradient-box { height: 150px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
.linear { background: linear-gradient(45deg, #ff6b6b, #4ecdc4); }
.radial { background: radial-gradient(circle, #667eea, #764ba2); }
.conic { background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b); }
.animated { background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab); background-size: 400% 400%; animation: gradient-shift 4s ease infinite; }
@keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
</style>
</head>
<body>
<div class="gradient-container">
<div class="gradient-box linear">Linear</div>
<div class="gradient-box radial">Radial</div>
<div class="gradient-box conic">Conic</div>
<div class="gradient-box animated">Animated</div>
</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "12 min",
    },
    {
      id: "css-shadows",
      title: "CSS Shadows",
      content: `
        <h2>CSS Shadows</h2>
        <p>Add depth and dimension with <code>box-shadow</code> and <code>text-shadow</code>. Create realistic lighting effects, elevation, and visual hierarchy.</p>
        
        <h3>Shadow Properties</h3>
        <ul>
          <li><strong>box-shadow</strong> - Element shadows with blur, spread, color</li>
          <li><strong>text-shadow</strong> - Text shadows for typography effects</li>
          <li><strong>Multiple shadows</strong> - Layered shadow effects</li>
          <li><strong>Inset shadows</strong> - Inner shadow effects</li>
        </ul>
      `,
      codeExample: `/* Basic Box Shadow */
.basic-shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Material Design Shadows */
.elevation-1 { box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); }
.elevation-2 { box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); }
.elevation-3 { box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); }

/* Text Shadows */
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.glowing-text {
  text-shadow: 0 0 10px #4ecdc4, 0 0 20px #4ecdc4, 0 0 30px #4ecdc4;
}

/* Neumorphism */
.neumorphism {
  background: #e0e0e0;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
body { background: #f0f0f0; padding: 20px; font-family: Arial, sans-serif; }
.shadow-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.shadow-box { padding: 20px; background: white; border-radius: 8px; text-align: center; }
.basic { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
.elevation-2 { box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); }
.colored { box-shadow: 0 8px 16px rgba(255, 107, 107, 0.4); }
.neumorphism { background: #e0e0e0; box-shadow: 12px 12px 24px #bebebe, -12px -12px 24px #ffffff; }
.glowing-text { color: #4ecdc4; text-shadow: 0 0 10px #4ecdc4, 0 0 20px #4ecdc4; font-size: 1.5rem; font-weight: bold; }
</style>
</head>
<body>
<div class="shadow-grid">
<div class="shadow-box basic">Basic Shadow</div>
<div class="shadow-box elevation-2">Material Design</div>
<div class="shadow-box colored">Colored Shadow</div>
<div class="shadow-box neumorphism">Neumorphism</div>
</div>
<div style="text-align: center; margin-top: 30px;">
<div class="glowing-text">Glowing Text Effect</div>
</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "12 min",
    },
    {
      id: "css-text-effects",
      title: "CSS Text Effects",
      content: `
        <h2>CSS Text Effects</h2>
        <p>Create stunning typography with advanced text effects using <code>text-shadow</code>, <code>background-clip</code>, transforms, and animations.</p>
        
        <h3>Text Effect Techniques</h3>
        <ul>
          <li><strong>Gradient text</strong> - Using background-clip: text</li>
          <li><strong>Outlined text</strong> - Text stroke effects</li>
          <li><strong>3D text</strong> - Multiple shadow layers</li>
          <li><strong>Glowing text</strong> - Neon and glow effects</li>
        </ul>
      `,
      codeExample: `/* Gradient Text */
.gradient-text {
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 3D Text Effect */
.text-3d {
  text-shadow: 
    1px 1px 0 #ccc,
    2px 2px 0 #c9c9c9,
    3px 3px 0 #bbb,
    4px 4px 0 #b9b9b9,
    5px 5px 0 #aaa,
    6px 6px 1px rgba(0,0,0,.1),
    0 0 5px rgba(0,0,0,.1),
    1px 1px 3px rgba(0,0,0,.3),
    3px 3px 5px rgba(0,0,0,.2),
    5px 5px 10px rgba(0,0,0,.25);
}

/* Neon Text */
.neon-text {
  color: #fff;
  text-shadow: 
    0 0 5px #ff6b6b,
    0 0 10px #ff6b6b,
    0 0 20px #ff6b6b,
    0 0 40px #ff6b6b;
}

/* Outlined Text */
.outlined-text {
  color: transparent;
  -webkit-text-stroke: 2px #333;
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
body { background: #2c3e50; padding: 40px; font-family: Arial, sans-serif; text-align: center; }
.text-effect { font-size: 3rem; font-weight: bold; margin: 30px 0; }
.gradient-text { background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.text-3d { color: #fff; text-shadow: 1px 1px 0 #ccc, 2px 2px 0 #c9c9c9, 3px 3px 0 #bbb, 4px 4px 0 #b9b9b9, 5px 5px 0 #aaa; }
.neon-text { color: #fff; text-shadow: 0 0 5px #ff6b6b, 0 0 10px #ff6b6b, 0 0 20px #ff6b6b, 0 0 40px #ff6b6b; }
.outlined-text { color: transparent; -webkit-text-stroke: 2px #4ecdc4; }
.glowing { color: #4ecdc4; text-shadow: 0 0 10px #4ecdc4, 0 0 20px #4ecdc4, 0 0 30px #4ecdc4; animation: glow 2s ease-in-out infinite alternate; }
@keyframes glow { from { text-shadow: 0 0 10px #4ecdc4, 0 0 20px #4ecdc4, 0 0 30px #4ecdc4; } to { text-shadow: 0 0 20px #4ecdc4, 0 0 30px #4ecdc4, 0 0 40px #4ecdc4; } }
</style>
</head>
<body>
<div class="text-effect gradient-text">Gradient Text</div>
<div class="text-effect text-3d">3D Text Effect</div>
<div class="text-effect neon-text">Neon Text</div>
<div class="text-effect outlined-text">Outlined Text</div>
<div class="text-effect glowing">Glowing Text</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "12 min",
    },
    {
      id: "css-web-fonts",
      title: "CSS Web Fonts",
      content: `
        <h2>CSS Web Fonts</h2>
        <p>Use custom fonts with <code>@font-face</code>, Google Fonts, and font loading strategies. Optimize font performance with <code>font-display</code> and preloading.</p>
        
        <h3>Font Loading Methods</h3>
        <ul>
          <li><strong>@font-face</strong> - Custom font files</li>
          <li><strong>Google Fonts</strong> - Web font service</li>
          <li><strong>font-display</strong> - Loading behavior control</li>
          <li><strong>Preloading</strong> - Performance optimization</li>
        </ul>
      `,
      codeExample: `/* Custom Font with @font-face */
@font-face {
  font-family: 'MyCustomFont';
  src: url('mycustomfont.woff2') format('woff2'),
       url('mycustomfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Font Stack for Fallbacks */
body {
  font-family: 'MyCustomFont', 'Helvetica Neue', Arial, sans-serif;
}

/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.modern-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

/* Variable Fonts */
@font-face {
  font-family: 'VariableFont';
  src: url('variable-font.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-stretch: 50% 200%;
}

.variable-text {
  font-family: 'VariableFont', sans-serif;
  font-variation-settings: 'wght' 600, 'wdth' 120;
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
<style>
body { margin: 0; padding: 40px; background: #f8f9fa; }
.font-demo { margin: 30px 0; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.system-font { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
.google-font-1 { font-family: 'Inter', sans-serif; font-weight: 500; }
.google-font-2 { font-family: 'Playfair Display', serif; font-weight: 700; }
.font-weights { font-family: 'Inter', sans-serif; }
.weight-400 { font-weight: 400; }
.weight-500 { font-weight: 500; }
.weight-600 { font-weight: 600; }
.weight-700 { font-weight: 700; }
h2 { color: #2c3e50; margin-bottom: 15px; }
p { font-size: 1.1rem; line-height: 1.6; color: #555; }
</style>
</head>
<body>
<div class="font-demo">
<h2 class="system-font">System Font Stack</h2>
<p class="system-font">This uses the system font stack for optimal performance and native appearance on each platform.</p>
</div>

<div class="font-demo">
<h2 class="google-font-1">Google Font - Inter</h2>
<p class="google-font-1">Inter is a modern, highly legible font designed for user interfaces and digital screens.</p>
</div>

<div class="font-demo">
<h2 class="google-font-2">Google Font - Playfair Display</h2>
<p class="google-font-2">Playfair Display is an elegant serif font perfect for headings and display text.</p>
</div>

<div class="font-demo font-weights">
<h2>Font Weight Variations</h2>
<p class="weight-400">Font Weight 400 (Normal) - Standard text weight for body content.</p>
<p class="weight-500">Font Weight 500 (Medium) - Slightly bolder for emphasis.</p>
<p class="weight-600">Font Weight 600 (Semi-bold) - Good for subheadings.</p>
<p class="weight-700">Font Weight 700 (Bold) - Strong emphasis and headings.</p>
</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "10 min",
    },
    {
      id: "css-2d-transforms",
      title: "CSS 2D Transforms",
      content: `
        <h2>CSS 2D Transforms</h2>
        <p>Transform elements in 2D space using <code>rotate</code>, <code>scale</code>, <code>translate</code>, <code>skew</code>, and <code>matrix</code> functions for dynamic layouts and animations.</p>
        
        <h3>2D Transform Functions</h3>
        <ul>
          <li><strong>translate()</strong> - Move elements horizontally/vertically</li>
          <li><strong>rotate()</strong> - Rotate elements around center point</li>
          <li><strong>scale()</strong> - Resize elements proportionally</li>
          <li><strong>skew()</strong> - Distort elements along axes</li>
        </ul>
      `,
      codeExample: `/* Basic 2D Transforms */
.translate { transform: translate(50px, 100px); }
.rotate { transform: rotate(45deg); }
.scale { transform: scale(1.5); }
.skew { transform: skew(15deg, 5deg); }

/* Combined Transforms */
.combined {
  transform: translate(50px, 50px) rotate(45deg) scale(1.2);
}

/* Transform Origin */
.custom-origin {
  transform: rotate(45deg);
  transform-origin: top left;
}

/* Hover Effects */
.hover-transform {
  transition: transform 0.3s ease;
}

.hover-transform:hover {
  transform: scale(1.1) rotate(5deg);
}

/* 3D-like Effects */
.card-flip {
  transform: perspective(1000px) rotateY(15deg);
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
body { padding: 40px; background: #ecf0f1; font-family: Arial, sans-serif; }
.transform-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; margin: 30px 0; }
.transform-box { width: 120px; height: 120px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 8px; margin: 20px auto; transition: transform 0.3s ease; cursor: pointer; }
.translate { transform: translate(30px, 20px); }
.rotate { transform: rotate(25deg); }
.scale { transform: scale(1.3); }
.skew { transform: skew(15deg, 5deg); }
.combined { transform: translate(20px, 10px) rotate(15deg) scale(1.1); }
.hover-effect:hover { transform: scale(1.2) rotate(10deg); }
h3 { text-align: center; color: #2c3e50; margin-top: 30px; }
.demo-section { text-align: center; margin: 40px 0; }
</style>
</head>
<body>
<h1 style="text-align: center; color: #2c3e50;">CSS 2D Transforms</h1>

<div class="transform-grid">
<div class="demo-section">
<h3>Translate</h3>
<div class="transform-box translate">Moved</div>
</div>

<div class="demo-section">
<h3>Rotate</h3>
<div class="transform-box rotate">Rotated</div>
</div>

<div class="demo-section">
<h3>Scale</h3>
<div class="transform-box scale">Scaled</div>
</div>

<div class="demo-section">
<h3>Skew</h3>
<div class="transform-box skew">Skewed</div>
</div>

<div class="demo-section">
<h3>Combined</h3>
<div class="transform-box combined">Mixed</div>
</div>

<div class="demo-section">
<h3>Hover Effect</h3>
<div class="transform-box hover-effect">Hover Me</div>
</div>
</div>

<div style="text-align: center; margin-top: 40px;">
<p style="color: #7f8c8d;">Hover over the "Hover Me" box to see the interactive transform effect!</p>
</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "12 min",
    },
    {
      id: "css-3d-transforms",
      title: "CSS 3D Transforms",
      content: `
        <h2>CSS 3D Transforms</h2>
        <p>Create three-dimensional effects using <code>perspective</code>, <code>rotateX</code>, <code>rotateY</code>, <code>rotateZ</code>, and <code>translateZ</code> for immersive interfaces.</p>
        
        <h3>3D Transform Functions</h3>
        <ul>
          <li><strong>perspective</strong> - Set 3D viewing distance</li>
          <li><strong>rotateX/Y/Z</strong> - Rotate around 3D axes</li>
          <li><strong>translateZ</strong> - Move along Z-axis</li>
          <li><strong>transform-style: preserve-3d</strong> - Enable 3D context</li>
        </ul>
      `,
      codeExample: `/* 3D Perspective */
.perspective-container {
  perspective: 1000px;
}

/* 3D Rotations */
.rotate-x { transform: rotateX(45deg); }
.rotate-y { transform: rotateY(45deg); }
.rotate-z { transform: rotateZ(45deg); }

/* 3D Card Flip */
.card-3d {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card-3d:hover {
  transform: rotateY(180deg);
}

.card-face {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

/* 3D Cube */
.cube {
  transform-style: preserve-3d;
  transform: rotateX(-15deg) rotateY(15deg);
}

.cube-face {
  position: absolute;
  width: 100px;
  height: 100px;
}

.front { transform: translateZ(50px); }
.back { transform: rotateY(180deg) translateZ(50px); }
.right { transform: rotateY(90deg) translateZ(50px); }
.left { transform: rotateY(-90deg) translateZ(50px); }
.top { transform: rotateX(90deg) translateZ(50px); }
.bottom { transform: rotateX(-90deg) translateZ(50px); }`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
body { padding: 40px; background: #2c3e50; font-family: Arial, sans-serif; color: white; }
.demo-container { display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap; gap: 40px; margin: 40px 0; }
.perspective-box { perspective: 1000px; }
.transform-3d { width: 120px; height: 120px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 8px; transition: transform 0.5s ease; cursor: pointer; }
.rotate-x:hover { transform: rotateX(45deg); }
.rotate-y:hover { transform: rotateY(45deg); }
.flip-card { width: 120px; height: 120px; position: relative; transform-style: preserve-3d; transition: transform 0.6s; cursor: pointer; }
.flip-card:hover { transform: rotateY(180deg); }
.card-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 8px; }
.card-front { background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); }
.card-back { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); transform: rotateY(180deg); }
.cube-container { perspective: 1000px; }
.cube { width: 100px; height: 100px; position: relative; transform-style: preserve-3d; transform: rotateX(-15deg) rotateY(15deg); animation: rotate-cube 10s infinite linear; }
.cube-face { position: absolute; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; }
.front { background: rgba(255, 107, 107, 0.8); transform: translateZ(50px); }
.back { background: rgba(78, 205, 196, 0.8); transform: rotateY(180deg) translateZ(50px); }
.right { background: rgba(102, 126, 234, 0.8); transform: rotateY(90deg) translateZ(50px); }
.left { background: rgba(255, 154, 158, 0.8); transform: rotateY(-90deg) translateZ(50px); }
.top { background: rgba(243, 156, 18, 0.8); transform: rotateX(90deg) translateZ(50px); }
.bottom { background: rgba(155, 89, 182, 0.8); transform: rotateX(-90deg) translateZ(50px); }
@keyframes rotate-cube { 0% { transform: rotateX(-15deg) rotateY(15deg); } 100% { transform: rotateX(-15deg) rotateY(375deg); } }
h3 { text-align: center; margin-bottom: 20px; color: #ecf0f1; }
.demo-item { text-align: center; }
</style>
</head>
<body>
<h1 style="text-align: center; margin-bottom: 40px;">CSS 3D Transforms</h1>

<div class="demo-container">
<div class="demo-item">
<h3>Rotate X (Hover)</h3>
<div class="perspective-box">
<div class="transform-3d rotate-x">Flip X</div>
</div>
</div>

<div class="demo-item">
<h3>Rotate Y (Hover)</h3>
<div class="perspective-box">
<div class="transform-3d rotate-y">Flip Y</div>
</div>
</div>

<div class="demo-item">
<h3>Card Flip (Hover)</h3>
<div class="flip-card">
<div class="card-face card-front">Front</div>
<div class="card-face card-back">Back</div>
</div>
</div>

<div class="demo-item">
<h3>3D Cube</h3>
<div class="cube-container">
<div class="cube">
<div class="cube-face front">1</div>
<div class="cube-face back">2</div>
<div class="cube-face right">3</div>
<div class="cube-face left">4</div>
<div class="cube-face top">5</div>
<div class="cube-face bottom">6</div>
</div>
</div>
</div>
</div>

<div style="text-align: center; margin-top: 40px;">
<p style="color: #bdc3c7;">Hover over the boxes to see 3D transformation effects!</p>
</div>
</body>
</html>`,
      language: "css",
      difficulty: "advanced" as const,
      estimatedTime: "15 min",
    },
    {
      id: "css-transitions",
      title: "CSS Transitions",
      content: `
        <h2>CSS Transitions</h2>
        <p>Create smooth animations between property changes using <code>transition</code>. Control duration, timing function, delay, and specific properties for polished interactions.</p>
        
        <h3>Transition Properties</h3>
        <ul>
          <li><strong>transition-property</strong> - Which properties to animate</li>
          <li><strong>transition-duration</strong> - How long the transition takes</li>
          <li><strong>transition-timing-function</strong> - Easing curves</li>
          <li><strong>transition-delay</strong> - When to start the transition</li>
        </ul>
      `,
      codeExample: `/* Basic Transition */
.smooth-transition {
  transition: all 0.3s ease;
}

/* Specific Property Transition */
.color-transition {
  transition: color 0.2s ease-in-out;
}

/* Multiple Properties */
.multi-transition {
  transition: 
    transform 0.3s ease,
    background-color 0.2s ease,
    box-shadow 0.3s ease;
}

/* Timing Functions */
.ease { transition-timing-function: ease; }
.ease-in { transition-timing-function: ease-in; }
.ease-out { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }
.linear { transition-timing-function: linear; }
.custom { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }

/* Transition with Delay */
.delayed-transition {
  transition: transform 0.3s ease 0.1s;
}

/* Hover Effects */
.button-transition {
  background: #3498db;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.button-transition:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
body { padding: 40px; background: #ecf0f1; font-family: Arial, sans-serif; }
.transition-demo { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin: 30px 0; }
.demo-box { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
.transition-element { width: 100px; height: 100px; margin: 20px auto; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; cursor: pointer; }
.color-change { background: #3498db; transition: background-color 0.3s ease; }
.color-change:hover { background: #e74c3c; }
.scale-effect { background: #2ecc71; transition: transform 0.3s ease; }
.scale-effect:hover { transform: scale(1.2); }
.rotate-effect { background: #f39c12; transition: transform 0.5s ease; }
.rotate-effect:hover { transform: rotate(360deg); }
.multi-effect { background: #9b59b6; transition: all 0.3s ease; }
.multi-effect:hover { background: #8e44ad; transform: scale(1.1) rotate(10deg); box-shadow: 0 10px 20px rgba(155, 89, 182, 0.3); }
.bounce-effect { background: #e67e22; transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.bounce-effect:hover { transform: scale(1.3); }
.button-demo { background: #3498db; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; font-size: 16px; }
.button-demo:hover { background: #2980b9; transform: translateY(-3px); box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4); }
h3 { color: #2c3e50; margin-bottom: 15px; }
p { color: #7f8c8d; font-size: 14px; }
</style>
</head>
<body>
<h1 style="text-align: center; color: #2c3e50; margin-bottom: 40px;">CSS Transitions</h1>

<div class="transition-demo">
<div class="demo-box">
<h3>Color Transition</h3>
<div class="transition-element color-change">Hover</div>
<p>Changes background color smoothly</p>
</div>

<div class="demo-box">
<h3>Scale Effect</h3>
<div class="transition-element scale-effect">Scale</div>
<p>Grows larger on hover</p>
</div>

<div class="demo-box">
<h3>Rotation</h3>
<div class="transition-element rotate-effect">Spin</div>
<p>Rotates 360 degrees</p>
</div>

<div class="demo-box">
<h3>Multiple Effects</h3>
<div class="transition-element multi-effect">Multi</div>
<p>Combines color, scale, rotation, and shadow</p>
</div>

<div class="demo-box">
<h3>Bounce Effect</h3>
<div class="transition-element bounce-effect">Bounce</div>
<p>Uses cubic-bezier for bounce timing</p>
</div>

<div class="demo-box">
<h3>Button Example</h3>
<button class="button-demo">Click Me</button>
<p>Professional button with hover transition</p>
</div>
</div>

<div style="text-align: center; margin-top: 40px;">
<p style="color: #7f8c8d;">Hover over each element to see the transition effects in action!</p>
</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "14 min",
    },
    {
      id: "css-animations",
      title: "CSS Animations",
      content: `
        <h2>CSS Animations</h2>
        <p>Create complex, repeating animations using <code>@keyframes</code> and animation properties. Build engaging interfaces with movement, timing, and iteration control.</p>
        
        <h3>Animation Properties</h3>
        <ul>
          <li><strong>animation-name</strong> - Keyframe animation name</li>
          <li><strong>animation-duration</strong> - Animation length</li>
          <li><strong>animation-timing-function</strong> - Easing curves</li>
          <li><strong>animation-iteration-count</strong> - How many times to repeat</li>
          <li><strong>animation-direction</strong> - Forward, reverse, alternate</li>
          <li><strong>animation-fill-mode</strong> - Before/after states</li>
        </ul>
      `,
      codeExample: `/* Keyframe Definition */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}

/* Complex Keyframes */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
}

/* Animation Application */
.fade-in {
  animation: fadeIn 1s ease-in-out;
}

.slide-in {
  animation: slideIn 0.5s ease-out;
}

.bounce-animation {
  animation: bounce 2s infinite;
}

/* Animation Shorthand */
.pulse {
  animation: pulse 1.5s ease-in-out infinite alternate;
}

@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

/* Loading Spinner */
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Complex Animation */
.floating {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
body { padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: Arial, sans-serif; min-height: 100vh; }
.animation-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; margin: 30px 0; }
.animation-box { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
.animation-element { width: 80px; height: 80px; margin: 20px auto; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }

/* Keyframes */
@keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
@keyframes slideIn { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }
@keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-20px); } 60% { transform: translateY(-10px); } }
@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
@keyframes colorShift { 0% { background: #ff6b6b; } 25% { background: #4ecdc4; } 50% { background: #45b7d1; } 75% { background: #feca57; } 100% { background: #ff6b6b; } }
@keyframes wiggle { 0%, 7% { transform: rotateZ(0); } 15% { transform: rotateZ(-15deg); } 20% { transform: rotateZ(10deg); } 25% { transform: rotateZ(-10deg); } 30% { transform: rotateZ(6deg); } 35% { transform: rotateZ(-4deg); } 40%, 100% { transform: rotateZ(0); } }

/* Animation Classes */
.fade-in { background: #3498db; animation: fadeIn 2s ease-in-out infinite; }
.slide-in { background: #2ecc71; animation: slideIn 1s ease-out infinite; }
.bounce { background: #f39c12; animation: bounce 1.5s infinite; }
.pulse { background: #e74c3c; animation: pulse 1.5s ease-in-out infinite; }
.spin { background: #9b59b6; animation: spin 2s linear infinite; }
.float { background: #1abc9c; animation: float 2s ease-in-out infinite; }
.color-shift { animation: colorShift 3s ease-in-out infinite; }
.wiggle { background: #e67e22; animation: wiggle 2s ease-in-out infinite; }

h1 { text-align: center; color: white; margin-bottom: 40px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
h3 { color: #2c3e50; margin-bottom: 15px; }
p { color: #7f8c8d; font-size: 14px; margin-bottom: 15px; }

/* Loading Spinner */
.spinner-demo { border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 10px auto; }

/* Heartbeat */
@keyframes heartbeat { 0% { transform: scale(1); } 14% { transform: scale(1.1); } 28% { transform: scale(1); } 42% { transform: scale(1.1); } 70% { transform: scale(1); } }
.heartbeat { background: #e74c3c; animation: heartbeat 1.5s ease-in-out infinite; }
</style>
</head>
<body>
<h1>CSS Animations Showcase</h1>

<div class="animation-grid">
<div class="animation-box">
<h3>Fade In</h3>
<div class="animation-element fade-in">Fade</div>
<p>Smooth opacity transition</p>
</div>

<div class="animation-box">
<h3>Slide In</h3>
<div class="animation-element slide-in">Slide</div>
<p>Horizontal movement</p>
</div>

<div class="animation-box">
<h3>Bounce</h3>
<div class="animation-element bounce">Bounce</div>
<p>Realistic bouncing effect</p>
</div>

<div class="animation-box">
<h3>Pulse</h3>
<div class="animation-element pulse">Pulse</div>
<p>Scaling in and out</p>
</div>

<div class="animation-box">
<h3>Spinner</h3>
<div class="animation-element spin">Spin</div>
<p>Continuous rotation</p>
</div>

<div class="animation-box">
<h3>Float</h3>
<div class="animation-element float">Float</div>
<p>Gentle up and down movement</p>
</div>

<div class="animation-box">
<h3>Color Shift</h3>
<div class="animation-element color-shift">Color</div>
<p>Cycling through colors</p>
</div>

<div class="animation-box">
<h3>Wiggle</h3>
<div class="animation-element wiggle">Wiggle</div>
<p>Playful shaking motion</p>
</div>

<div class="animation-box">
<h3>Loading Spinner</h3>
<div class="spinner-demo"></div>
<p>Classic loading indicator</p>
</div>

<div class="animation-box">
<h3>Heartbeat</h3>
<div class="animation-element heartbeat">♥</div>
<p>Rhythmic heartbeat pattern</p>
</div>
</div>

<div style="text-align: center; margin-top: 40px;">
<p style="color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">All animations loop continuously to showcase the effects!</p>
</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "16 min",
    },
    {
      id: "css-flexbox-intro",
      title: "CSS Flexbox Introduction",
      content: `
        <h2>CSS Flexbox Introduction</h2>
        <p>Flexbox (Flexible Box Layout) is a powerful CSS layout method that provides efficient ways to arrange, distribute, and align items in a container, even when their size is unknown or dynamic.</p>
        
        <h3>Flexbox Concepts</h3>
        <ul>
          <li><strong>Flex Container</strong> - Parent element with display: flex</li>
          <li><strong>Flex Items</strong> - Direct children of flex container</li>
          <li><strong>Main Axis</strong> - Primary axis (default: horizontal)</li>
          <li><strong>Cross Axis</strong> - Perpendicular to main axis</li>
        </ul>
        
        <h3>Key Benefits</h3>
        <ul>
          <li>Easy vertical and horizontal centering</li>
          <li>Flexible item sizing and distribution</li>
          <li>Responsive layouts without media queries</li>
          <li>Equal height columns</li>
        </ul>
      `,
      codeExample: `/* Basic Flexbox Container */
.flex-container {
  display: flex;
  /* Creates a flex formatting context */
}

/* Flex Direction */
.row { flex-direction: row; } /* Default: left to right */
.row-reverse { flex-direction: row-reverse; } /* Right to left */
.column { flex-direction: column; } /* Top to bottom */
.column-reverse { flex-direction: column-reverse; } /* Bottom to top */

/* Flex Wrap */
.nowrap { flex-wrap: nowrap; } /* Default: single line */
.wrap { flex-wrap: wrap; } /* Multi-line */
.wrap-reverse { flex-wrap: wrap-reverse; } /* Multi-line, reversed */

/* Flex Flow (shorthand) */
.flex-flow {
  flex-flow: row wrap; /* direction + wrap */
}

/* Basic Flex Items */
.flex-item {
  flex: 1; /* Grow, shrink, and basis */
}

/* Common Flexbox Patterns */
.center-everything {
  display: flex;
  justify-content: center; /* Horizontal center */
  align-items: center; /* Vertical center */
  min-height: 100vh; /* Full viewport height */
}

.space-between {
  display: flex;
  justify-content: space-between; /* Space between items */
}

.equal-width-items {
  display: flex;
}

.equal-width-items > * {
  flex: 1; /* All items equal width */
}`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Flexbox Introduction</title>
    <style>
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin: 0 0 1rem 0;
        }
        
        .content {
            padding: 2rem;
        }
        
        .demo-section {
            margin-bottom: 3rem;
        }
        
        .section-title {
            color: #2c3e50;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .demo-container {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            border: 2px dashed #dee2e6;
        }
        
        .flex-demo {
            display: flex;
            min-height: 120px;
        }
        
        .flex-item {
            background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
            color: white;
            padding: 1rem;
            margin: 0.25rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            min-width: 80px;
        }
        
        /* Direction Examples */
        .flex-row {
            flex-direction: row;
        }
        
        .flex-column {
            flex-direction: column;
            min-height: 200px;
        }
        
        .flex-row-reverse {
            flex-direction: row-reverse;
        }
        
        /* Justification Examples */
        .justify-start {
            justify-content: flex-start;
        }
        
        .justify-center {
            justify-content: center;
        }
        
        .justify-end {
            justify-content: flex-end;
        }
        
        .justify-between {
            justify-content: space-between;
        }
        
        .justify-around {
            justify-content: space-around;
        }
        
        .justify-evenly {
            justify-content: space-evenly;
        }
        
        /* Alignment Examples */
        .align-start {
            align-items: flex-start;
        }
        
        .align-center {
            align-items: center;
        }
        
        .align-end {
            align-items: flex-end;
        }
        
        .align-stretch {
            align-items: stretch;
        }
        
        .align-stretch .flex-item {
            align-items: center;
        }
        
        /* Wrap Examples */
        .flex-wrap {
            flex-wrap: wrap;
        }
        
        .flex-nowrap {
            flex-wrap: nowrap;
        }
        
        /* Special Items */
        .flex-item-1 { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%); }
        .flex-item-2 { background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); }
        .flex-item-3 { background: linear-gradient(135deg, #45b7d1 0%, #96c93d 100%); }
        .flex-item-4 { background: linear-gradient(135deg, #f9ca24 0%, #f0932b 100%); }
        .flex-item-5 { background: linear-gradient(135deg, #eb4d4b 0%, #6c5ce7 100%); }
        
        .demo-label {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        
        /* Grid for multiple demos */
        .demos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        /* Practical Examples */
        .navbar-demo {
            background: #2c3e50;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .nav-brand {
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .nav-links {
            display: flex;
            gap: 1rem;
        }
        
        .nav-link {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: background 0.2s;
        }
        
        .nav-link:hover {
            background: rgba(255,255,255,0.1);
        }
        
        .card-layout {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .card {
            flex: 1;
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border: 1px solid #e1e8ed;
        }
        
        .card h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
        }
        
        .center-demo {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 150px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
            margin: 1rem 0;
        }
        
        .center-content {
            text-align: center;
            padding: 2rem;
        }
        
        @media (max-width: 768px) {
            .demos-grid {
                grid-template-columns: 1fr;
            }
            
            .card-layout {
                flex-direction: column;
            }
            
            .navbar-demo {
                flex-direction: column;
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>CSS Flexbox Introduction</h1>
            <p>Master the fundamentals of flexible box layout</p>
        </header>
        
        <main class="content">
            <section class="demo-section">
                <h2 class="section-title">Flex Direction</h2>
                <div class="demos-grid">
                    <div>
                        <div class="demo-label">flex-direction: row (default)</div>
                        <div class="demo-container">
                            <div class="flex-demo flex-row">
                                <div class="flex-item flex-item-1">1</div>
                                <div class="flex-item flex-item-2">2</div>
                                <div class="flex-item flex-item-3">3</div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="demo-label">flex-direction: column</div>
                        <div class="demo-container">
                            <div class="flex-demo flex-column">
                                <div class="flex-item flex-item-1">1</div>
                                <div class="flex-item flex-item-2">2</div>
                                <div class="flex-item flex-item-3">3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Justify Content (Main Axis)</h2>
                <div class="demos-grid">
                    <div>
                        <div class="demo-label">justify-content: center</div>
                        <div class="demo-container">
                            <div class="flex-demo justify-center">
                                <div class="flex-item flex-item-1">1</div>
                                <div class="flex-item flex-item-2">2</div>
                                <div class="flex-item flex-item-3">3</div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="demo-label">justify-content: space-between</div>
                        <div class="demo-container">
                            <div class="flex-demo justify-between">
                                <div class="flex-item flex-item-1">1</div>
                                <div class="flex-item flex-item-2">2</div>
                                <div class="flex-item flex-item-3">3</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="demos-grid">
                    <div>
                        <div class="demo-label">justify-content: space-around</div>
                        <div class="demo-container">
                            <div class="flex-demo justify-around">
                                <div class="flex-item flex-item-1">1</div>
                                <div class="flex-item flex-item-2">2</div>
                                <div class="flex-item flex-item-3">3</div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="demo-label">justify-content: space-evenly</div>
                        <div class="demo-container">
                            <div class="flex-demo justify-evenly">
                                <div class="flex-item flex-item-1">1</div>
                                <div class="flex-item flex-item-2">2</div>
                                <div class="flex-item flex-item-3">3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Perfect Centering</h2>
                <div class="center-demo">
                    <div class="center-content">
                        <h3>Perfectly Centered!</h3>
                        <p>Both horizontally and vertically centered using Flexbox</p>
                    </div>
                </div>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Practical Examples</h2>
                
                <h3 style="color: #2c3e50; margin-bottom: 1rem;">Navigation Bar</h3>
                <div class="navbar-demo">
                    <div class="nav-brand">Brand</div>
                    <nav class="nav-links">
                        <a href="#" class="nav-link">Home</a>
                        <a href="#" class="nav-link">About</a>
                        <a href="#" class="nav-link">Services</a>
                        <a href="#" class="nav-link">Contact</a>
                    </nav>
                </div>
                
                <h3 style="color: #2c3e50; margin: 2rem 0 1rem 0;">Equal Width Cards</h3>
                <div class="card-layout">
                    <div class="card">
                        <h3>Card 1</h3>
                        <p>This card automatically adjusts its width to match the others using flex: 1.</p>
                    </div>
                    <div class="card">
                        <h3>Card 2</h3>
                        <p>All cards in this flex container have equal width regardless of content length.</p>
                    </div>
                    <div class="card">
                        <h3>Card 3</h3>
                        <p>Flexbox makes creating equal-width layouts incredibly simple.</p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "15 min",
    },
    {
      id: "css-flex-container",
      title: "CSS Flex Container",
      content: `
        <h2>CSS Flex Container Properties</h2>
        <p>The flex container is the parent element that establishes the flex formatting context. Its properties control how flex items are arranged, aligned, and distributed.</p>
        
        <h3>Container Properties</h3>
        <ul>
          <li><strong>display: flex</strong> - Creates flex container</li>
          <li><strong>flex-direction</strong> - Main axis direction</li>
          <li><strong>flex-wrap</strong> - Whether items wrap to new lines</li>
          <li><strong>justify-content</strong> - Main axis alignment</li>
          <li><strong>align-items</strong> - Cross axis alignment</li>
          <li><strong>align-content</strong> - Multi-line alignment</li>
          <li><strong>gap</strong> - Spacing between items</li>
        </ul>
      `,
      codeExample: `/* Flex Container Creation */
.flex-container {
  display: flex; /* or inline-flex */
}

/* Direction Control */
.horizontal { flex-direction: row; } /* Default */
.vertical { flex-direction: column; }
.reverse-horizontal { flex-direction: row-reverse; }
.reverse-vertical { flex-direction: column-reverse; }

/* Wrapping Control */
.no-wrap { flex-wrap: nowrap; } /* Default */
.wrap { flex-wrap: wrap; }
.wrap-reverse { flex-wrap: wrap-reverse; }

/* Shorthand for direction + wrap */
.flex-flow { flex-flow: row wrap; }

/* Main Axis Alignment (justify-content) */
.justify-start { justify-content: flex-start; } /* Default */
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }

/* Cross Axis Alignment (align-items) */
.align-start { align-items: flex-start; }
.align-center { align-items: center; }
.align-end { align-items: flex-end; }
.align-stretch { align-items: stretch; } /* Default */
.align-baseline { align-items: baseline; }

/* Multi-line Alignment (align-content) */
.content-start { align-content: flex-start; }
.content-center { align-content: center; }
.content-end { align-content: flex-end; }
.content-between { align-content: space-between; }
.content-around { align-content: space-around; }
.content-stretch { align-content: stretch; } /* Default */

/* Gap Property (Modern) */
.with-gap {
  display: flex;
  gap: 1rem; /* Space between all items */
  row-gap: 1rem; /* Vertical gap */
  column-gap: 2rem; /* Horizontal gap */
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
body { padding: 20px; background: #f8f9fa; font-family: Arial, sans-serif; }
.container { max-width: 1000px; margin: 0 auto; background: white; padding: 2rem; border-radius: 12px; }
.demo-section { margin: 2rem 0; }
.demo-container { background: #e9ecef; border-radius: 8px; padding: 1rem; margin: 1rem 0; min-height: 120px; }
.flex-demo { display: flex; height: 100%; }
.flex-item { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1rem; margin: 0.25rem; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; min-width: 60px; }
.section-title { color: #2c3e50; font-size: 1.5rem; margin-bottom: 1rem; }
.demo-label { font-weight: 600; color: #495057; margin-bottom: 0.5rem; }

/* Direction Examples */
.flex-row { flex-direction: row; }
.flex-column { flex-direction: column; min-height: 180px; }
.flex-row-reverse { flex-direction: row-reverse; }

/* Justify Content Examples */
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }

/* Align Items Examples */
.align-center { align-items: center; }
.align-start { align-items: flex-start; }
.align-end { align-items: flex-end; }
.align-stretch { align-items: stretch; }

/* Gap Example */
.with-gap { gap: 1rem; }
.with-gap .flex-item { margin: 0; }

/* Wrap Example */
.flex-wrap { flex-wrap: wrap; }
.wrap-demo .flex-item { min-width: 120px; }

/* Grid layout for demos */
.demos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
</style>
</head>
<body>
<div class="container">
<h1 style="text-align: center; color: #2c3e50;">CSS Flex Container Properties</h1>

<section class="demo-section">
<h2 class="section-title">Flex Direction</h2>
<div class="demos-grid">
<div>
<div class="demo-label">flex-direction: row</div>
<div class="demo-container">
<div class="flex-demo flex-row">
<div class="flex-item">1</div>
<div class="flex-item">2</div>
<div class="flex-item">3</div>
</div>
</div>
</div>

<div>
<div class="demo-label">flex-direction: column</div>
<div class="demo-container">
<div class="flex-demo flex-column">
<div class="flex-item">1</div>
<div class="flex-item">2</div>
<div class="flex-item">3</div>
</div>
</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Justify Content (Main Axis)</h2>
<div class="demos-grid">
<div>
<div class="demo-label">justify-content: center</div>
<div class="demo-container">
<div class="flex-demo justify-center">
<div class="flex-item">1</div>
<div class="flex-item">2</div>
<div class="flex-item">3</div>
</div>
</div>
</div>

<div>
<div class="demo-label">justify-content: space-between</div>
<div class="demo-container">
<div class="flex-demo justify-between">
<div class="flex-item">1</div>
<div class="flex-item">2</div>
<div class="flex-item">3</div>
</div>
</div>
</div>

<div>
<div class="demo-label">justify-content: space-around</div>
<div class="demo-container">
<div class="flex-demo justify-around">
<div class="flex-item">1</div>
<div class="flex-item">2</div>
<div class="flex-item">3</div>
</div>
</div>
</div>

<div>
<div class="demo-label">justify-content: space-evenly</div>
<div class="demo-container">
<div class="flex-demo justify-evenly">
<div class="flex-item">1</div>
<div class="flex-item">2</div>
<div class="flex-item">3</div>
</div>
</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Align Items (Cross Axis)</h2>
<div class="demos-grid">
<div>
<div class="demo-label">align-items: center</div>
<div class="demo-container">
<div class="flex-demo align-center">
<div class="flex-item">1</div>
<div class="flex-item" style="height: 80px;">2</div>
<div class="flex-item">3</div>
</div>
</div>
</div>

<div>
<div class="demo-label">align-items: stretch</div>
<div class="demo-container">
<div class="flex-demo align-stretch">
<div class="flex-item">1</div>
<div class="flex-item" style="height: auto;">2</div>
<div class="flex-item">3</div>
</div>
</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Gap Property</h2>
<div class="demo-label">gap: 1rem (removes need for margins)</div>
<div class="demo-container">
<div class="flex-demo with-gap">
<div class="flex-item">1</div>
<div class="flex-item">2</div>
<div class="flex-item">3</div>
<div class="flex-item">4</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Flex Wrap</h2>
<div class="demo-label">flex-wrap: wrap (items wrap to new lines)</div>
<div class="demo-container wrap-demo">
<div class="flex-demo flex-wrap">
<div class="flex-item">Item 1</div>
<div class="flex-item">Item 2</div>
<div class="flex-item">Item 3</div>
<div class="flex-item">Item 4</div>
<div class="flex-item">Item 5</div>
<div class="flex-item">Item 6</div>
</div>
</div>
</section>
</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "14 min",
    },
    {
      id: "css-flex-items",
      title: "CSS Flex Items",
      content: `
        <h2>CSS Flex Item Properties</h2>
        <p>Flex items are the direct children of a flex container. They have specific properties that control their individual behavior within the flex layout.</p>
        
        <h3>Flex Item Properties</h3>
        <ul>
          <li><strong>flex-grow</strong> - How much item should grow</li>
          <li><strong>flex-shrink</strong> - How much item should shrink</li>
          <li><strong>flex-basis</strong> - Initial main size of item</li>
          <li><strong>flex</strong> - Shorthand for grow, shrink, basis</li>
          <li><strong>align-self</strong> - Override container's align-items</li>
          <li><strong>order</strong> - Change visual order without HTML changes</li>
        </ul>
      `,
      codeExample: `/* Flex Growth */
.flex-grow-0 { flex-grow: 0; } /* Don't grow (default) */
.flex-grow-1 { flex-grow: 1; } /* Grow to fill space */
.flex-grow-2 { flex-grow: 2; } /* Grow twice as much */

/* Flex Shrink */
.flex-shrink-0 { flex-shrink: 0; } /* Don't shrink */
.flex-shrink-1 { flex-shrink: 1; } /* Normal shrink (default) */

/* Flex Basis */
.flex-basis-auto { flex-basis: auto; } /* Based on content (default) */
.flex-basis-0 { flex-basis: 0; } /* No initial size */
.flex-basis-200 { flex-basis: 200px; } /* Fixed initial size */

/* Flex Shorthand */
.flex-none { flex: none; } /* 0 0 auto - inflexible */
.flex-auto { flex: auto; } /* 1 1 auto - flexible based on content */
.flex-1 { flex: 1; } /* 1 1 0% - equal flex items */
.flex-2 { flex: 2; } /* 2 1 0% - twice the growth */

/* Align Self */
.align-self-start { align-self: flex-start; }
.align-self-center { align-self: center; }
.align-self-end { align-self: flex-end; }
.align-self-stretch { align-self: stretch; }

/* Order */
.order-first { order: -1; }
.order-last { order: 999; }
.order-1 { order: 1; }
.order-2 { order: 2; }

/* Common Patterns */
.flex-item-fixed {
  flex: 0 0 200px; /* Fixed width, won't grow or shrink */
}

.flex-item-fluid {
  flex: 1; /* Takes remaining space */
}

.flex-item-content {
  flex: 0 1 auto; /* Shrinks but doesn't grow, based on content */
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
body { padding: 20px; background: #f8f9fa; font-family: Arial, sans-serif; }
.container { max-width: 1000px; margin: 0 auto; background: white; padding: 2rem; border-radius: 12px; }
.demo-section { margin: 2rem 0; }
.demo-container { background: #e9ecef; border-radius: 8px; padding: 1rem; margin: 1rem 0; }
.flex-demo { display: flex; min-height: 80px; }
.flex-item { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1rem; margin: 0.25rem; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
.section-title { color: #2c3e50; font-size: 1.5rem; margin-bottom: 1rem; }
.demo-label { font-weight: 600; color: #495057; margin-bottom: 0.5rem; }

/* Flex Item Examples */
.grow-demo .item-1 { flex-grow: 0; background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
.grow-demo .item-2 { flex-grow: 1; background: linear-gradient(135deg, #4ecdc4, #44a08d); }
.grow-demo .item-3 { flex-grow: 2; background: linear-gradient(135deg, #45b7d1, #96c93d); }

.shrink-demo { width: 300px; }
.shrink-demo .item-1 { flex-shrink: 0; min-width: 150px; background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
.shrink-demo .item-2 { flex-shrink: 1; min-width: 150px; background: linear-gradient(135deg, #4ecdc4, #44a08d); }
.shrink-demo .item-3 { flex-shrink: 2; min-width: 150px; background: linear-gradient(135deg, #45b7d1, #96c93d); }

.basis-demo .item-1 { flex-basis: 100px; background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
.basis-demo .item-2 { flex-basis: 200px; background: linear-gradient(135deg, #4ecdc4, #44a08d); }
.basis-demo .item-3 { flex-basis: auto; background: linear-gradient(135deg, #45b7d1, #96c93d); }

.order-demo .item-1 { order: 3; background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
.order-demo .item-2 { order: 1; background: linear-gradient(135deg, #4ecdc4, #44a08d); }
.order-demo .item-3 { order: 2; background: linear-gradient(135deg, #45b7d1, #96c93d); }

.align-self-demo { align-items: flex-start; min-height: 120px; }
.align-self-demo .item-1 { align-self: flex-start; background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
.align-self-demo .item-2 { align-self: center; background: linear-gradient(135deg, #4ecdc4, #44a08d); }
.align-self-demo .item-3 { align-self: flex-end; background: linear-gradient(135deg, #45b7d1, #96c93d); }

.practical-demo .sidebar { flex: 0 0 200px; background: linear-gradient(135deg, #2c3e50, #34495e); }
.practical-demo .main { flex: 1; background: linear-gradient(135deg, #4ecdc4, #44a08d); }
.practical-demo .aside { flex: 0 0 150px; background: linear-gradient(135deg, #f39c12, #e67e22); }
</style>
</head>
<body>
<div class="container">
<h1 style="text-align: center; color: #2c3e50;">CSS Flex Items</h1>

<section class="demo-section">
<h2 class="section-title">Flex Grow</h2>
<div class="demo-label">flex-grow: 0, 1, 2 (items grow proportionally)</div>
<div class="demo-container">
<div class="flex-demo grow-demo">
<div class="flex-item item-1">grow: 0</div>
<div class="flex-item item-2">grow: 1</div>
<div class="flex-item item-3">grow: 2</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Flex Shrink</h2>
<div class="demo-label">flex-shrink: 0, 1, 2 (container width: 300px)</div>
<div class="demo-container">
<div class="flex-demo shrink-demo">
<div class="flex-item item-1">shrink: 0</div>
<div class="flex-item item-2">shrink: 1</div>
<div class="flex-item item-3">shrink: 2</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Flex Basis</h2>
<div class="demo-label">flex-basis: 100px, 200px, auto</div>
<div class="demo-container">
<div class="flex-demo basis-demo">
<div class="flex-item item-1">basis: 100px</div>
<div class="flex-item item-2">basis: 200px</div>
<div class="flex-item item-3">basis: auto</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Order</h2>
<div class="demo-label">order: 3, 1, 2 (changes visual order)</div>
<div class="demo-container">
<div class="flex-demo order-demo">
<div class="flex-item item-1">HTML: 1st, order: 3</div>
<div class="flex-item item-2">HTML: 2nd, order: 1</div>
<div class="flex-item item-3">HTML: 3rd, order: 2</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Align Self</h2>
<div class="demo-label">align-self: flex-start, center, flex-end</div>
<div class="demo-container">
<div class="flex-demo align-self-demo">
<div class="flex-item item-1">start</div>
<div class="flex-item item-2">center</div>
<div class="flex-item item-3">end</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Practical Layout Example</h2>
<div class="demo-label">Sidebar (fixed) + Main (flexible) + Aside (fixed)</div>
<div class="demo-container">
<div class="flex-demo practical-demo">
<div class="flex-item sidebar">Sidebar<br>200px fixed</div>
<div class="flex-item main">Main Content<br>Flexible (flex: 1)</div>
<div class="flex-item aside">Aside<br>150px fixed</div>
</div>
</div>
</section>
</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "16 min",
    },
    {
      id: "css-flex-responsive",
      title: "CSS Flex Responsive",
      content: `
        <h2>CSS Flex Responsive Design</h2>
        <p>Flexbox is inherently responsive and provides powerful tools for creating layouts that adapt to different screen sizes without complex media queries.</p>
        
        <h3>Responsive Techniques</h3>
        <ul>
          <li><strong>flex-wrap</strong> - Allow items to wrap to new lines</li>
          <li><strong>flex-basis</strong> - Set minimum/preferred item sizes</li>
          <li><strong>flex-grow/shrink</strong> - Control how items adapt</li>
          <li><strong>Media queries</strong> - Change flex properties at breakpoints</li>
        </ul>
      `,
      codeExample: `/* Responsive Flex Container */
.responsive-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Flexible Items */
.responsive-item {
  flex: 1 1 300px; /* grow, shrink, basis */
  /* Items grow/shrink but maintain 300px minimum */
}

/* Card Grid Pattern */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 calc(33.333% - 1rem); /* 3 columns with gaps */
  min-width: 250px; /* Minimum card width */
}

/* Media Query Adjustments */
@media (max-width: 768px) {
  .responsive-container {
    flex-direction: column;
  }
  
  .card {
    flex: 1 1 100%; /* Full width on mobile */
  }
}

/* Navigation Responsive Pattern */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    width: 100%;
    justify-content: center;
  }
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
body { margin: 0; padding: 20px; background: #f8f9fa; font-family: Arial, sans-serif; }
.container { max-width: 1200px; margin: 0 auto; }

/* Responsive Card Grid */
.card-grid { display: flex; flex-wrap: wrap; gap: 1rem; margin: 2rem 0; }
.card { flex: 1 1 calc(33.333% - 1rem); min-width: 250px; background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.card h3 { color: #2c3e50; margin-bottom: 1rem; }

/* Responsive Navigation */
.navbar { display: flex; justify-content: space-between; align-items: center; background: #2c3e50; color: white; padding: 1rem; border-radius: 8px; margin-bottom: 2rem; flex-wrap: wrap; }
.nav-brand { font-size: 1.2rem; font-weight: bold; }
.nav-links { display: flex; gap: 1rem; }
.nav-link { color: white; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: background 0.2s; }
.nav-link:hover { background: rgba(255,255,255,0.1); }

/* Flexible Layout */
.flexible-layout { display: flex; gap: 1rem; margin: 2rem 0; flex-wrap: wrap; }
.sidebar { flex: 0 0 250px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1.5rem; border-radius: 8px; }
.main-content { flex: 1 1 400px; background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }

/* Image Gallery */
.gallery { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 2rem 0; }
.gallery-item { flex: 1 1 calc(25% - 0.5rem); min-width: 150px; aspect-ratio: 1; background: linear-gradient(135deg, #ff9a9e, #fecfef); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }

/* Media Queries */
@media (max-width: 768px) {
  .navbar { flex-direction: column; gap: 1rem; }
  .nav-links { width: 100%; justify-content: center; }
  .card { flex: 1 1 100%; }
  .flexible-layout { flex-direction: column; }
  .sidebar { flex: none; }
  .gallery-item { flex: 1 1 calc(50% - 0.5rem); }
}

@media (max-width: 480px) {
  .gallery-item { flex: 1 1 100%; }
}

h1, h2 { color: #2c3e50; }
.section-title { margin: 2rem 0 1rem 0; }
</style>
</head>
<body>
<div class="container">
<h1>CSS Flex Responsive Design</h1>

<!-- Responsive Navigation -->
<nav class="navbar">
<div class="nav-brand">FlexNav</div>
<div class="nav-links">
<a href="#" class="nav-link">Home</a>
<a href="#" class="nav-link">About</a>
<a href="#" class="nav-link">Services</a>
<a href="#" class="nav-link">Contact</a>
</div>
</nav>

<!-- Flexible Layout -->
<h2 class="section-title">Flexible Sidebar Layout</h2>
<div class="flexible-layout">
<aside class="sidebar">
<h3>Sidebar</h3>
<p>This sidebar has a fixed width of 250px but will stack below the main content on mobile devices.</p>
</aside>
<main class="main-content">
<h3>Main Content</h3>
<p>This main content area is flexible and will grow to fill the available space. It has a minimum width of 400px before wrapping to a new line.</p>
<p>Resize your browser window to see how the layout adapts!</p>
</main>
</div>

<!-- Responsive Card Grid -->
<h2 class="section-title">Responsive Card Grid</h2>
<div class="card-grid">
<div class="card">
<h3>Card 1</h3>
<p>This card grid automatically adjusts from 3 columns to 2 columns to 1 column based on screen size.</p>
</div>
<div class="card">
<h3>Card 2</h3>
<p>Each card has a minimum width of 250px and will wrap to a new line when needed.</p>
</div>
<div class="card">
<h3>Card 3</h3>
<p>The flex properties ensure equal width distribution when there's enough space.</p>
</div>
<div class="card">
<h3>Card 4</h3>
<p>Additional cards continue the responsive pattern seamlessly.</p>
</div>
<div class="card">
<h3>Card 5</h3>
<p>Perfect for product grids, blog posts, or any content collection.</p>
</div>
<div class="card">
<h3>Card 6</h3>
<p>No complex calculations needed - flexbox handles it all!</p>
</div>
</div>

<!-- Responsive Image Gallery -->
<h2 class="section-title">Responsive Image Gallery</h2>
<div class="gallery">
<div class="gallery-item">1</div>
<div class="gallery-item">2</div>
<div class="gallery-item">3</div>
<div class="gallery-item">4</div>
<div class="gallery-item">5</div>
<div class="gallery-item">6</div>
<div class="gallery-item">7</div>
<div class="gallery-item">8</div>
</div>

<div style="background: #e3f2fd; padding: 1.5rem; border-radius: 8px; margin-top: 2rem;">
<h3 style="color: #1976d2; margin-bottom: 1rem;">Try This:</h3>
<p style="margin: 0; color: #424242;">Resize your browser window to see how all these layouts adapt responsively using flexbox properties!</p>
</div>
</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "14 min",
    },
    {
      id: "css-grid-intro",
      title: "CSS Grid Introduction",
      content: `
        <h2>CSS Grid Introduction</h2>
        <p>CSS Grid Layout is a two-dimensional layout system that provides powerful tools for creating complex layouts with rows and columns. Unlike Flexbox which is one-dimensional, Grid can handle both axes simultaneously.</p>
        
        <h3>Grid Concepts</h3>
        <ul>
          <li><strong>Grid Container</strong> - Parent element with display: grid</li>
          <li><strong>Grid Items</strong> - Direct children of grid container</li>
          <li><strong>Grid Lines</strong> - Dividing lines between tracks</li>
          <li><strong>Grid Tracks</strong> - Rows and columns</li>
          <li><strong>Grid Cells</strong> - Single units of the grid</li>
          <li><strong>Grid Areas</strong> - Rectangular areas spanning multiple cells</li>
        </ul>
        
        <h3>Key Benefits</h3>
        <ul>
          <li>Two-dimensional layout control</li>
          <li>Precise positioning of elements</li>
          <li>Responsive design capabilities</li>
          <li>Complex layouts with minimal code</li>
        </ul>
      `,
      codeExample: `/* Basic Grid Container */
.grid-container {
  display: grid;
}

/* Define Grid Tracks */
.grid-basic {
  display: grid;
  grid-template-columns: 200px 1fr 100px; /* 3 columns */
  grid-template-rows: 100px auto 80px; /* 3 rows */
  gap: 10px; /* Space between tracks */
}

/* Fractional Units */
.grid-fr {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Proportional columns */
  grid-template-rows: repeat(3, 100px); /* 3 rows of 100px */
}

/* Auto-sizing */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* Responsive columns that wrap */
}

/* Grid Areas */
.grid-areas {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 150px;
  grid-template-rows: auto 1fr auto;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Grid Item Positioning */
.item-positioned {
  grid-column: 2 / 4; /* Start at line 2, end at line 4 */
  grid-row: 1 / 3; /* Start at line 1, end at line 3 */
}

/* Spanning */
.item-span {
  grid-column: span 2; /* Span 2 columns */
  grid-row: span 3; /* Span 3 rows */
}`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid Introduction</title>
    <style>
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin: 0 0 1rem 0;
        }
        
        .content {
            padding: 2rem;
        }
        
        .demo-section {
            margin-bottom: 3rem;
        }
        
        .section-title {
            color: #2c3e50;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .demo-container {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            border: 2px dashed #dee2e6;
        }
        
        .demo-label {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 1rem;
            font-weight: 600;
            text-align: center;
        }
        
        /* Basic Grid Demo */
        .grid-basic {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            grid-template-rows: repeat(3, 80px);
            gap: 10px;
        }
        
        .grid-item {
            background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.1rem;
        }
        
        /* Responsive Grid Demo */
        .grid-responsive {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
        }
        
        .grid-responsive .grid-item {
            height: 80px;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
        }
        
        /* Grid Areas Demo */
        .grid-areas {
            display: grid;
            grid-template-areas: 
                "header header header"
                "sidebar main aside"
                "footer footer footer";
            grid-template-columns: 200px 1fr 150px;
            grid-template-rows: auto 200px auto;
            gap: 10px;
            min-height: 300px;
        }
        
        .grid-header {
            grid-area: header;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .grid-sidebar {
            grid-area: sidebar;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .grid-main {
            grid-area: main;
            background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
        }
        
        .grid-aside {
            grid-area: aside;
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            color: #333;
        }
        
        .grid-footer {
            grid-area: footer;
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            color: #333;
        }
        
        /* Positioning Demo */
        .grid-positioning {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(4, 60px);
            gap: 8px;
        }
        
        .positioned-item {
            background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
            color: #333;
        }
        
        .pos-1 { grid-column: 1 / 3; grid-row: 1 / 2; }
        .pos-2 { grid-column: 3 / 5; grid-row: 1 / 3; }
        .pos-3 { grid-column: 1 / 2; grid-row: 2 / 4; }
        .pos-4 { grid-column: 2 / 4; grid-row: 3 / 4; }
        .pos-5 { grid-column: 4 / 5; grid-row: 3 / 5; }
        .pos-6 { grid-column: 1 / 3; grid-row: 4 / 5; }
        .pos-7 { grid-column: 3 / 4; grid-row: 4 / 5; }
        
        /* Card Layout Demo */
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 2rem;
        }
        
        .card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border: 1px solid #e1e8ed;
        }
        
        .card h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
        }
        
        .card p {
            color: #666;
            line-height: 1.6;
            margin: 0;
        }
        
        @media (max-width: 768px) {
            .grid-areas {
                grid-template-areas: 
                    "header"
                    "main"
                    "sidebar"
                    "aside"
                    "footer";
                grid-template-columns: 1fr;
                grid-template-rows: auto auto auto auto auto;
            }
            
            .grid-positioning {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .pos-1 { grid-column: 1 / 3; grid-row: 1 / 2; }
            .pos-2 { grid-column: 1 / 2; grid-row: 2 / 3; }
            .pos-3 { grid-column: 2 / 3; grid-row: 2 / 3; }
            .pos-4 { grid-column: 1 / 3; grid-row: 3 / 4; }
            .pos-5 { grid-column: 1 / 2; grid-row: 4 / 5; }
            .pos-6 { grid-column: 2 / 3; grid-row: 4 / 5; }
            .pos-7 { grid-column: 1 / 3; grid-row: 5 / 6; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>CSS Grid Introduction</h1>
            <p>Master the power of two-dimensional layout</p>
        </header>
        
        <main class="content">
            <section class="demo-section">
                <h2 class="section-title">Basic Grid Layout</h2>
                <div class="demo-label">grid-template-columns: 1fr 2fr 1fr | grid-template-rows: repeat(3, 80px)</div>
                <div class="demo-container">
                    <div class="grid-basic">
                        <div class="grid-item">1</div>
                        <div class="grid-item">2</div>
                        <div class="grid-item">3</div>
                        <div class="grid-item">4</div>
                        <div class="grid-item">5</div>
                        <div class="grid-item">6</div>
                        <div class="grid-item">7</div>
                        <div class="grid-item">8</div>
                        <div class="grid-item">9</div>
                    </div>
                </div>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Responsive Auto-Fit Grid</h2>
                <div class="demo-label">grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))</div>
                <div class="demo-container">
                    <div class="grid-responsive">
                        <div class="grid-item">Auto 1</div>
                        <div class="grid-item">Auto 2</div>
                        <div class="grid-item">Auto 3</div>
                        <div class="grid-item">Auto 4</div>
                        <div class="grid-item">Auto 5</div>
                        <div class="grid-item">Auto 6</div>
                    </div>
                </div>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Grid Template Areas</h2>
                <div class="demo-label">Named grid areas for semantic layout</div>
                <div class="demo-container">
                    <div class="grid-areas">
                        <div class="grid-item grid-header">Header</div>
                        <div class="grid-item grid-sidebar">Sidebar</div>
                        <div class="grid-item grid-main">Main Content</div>
                        <div class="grid-item grid-aside">Aside</div>
                        <div class="grid-item grid-footer">Footer</div>
                    </div>
                </div>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Grid Item Positioning</h2>
                <div class="demo-label">Precise positioning with grid-column and grid-row</div>
                <div class="demo-container">
                    <div class="grid-positioning">
                        <div class="grid-item positioned-item pos-1">1 (2 cols)</div>
                        <div class="grid-item positioned-item pos-2">2 (2x2)</div>
                        <div class="grid-item positioned-item pos-3">3 (2 rows)</div>
                        <div class="grid-item positioned-item pos-4">4 (2 cols)</div>
                        <div class="grid-item positioned-item pos-5">5 (2 rows)</div>
                        <div class="grid-item positioned-item pos-6">6 (2 cols)</div>
                        <div class="grid-item positioned-item pos-7">7</div>
                    </div>
                </div>
            </section>
            
            <section class="demo-section">
                <h2 class="section-title">Practical Card Layout</h2>
                <div class="card-grid">
                    <div class="card">
                        <h3>Grid Advantage 1</h3>
                        <p>CSS Grid excels at creating complex, two-dimensional layouts with precise control over both rows and columns.</p>
                    </div>
                    <div class="card">
                        <h3>Grid Advantage 2</h3>
                        <p>Grid areas provide semantic naming for layout regions, making code more maintainable and readable.</p>
                    </div>
                    <div class="card">
                        <h3>Grid Advantage 3</h3>
                        <p>Auto-placement algorithms and responsive features reduce the need for complex media queries.</p>
                    </div>
                    <div class="card">
                        <h3>Grid Advantage 4</h3>
                        <p>Grid items can be positioned precisely without affecting the document flow or requiring absolute positioning.</p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "18 min",
    },
    {
      id: "css-grid-container",
      title: "CSS Grid Container",
      content: `
        <h2>CSS Grid Container Properties</h2>
        <p>The grid container defines the grid context and controls how grid items are arranged. Container properties control the overall structure and behavior of the grid.</p>
        
        <h3>Essential Container Properties</h3>
        <ul>
          <li><strong>display: grid</strong> - Creates grid container</li>
          <li><strong>grid-template-columns</strong> - Define column tracks</li>
          <li><strong>grid-template-rows</strong> - Define row tracks</li>
          <li><strong>grid-template-areas</strong> - Named grid areas</li>
          <li><strong>gap</strong> - Spacing between tracks</li>
          <li><strong>justify-items/align-items</strong> - Item alignment</li>
          <li><strong>justify-content/align-content</strong> - Grid alignment</li>
        </ul>
      `,
      codeExample: `/* Grid Container Creation */
.grid-container {
  display: grid; /* or inline-grid */
}

/* Column and Row Definition */
.explicit-grid {
  grid-template-columns: 100px 200px 1fr; /* Fixed, fixed, flexible */
  grid-template-rows: 80px auto 60px; /* Fixed, content-based, fixed */
}

/* Using repeat() function */
.repeat-grid {
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  grid-template-rows: repeat(4, 100px); /* 4 rows of 100px */
}

/* Advanced repeat patterns */
.pattern-grid {
  grid-template-columns: repeat(3, 100px 200px); /* Repeating pattern */
  /* Results in: 100px 200px 100px 200px 100px 200px */
}

/* Auto-sizing with minmax */
.responsive-grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* Responsive columns that wrap */
}

/* Grid Template Areas */
.layout-grid {
  grid-template-areas: 
    "header header header"
    "nav main aside"
    "nav footer footer";
  grid-template-columns: 200px 1fr 150px;
  grid-template-rows: auto 1fr auto;
}

/* Gap Properties */
.gap-grid {
  gap: 20px; /* Both row and column gap */
  row-gap: 20px; /* Vertical spacing */
  column-gap: 30px; /* Horizontal spacing */
}

/* Alignment Properties */
.align-grid {
  /* Align individual items within their cells */
  justify-items: center; /* Horizontal alignment */
  align-items: center; /* Vertical alignment */
  
  /* Align entire grid within container */
  justify-content: center; /* Horizontal grid alignment */
  align-content: center; /* Vertical grid alignment */
}

/* Auto Tracks */
.auto-grid {
  grid-template-columns: 200px 1fr;
  grid-auto-rows: 100px; /* Auto-generated rows */
  grid-auto-columns: 150px; /* Auto-generated columns */
  grid-auto-flow: row; /* or column, row dense, column dense */
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
body { margin: 0; padding: 20px; background: #f8f9fa; font-family: Arial, sans-serif; }
.container { max-width: 1200px; margin: 0 auto; }
.demo-section { margin: 2rem 0; background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.section-title { color: #2c3e50; font-size: 1.5rem; margin-bottom: 1rem; text-align: center; }
.demo-container { background: #e9ecef; border-radius: 8px; padding: 1rem; margin: 1rem 0; }
.demo-label { font-weight: 600; color: #495057; margin-bottom: 0.5rem; text-align: center; }
.grid-item { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1rem; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; }

/* Template Columns Demo */
.template-columns { display: grid; grid-template-columns: 100px 200px 1fr; gap: 10px; }

/* Template Rows Demo */
.template-rows { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: 60px auto 40px; gap: 10px; min-height: 200px; }

/* Repeat Demo */
.repeat-demo { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }

/* Auto-fit Demo */
.auto-fit-demo { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; }

/* Areas Demo */
.areas-demo { display: grid; grid-template-areas: "header header" "sidebar main" "footer footer"; grid-template-columns: 150px 1fr; grid-template-rows: auto 150px auto; gap: 10px; }
.header-area { grid-area: header; background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
.sidebar-area { grid-area: sidebar; background: linear-gradient(135deg, #4ecdc4, #44a08d); }
.main-area { grid-area: main; background: linear-gradient(135deg, #45b7d1, #96c93d); }
.footer-area { grid-area: footer; background: linear-gradient(135deg, #f9ca24, #f0932b); }

/* Gap Demo */
.gap-demo { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

/* Alignment Demo */
.alignment-demo { display: grid; grid-template-columns: repeat(3, 100px); grid-template-rows: repeat(2, 80px); gap: 10px; justify-content: center; align-content: center; min-height: 200px; }

/* Item Alignment Demo */
.item-align-demo { display: grid; grid-template-columns: repeat(3, 120px); grid-template-rows: repeat(2, 100px); gap: 10px; justify-items: center; align-items: center; }
.item-align-demo .grid-item { width: 80px; height: 60px; }

/* Auto Flow Demo */
.auto-flow-demo { display: grid; grid-template-columns: repeat(3, 100px); grid-auto-rows: 60px; gap: 10px; }

h1 { text-align: center; color: #2c3e50; margin-bottom: 2rem; }
</style>
</head>
<body>
<div class="container">
<h1>CSS Grid Container Properties</h1>

<section class="demo-section">
<h2 class="section-title">Grid Template Columns</h2>
<div class="demo-label">grid-template-columns: 100px 200px 1fr</div>
<div class="demo-container">
<div class="template-columns">
<div class="grid-item">100px</div>
<div class="grid-item">200px</div>
<div class="grid-item">1fr (flexible)</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Grid Template Rows</h2>
<div class="demo-label">grid-template-rows: 60px auto 40px</div>
<div class="demo-container">
<div class="template-rows">
<div class="grid-item">Fixed 60px</div>
<div class="grid-item">Auto height</div>
<div class="grid-item">Fixed 40px</div>
<div class="grid-item">Fixed 60px</div>
<div class="grid-item">Content-based height<br>Can expand as needed</div>
<div class="grid-item">Fixed 40px</div>
<div class="grid-item">Fixed 60px</div>
<div class="grid-item">Auto height</div>
<div class="grid-item">Fixed 40px</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Repeat Function</h2>
<div class="demo-label">grid-template-columns: repeat(4, 1fr)</div>
<div class="demo-container">
<div class="repeat-demo">
<div class="grid-item">1</div>
<div class="grid-item">2</div>
<div class="grid-item">3</div>
<div class="grid-item">4</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Auto-Fit Responsive</h2>
<div class="demo-label">grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))</div>
<div class="demo-container">
<div class="auto-fit-demo">
<div class="grid-item">Auto 1</div>
<div class="grid-item">Auto 2</div>
<div class="grid-item">Auto 3</div>
<div class="grid-item">Auto 4</div>
<div class="grid-item">Auto 5</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Grid Template Areas</h2>
<div class="demo-label">Named areas for semantic layout</div>
<div class="demo-container">
<div class="areas-demo">
<div class="grid-item header-area">Header</div>
<div class="grid-item sidebar-area">Sidebar</div>
<div class="grid-item main-area">Main</div>
<div class="grid-item footer-area">Footer</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Gap Property</h2>
<div class="demo-label">gap: 20px (spacing between tracks)</div>
<div class="demo-container">
<div class="gap-demo">
<div class="grid-item">Item 1</div>
<div class="grid-item">Item 2</div>
<div class="grid-item">Item 3</div>
<div class="grid-item">Item 4</div>
<div class="grid-item">Item 5</div>
<div class="grid-item">Item 6</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Grid Alignment</h2>
<div class="demo-label">justify-content: center; align-content: center</div>
<div class="demo-container">
<div class="alignment-demo">
<div class="grid-item">1</div>
<div class="grid-item">2</div>
<div class="grid-item">3</div>
<div class="grid-item">4</div>
<div class="grid-item">5</div>
<div class="grid-item">6</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Item Alignment</h2>
<div class="demo-label">justify-items: center; align-items: center</div>
<div class="demo-container">
<div class="item-align-demo">
<div class="grid-item">1</div>
<div class="grid-item">2</div>
<div class="grid-item">3</div>
<div class="grid-item">4</div>
<div class="grid-item">5</div>
<div class="grid-item">6</div>
</div>
</div>
</section>
</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "16 min",
    },
    {
      id: "css-grid-item",
      title: "CSS Grid Item",
      content: `
        <h2>CSS Grid Item Properties</h2>
        <p>Grid items are the direct children of a grid container. They can be positioned precisely using grid lines, spans, or named areas, giving you complete control over layout.</p>
        
        <h3>Grid Item Properties</h3>
        <ul>
          <li><strong>grid-column-start/end</strong> - Column positioning</li>
          <li><strong>grid-row-start/end</strong> - Row positioning</li>
          <li><strong>grid-column/row</strong> - Shorthand positioning</li>
          <li><strong>grid-area</strong> - All positioning or named area</li>
          <li><strong>justify-self/align-self</strong> - Individual alignment</li>
        </ul>
      `,
      codeExample: `/* Grid Line Positioning */
.item-positioned {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
}

/* Shorthand Positioning */
.item-shorthand {
  grid-column: 2 / 4; /* start / end */
  grid-row: 1 / 3; /* start / end */
}

/* Spanning */
.item-span {
  grid-column: span 2; /* Span 2 columns */
  grid-row: span 3; /* Span 3 rows */
}

/* Starting position + span */
.item-start-span {
  grid-column: 2 / span 2; /* Start at 2, span 2 */
  grid-row: 1 / span 3; /* Start at 1, span 3 */
}

/* Grid Area (all-in-one) */
.item-area {
  grid-area: 1 / 2 / 3 / 4;
  /* row-start / column-start / row-end / column-end */
}

/* Named Grid Area */
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }

/* Self Alignment */
.item-align {
  justify-self: center; /* Horizontal alignment */
  align-self: end; /* Vertical alignment */
}

/* Alignment values */
.align-start { justify-self: start; align-self: start; }
.align-center { justify-self: center; align-self: center; }
.align-end { justify-self: end; align-self: end; }
.align-stretch { justify-self: stretch; align-self: stretch; }

/* Negative line numbers (from end) */
.item-from-end {
  grid-column: -3 / -1; /* 3rd from end to last */
  grid-row: -2 / -1; /* 2nd from end to last */
}`,
      tryItCode: `<!DOCTYPE html>
<html>
<head>
<style>
body { margin: 0; padding: 20px; background: #f8f9fa; font-family: Arial, sans-serif; }
.container { max-width: 1200px; margin: 0 auto; }
.demo-section { margin: 2rem 0; background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.section-title { color: #2c3e50; font-size: 1.5rem; margin-bottom: 1rem; text-align: center; }
.demo-container { background: #e9ecef; border-radius: 8px; padding: 1rem; margin: 1rem 0; }
.demo-label { font-weight: 600; color: #495057; margin-bottom: 0.5rem; text-align: center; }

/* Base grid setup */
.grid-demo { display: grid; grid-template-columns: repeat(5, 80px); grid-template-rows: repeat(4, 60px); gap: 8px; justify-content: center; }
.grid-item { background: linear-gradient(135deg, #667eea, #764ba2); color: white; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; }

/* Grid lines visualization */
.grid-lines { background-image: linear-gradient(to right, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ddd 1px, transparent 1px); background-size: calc(80px + 8px) calc(60px + 8px); }

/* Positioning examples */
.pos-demo .item-1 { grid-column: 1 / 3; grid-row: 1 / 2; background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
.pos-demo .item-2 { grid-column: 3 / 6; grid-row: 1 / 3; background: linear-gradient(135deg, #4ecdc4, #44a08d); }
.pos-demo .item-3 { grid-column: 1 / 2; grid-row: 2 / 4; background: linear-gradient(135deg, #45b7d1, #96c93d); }

/* Span examples */
.span-demo .item-1 { grid-column: span 2; background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
.span-demo .item-2 { grid-row: span 2; background: linear-gradient(135deg, #4ecdc4, #44a08d); }
.span-demo .item-3 { grid-column: span 3; grid-row: span 2; background: linear-gradient(135deg, #45b7d1, #96c93d); }

/* Area examples */
.area-demo { display: grid; grid-template-areas: "header header header" "sidebar main aside" "footer footer footer"; grid-template-columns: 120px 1fr 100px; grid-template-rows: 60px 120px 60px; gap: 10px; }
.header-item { grid-area: header; background: linear-gradient(135deg, #667eea, #764ba2); }
.sidebar-item { grid-area: sidebar; background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
.main-item { grid-area: main; background: linear-gradient(135deg, #4ecdc4, #44a08d); }
.aside-item { grid-area: aside; background: linear-gradient(135deg, #45b7d1, #96c93d); }
.footer-item { grid-area: footer; background: linear-gradient(135deg, #f9ca24, #f0932b); }

/* Alignment examples */
.align-demo { display: grid; grid-template-columns: repeat(3, 120px); grid-template-rows: repeat(2, 100px); gap: 10px; }
.align-demo .grid-item { width: 80px; height: 60px; }
.align-start { justify-self: start; align-self: start; background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
.align-center { justify-self: center; align-self: center; background: linear-gradient(135deg, #4ecdc4, #44a08d); }
.align-end { justify-self: end; align-self: end; background: linear-gradient(135deg, #45b7d1, #96c93d); }
.align-stretch-item { justify-self: stretch; align-self: stretch; background: linear-gradient(135deg, #f9ca24, #f0932b); width: auto; height: auto; }

h1 { text-align: center; color: #2c3e50; margin-bottom: 2rem; }
</style>
</head>
<body>
<div class="container">
<h1>CSS Grid Item Properties</h1>

<section class="demo-section">
<h2 class="section-title">Grid Line Positioning</h2>
<div class="demo-label">Using grid-column and grid-row with line numbers</div>
<div class="demo-container">
<div class="grid-demo pos-demo grid-lines">
<div class="grid-item item-1">1/3, 1/2</div>
<div class="grid-item item-2">3/6, 1/3</div>
<div class="grid-item item-3">1/2, 2/4</div>
<div class="grid-item">Auto</div>
<div class="grid-item">Auto</div>
<div class="grid-item">Auto</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Spanning Items</h2>
<div class="demo-label">Using span keyword to control item size</div>
<div class="demo-container">
<div class="grid-demo span-demo">
<div class="grid-item item-1">span 2 cols</div>
<div class="grid-item item-2">span 2 rows</div>
<div class="grid-item item-3">span 3x2</div>
<div class="grid-item">Auto</div>
<div class="grid-item">Auto</div>
<div class="grid-item">Auto</div>
<div class="grid-item">Auto</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Named Grid Areas</h2>
<div class="demo-label">Using grid-area with named template areas</div>
<div class="demo-container">
<div class="area-demo">
<div class="grid-item header-item">Header</div>
<div class="grid-item sidebar-item">Sidebar</div>
<div class="grid-item main-item">Main</div>
<div class="grid-item aside-item">Aside</div>
<div class="grid-item footer-item">Footer</div>
</div>
</div>
</section>

<section class="demo-section">
<h2 class="section-title">Item Self-Alignment</h2>
<div class="demo-label">justify-self and align-self properties</div>
<div class="demo-container">
<div class="align-demo">
<div class="grid-item align-start">Start</div>
<div class="grid-item align-center">Center</div>
<div class="grid-item align-end">End</div>
<div class="grid-item align-stretch-item">Stretch</div>
<div class="grid-item">Default</div>
<div class="grid-item">Default</div>
</div>
</div>
</section>

<div style="background: #e3f2fd; padding: 1.5rem; border-radius: 8px; margin-top: 2rem;">
<h3 style="color: #1976d2; margin-bottom: 1rem;">Grid Line Reference:</h3>
<ul style="color: #424242; margin: 0;">
<li><strong>Positive numbers:</strong> Count from start (1, 2, 3...)</li>
<li><strong>Negative numbers:</strong> Count from end (-1, -2, -3...)</li>
<li><strong>span keyword:</strong> Span across number of tracks</li>
<li><strong>Named lines:</strong> Use custom line names</li>
</ul>
</div>
</div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "15 min",
    },
    {
      id: "css-responsive-design",
      title: "CSS Responsive Design",
      content: `
        <h2>CSS Responsive Design</h2>
        <p>Responsive design ensures your website looks and functions well on all devices and screen sizes. Modern CSS provides powerful tools for creating fluid, adaptive layouts.</p>
        
        <h3>Core Responsive Techniques</h3>
        <ul>
          <li><strong>Fluid Grids</strong> - Flexible layout systems</li>
          <li><strong>Flexible Images</strong> - Scalable media content</li>
          <li><strong>Media Queries</strong> - Conditional CSS rules</li>
          <li><strong>Viewport Meta Tag</strong> - Mobile optimization</li>
          <li><strong>Relative Units</strong> - Scalable measurements</li>
        </ul>
      `,
      codeExample: `/* Viewport Meta Tag (HTML) */
<meta name="viewport" content="width=device-width, initial-scale=1.0">

/* Mobile-First Media Queries */
/* Base styles (mobile) */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet styles */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}

/* Large desktop styles */
@media (min-width: 1440px) {
  .container {
    max-width: 1400px;
  }
}

/* Responsive Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Responsive Typography */
.responsive-text {
  font-size: clamp(1rem, 4vw, 2rem);
  /* minimum, preferred, maximum */
}

/* Fluid Grid with CSS Grid */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* Responsive Flexbox */
.responsive-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-item {
  flex: 1 1 calc(33.333% - 1rem);
  min-width: 250px;
}

/* Breakpoint Variables (CSS Custom Properties) */
:root {
  --mobile: 480px;
  --tablet: 768px;
  --desktop: 1024px;
  --large-desktop: 1440px;
}

/* Container Queries (Modern) */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    align-items: center;
  }
}`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Responsive Design</title>
    <style>
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem;
            background: white;
            min-height: 100vh;
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 2rem;
            text-align: center;
            margin-bottom: 2rem;
            border-radius: 12px;
        }
        
        .header h1 {
            font-size: clamp(1.5rem, 5vw, 3rem);
            margin: 0 0 0.5rem 0;
        }
        
        .header p {
            font-size: clamp(0.9rem, 2.5vw, 1.2rem);
            margin: 0;
            opacity: 0.9;
        }
        
        /* Responsive Navigation */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #34495e;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .nav-brand {
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .nav-links {
            display: flex;
            gap: 1rem;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        .nav-link {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: background 0.2s;
        }
        
        .nav-link:hover {
            background: rgba(255,255,255,0.1);
        }
        
        /* Responsive Grid Layout */
        .responsive-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin: 2rem 0;
        }
        
        .card {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border: 1px solid #e1e8ed;
        }
        
        .card h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: clamp(1.1rem, 3vw, 1.3rem);
        }
        
        .card p {
            color: #666;
            margin: 0;
        }
        
        /* Flexible Layout Section */
        .flexible-layout {
            display: flex;
            gap: 2rem;
            margin: 2rem 0;
            flex-wrap: wrap;
        }
        
        .sidebar {
            flex: 0 0 280px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            border-radius: 12px;
        }
        
        .main-content {
            flex: 1 1 400px;
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid #e1e8ed;
        }
        
        /* Responsive Image Gallery */
        .image-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        
        .gallery-item {
            aspect-ratio: 16/9;
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: clamp(0.9rem, 2vw, 1.2rem);
        }
        
        /* Responsive Typography */
        .responsive-text {
            font-size: clamp(1rem, 4vw, 2rem);
            font-weight: bold;
            color: #2c3e50;
            text-align: center;
            margin: 2rem 0;
        }
        
        /* Breakpoint Indicator */
        .breakpoint-indicator {
            position: fixed;
            top: 10px;
            right: 10px;
            background: #2c3e50;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            z-index: 1000;
        }
        
        .breakpoint-indicator::before {
            content: "Mobile";
        }
        
        /* Media Queries */
        @media (min-width: 480px) {
            .container {
                padding: 1.5rem;
            }
            
            .breakpoint-indicator::before {
                content: "Small";
            }
        }
        
        @media (min-width: 768px) {
            .container {
                padding: 2rem;
            }
            
            .navbar {
                flex-wrap: nowrap;
            }
            
            .breakpoint-indicator::before {
                content: "Tablet";
            }
        }
        
        @media (min-width: 1024px) {
            .header {
                padding: 3rem;
            }
            
            .breakpoint-indicator::before {
                content: "Desktop";
            }
        }
        
        @media (min-width: 1440px) {
            .container {
                padding: 3rem;
            }
            
            .breakpoint-indicator::before {
                content: "Large";
            }
        }
        
        /* Print Styles */
        @media print {
            .navbar,
            .breakpoint-indicator {
                display: none;
            }
            
            .container {
                box-shadow: none;
            }
            
            .card {
                break-inside: avoid;
            }
        }
        
        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
            body {
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            }
            
            .container {
                background: #2c3e50;
                color: white;
            }
            
            .card {
                background: #34495e;
                border-color: #495057;
            }
            
            .main-content {
                background: #34495e;
                border-color: #495057;
            }
        }
        
        /* High DPI Displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .gallery-item {
                background-size: 200% 200%;
            }
        }
        
        .section-title {
            color: #2c3e50;
            font-size: clamp(1.3rem, 4vw, 2rem);
            margin: 2rem 0 1rem 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="breakpoint-indicator"></div>
    
    <div class="container">
        <header class="header">
            <h1>Responsive Design</h1>
            <p>Adapting to every screen size seamlessly</p>
        </header>
        
        <nav class="navbar">
            <div class="nav-brand">ResponsiveNav</div>
            <ul class="nav-links">
                <li><a href="#" class="nav-link">Home</a></li>
                <li><a href="#" class="nav-link">About</a></li>
                <li><a href="#" class="nav-link">Services</a></li>
                <li><a href="#" class="nav-link">Contact</a></li>
            </ul>
        </nav>
        
        <section>
            <h2 class="section-title">Responsive Grid Cards</h2>
            <div class="responsive-grid">
                <div class="card">
                    <h3>Mobile First</h3>
                    <p>Design starts with mobile devices and progressively enhances for larger screens using min-width media queries.</p>
                </div>
                <div class="card">
                    <h3>Flexible Grids</h3>
                    <p>CSS Grid and Flexbox create layouts that automatically adapt to different screen sizes without fixed widths.</p>
                </div>
                <div class="card">
                    <h3>Fluid Images</h3>
                    <p>Images scale proportionally using max-width: 100% and height: auto to prevent overflow on smaller screens.</p>
                </div>
                <div class="card">
                    <h3>Media Queries</h3>
                    <p>Conditional CSS rules that apply different styles based on device characteristics like screen width.</p>
                </div>
                <div class="card">
                    <h3>Viewport Units</h3>
                    <p>vw, vh, vmin, and vmax units create truly responsive designs that scale with the viewport size.</p>
                </div>
                <div class="card">
                    <h3>Container Queries</h3>
                    <p>Modern CSS feature that allows styling based on container size rather than just viewport size.</p>
                </div>
            </div>
        </section>
        
        <section>
            <h2 class="section-title">Flexible Layout</h2>
            <div class="flexible-layout">
                <aside class="sidebar">
                    <h3>Sidebar</h3>
                    <p>This sidebar has a fixed width on larger screens but stacks below the main content on mobile devices.</p>
                </aside>
                <main class="main-content">
                    <h3>Main Content</h3>
                    <p>This main content area flexes to fill available space and maintains readability across all device sizes.</p>
                    <p>The layout automatically reorganizes based on available space, ensuring optimal user experience.</p>
                </main>
            </div>
        </section>
        
        <div class="responsive-text">
            Responsive Typography
        </div>
        
        <section>
            <h2 class="section-title">Image Gallery</h2>
            <div class="image-gallery">
                <div class="gallery-item">Image 1</div>
                <div class="gallery-item">Image 2</div>
                <div class="gallery-item">Image 3</div>
                <div class="gallery-item">Image 4</div>
                <div class="gallery-item">Image 5</div>
                <div class="gallery-item">Image 6</div>
            </div>
        </section>
        
        <div style="background: #e3f2fd; padding: 2rem; border-radius: 12px; margin-top: 2rem;">
            <h3 style="color: #1976d2; margin-bottom: 1rem;">Try This:</h3>
            <p style="margin: 0; color: #424242;">Resize your browser window or rotate your device to see how the layout adapts! Notice the breakpoint indicator in the top-right corner.</p>
        </div>
    </div>
</body>
</html>`,
      language: "css",
      difficulty: "intermediate" as const,
      estimatedTime: "20 min",
    },
  ],
};

export default cssData;