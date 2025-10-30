// HTML language data for coding-jojo platform
export const htmlData = {
  description:
    "HTML (HyperText Markup Language) is the foundation of web development. Master the standard markup language that structures every website on the internet. From basic elements to advanced APIs, learn how to create semantic, accessible, and modern web pages that work across all devices and browsers.",
  topics: [
    {
      id: "html-introduction",
      title: "HTML Introduction",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">What is HTML?</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              <strong>HTML (HyperText Markup Language)</strong> is the standard markup language for creating web pages and web applications. It forms the backbone of every website you visit on the internet.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Key Concepts</h3>
          
          <div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
            <div style="border-left: 4px solid #48bb78; background: #f0fff4ff; padding: 1rem; border-radius: 0;">
              <strong style="color: #276749;">Structure:</strong> HTML defines the structure and semantic meaning of web content
            </div>
            <div style="border-left: 4px solid #ed8936; background: #fffaf0; padding: 1rem; border-radius: 0;">
              <strong style="color: #9c4221;">Elements:</strong> HTML uses elements (tags) to mark up different parts of content
            </div>
            <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1rem; border-radius: 0;">
              <strong style="color: #553c9a;">Semantic:</strong> Modern HTML focuses on meaning rather than appearance
            </div>
            <div style="border-left: 4px solid #e53e3e; background: #fff5f5; padding: 1rem; border-radius: 0;">
              <strong style="color: #c53030;">Universal:</strong> Works across all browsers, devices, and assistive technologies
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📋 Document Structure</h3>
          <p style="font-size: 1rem; color: #4a5568; margin-bottom: 1rem;">
            Every HTML document follows a standard structure that browsers understand. This structure ensures your content is properly interpreted and displayed.
          </p>
          
          <div style="background: #1a202c; color: #e2e8f0; padding: 1rem; border-radius: 0; font-family: 'Fira Code', monospace; margin: 1rem 0;">
            <div style="color: #68d391;">1. DOCTYPE declaration</div>
            <div style="color: #fbb6ce;">2. HTML root element</div>
            <div style="color: #90cdf4;">3. Head section (metadata)</div>
            <div style="color: #f6ad55;">4. Body section (visible content)</div>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Metadata about the document -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Learn HTML basics with this example">
    <title>HTML Fundamentals</title>
</head>
<body>
    <!-- Visible content goes here -->
    <header>
        <h1>Welcome to HTML Mastery</h1>
        <nav>
            <ul>
                <li><a href="#basics">Basics</a></li>
                <li><a href="#advanced">Advanced</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="basics">
            <h2>HTML Basics</h2>
            <p>HTML is the foundation of web development. Every website starts with HTML.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2025 HTML Learning Platform</p>
    </footer>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My HTML Practice</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is my first HTML page!</p>
    
    <!-- Try adding:
    - More headings (h2, h3)
    - Additional paragraphs
    - A list of your hobbies
    - A link to your favorite website -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "html-editors",
      title: "HTML Editors",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">Choosing the Right HTML Editor</h2>
          
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
            A good HTML editor can significantly boost your productivity and help you write cleaner, error-free code. Let's explore the best options available.
          </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🚀 Professional Code Editors</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #2b6cb0; font-weight: 600; margin: 0 0 0.5rem 0;">Visual Studio Code (Recommended)</h4>
              <p style="margin: 0.5rem 0; color: #2b6cb0;">Free, powerful, and feature-rich with excellent HTML support</p>
              <ul style="color: #4a5568; margin: 0.5rem 0;">
                <li>IntelliSense auto-completion</li>
                <li>Live Server extension for real-time preview</li>
                <li>Emmet for fast HTML writing</li>
                <li>Git integration and extensions marketplace</li>
              </ul>
            </div>
            
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #276749; font-weight: 600; margin: 0 0 0.5rem 0;">Sublime Text</h4>
              <p style="margin: 0.5rem 0; color: #276749;">Fast, lightweight editor with powerful features</p>
              <ul style="color: #4a5568; margin: 0.5rem 0;">
                <li>Multiple cursors and selections</li>
                <li>Command palette for quick actions</li>
                <li>Package ecosystem for HTML tools</li>
              </ul>
            </div>
          </div>
        </div>
      `,
      codeExample: `<!-- Emmet shortcuts make HTML writing faster -->

<!-- Type: html:5 + Tab -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>

<!-- Type: nav>ul>li*5>a + Tab -->
<nav>
    <ul>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
    </ul>
</nav>`,
      tryItCode: `<!-- Practice with Emmet abbreviations -->
<!-- Try typing these abbreviations and press Tab: -->

<!-- 1. html:5 -->

<!-- 2. header>h1+nav>ul>li*3>a[href="#"] -->

<!-- 3. main>section.hero>h2+p+button.btn -->

<!-- 4. footer>p.copyright -->

<!-- Experiment with creating a complete page structure using Emmet! -->`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "8 min",
    },
    {
      id: "html-basic",
      title: "HTML Basics",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Fundamentals</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Understanding HTML basics is crucial for web development. Let's explore the fundamental concepts that form the foundation of every web page.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🏗️ HTML Structure</h3>
          
          <div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1rem; border-radius: 0;">
              <strong style="color: #2d3748;">Tags:</strong> HTML uses opening and closing tags to define elements
            </div>
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1rem; border-radius: 0;">
              <strong style="color: #2d3748;">Elements:</strong> Complete units consisting of opening tag, content, and closing tag
            </div>
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1rem; border-radius: 0;">
              <strong style="color: #2d3748;">Attributes:</strong> Additional information about elements
            </div>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Basics Example</title>
</head>
<body>
    <!-- Page Header -->
    <header>
        <h1>Welcome to HTML Basics</h1>
        <nav>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <!-- Main Content -->
    <main>
        <section id="about">
            <h2>About HTML</h2>
            <p>HTML is the <strong>foundation</strong> of web development. 
               It provides <em>structure</em> and meaning to web content.</p>
            
            <!-- Image with proper attributes -->
            <img src="html-logo.png" 
                 alt="HTML5 Logo" 
                 width="200" 
                 height="200">
        </section>
    </main>

    <!-- Page Footer -->
    <footer>
        <p>&copy; 2025 HTML Learning Platform</p>
    </footer>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Practice Page</title>
</head>
<body>
    <!-- Create a complete webpage with: -->
    
    <!-- 1. A main heading with your name -->
    
    <!-- 2. A paragraph introducing yourself -->
    
    <!-- 3. A list of your favorite hobbies -->
    
    <!-- 4. A link to your favorite website -->
    
    <!-- 5. Add comments to explain each section -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
    {
      id: "html-elements",
      title: "HTML Elements",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">Understanding HTML Elements</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              HTML elements are the building blocks of web pages. Each element serves a specific purpose and can contain text, other elements, or both.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🧱 Element Categories</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">🏗️ Structural Elements</h4>
              <div style="color: #2d3748; line-height: 1.8;">
                <strong>&lt;header&gt;</strong> - Page/section header<br>
                <strong>&lt;main&gt;</strong> - Primary content<br>
                <strong>&lt;footer&gt;</strong> - Page/section footer<br>
                <strong>&lt;nav&gt;</strong> - Navigation links<br>
                <strong>&lt;section&gt;</strong> - Thematic grouping<br>
                <strong>&lt;article&gt;</strong> - Standalone content
              </div>
            </div>
            
            <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #2b6cb0; font-weight: 600; margin: 0 0 1rem 0;">📝 Content Elements</h4>
              <div style="color: #2d3748; line-height: 1.8;">
                <strong>&lt;h1&gt;-&lt;h6&gt;</strong> - Headings (largest to smallest)<br>
                <strong>&lt;p&gt;</strong> - Paragraphs of text<br>
                <strong>&lt;div&gt;</strong> - Generic container<br>
                <strong>&lt;span&gt;</strong> - Inline container<br>
                <strong>&lt;strong&gt;</strong> - Important text<br>
                <strong>&lt;em&gt;</strong> - Emphasized text
              </div>
            </div>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Elements Example</title>
</head>
<body>
    <!-- Structural Elements -->
    <header>
        <h1>My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <!-- Content Elements -->
        <section id="home">
            <h2>Welcome Section</h2>
            <article>
                <h3>Article Title</h3>
                <p>This is a <strong>paragraph</strong> with <em>emphasized</em> text.</p>
                <div class="container">
                    <p>Content inside a div container</p>
                    <span>Inline content in a span</span>
                </div>
            </article>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 My Website</p>
    </footer>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Elements</title>
</head>
<body>
    <!-- Try creating different elements: -->
    
    <!-- 1. Add a header with navigation -->
    
    <!-- 2. Create a main section with articles -->
    
    <!-- 3. Use headings h1 through h6 -->
    
    <!-- 4. Practice with div and span elements -->
    
    <!-- 5. Add a footer -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "20 min",
    },
    {
      id: "html-attributes",
      title: "HTML Attributes",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Attributes Mastery</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Attributes provide additional information about HTML elements. They define properties, behaviors, and characteristics that make elements functional and accessible.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🌟 Global Attributes</h3>
          
          <div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748; font-size: 1.1rem;">id</strong>
              <p style="color: #4a5568; margin: 0.5rem 0 0 0;">Unique identifier for the element. Used for CSS styling, JavaScript, and linking.</p>
            </div>
            
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748; font-size: 1.1rem;">class</strong>
              <p style="color: #4a5568; margin: 0.5rem 0 0 0;">CSS class names for styling. Multiple classes separated by spaces.</p>
            </div>
            
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748; font-size: 1.1rem;">title</strong>
              <p style="color: #4a5568; margin: 0.5rem 0 0 0;">Tooltip text that appears on hover. Provides additional information.</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">♿ Accessibility Attributes</h3>
          
          <div style="border-left: 4px solid #48bb78; background: #f0fff4; padding: 1.5rem; border-radius: 0;">
            <ul style="color: #276749; margin: 0; line-height: 1.8;">
              <li><strong>alt</strong> - Alternative text for images</li>
              <li><strong>aria-label</strong> - Accessible name for screen readers</li>
              <li><strong>role</strong> - Defines element's purpose</li>
              <li><strong>tabindex</strong> - Controls keyboard navigation</li>
              <li><strong>lang</strong> - Specifies content language</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Attributes Example</title>
</head>
<body>
    <!-- Global Attributes -->
    <header id="main-header" class="site-header" title="Main navigation">
        <h1>Website Title</h1>
    </header>

    <main>
        <!-- Link Attributes -->
        <nav>
            <a href="#home" title="Go to homepage">Home</a>
            <a href="https://example.com" target="_blank" rel="noopener">External Link</a>
        </nav>

        <!-- Image Attributes -->
        <section>
            <img src="logo.png" 
                 alt="Company logo" 
                 width="200" 
                 height="100"
                 title="Our brand logo">
        </section>

        <!-- Form Attributes -->
        <form action="/submit" method="POST">
            <label for="username">Username:</label>
            <input type="text" 
                   id="username" 
                   name="username" 
                   required
                   placeholder="Enter your username"
                   aria-describedby="username-help">
            <small id="username-help">3-20 characters required</small>
            
            <button type="submit">Submit</button>
        </form>

        <!-- Custom Data Attributes -->
        <div data-user-id="12345" data-role="admin">
            User dashboard content
        </div>
    </main>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice Attributes</title>
</head>
<body>
    <!-- Practice adding attributes: -->
    
    <!-- 1. Add id and class to elements -->
    
    <!-- 2. Create links with href and target attributes -->
    
    <!-- 3. Add an image with src, alt, and title -->
    
    <!-- 4. Create a form with proper attributes -->
    
    <!-- 5. Use custom data attributes -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "25 min",
    },
    {
      id: "html-headings",
      title: "HTML Headings",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Headings Structure</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              HTML headings (h1-h6) create a hierarchical structure for your content. They're crucial for SEO, accessibility, and user navigation.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📊 Heading Hierarchy</h3>
          
          <div style="background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); border: 2px solid #e2e8f0; padding: 1.5rem; border-radius: 0; margin: 1rem 0;">
            <div style="font-family: 'Fira Code', monospace;">
              <div style="font-size: 2rem; font-weight: 700; color: #1a202c; margin: 0.5rem 0;">h1 - Main Title (Most Important)</div>
              <div style="font-size: 1.75rem; font-weight: 600; color: #2d3748; margin: 0.5rem 0 0.5rem 1rem;">h2 - Section Heading</div>
              <div style="font-size: 1.5rem; font-weight: 600; color: #4a5568; margin: 0.5rem 0 0.5rem 2rem;">h3 - Subsection</div>
              <div style="font-size: 1.25rem; font-weight: 600; color: #718096; margin: 0.5rem 0 0.5rem 3rem;">h4 - Sub-subsection</div>
              <div style="font-size: 1.125rem; font-weight: 600; color: #a0aec0; margin: 0.5rem 0 0.5rem 4rem;">h5 - Minor heading</div>
              <div style="font-size: 1rem; font-weight: 600; color: #cbd5e0; margin: 0.5rem 0 0.5rem 5rem;">h6 - Smallest heading</div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Best Practices</h3>
          
          <div style="border-left: 4px solid #48bb78; background: #f0fff4; padding: 1.5rem; border-radius: 0;">
            <ul style="color: #276749; margin: 0; line-height: 1.8;">
              <li><strong>Use only one h1 per page</strong> - It's the main title</li>
              <li><strong>Don't skip heading levels</strong> - Go h1 → h2 → h3, not h1 → h3</li>
              <li><strong>Use headings for structure</strong> - Not just for styling</li>
              <li><strong>Make headings descriptive</strong> - Clear and meaningful text</li>
              <li><strong>Keep headings concise</strong> - Typically under 60 characters</li>
            </ul>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔍 SEO & Accessibility Benefits</h3>
          
          <div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1rem; border-radius: 0;">
              <strong style="color: #2d3748;">SEO:</strong> Search engines use headings to understand content structure and importance
            </div>
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1rem; border-radius: 0;">
              <strong style="color: #2d3748;">Accessibility:</strong> Screen readers use headings for navigation and content overview
            </div>
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1rem; border-radius: 0;">
              <strong style="color: #2d3748;">User Experience:</strong> Helps users scan and navigate content quickly
            </div>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Headings Example</title>
</head>
<body>
    <!-- Main page title - only one h1 per page -->
    <h1>Complete Guide to Web Development</h1>
    
    <!-- Major sections use h2 -->
    <h2>Introduction to HTML</h2>
    <p>HTML is the foundation of web development...</p>
    
    <!-- Subsections use h3 -->
    <h3>HTML Elements</h3>
    <p>Elements are the building blocks...</p>
    
    <!-- Further subdivisions use h4 -->
    <h4>Block vs Inline Elements</h4>
    <p>Understanding the difference...</p>
    
    <!-- Even smaller sections use h5 -->
    <h5>Common Block Elements</h5>
    <p>Div, p, h1-h6, section, article...</p>
    
    <!-- Finest level of detail uses h6 -->
    <h6>Best Practices for Block Elements</h6>
    <p>Use semantic elements when possible...</p>
    
    <!-- Another major section -->
    <h2>CSS Styling</h2>
    <p>CSS controls the presentation...</p>
    
    <h3>CSS Selectors</h3>
    <p>Selectors target HTML elements...</p>
    
    <h4>Element Selectors</h4>
    <p>Target elements by tag name...</p>
    
    <h4>Class Selectors</h4>
    <p>Target elements by class attribute...</p>
    
    <!-- Another major section -->
    <h2>JavaScript Fundamentals</h2>
    <p>JavaScript adds interactivity...</p>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Headings</title>
</head>
<body>
    <!-- Create a properly structured document about your favorite hobby -->
    
    <!-- 1. Main title (h1) about your hobby -->
    
    <!-- 2. Major sections (h2) like "History", "Equipment", "Benefits" -->
    
    <!-- 3. Subsections (h3) under each major section -->
    
    <!-- 4. Use h4-h6 for further detail levels -->
    
    <!-- Remember: Don't skip heading levels! -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
    {
      id: "html-paragraphs",
      title: "HTML Paragraphs",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Paragraphs & Text</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              The &lt;p&gt; element defines paragraphs of text. It's one of the most fundamental HTML elements for organizing readable content on web pages.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📝 Paragraph Behavior</h3>
          
          <div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748;">Block Element:</strong> Paragraphs start on a new line and take full width
            </div>
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748;">Automatic Spacing:</strong> Browsers add margins above and below paragraphs
            </div>
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748;">White Space Collapse:</strong> Multiple spaces/line breaks become single space
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔧 Line Breaks & Formatting</h3>
          
          <div style="border-left: 4px solid #4299e1; background: #ebf8ff; padding: 1.5rem; border-radius: 0;">
            <ul style="color: #2b6cb0; margin: 0; line-height: 1.8;">
              <li><strong>&lt;br&gt;</strong> - Single line break (self-closing)</li>
              <li><strong>&lt;hr&gt;</strong> - Horizontal rule/divider</li>
              <li><strong>&lt;pre&gt;</strong> - Preformatted text (preserves spaces)</li>
              <li><strong>&lt;blockquote&gt;</strong> - Block quotations</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Paragraphs Example</title>
</head>
<body>
    <h1>Understanding HTML Paragraphs</h1>
    
    <!-- Basic paragraphs -->
    <p>This is a standard paragraph. It contains regular text that flows naturally and wraps to the next line when needed.</p>
    
    <p>This is another paragraph. Notice how browsers automatically add space between paragraphs for better readability.</p>
    
    <!-- Paragraph with line breaks -->
    <p>
        This paragraph demonstrates line breaks.<br>
        This text appears on a new line.<br>
        And this is on another new line.
    </p>
    
    <!-- Horizontal rule separator -->
    <hr>
    
    <!-- Preformatted text -->
    <pre>
        This is preformatted text.
        It preserves    spaces
        and line breaks
        exactly as written.
    </pre>
    
    <!-- Blockquote -->
    <blockquote cite="https://example.com">
        "The best way to predict the future is to invent it."
        <footer>- Alan Kay</footer>
    </blockquote>
    
    <!-- Paragraph with mixed content -->
    <p>
        You can include <strong>bold text</strong>, 
        <em>italic text</em>, and even 
        <a href="#link">links</a> within paragraphs.
    </p>
    
    <!-- Multiple spaces demonstration -->
    <p>This     text     has     multiple     spaces     but     they     collapse     to     single     spaces.</p>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice Paragraphs</title>
</head>
<body>
    <!-- Write about your favorite book or movie -->
    
    <!-- 1. Create a title with h1 -->
    
    <!-- 2. Write 3-4 paragraphs about the story -->
    
    <!-- 3. Use line breaks within a paragraph -->
    
    <!-- 4. Add a horizontal rule as a separator -->
    
    <!-- 5. Include a blockquote with a memorable quote -->
    
    <!-- 6. Use preformatted text for a poem or code -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
    {
      id: "html-styles",
      title: "HTML Styles",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Styling Methods</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              While HTML provides structure, styling makes content visually appealing. Learn the different ways to apply styles to HTML elements.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎨 Three Ways to Style HTML</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #e53e3e; background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">🚫 Inline Styles (Not Recommended)</h4>
              <div style="color: #2d3748;">
                <p>Using the <code>style</code> attribute directly on elements</p>
                <strong>Cons:</strong> Hard to maintain, mixed content/presentation, poor performance
              </div>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">⚡ Internal Styles (Good for Practice)</h4>
              <div style="color: #2d3748;">
                <p>Using <code>&lt;style&gt;</code> tag in the document head</p>
                <strong>Use for:</strong> Single-page styling, prototyping, small projects
              </div>
            </div>
            
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">✅ External Styles (Best Practice)</h4>
              <div style="color: #2d3748;">
                <p>Linking to external CSS files using <code>&lt;link&gt;</code></p>
                <strong>Benefits:</strong> Reusable, maintainable, better performance, separation of concerns
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📚 Common CSS Properties</h3>
          
          <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem; border-radius: 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <strong>color</strong> - Text color<br>
              <strong>background-color</strong> - Background color<br>
              <strong>font-size</strong> - Text size<br>
              <strong>font-family</strong> - Font type<br>
              <strong>text-align</strong> - Text alignment<br>
              <strong>margin</strong> - Space outside element<br>
              <strong>padding</strong> - Space inside element<br>
              <strong>border</strong> - Element border
            </div>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Styling Methods</title>
    
    <!-- Internal CSS (in head section) -->
    <style>
        /* Internal styles - good for single page */
        .internal-style {
            color: #fff;
            background-color: #e6fffa;
            padding: 20px;
            border-radius: 0;
            font-family: Arial, sans-serif;
        }
        
        h2 {
            color: #2b6cb0;
            text-align: center;
            font-size: 1.8rem;
        }
        
        .highlight {
            background-color: #fed7d7;
            padding: 10px;
            border-left: 4px solid #e53e3e;
        }
    </style>
    
    <!-- External CSS (best practice) -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Different Ways to Style HTML</h1>
    
    <!-- Inline styles (not recommended) -->
    <p style="color: red; font-size: 18px; background-color: yellow; padding: 10px;">
        This paragraph uses inline styles. While it works, it's not the best practice for maintainable code.
    </p>
    
    <!-- Internal styles -->
    <div class="internal-style">
        <h2>Internal Styling</h2>
        <p>This content is styled using internal CSS defined in the head section.</p>
    </div>
    
    <!-- External styles (linked CSS file) -->
    <div class="external-style">
        <h2>External Styling</h2>
        <p>This content would be styled by an external CSS file (styles.css).</p>
    </div>
    
    <!-- Combining multiple styling methods -->
    <div class="highlight">
        <h3>Best Practices</h3>
        <ul>
            <li>Use external CSS files for production websites</li>
            <li>Keep HTML structure separate from styling</li>
            <li>Use internal styles only for single-page projects</li>
            <li>Avoid inline styles except for dynamic styling with JavaScript</li>
        </ul>
    </div>
</body>
</html>

<!-- Example external CSS file (styles.css) -->
/*
.external-style {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 0;
    margin: 20px 0;
}

.external-style h2 {
    color: white;
    margin-top: 0;
}
*/`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Styling</title>
    
    <!-- Add internal styles here -->
    <style>
        /* Practice writing CSS here */
        
    </style>
</head>
<body>
    <!-- Create a styled webpage about your favorite food -->
    
    <!-- 1. Style the main heading with color and size -->
    
    <!-- 2. Create a colorful section about ingredients -->
    
    <!-- 3. Style a recipe list with background colors -->
    
    <!-- 4. Practice different text alignments -->
    
    <!-- 5. Try using both classes and inline styles -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "20 min",
    },
    {
      id: "html-formatting",
      title: "HTML Formatting",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Text Formatting</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              HTML provides various elements to format and emphasize text. These elements add semantic meaning while improving readability and user experience.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">💪 Emphasis & Importance</h3>
          
          <div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748; font-size: 1.1rem;">&lt;strong&gt;</strong>
              <p style="color: #4a5568; margin: 0.5rem 0 0 0;">Indicates strong importance. Usually displayed as <strong>bold text</strong>.</p>
            </div>
            
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748; font-size: 1.1rem;">&lt;em&gt;</strong>
              <p style="color: #4a5568; margin: 0.5rem 0 0 0;">Emphasizes text with stress. Usually displayed as <em>italic text</em>.</p>
            </div>
            
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748; font-size: 1.1rem;">&lt;mark&gt;</strong>
              <p style="color: #4a5568; margin: 0.5rem 0 0 0;">Highlights text like a <mark style="background: #fed7d7;">yellow marker</mark>.</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📝 Text Modifications</h3>
          
          <div style="border-left: 4px solid #4299e1; background: #ebf8ff; padding: 1.5rem; border-radius: 0;">
            <div style="color: #2b6cb0; line-height: 1.8;">
              <strong>&lt;del&gt;</strong> - <del>Deleted/removed text</del><br>
              <strong>&lt;ins&gt;</strong> - <ins>Inserted/added text</ins><br>
              <strong>&lt;sub&gt;</strong> - H<sub>2</sub>O (subscript)<br>
              <strong>&lt;sup&gt;</strong> - X<sup>2</sup> (superscript)<br>
              <strong>&lt;small&gt;</strong> - <small>Fine print or disclaimer text</small><br>
              <strong>&lt;code&gt;</strong> - <code>console.log('code')</code>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">⚠️ Semantic vs Visual</h3>
          
          <div style="background: #fffaf0; border: 2px solid #ed8936; padding: 1.5rem; border-radius: 0;">
            <p style="color: #9c4221; margin: 0 0 1rem 0; font-weight: 600;">Choose semantic elements over visual ones:</p>
            <div style="color: #2d3748; line-height: 1.8;">
              ✅ Use <strong>&lt;strong&gt;</strong> instead of <strong>&lt;b&gt;</strong><br>
              ✅ Use <strong>&lt;em&gt;</strong> instead of <strong>&lt;i&gt;</strong><br>
              ✅ Use CSS for purely visual formatting<br>
              ✅ Think about meaning, not just appearance
            </div>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Text Formatting</title>
    <style>
        .example-section {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 0;
        }
    </style>
</head>
<body>
    <h1>HTML Text Formatting Examples</h1>
    
    <!-- Emphasis and Importance -->
    <div class="example-section">
        <h2>Emphasis and Importance</h2>
        <p>This is <strong>very important</strong> information that you should remember.</p>
        <p>Please <em>carefully</em> read the instructions before proceeding.</p>
        <p>The meeting is scheduled for <mark>tomorrow at 3 PM</mark>.</p>
    </div>
    
    <!-- Text Modifications -->
    <div class="example-section">
        <h2>Text Modifications</h2>
        <p>The original price was <del>$99.99</del> <ins>$79.99</ins>.</p>
        <p>Water's chemical formula is H<sub>2</sub>O.</p>
        <p>Einstein's famous equation: E = mc<sup>2</sup>.</p>
        <p><small>Terms and conditions apply. Offer valid until stocks last.</small></p>
    </div>
    
    <!-- Code and Technical Text -->
    <div class="example-section">
        <h2>Code Examples</h2>
        <p>To create a paragraph, use the <code>&lt;p&gt;</code> tag.</p>
        <p>The <code>console.log()</code> function prints output to the browser console.</p>
        
        <!-- Keyboard input -->
        <p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy text.</p>
        
        <!-- Sample output -->
        <p>The program output: <samp>Hello, World!</samp></p>
        
        <!-- Variable names -->
        <p>Set the <var>username</var> variable to your login name.</p>
    </div>
    
    <!-- Quotations -->
    <div class="example-section">
        <h2>Quotations</h2>
        <p>As Albert Einstein said, <q>Imagination is more important than knowledge.</q></p>
        
        <blockquote cite="https://www.brainyquote.com/quotes/steve_jobs_416859">
            "Innovation distinguishes between a leader and a follower."
            <footer>— Steve Jobs</footer>
        </blockquote>
    </div>
    
    <!-- Combining Formatting -->
    <div class="example-section">
        <h2>Combined Formatting</h2>
        <p>
            <strong>Important:</strong> The <em>new update</em> includes 
            <mark>critical security fixes</mark>. Please update 
            <code>version 2.1.0</code> to <code>version 2.1.1</code> 
            <small>(released today)</small>.
        </p>
    </div>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice Text Formatting</title>
</head>
<body>
    <!-- Create a product review with formatting -->
    
    <!-- 1. Use strong for the product name -->
    
    <!-- 2. Use em for your opinion -->
    
    <!-- 3. Use mark to highlight key features -->
    
    <!-- 4. Show old vs new price with del and ins -->
    
    <!-- 5. Add a quote from another reviewer -->
    
    <!-- 6. Use sub/sup for technical specifications -->
    
    <!-- 7. Add code examples if it's a tech product -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "18 min",
    },
    {
      id: "html-quotations",
      title: "HTML Quotations",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Quotations & Citations</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              HTML provides several elements for quoting text and citing sources. These elements help distinguish quoted content from regular text and provide proper attribution.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📝 Quotation Elements</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">&lt;blockquote&gt; - Block Quotations</h4>
              <div style="color: #2d3748;">
                <p>For longer quotes that should be displayed as a separate block</p>
                <ul>
                  <li>Use <code>cite</code> attribute for source URL</li>
                  <li>Automatically indented by browsers</li>
                  <li>Perfect for testimonials, reviews, or long quotes</li>
                </ul>
              </div>
            </div>
            
            <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #2b6cb0; font-weight: 600; margin: 0 0 1rem 0;">&lt;q&gt; - Inline Quotations</h4>
              <div style="color: #2d3748;">
                <p>For short quotes within a paragraph</p>
                <ul>
                  <li>Browsers automatically add quotation marks</li>
                  <li>Use <code>cite</code> attribute for source</li>
                  <li>Perfect for short quotes or phrases</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔗 Citation Elements</h3>
          
          <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem; border-radius: 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <strong>&lt;cite&gt;</strong> - Cites the title of creative works<br>
              <strong>&lt;abbr&gt;</strong> - Abbreviations with full form<br>
              <strong>&lt;address&gt;</strong> - Contact information<br>
              <strong>&lt;time&gt;</strong> - Dates and times with machine-readable format
            </div>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Quotations Example</title>
    <style>
        blockquote {
            background: #f8f9fa;
            border-left: 4px solid #007bff;
            padding: 20px;
            margin: 20px 0;
            font-style: italic;
        }
        cite {
            font-weight: bold;
            color: #6c757d;
        }
    </style>
</head>
<body>
    <h1>HTML Quotations and Citations</h1>
    
    <!-- Block Quotation -->
    <h2>Block Quotations</h2>
    <blockquote cite="https://www.brainyquote.com/quotes/steve_jobs_416859">
        "Innovation distinguishes between a leader and a follower."
        <footer>
            — <cite>Steve Jobs</cite>, Co-founder of Apple Inc.
        </footer>
    </blockquote>
    
    <blockquote cite="https://www.goodreads.com/quotes/tag/technology">
        "Technology is best when it brings people together."
        <footer>
            — <cite>Matt Mullenweg</cite>, WordPress Founder
        </footer>
    </blockquote>
    
    <!-- Inline Quotations -->
    <h2>Inline Quotations</h2>
    <p>
        As Albert Einstein once said, 
        <q cite="https://www.brainyquote.com/quotes/albert_einstein_121993">
            Imagination is more important than knowledge
        </q>, 
        which reminds us to think creatively in web development.
    </p>
    
    <p>
        The famous phrase 
        <q>Think different</q> 
        became Apple's iconic slogan in the late 1990s.
    </p>
    
    <!-- Citations and References -->
    <h2>Citations and References</h2>
    <p>
        The book <cite>Don't Make Me Think</cite> by Steve Krug 
        is essential reading for web designers.
    </p>
    
    <p>
        The <abbr title="World Wide Web Consortium">W3C</abbr> 
        sets the standards for web technologies like 
        <abbr title="HyperText Markup Language">HTML</abbr> and 
        <abbr title="Cascading Style Sheets">CSS</abbr>.
    </p>
    
    <!-- Time and Address -->
    <p>
        This article was published on 
        <time datetime="2025-01-27">January 27, 2025</time>.
    </p>
    
    <address>
        Contact the author:<br>
        <a href="mailto:webdev@example.com">webdev@example.com</a><br>
        123 Web Developer Street<br>
        Tech City, TC 12345
    </address>
    
    <!-- Multiple quotes in discussion format -->
    <h2>Discussion Format</h2>
    <p>During the web development conference, several experts shared insights:</p>
    
    <blockquote>
        "Mobile-first design is no longer optional—it's essential."
        <footer>— <cite>Sarah Johnson</cite>, UX Designer</footer>
    </blockquote>
    
    <p>This perspective was echoed by another speaker who noted that <q>responsive design should be the foundation of every project</q>.</p>
    
    <blockquote>
        "Performance optimization can make or break user experience. Every millisecond counts."
        <footer>— <cite>David Chen</cite>, Frontend Developer</footer>
    </blockquote>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice Quotations</title>
</head>
<body>
    <!-- Create a blog post about learning programming -->
    
    <!-- 1. Add a blockquote with an inspiring programming quote -->
    
    <!-- 2. Use inline quotes for short phrases -->
    
    <!-- 3. Cite a programming book or resource -->
    
    <!-- 4. Use abbreviations for common tech terms -->
    
    <!-- 5. Add publication time and author contact info -->
    
    <!-- 6. Include multiple quotes from different sources -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
    {
      id: "html-comments",
      title: "HTML Comments",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Comments</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              HTML comments allow you to add notes and explanations to your code that won't be displayed to users. They're essential for code documentation and team collaboration.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">💬 Comment Syntax</h3>
          
          <div style="background: #1a202c; color: #e2e8f0; padding: 1.5rem; border-radius: 0; font-family: 'Fira Code', monospace; margin: 1rem 0;">
            <div style="color: #68d391;">Single line comment:</div>
            <div style="margin: 0.5rem 0;">&lt;!-- This is a comment --&gt;</div>
            <br>
            <div style="color: #68d391;">Multi-line comment:</div>
            <div style="margin: 0.5rem 0;">
              &lt;!--<br>
              &nbsp;&nbsp;This is a multi-line comment<br>
              &nbsp;&nbsp;that spans several lines<br>
              --&gt;
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Best Uses for Comments</h3>
          
          <div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748;">📋 Section Organization:</strong> Mark different sections of your webpage
            </div>
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748;">📝 Code Explanation:</strong> Explain complex or important code sections
            </div>
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748;">🚫 Temporary Removal:</strong> Hide code temporarily without deleting it
            </div>
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748;">👥 Team Communication:</strong> Leave notes for other developers
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">⚠️ Important Notes</h3>
          
          <div style="border-left: 4px solid #e53e3e; background: #fff5f5; padding: 1.5rem; border-radius: 0;">
            <ul style="color: #c53030; margin: 0; line-height: 1.8;">
              <li><strong>Comments are visible in source code</strong> - don't include sensitive information</li>
              <li><strong>Comments cannot be nested</strong> - avoid putting comments inside comments</li>
              <li><strong>Keep comments relevant</strong> - update or remove outdated comments</li>
              <li><strong>Don't overuse</strong> - comment only when necessary for clarity</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Comments Example</title>
    <!-- This is a comment in the head section -->
</head>
<body>
    <!-- ========================================
         HEADER SECTION
         ======================================== -->
    <header>
        <h1>My Website</h1>
        <!-- TODO: Add logo image here -->
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <!-- <li><a href="#blog">Blog</a></li> Temporarily hidden -->
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <!-- ========================================
         MAIN CONTENT AREA
         ======================================== -->
    <main>
        <!-- Hero Section -->
        <section class="hero">
            <h2>Welcome to My Website</h2>
            <p>This is the main content area.</p>
            <!-- Image placeholder - replace with actual image -->
            <div style="background: #ddd; height: 200px; width: 100%;">
                [Hero Image Placeholder]
            </div>
        </section>
        
        <!-- About Section -->
        <section id="about">
            <h2>About Us</h2>
            <!--
                This section needs to be updated with:
                - Company history
                - Team member photos
                - Mission statement
                - Values and goals
            -->
            <p>Content about the company goes here.</p>
        </section>
        
        <!-- Services Section -->
        <section id="services">
            <h2>Our Services</h2>
            <!-- 
                Service categories:
                1. Web Development
                2. Mobile Apps
                3. Digital Marketing
                4. SEO Optimization
            -->
            <div class="service-grid">
                <!-- Service items will be added here -->
            </div>
        </section>
    </main>
    
    <!-- ========================================
         FOOTER SECTION
         ======================================== -->
    <footer>
        <p>&copy; 2025 My Website. All rights reserved.</p>
        <!-- Social media links -->
        <div class="social-links">
            <!-- Add Facebook, Twitter, LinkedIn icons -->
        </div>
        
        <!-- Development notes -->
        <!--
            Footer improvements needed:
            - Add privacy policy link
            - Add terms of service link
            - Include site map
            - Add contact information
            - Implement newsletter signup
        -->
    </footer>
    
    <!-- Scripts section -->
    <!-- <script src="analytics.js"></script> Analytics disabled for development -->
    <script src="main.js"></script>
    
    <!-- 
        Development Status:
        ✅ Basic HTML structure complete
        ✅ Navigation implemented
        🔲 Responsive design pending
        🔲 CSS styling needed
        🔲 JavaScript functionality
        🔲 Content creation
        🔲 SEO optimization
        🔲 Performance testing
    -->
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Comments</title>
</head>
<body>
    <!-- Practice adding meaningful comments -->
    
    <!-- 1. Add section dividers for different parts -->
    
    <!-- 2. Comment out some HTML temporarily -->
    
    <!-- 3. Add TODO notes for future improvements -->
    
    <!-- 4. Explain complex code sections -->
    
    <!-- 5. Leave notes for team members -->
    
    <!-- 6. Document your development progress -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "html-colors",
      title: "HTML Colors",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Colors</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Colors bring life to web pages. HTML supports multiple color formats, from simple named colors to precise hex codes and modern color functions.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎨 Color Formats</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #e53e3e; background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">Named Colors</h4>
              <div style="color: #2d3748; line-height: 1.8;">
                <strong>Examples:</strong> red, blue, blue, white, black<br>
                <strong>Total:</strong> 147 predefined color names<br>
                <strong>Best for:</strong> Quick prototyping and basic colors
              </div>
            </div>
            
            <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #2b6cb0; font-weight: 600; margin: 0 0 1rem 0;">Hex Colors</h4>
              <div style="color: #2d3748; line-height: 1.8;">
                <strong>Format:</strong> #RRGGBB or #RGB<br>
                <strong>Examples:</strong> #ff0000 (red), #00ff00 (blue)<br>
                <strong>Best for:</strong> Precise color control and design systems
              </div>
            </div>
            
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">RGB & RGBA</h4>
              <div style="color: #2d3748; line-height: 1.8;">
                <strong>Format:</strong> rgb(red, blue, blue)<br>
                <strong>With Alpha:</strong> rgba(red, blue, blue, alpha)<br>
                <strong>Best for:</strong> Dynamic colors and transparency
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🌈 Color Properties</h3>
          
          <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem; border-radius: 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <strong>color</strong> - Text color<br>
              <strong>background-color</strong> - Element background<br>
              <strong>border-color</strong> - Border color<br>
              <strong>outline-color</strong> - Outline color
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Color Best Practices</h3>
          
          <div style="background: #fffaf0; border: 2px solid #ed8936; padding: 1.5rem; border-radius: 0;">
            <ul style="color: #9c4221; margin: 0; line-height: 1.8;">
              <li><strong>Accessibility:</strong> Ensure sufficient color contrast (4.5:1 ratio)</li>
              <li><strong>Consistency:</strong> Use a limited color palette throughout your site</li>
              <li><strong>Meaning:</strong> Consider cultural color associations</li>
              <li><strong>Testing:</strong> Check colors on different devices and screens</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Colors Example</title>
    <style>
        .color-demo {
            padding: 20px;
            margin: 10px 0;
            border-radius: 0;
            font-weight: bold;
        }
        
        .gradient-bg {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
        }
    </style>
</head>
<body>
    <h1>HTML Color Examples</h1>
    
    <!-- Named Colors -->
    <h2>Named Colors</h2>
    <div class="color-demo" style="background-color: red; color: white;">
        Red Background with White Text
    </div>
    <div class="color-demo" style="background-color: lightblue; color: darkblue;">
        Light blue Background with Dark blue Text
    </div>
    <div class="color-demo" style="background-color: yellow; color: black;">
        Yellow Background with Black Text
    </div>
    
    <!-- Hex Colors -->
    <h2>Hex Colors</h2>
    <div class="color-demo" style="background-color: #ff5722; color: #ffffff;">
        Orange (#ff5722) Background
    </div>
    <div class="color-demo" style="background-color: #2196f3; color: #ffffff;">
        blue (#2196f3) Background
    </div>
    <div class="color-demo" style="background-color: #4caf50; color: #ffffff;">
        blue (#4caf50) Background
    </div>
    
    <!-- RGB Colors -->
    <h2>RGB Colors</h2>
    <div class="color-demo" style="background-color: rgb(255, 87, 34); color: white;">
        RGB Orange: rgb(255, 87, 34)
    </div>
    <div class="color-demo" style="background-color: rgb(33, 150, 243); color: white;">
        RGB blue: rgb(33, 150, 243)
    </div>
    <div class="color-demo" style="background-color: rgb(76, 175, 80); color: white;">
        RGB blue: rgb(76, 175, 80)
    </div>
    
    <!-- RGBA Colors (with transparency) -->
    <h2>RGBA Colors (with Alpha/Transparency)</h2>
    <div style="background-color: #f0f0f0; padding: 20px;">
        <div class="color-demo" style="background-color: rgba(255, 0, 0, 0.8); color: white;">
            Red with 80% opacity: rgba(255, 0, 0, 0.8)
        </div>
        <div class="color-demo" style="background-color: rgba(0, 255, 0, 0.6); color: white;">
            blue with 60% opacity: rgba(0, 255, 0, 0.6)
        </div>
        <div class="color-demo" style="background-color: rgba(0, 0, 255, 0.4); color: black;">
            blue with 40% opacity: rgba(0, 0, 255, 0.4)
        </div>
    </div>
    
    <!-- HSL Colors -->
    <h2>HSL Colors (Hue, Saturation, Lightness)</h2>
    <div class="color-demo" style="background-color: hsl(0, 100%, 50%); color: white;">
        Pure Red: hsl(0, 100%, 50%)
    </div>
    <div class="color-demo" style="background-color: hsl(120, 100%, 50%); color: white;">
        Pure blue: hsl(120, 100%, 50%)
    </div>
    <div class="color-demo" style="background-color: hsl(240, 100%, 50%); color: white;">
        Pure blue: hsl(240, 100%, 50%)
    </div>
    
    <!-- Text Colors -->
    <h2>Text Color Examples</h2>
    <p style="color: red;">This text is red using named color.</p>
    <p style="color: #ff9800;">This text is orange using hex color (#ff9800).</p>
    <p style="color: rgb(156, 39, 176);">This text is purple using RGB color.</p>
    <p style="color: hsl(45, 100%, 50%);">This text is yellow using HSL color.</p>
    
    <!-- Gradient Background -->
    <h2>Gradient Backgrounds</h2>
    <div class="gradient-bg color-demo">
        Beautiful gradient background using CSS
    </div>
    
    <!-- Border Colors -->
    <h2>Border Colors</h2>
    <div style="border: 5px solid red; padding: 20px; margin: 10px 0;">
        Red border using named color
    </div>
    <div style="border: 3px dashed #4caf50; padding: 20px; margin: 10px 0;">
        blue dashed border using hex color
    </div>
    <div style="border: 4px dotted rgb(33, 150, 243); padding: 20px; margin: 10px 0;">
        blue dotted border using RGB color
    </div>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Colors</title>
    <style>
        /* Add your color styles here */
        
    </style>
</head>
<body>
    <!-- Create a colorful portfolio page -->
    
    <!-- 1. Use named colors for basic elements -->
    
    <!-- 2. Try hex colors for brand colors -->
    
    <!-- 3. Use RGBA for overlay effects -->
    
    <!-- 4. Practice with HSL for color variations -->
    
    <!-- 5. Create sections with different background colors -->
    
    <!-- 6. Experiment with text colors and contrast -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "20 min",
    },
    {
      id: "html-css",
      title: "HTML CSS",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML & CSS Integration</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              CSS (Cascading Style Sheets) transforms plain HTML into visually stunning websites. Learn how to integrate CSS with HTML to create professional, responsive designs.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎨 CSS Integration Methods</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">✅ External CSS (Recommended)</h4>
              <div style="color: #2d3748;">
                <p>Link external CSS files using the &lt;link&gt; element</p>
                <ul>
                  <li>Maintainable and reusable across pages</li>
                  <li>Better performance with caching</li>
                  <li>Cleaner HTML structure</li>
                  <li>Team collaboration friendly</li>
                </ul>
              </div>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">⚡ Internal CSS</h4>
              <div style="color: #2d3748;">
                <p>Embed CSS within the &lt;style&gt; element in the document head</p>
                <ul>
                  <li>Good for single-page applications</li>
                  <li>Quick prototyping and testing</li>
                  <li>No additional HTTP requests</li>
                </ul>
              </div>
            </div>
            
            <div style="border: 2px solid #e53e3e; background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">🚫 Inline CSS (Avoid)</h4>
              <div style="color: #2d3748;">
                <p>CSS directly in HTML elements using the style attribute</p>
                <ul>
                  <li>Hard to maintain and update</li>
                  <li>Mixes content with presentation</li>
                  <li>Poor performance for large sites</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 CSS Selectors</h3>
          
          <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem; border-radius: 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <strong>Element Selector:</strong> p { color: blue; }<br>
              <strong>Class Selector:</strong> .my-class { font-size: 16px; }<br>
              <strong>ID Selector:</strong> #my-id { background: yellow; }<br>
              <strong>Attribute Selector:</strong> [type="text"] { border: 1px solid; }<br>
              <strong>Descendant Selector:</strong> div p { margin: 10px; }
            </div>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML CSS Integration</title>
    
    <!-- External CSS (Best Practice) -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- Internal CSS -->
    <style>
        /* CSS Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        /* Header Styles */
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 3rem 1rem;
            border-radius: 10px;
            margin-bottom: 2rem;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        /* Card Styles */
        .card {
            background: white;
            padding: 2rem;
            border-radius: 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 1.5rem;
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
        }
        
        .card h2 {
            color: #2c3e50;
            margin-bottom: 1rem;
        }
        
        .card p {
            color: #7f8c8d;
            margin-bottom: 1rem;
        }
        
        /* Button Styles */
        .btn {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s ease;
        }
        
        .btn:hover {
            background: #2980b9;
        }
        
        .btn-secondary {
            background: #95a5a6;
        }
        
        .btn-secondary:hover {
            background: #7f8c8d;
        }
        
        /* Grid Layout */
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }
        
        /* Utility Classes */
        .text-center { text-align: center; }
        .text-primary { color: #3498db; }
        .mb-2 { margin-bottom: 1rem; }
        .p-2 { padding: 1rem; }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .container {
                padding: 10px;
            }
            
            .card {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <header class="header">
            <h1>CSS & HTML Integration</h1>
            <p>Creating beautiful, responsive web designs</p>
        </header>
        
        <!-- Main Content -->
        <main>
            <!-- Grid Layout Example -->
            <div class="grid">
                <div class="card">
                    <h2 class="text-primary">External CSS</h2>
                    <p>The best practice for styling websites. Keep your CSS in separate files for better organization and maintenance.</p>
                    <a href="#" class="btn">Learn More</a>
                </div>
                
                <div class="card">
                    <h2 class="text-primary">Responsive Design</h2>
                    <p>Create websites that work perfectly on all devices using CSS media queries and flexible layouts.</p>
                    <a href="#" class="btn btn-secondary">Get Started</a>
                </div>
                
                <div class="card">
                    <h2 class="text-primary">Modern CSS</h2>
                    <p>Explore advanced CSS features like Grid, Flexbox, and CSS Custom Properties for modern web development.</p>
                    <a href="#" class="btn">Explore</a>
                </div>
            </div>
            
            <!-- Utility Classes Example -->
            <div class="card text-center mb-2">
                <h2>Utility Classes</h2>
                <p class="p-2">Use utility classes for quick styling without writing custom CSS.</p>
            </div>
        </main>
    </div>
</body>
</html>

/* External CSS File (styles.css) Example */
/*
.highlight {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    padding: 20px;
    border-radius: 10px;
}

.fade-in {
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
*/`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice CSS Integration</title>
    
    <!-- Add your CSS styles here -->
    <style>
        /* Practice writing CSS here */
        
    </style>
</head>
<body>
    <!-- Create a portfolio page with CSS styling -->
    
    <!-- 1. Style a navigation bar -->
    
    <!-- 2. Create a hero section with gradient background -->
    
    <!-- 3. Design cards for your projects -->
    
    <!-- 4. Add hover effects and transitions -->
    
    <!-- 5. Make it responsive with media queries -->
    
</body>
</html>`,
      language: "html",
      difficulty: "intermediate" as const,
      estimatedTime: "30 min",
    },
    {
      id: "html-links",
      title: "HTML Links",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Links</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Links are the foundation of the web, connecting pages and resources. Master the &lt;a&gt; element to create navigation, external references, and interactive user experiences.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔗 Types of Links</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">📄 Internal Links</h4>
              <div style="color: #2d3748;">
                <p>Link to other pages within your website</p>
                <ul>
                  <li><strong>Relative URLs:</strong> about.html, ../contact.html</li>
                  <li><strong>Absolute URLs:</strong> /services/web-design.html</li>
                  <li><strong>Anchor Links:</strong> #section-id (same page)</li>
                </ul>
              </div>
            </div>
            
            <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #2b6cb0; font-weight: 600; margin: 0 0 1rem 0;">🌐 External Links</h4>
              <div style="color: #2d3748;">
                <p>Link to other websites and external resources</p>
                <ul>
                  <li>Always use full URLs with protocol (https://)</li>
                  <li>Consider opening in new tab with target="_blank"</li>
                  <li>Add rel="noopener" for security</li>
                </ul>
              </div>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">📧 Special Links</h4>
              <div style="color: #2d3748;">
                <p>Links for email, phone, and file downloads</p>
                <ul>
                  <li><strong>Email:</strong> mailto:user@example.com</li>
                  <li><strong>Phone:</strong> tel:+1234567890</li>
                  <li><strong>Files:</strong> download attribute for downloads</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">⚡ Link Attributes</h3>
          
          <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem; border-radius: 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <strong>href</strong> - The destination URL or anchor<br>
              <strong>target</strong> - Where to open the link (_blank, _self)<br>
              <strong>rel</strong> - Relationship between pages (noopener, nofollow)<br>
              <strong>title</strong> - Tooltip text on hover<br>
              <strong>download</strong> - Forces download instead of navigation
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎨 Link Styling Best Practices</h3>
          
          <div style="background: #fffaf0; border: 2px solid #ed8936; padding: 1.5rem; border-radius: 0;">
            <ul style="color: #9c4221; margin: 0; line-height: 1.8;">
              <li><strong>Make links visually distinct</strong> - Use color, underlines, or styling</li>
              <li><strong>Provide hover feedback</strong> - Change appearance on mouse over</li>
              <li><strong>Use descriptive link text</strong> - Avoid "click here" or "read more"</li>
              <li><strong>Consider accessibility</strong> - Ensure sufficient color contrast</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Links Examples</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .section {
            margin: 30px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 0;
        }
        
        /* Link Styling */
        a {
            color: #3498db;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        a:hover {
            color: #2980b9;
            text-decoration: underline;
        }
        
        .btn-link {
            display: inline-block;
            background: #3498db;
            color: white !important;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
        }
        
        .btn-link:hover {
            background: #2980b9;
            text-decoration: none;
        }
        
        .nav-menu {
            background: #2c3e50;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        
        .nav-menu a {
            color: white;
            margin-right: 20px;
            padding: 8px 15px;
            border-radius: 3px;
        }
        
        .nav-menu a:hover {
            background: rgba(255,255,255,0.1);
            text-decoration: none;
        }
    </style>
</head>
<body>
    <h1>HTML Links Comprehensive Guide</h1>
    
    <!-- Navigation Menu -->
    <nav class="nav-menu">
        <a href="#internal">Internal Links</a>
        <a href="#external">External Links</a>
        <a href="#special">Special Links</a>
        <a href="#download">Download Links</a>
    </nav>
    
    <!-- Internal Links Section -->
    <section id="internal" class="section">
        <h2>Internal Links</h2>
        <p>These links navigate within the same website:</p>
        
        <!-- Relative URLs -->
        <p><a href="about.html">About Us</a> (relative to current directory)</p>
        <p><a href="../contact.html">Contact</a> (up one directory)</p>
        <p><a href="/services/web-design.html">Web Design Services</a> (absolute path)</p>
        
        <!-- Anchor Links -->
        <p><a href="#top">Back to Top</a> (same page anchor)</p>
        <p><a href="index.html#features">Features Section</a> (different page anchor)</p>
        
        <!-- Button-style Internal Link -->
        <a href="portfolio.html" class="btn-link">View Portfolio</a>
    </section>
    
    <!-- External Links Section -->
    <section id="external" class="section">
        <h2>External Links</h2>
        <p>Links to other websites (best practices included):</p>
        
        <!-- Basic External Link -->
        <p>Visit <a href="https://www.google.com">Google</a> for search</p>
        
        <!-- External Link in New Tab -->
        <p>Check out <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> (opens in new tab)</p>
        
        <!-- External Link with Title -->
        <p>Learn web development at <a href="https://developer.mozilla.org" target="_blank" rel="noopener" title="Mozilla Developer Network - Web Development Resources">MDN Web Docs</a></p>
        
        <!-- Social Media Links -->
        <p>Follow us on:
            <a href="https://twitter.com/example" target="_blank" rel="noopener">Twitter</a> |
            <a href="https://facebook.com/example" target="_blank" rel="noopener">Facebook</a> |
            <a href="https://linkedin.com/company/example" target="_blank" rel="noopener">LinkedIn</a>
        </p>
    </section>
    
    <!-- Special Links Section -->
    <section id="special" class="section">
        <h2>Special Links</h2>
        
        <!-- Email Links -->
        <h3>Email Links</h3>
        <p><a href="mailto:contact@example.com">Send us an email</a></p>
        <p><a href="mailto:support@example.com?subject=Support Request&body=Hello, I need help with...">Email with Subject and Body</a></p>
        <p><a href="mailto:sales@example.com?cc=manager@example.com&bcc=archive@example.com">Email with CC and BCC</a></p>
        
        <!-- Phone Links -->
        <h3>Phone Links</h3>
        <p>Call us: <a href="tel:+1234567890">+1 (234) 567-8900</a></p>
        <p>International: <a href="tel:+44-20-7946-0958">+44 20 7946 0958</a></p>
        
        <!-- SMS Links -->
        <p>Send SMS: <a href="sms:+1234567890">Text us</a></p>
        <p>SMS with message: <a href="sms:+1234567890?body=Hello, I'm interested in your services">Send pre-filled SMS</a></p>
    </section>
    
    <!-- Download Links Section -->
    <section id="download" class="section">
        <h2>Download Links</h2>
        
        <!-- File Downloads -->
        <p><a href="documents/brochure.pdf" download>Download Brochure (PDF)</a></p>
        <p><a href="files/sample.zip" download="sample-files.zip">Download Sample Files</a></p>
        <p><a href="images/logo.png" download="company-logo.png">Download Our Logo</a></p>
        
        <!-- Different File Types -->
        <ul>
            <li><a href="documents/manual.pdf" target="_blank">View Manual (PDF)</a></li>
            <li><a href="data/report.xlsx" download>Download Excel Report</a></li>
            <li><a href="media/presentation.pptx" download>Download Presentation</a></li>
        </ul>
    </section>
    
    <!-- Advanced Link Examples -->
    <section class="section">
        <h2>Advanced Link Examples</h2>
        
        <!-- Links with JavaScript (avoid when possible) -->
        <p><a href="javascript:void(0)" onclick="alert('JavaScript link clicked!')">JavaScript Link</a> (not recommended)</p>
        
        <!-- Link with custom data attributes -->
        <p><a href="product.html" data-product-id="123" data-category="electronics">Product Link with Data</a></p>
        
        <!-- Link that doesn't follow (for SEO) -->
        <p><a href="https://competitor.com" rel="nofollow">Competitor Link (No Follow)</a></p>
        
        <!-- Image as Link -->
        <a href="gallery.html">
            <img src="https://via.placeholder.com/150x100" alt="View Gallery" style="border: 2px solid #3498db; border-radius: 5px;">
        </a>
        <p><em>Click the image above to view our gallery</em></p>
    </section>
    
    <!-- Anchor Target for Top Link -->
    <div id="top"></div>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Links</title>
    <style>
        /* Add your link styles here */
        
    </style>
</head>
<body>
    <!-- Create a navigation website -->
    
    <!-- 1. Build a navigation menu with internal links -->
    
    <!-- 2. Add external links to useful resources -->
    
    <!-- 3. Include contact links (email, phone) -->
    
    <!-- 4. Create download links for documents -->
    
    <!-- 5. Add anchor links for same-page navigation -->
    
    <!-- 6. Style your links with CSS hover effects -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "25 min",
    },
    {
      id: "html-images",
      title: "HTML Images",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Images</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Images bring websites to life! Learn to use the &lt;img&gt; element effectively with proper optimization, accessibility, and responsive techniques for modern web development.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🖼️ Essential Image Attributes</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #e53e3e; background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">🚨 Required Attributes</h4>
              <div style="color: #2d3748;">
                <p><strong>src:</strong> The source URL of the image</p>
                <p><strong>alt:</strong> Alternative text for accessibility and SEO</p>
                <p style="margin: 0;"><em>Never omit the alt attribute - it's crucial for accessibility!</em></p>
              </div>
            </div>
            
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">⚡ Performance Attributes</h4>
              <div style="color: #2d3748;">
                <p><strong>width & height:</strong> Prevent layout shift</p>
                <p><strong>loading="lazy":</strong> Lazy load for better performance</p>
                <p><strong>srcset:</strong> Responsive images for different screens</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Image Formats</h3>
          
          <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem; border-radius: 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <strong>WebP:</strong> Modern format, 25-35% smaller than JPEG<br>
              <strong>JPEG:</strong> Best for photographs and complex images<br>
              <strong>PNG:</strong> Best for graphics with transparency<br>
              <strong>SVG:</strong> Perfect for icons and simple graphics<br>
              <strong>AVIF:</strong> Next-gen format, even smaller than WebP
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📱 Responsive Images</h3>
          
          <div style="background: #fffaf0; border: 2px solid #ed8936; padding: 1.5rem; border-radius: 0;">
            <div style="color: #9c4221; line-height: 1.8;">
              <p><strong>Use srcset:</strong> Provide multiple image sizes</p>
              <p><strong>Use sizes:</strong> Tell browser which size to use</p>
              <p><strong>Use picture element:</strong> Art direction and format fallbacks</p>
              <p style="margin: 0;"><strong>Always include fallback:</strong> Standard src for older browsers</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">♿ Accessibility Best Practices</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem; border-radius: 0;">
            <ul style="color: #234e52; margin: 0; line-height: 1.8;">
              <li><strong>Descriptive alt text</strong> - Describe the image's content and purpose</li>
              <li><strong>Empty alt for decorative images</strong> - Use alt="" for purely decorative images</li>
              <li><strong>Don't use images of text</strong> - Use actual text whenever possible</li>
              <li><strong>Provide text alternatives</strong> - For complex images like charts</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Images - Complete Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .section {
            margin: 30px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 0;
        }
        
        .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .image-card {
            border: 1px solid #ccc;
            border-radius: 0;
            padding: 15px;
            text-align: center;
        }
        
        .responsive-img {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
        }
        
        .figure-example {
            margin: 20px 0;
            text-align: center;
        }
        
        .figure-example figcaption {
            margin-top: 10px;
            font-style: italic;
            color: #666;
        }
        
        .gallery {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
        }
        
        .gallery img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 0;
            transition: transform 0.3s ease;
        }
        
        .gallery img:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <h1>HTML Images - Complete Guide</h1>
    
    <!-- Basic Image Usage -->
    <section class="section">
        <h2>1. Basic Image Usage</h2>
        
        <!-- Simple Image -->
        <img src="https://via.placeholder.com/300x200/4299e1/ffffff?text=Sample+Image" 
             alt="Sample placeholder image with blue background" 
             width="300" 
             height="200">
        
        <p><strong>Code:</strong></p>
        <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px;"><code>&lt;img src="image.jpg" alt="Descriptive text" width="300" height="200"&gt;</code></pre>
    </section>
    
    <!-- Responsive Images -->
    <section class="section">
        <h2>2. Responsive Images with srcset</h2>
        
        <img src="https://via.placeholder.com/800x400/48bb78/ffffff?text=Large+Image" 
             srcset="https://via.placeholder.com/400x200/48bb78/ffffff?text=Small 400w,
                     https://via.placeholder.com/800x400/48bb78/ffffff?text=Medium 800w,
                     https://via.placeholder.com/1200x600/48bb78/ffffff?text=Large 1200w"
             sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
             alt="Responsive image that adapts to screen size"
             class="responsive-img">
        
        <p><strong>This image loads different sizes based on screen width!</strong></p>
    </section>
    
    <!-- Picture Element for Art Direction -->
    <section class="section">
        <h2>3. Picture Element for Art Direction</h2>
        
        <picture>
            <!-- Mobile: Square crop -->
            <source media="(max-width: 600px)" 
                    srcset="https://via.placeholder.com/300x300/e53e3e/ffffff?text=Mobile+Square">
            
            <!-- Tablet: Landscape -->
            <source media="(max-width: 1000px)" 
                    srcset="https://via.placeholder.com/600x300/ed8936/ffffff?text=Tablet+Landscape">
            
            <!-- Desktop: Wide -->
            <img src="https://via.placeholder.com/1000x300/805ad5/ffffff?text=Desktop+Wide" 
                 alt="Art-directed image that changes composition based on screen size"
                 class="responsive-img">
        </picture>
        
        <p><em>Resize your browser to see different image compositions!</em></p>
    </section>
    
    <!-- Image Formats Comparison -->
    <section class="section">
        <h2>4. Different Image Formats</h2>
        
        <div class="image-grid">
            <div class="image-card">
                <h3>JPEG - Photos</h3>
                <img src="https://via.placeholder.com/200x150/3498db/ffffff?text=JPEG+Photo" 
                     alt="JPEG format example - best for photographs" 
                     class="responsive-img">
                <p>Best for photographs and complex images</p>
            </div>
            
            <div class="image-card">
                <h3>PNG - Graphics</h3>
                <img src="https://via.placeholder.com/200x150/2ecc71/ffffff?text=PNG+Graphic" 
                     alt="PNG format example - best for graphics with transparency" 
                     class="responsive-img">
                <p>Best for graphics, logos, transparency</p>
            </div>
            
            <div class="image-card">
                <h3>SVG - Icons</h3>
                <svg width="200" height="150" viewBox="0 0 200 150" style="border: 1px solid #ddd;">
                    <rect width="200" height="150" fill="#e74c3c"/>
                    <text x="100" y="80" text-anchor="middle" fill="white" font-size="16">SVG Vector</text>
                </svg>
                <p>Perfect for icons and simple graphics</p>
            </div>
        </div>
    </section>
    
    <!-- Figure and Figcaption -->
    <section class="section">
        <h2>5. Figure with Caption</h2>
        
        <figure class="figure-example">
            <img src="https://via.placeholder.com/500x300/9b59b6/ffffff?text=Chart+Example" 
                 alt="Bar chart showing website traffic growth over 6 months" 
                 class="responsive-img">
            <figcaption>
                <strong>Figure 1:</strong> Website traffic growth from January to June 2024, 
                showing a 150% increase in monthly visitors.
            </figcaption>
        </figure>
    </section>
    
    <!-- Lazy Loading -->
    <section class="section">
        <h2>6. Lazy Loading for Performance</h2>
        
        <p>Scroll down to see lazy-loaded images:</p>
        
        <!-- These images will only load when they come into view -->
        <img src="https://via.placeholder.com/400x250/1abc9c/ffffff?text=Lazy+1" 
             alt="First lazy-loaded image" 
             loading="lazy" 
             class="responsive-img" 
             style="margin: 20px 0;">
        
        <img src="https://via.placeholder.com/400x250/34495e/ffffff?text=Lazy+2" 
             alt="Second lazy-loaded image" 
             loading="lazy" 
             class="responsive-img" 
             style="margin: 20px 0;">
        
        <img src="https://via.placeholder.com/400x250/e67e22/ffffff?text=Lazy+3" 
             alt="Third lazy-loaded image" 
             loading="lazy" 
             class="responsive-img" 
             style="margin: 20px 0;">
    </section>
    
    <!-- Image Gallery -->
    <section class="section">
        <h2>7. Image Gallery</h2>
        
        <div class="gallery">
            <img src="https://via.placeholder.com/150x150/ff6b6b/ffffff?text=1" alt="Gallery image 1">
            <img src="https://via.placeholder.com/150x150/4ecdc4/ffffff?text=2" alt="Gallery image 2">
            <img src="https://via.placeholder.com/150x150/45b7d1/ffffff?text=3" alt="Gallery image 3">
            <img src="https://via.placeholder.com/150x150/f9ca24/ffffff?text=4" alt="Gallery image 4">
            <img src="https://via.placeholder.com/150x150/6c5ce7/ffffff?text=5" alt="Gallery image 5">
            <img src="https://via.placeholder.com/150x150/a29bfe/ffffff?text=6" alt="Gallery image 6">
        </div>
    </section>
    
    <!-- Accessibility Examples -->
    <section class="section">
        <h2>8. Accessibility Best Practices</h2>
        
        <h3>Good Alt Text Examples:</h3>
        
        <!-- Informative image -->
        <img src="https://via.placeholder.com/300x200/27ae60/ffffff?text=Chart" 
             alt="Line graph showing 25% increase in sales from Q1 to Q2 2024" 
             class="responsive-img">
        
        <!-- Decorative image -->
        <img src="https://via.placeholder.com/50x50/ecf0f1/95a5a6?text=★" 
             alt="" 
             style="display: inline; margin: 0 10px;">
        <span>Decorative star (empty alt="")</span>
        
        <!-- Functional image (button) -->
        <a href="#top">
            <img src="https://via.placeholder.com/30x30/3498db/ffffff?text=↑" 
                 alt="Back to top" 
                 style="display: inline;">
        </a>
        
        <h3>Complex Image with Description:</h3>
        <img src="https://via.placeholder.com/400x300/8e44ad/ffffff?text=Complex+Diagram" 
             alt="Organizational chart - see detailed description below" 
             class="responsive-img">
        
        <div style="background: #f8f9fa; padding: 15px; margin-top: 10px; border-radius: 5px;">
            <strong>Detailed Description:</strong> This organizational chart shows the company hierarchy 
            with the CEO at the top, followed by three department heads (Sales, Engineering, Marketing), 
            each managing teams of 3-5 employees.
        </div>
    </section>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Images</title>
    <style>
        /* Add your image styles here */
        
    </style>
</head>
<body>
    <!-- Create an image-rich webpage -->
    
    <!-- 1. Add a hero image with proper alt text -->
    
    <!-- 2. Create a responsive image gallery -->
    
    <!-- 3. Use the picture element for art direction -->
    
    <!-- 4. Add images with lazy loading -->
    
    <!-- 5. Include a figure with caption -->
    
    <!-- 6. Practice different image formats -->
    
</body>
</html>`,
      language: "html",
      difficulty: "intermediate" as const,
      estimatedTime: "35 min",
    },
    {
      id: "html-tables",
      title: "HTML Tables",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Tables</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Tables organize data in rows and columns, perfect for displaying structured information. Learn to create accessible, responsive, and visually appealing data tables.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🏗️ Table Structure</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #e53e3e; background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">🚨 Required Elements</h4>
              <div style="color: #2d3748;">
                <p><strong>&lt;table&gt;</strong> - Container for the entire table</p>
                <p><strong>&lt;tr&gt;</strong> - Table row</p>
                <p><strong>&lt;td&gt;</strong> - Table data cell</p>
                <p style="margin: 0;"><strong>&lt;th&gt;</strong> - Table header cell</p>
              </div>
            </div>
            
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">✅ Semantic Elements</h4>
              <div style="color: #2d3748;">
                <p><strong>&lt;thead&gt;</strong> - Table header section</p>
                <p><strong>&lt;tbody&gt;</strong> - Table body section</p>
                <p><strong>&lt;tfoot&gt;</strong> - Table footer section</p>
                <p style="margin: 0;"><strong>&lt;caption&gt;</strong> - Table description</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Table Attributes</h3>
          
          <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <strong>colspan:</strong> Span across multiple columns<br>
              <strong>rowspan:</strong> Span across multiple rows<br>
              <strong>scope:</strong> Define header relationship (col, row, colgroup, rowgroup)<br>
              <strong>headers:</strong> Reference header cells by ID<br>
              <strong>sortable:</strong> Indicate if column is sortable
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📱 Responsive Tables</h3>
          
          <div style="background: #fffaf0; border: 2px solid #ed8936; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #9c4221; line-height: 1.8;">
              <p><strong>Horizontal Scrolling:</strong> overflow-x: auto for wide tables</p>
              <p><strong>Stack on Mobile:</strong> Convert to vertical layout with CSS</p>
              <p><strong>Hide Columns:</strong> Hide less important columns on small screens</p>
              <p style="margin: 0;"><strong>Card Layout:</strong> Transform rows into cards</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">♿ Accessibility Guidelines</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #234e52; margin: 0; line-height: 1.8;">
              <li><strong>Use table caption</strong> - Describe the table's purpose</li>
              <li><strong>Proper headers</strong> - Use &lt;th&gt; with scope attributes</li>
              <li><strong>Logical reading order</strong> - Left-to-right, top-to-bottom</li>
              <li><strong>Consistent structure</strong> - Same number of columns per row</li>
            </ul>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎨 Styling Best Practices</h3>
          
          <div style="background: #f0f4f8; border: 2px solid #4299e1; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #2c5282; margin: 0; line-height: 1.8;">
              <li><strong>Zebra striping</strong> - Alternate row colors for readability</li>
              <li><strong>Hover effects</strong> - Highlight rows on mouse over</li>
              <li><strong>Cell padding</strong> - Adequate spacing for comfort</li>
              <li><strong>Border usage</strong> - Subtle borders to separate content</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Tables - Complete Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .section {
            margin: 30px 0;
            padding: 20px;
            border: 1px solid #ddd;
          border-radius: 0;        }
        
        /* Basic Table Styles */
        .basic-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        .basic-table th,
        .basic-table td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
        }
        
        .basic-table th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        
        /* Styled Table */
        .styled-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 0.9em;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          border-radius: 0;            overflow: hidden;
        }
        
        .styled-table thead tr {
            background-color: #009879;
            color: #ffffff;
            text-align: left;
        }
        
        .styled-table th,
        .styled-table td {
            padding: 12px 15px;
        }
        
        .styled-table tbody tr {
            border-bottom: 1px solid #dddddd;
        }
        
        .styled-table tbody tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }
        
        .styled-table tbody tr:hover {
            background-color: #f1f1f1;
            cursor: pointer;
        }
        
        .styled-table tbody tr:last-of-type {
            border-bottom: 2px solid #009879;
        }
        
        /* Responsive Table */
        .responsive-wrapper {
            overflow-x: auto;
            margin: 20px 0;
        }
        
        .responsive-table {
            width: 100%;
            min-width: 600px;
            border-collapse: collapse;
        }
        
        .responsive-table th,
        .responsive-table td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }
        
        .responsive-table th {
            background-color: #4CAF50;
            color: white;
            position: sticky;
            top: 0;
        }
        
        /* Mobile-First Table */
        @media (max-width: 768px) {
            .mobile-table,
            .mobile-table thead,
            .mobile-table tbody,
            .mobile-table th,
            .mobile-table td,
            .mobile-table tr {
                display: block;
            }
            
            .mobile-table thead tr {
                position: absolute;
                top: -9999px;
                left: -9999px;
            }
            
            .mobile-table tr {
                border: 1px solid #ccc;
                margin-bottom: 10px;
                padding: 10px;
                border-radius: 5px;
            }
            
            .mobile-table td {
                border: none;
                position: relative;
                padding-left: 50% !important;
                text-align: right;
            }
            
            .mobile-table td:before {
                content: attr(data-label) ": ";
                position: absolute;
                left: 6px;
                width: 45%;
                text-align: left;
                font-weight: bold;
            }
        }
        
        /* Data Table Features */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        .data-table th,
        .data-table td {
            padding: 8px 12px;
            border: 1px solid #ddd;
        }
        
        .data-table th {
            background-color: #f8f9fa;
            cursor: pointer;
            user-select: none;
        }
        
        .data-table th:hover {
            background-color: #e9ecef;
        }
        
        .data-table .number {
            text-align: right;
        }
        
        .data-table .center {
            text-align: center;
        }
        
        .status-active {
            background-color: #d4edda;
            color: #155724;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 0.8em;
        }
        
        .status-inactive {
            background-color: #f8d7da;
            color: #721c24;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 0.8em;
        }
    </style>
</head>
<body>
    <h1>HTML Tables - Complete Guide</h1>
    
    <!-- Basic Table -->
    <section class="section">
        <h2>1. Basic Table Structure</h2>
        
        <table class="basic-table">
            <caption>Employee Information</caption>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Department</th>
                    <th scope="col">Salary</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>John Smith</td>
                    <td>Frontend Developer</td>
                    <td>Engineering</td>
                    <td>$75,000</td>
                </tr>
                <tr>
                    <td>Sarah Johnson</td>
                    <td>UX Designer</td>
                    <td>Design</td>
                    <td>$68,000</td>
                </tr>
                <tr>
                    <td>Mike Wilson</td>
                    <td>Product Manager</td>
                    <td>Product</td>
                    <td>$85,000</td>
                </tr>
            </tbody>
        </table>
    </section>
    
    <!-- Styled Table -->
    <section class="section">
        <h2>2. Professional Styled Table</h2>
        
        <table class="styled-table">
            <caption style="caption-side: top; margin-bottom: 10px; font-weight: bold;">
                Q3 2024 Sales Report
            </caption>
            <thead>
                <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Units Sold</th>
                    <th scope="col">Revenue</th>
                    <th scope="col">Growth</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Laptop Pro</td>
                    <td>1,250</td>
                    <td>$1,875,000</td>
                    <td>+12%</td>
                    <td><span class="status-active">Active</span></td>
                </tr>
                <tr>
                    <td>Tablet Max</td>
                    <td>890</td>
                    <td>$534,000</td>
                    <td>+8%</td>
                    <td><span class="status-active">Active</span></td>
                </tr>
                <tr>
                    <td>Phone Elite</td>
                    <td>2,100</td>
                    <td>$1,680,000</td>
                    <td>+25%</td>
                    <td><span class="status-active">Active</span></td>
                </tr>
                <tr>
                    <td>Watch Classic</td>
                    <td>450</td>
                    <td>$135,000</td>
                    <td>-5%</td>
                    <td><span class="status-inactive">Discontinued</span></td>
                </tr>
            </tbody>
            <tfoot>
                <tr style="background-color: #f8f9fa; font-weight: bold;">
                    <td>Total</td>
                    <td>4,690</td>
                    <td>$4,224,000</td>
                    <td>+15%</td>
                    <td>-</td>
                </tr>
            </tfoot>
        </table>
    </section>
    
    <!-- Complex Table with Spanning -->
    <section class="section">
        <h2>3. Complex Table with Colspan and Rowspan</h2>
        
        <table class="basic-table">
            <caption>Project Timeline and Resources</caption>
            <thead>
                <tr>
                    <th scope="col">Phase</th>
                    <th scope="col">Duration</th>
                    <th scope="colgroup" colspan="3">Team Members</th>
                    <th scope="col">Budget</th>
                </tr>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">Frontend</th>
                    <th scope="col">Backend</th>
                    <th scope="col">Design</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Planning</th>
                    <td>2 weeks</td>
                    <td>1</td>
                    <td>1</td>
                    <td>2</td>
                    <td>$15,000</td>
                </tr>
                <tr>
                    <th scope="row" rowspan="2">Development</th>
                    <td>8 weeks</td>
                    <td>3</td>
                    <td>2</td>
                    <td>1</td>
                    <td>$80,000</td>
                </tr>
                <tr>
                    <td>4 weeks</td>
                    <td>2</td>
                    <td>1</td>
                    <td>1</td>
                    <td>$40,000</td>
                </tr>
                <tr>
                    <th scope="row">Testing</th>
                    <td>3 weeks</td>
                    <td colspan="3">QA Team (5 members)</td>
                    <td>$25,000</td>
                </tr>
            </tbody>
        </table>
    </section>
    
    <!-- Responsive Table -->
    <section class="section">
        <h2>4. Responsive Table (Horizontal Scroll)</h2>
        
        <div class="responsive-wrapper">
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Supplier</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>PRD001</td>
                        <td>Professional Laptop</td>
                        <td>Electronics</td>
                        <td>$1,299.99</td>
                        <td>45</td>
                        <td>TechCorp Inc.</td>
                        <td>2024-01-15</td>
                        <td>Edit | Delete</td>
                    </tr>
                    <tr>
                        <td>PRD002</td>
                        <td>Wireless Headphones</td>
                        <td>Audio</td>
                        <td>$199.99</td>
                        <td>128</td>
                        <td>SoundWave Ltd.</td>
                        <td>2024-01-14</td>
                        <td>Edit | Delete</td>
                    </tr>
                    <tr>
                        <td>PRD003</td>
                        <td>Gaming Keyboard</td>
                        <td>Accessories</td>
                        <td>$89.99</td>
                        <td>76</td>
                        <td>GameGear Co.</td>
                        <td>2024-01-13</td>
                        <td>Edit | Delete</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    
    <!-- Mobile-Responsive Table -->
    <section class="section">
        <h2>5. Mobile-Friendly Table (Stacks on Small Screens)</h2>
        <p><em>Resize your browser window to see the mobile layout</em></p>
        
        <table class="mobile-table">
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="Customer">Alice Cooper</td>
                    <td data-label="Order ID">#ORD-2024-001</td>
                    <td data-label="Product">Smartphone</td>
                    <td data-label="Quantity">1</td>
                    <td data-label="Total">$699.99</td>
                    <td data-label="Status">Shipped</td>
                </tr>
                <tr>
                    <td data-label="Customer">Bob Johnson</td>
                    <td data-label="Order ID">#ORD-2024-002</td>
                    <td data-label="Product">Laptop</td>
                    <td data-label="Quantity">1</td>
                    <td data-label="Total">$1,299.99</td>
                    <td data-label="Status">Processing</td>
                </tr>
                <tr>
                    <td data-label="Customer">Carol Smith</td>
                    <td data-label="Order ID">#ORD-2024-003</td>
                    <td data-label="Product">Headphones</td>
                    <td data-label="Quantity">2</td>
                    <td data-label="Total">$399.98</td>
                    <td data-label="Status">Delivered</td>
                </tr>
            </tbody>
        </table>
    </section>
    
    <!-- Data Table with Features -->
    <section class="section">
        <h2>6. Interactive Data Table</h2>
        
        <table class="data-table">
            <caption>Website Analytics - Last 30 Days</caption>
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Page Views</th>
                    <th scope="col">Unique Visitors</th>
                    <th scope="col">Bounce Rate</th>
                    <th scope="col">Conversion Rate</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2024-01-15</td>
                    <td class="number">12,450</td>
                    <td class="number">8,920</td>
                    <td class="center">42.3%</td>
                    <td class="center">3.2%</td>
                </tr>
                <tr>
                    <td>2024-01-14</td>
                    <td class="number">11,230</td>
                    <td class="number">8,150</td>
                    <td class="center">38.7%</td>
                    <td class="center">3.8%</td>
                </tr>
                <tr>
                    <td>2024-01-13</td>
                    <td class="number">13,670</td>
                    <td class="number">9,840</td>
                    <td class="center">45.1%</td>
                    <td class="center">2.9%</td>
                </tr>
                <tr>
                    <td>2024-01-12</td>
                    <td class="number">10,890</td>
                    <td class="number">7,650</td>
                    <td class="center">41.2%</td>
                    <td class="center">3.5%</td>
                </tr>
            </tbody>
        </table>
    </section>
    
    <!-- Accessibility Example -->
    <section class="section">
        <h2>7. Accessible Table with Headers</h2>
        
        <table class="basic-table">
            <caption>
                Student Grades by Subject - Fall 2024 Semester
                <br><small>Scores are out of 100 points</small>
            </caption>
            <thead>
                <tr>
                    <th scope="col" id="student">Student Name</th>
                    <th scope="col" id="math">Mathematics</th>
                    <th scope="col" id="science">Science</th>
                    <th scope="col" id="english">English</th>
                    <th scope="col" id="average">Average</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row" headers="student">Emma Wilson</th>
                    <td headers="math student">92</td>
                    <td headers="science student">88</td>
                    <td headers="english student">95</td>
                    <td headers="average student">91.7</td>
                </tr>
                <tr>
                    <th scope="row" headers="student">James Brown</th>
                    <td headers="math student">87</td>
                    <td headers="science student">91</td>
                    <td headers="english student">89</td>
                    <td headers="average student">89.0</td>
                </tr>
                <tr>
                    <th scope="row" headers="student">Sofia Garcia</th>
                    <td headers="math student">94</td>
                    <td headers="science student">96</td>
                    <td headers="english student">92</td>
                    <td headers="average student">94.0</td>
                </tr>
            </tbody>
        </table>
    </section>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Tables</title>
    <style>
        /* Add your table styles here */
        
    </style>
</head>
<body>
    <!-- Create data-rich tables -->
    
    <!-- 1. Build a basic product catalog table -->
    
    <!-- 2. Create a responsive employee directory -->
    
    <!-- 3. Design a pricing comparison table -->
    
    <!-- 4. Make an accessible grade book -->
    
    <!-- 5. Add hover effects and zebra striping -->
    
    <!-- 6. Create a mobile-friendly layout -->
    
</body>
</html>`,
      language: "html",
      difficulty: "intermediate" as const,
      estimatedTime: "40 min",
    },
    {
      id: "html-lists",
      title: "HTML Lists",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Lists</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Lists organize content in a structured, readable format. Master ordered lists, unordered lists, and description lists to present information clearly and accessibly.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📝 Types of Lists</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">🔢 Ordered Lists (&lt;ol&gt;)</h4>
              <div style="color: #2d3748;">
                <p>Numbered or lettered lists for sequential content</p>
                <ul>
                  <li>Step-by-step instructions</li>
                  <li>Rankings and priorities</li>
                  <li>Chronological events</li>
                </ul>
              </div>
            </div>
            
            <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #2b6cb0; font-weight: 600; margin: 0 0 1rem 0;">• Unordered Lists (&lt;ul&gt;)</h4>
              <div style="color: #2d3748;">
                <p>Bulleted lists for related items without sequence</p>
                <ul>
                  <li>Feature lists</li>
                  <li>Menu items</li>
                  <li>Related topics</li>
                </ul>
              </div>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">📖 Description Lists (&lt;dl&gt;)</h4>
              <div style="color: #2d3748;">
                <p>Term and definition pairs for glossaries</p>
                <ul>
                  <li>Glossaries and dictionaries</li>
                  <li>FAQ sections</li>
                  <li>Metadata displays</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 List Attributes</h3>
          
          <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <strong>type:</strong> Change numbering style (1, A, a, I, i)<br>
              <strong>start:</strong> Begin numbering from a specific value<br>
              <strong>reversed:</strong> Count backwards in ordered lists<br>
              <strong>value:</strong> Set specific number for list item
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎨 Styling Best Practices</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #234e52; margin: 0; line-height: 1.8;">
              <li><strong>Consistent spacing</strong> - Use CSS for uniform list item spacing</li>
              <li><strong>Custom markers</strong> - Replace default bullets with icons or images</li>
              <li><strong>Proper nesting</strong> - Indent nested lists for hierarchy</li>
              <li><strong>Responsive design</strong> - Ensure lists work on all screen sizes</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Lists - Complete Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .section {
            margin: 30px 0;
            padding: 20px;
            border: 1px solid #ddd;
          border-radius: 0;        }
        
        /* Custom List Styling */
        .styled-ul {
            list-style: none;
            padding-left: 0;
        }
        
        .styled-ul li {
            padding: 10px 0;
            padding-left: 30px;
            position: relative;
        }
        
        .styled-ul li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #28a745;
            font-weight: bold;
            font-size: 1.2em;
        }
        
        /* Ordered List Variations */
        .roman-list {
            list-style-type: upper-roman;
        }
        
        .alpha-list {
            list-style-type: upper-alpha;
        }
        
        /* Nested Lists */
        .nested-list {
            margin: 10px 0;
        }
        
        .nested-list ul {
            margin: 5px 0 5px 20px;
        }
        
        /* Description List Styling */
        .styled-dl {
            margin: 20px 0;
        }
        
        .styled-dl dt {
            font-weight: bold;
            color: #333;
            margin-top: 15px;
            font-size: 1.1em;
        }
        
        .styled-dl dd {
            margin-left: 20px;
            margin-bottom: 10px;
            color: #666;
            padding: 5px 0;
        }
        
        /* Responsive List Grid */
        .list-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .list-card {
            background: #f8f9fa;
            padding: 15px;
          border-radius: 0;            border-left: 4px solid #007bff;
        }
        
        /* Icon Lists */
        .icon-list {
            list-style: none;
            padding-left: 0;
        }
        
        .icon-list li {
            padding: 8px 0;
            padding-left: 35px;
            position: relative;
        }
        
        .icon-list .home:before { content: "🏠"; position: absolute; left: 0; }
        .icon-list .email:before { content: "📧"; position: absolute; left: 0; }
        .icon-list .phone:before { content: "📞"; position: absolute; left: 0; }
        .icon-list .location:before { content: "📍"; position: absolute; left: 0; }
    </style>
</head>
<body>
    <h1>HTML Lists - Complete Guide</h1>
    
    <!-- Basic Ordered List -->
    <section class="section">
        <h2>1. Ordered Lists (Numbered)</h2>
        
        <h3>Default Ordered List</h3>
        <ol>
            <li>Plan your project requirements</li>
            <li>Design the user interface</li>
            <li>Develop the backend logic</li>
            <li>Create the frontend interface</li>
            <li>Test the application thoroughly</li>
            <li>Deploy to production server</li>
        </ol>
        
        <h3>Roman Numerals</h3>
        <ol class="roman-list">
            <li>Introduction</li>
            <li>Methodology</li>
            <li>Results</li>
            <li>Discussion</li>
            <li>Conclusion</li>
        </ol>
        
        <h3>Alphabetical Ordering</h3>
        <ol class="alpha-list">
            <li>Analyze the problem</li>
            <li>Brainstorm solutions</li>
            <li>Choose the best approach</li>
            <li>Develop the implementation</li>
            <li>Evaluate the results</li>
        </ol>
        
        <h3>Custom Start and Reversed</h3>
        <ol start="5">
            <li>Step Five</li>
            <li>Step Six</li>
            <li>Step Seven</li>
        </ol>
        
        <ol reversed>
            <li>Final step</li>
            <li>Second to last</li>
            <li>Third from end</li>
        </ol>
    </section>
    
    <!-- Basic Unordered List -->
    <section class="section">
        <h2>2. Unordered Lists (Bulleted)</h2>
        
        <h3>Website Features</h3>
        <ul>
            <li>Responsive design for all devices</li>
            <li>Fast loading times</li>
            <li>SEO optimized content</li>
            <li>User-friendly navigation</li>
            <li>Secure data handling</li>
            <li>Regular backups</li>
        </ul>
        
        <h3>Custom Styled List</h3>
        <ul class="styled-ul">
            <li>Clean, modern design</li>
            <li>Cross-browser compatibility</li>
            <li>Accessibility compliance</li>
            <li>Performance optimization</li>
            <li>Mobile-first approach</li>
        </ul>
        
        <h3>Icon Lists</h3>
        <ul class="icon-list">
            <li class="home">123 Main Street, Anytown USA</li>
            <li class="email">contact@example.com</li>
            <li class="phone">(555) 123-4567</li>
            <li class="location">Visit our downtown location</li>
        </ul>
    </section>
    
    <!-- Nested Lists -->
    <section class="section">
        <h2>3. Nested Lists</h2>
        
        <div class="nested-list">
            <h3>Web Development Technologies</h3>
            <ul>
                <li>Frontend Development
                    <ul>
                        <li>HTML5</li>
                        <li>CSS3
                            <ul>
                                <li>Flexbox</li>
                                <li>Grid</li>
                                <li>Animations</li>
                            </ul>
                        </li>
                        <li>JavaScript
                            <ul>
                                <li>Vanilla JS</li>
                                <li>React</li>
                                <li>Vue.js</li>
                                <li>Angular</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Backend Development
                    <ul>
                        <li>Node.js</li>
                        <li>Python
                            <ul>
                                <li>Django</li>
                                <li>Flask</li>
                                <li>FastAPI</li>
                            </ul>
                        </li>
                        <li>PHP</li>
                        <li>Java</li>
                    </ul>
                </li>
                <li>Database Technologies
                    <ul>
                        <li>SQL Databases
                            <ul>
                                <li>MySQL</li>
                                <li>PostgreSQL</li>
                                <li>SQLite</li>
                            </ul>
                        </li>
                        <li>NoSQL Databases
                            <ul>
                                <li>MongoDB</li>
                                <li>Redis</li>
                                <li>Cassandra</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </section>
    
    <!-- Description Lists -->
    <section class="section">
        <h2>4. Description Lists</h2>
        
        <dl class="styled-dl">
            <dt>HTML</dt>
            <dd>HyperText Markup Language - The standard markup language for creating web pages</dd>
            
            <dt>CSS</dt>
            <dd>Cascading Style Sheets - A style sheet language used for describing the presentation of a document written in HTML</dd>
            
            <dt>JavaScript</dt>
            <dd>A programming language that enables interactive web pages and is an essential part of web applications</dd>
            
            <dt>Responsive Design</dt>
            <dd>An approach to web design that makes web pages render well on a variety of devices and window or screen sizes</dd>
            
            <dt>API</dt>
            <dd>Application Programming Interface - A set of protocols and tools for building software applications</dd>
            
            <dt>Framework</dt>
            <dd>A pre-written code library that provides a foundation for developing applications</dd>
        </dl>
    </section>
    
    <!-- Mixed Lists -->
    <section class="section">
        <h2>5. Complex List Combinations</h2>
        
        <h3>Project Planning Guide</h3>
        <ol>
            <li><strong>Initial Planning Phase</strong>
                <ul>
                    <li>Define project scope</li>
                    <li>Identify stakeholders</li>
                    <li>Set budget constraints</li>
                </ul>
            </li>
            <li><strong>Design Phase</strong>
                <ol type="a">
                    <li>Create wireframes</li>
                    <li>Design mockups</li>
                    <li>User experience testing</li>
                </ol>
            </li>
            <li><strong>Development Phase</strong>
                <ul>
                    <li>Frontend development
                        <ol>
                            <li>HTML structure</li>
                            <li>CSS styling</li>
                            <li>JavaScript functionality</li>
                        </ol>
                    </li>
                    <li>Backend development</li>
                    <li>Database integration</li>
                </ul>
            </li>
            <li><strong>Testing & Launch</strong></li>
        </ol>
    </section>
    
    <!-- Responsive List Grid -->
    <section class="section">
        <h2>6. Responsive List Layout</h2>
        
        <div class="list-grid">
            <div class="list-card">
                <h4>Frontend Skills</h4>
                <ul>
                    <li>HTML5</li>
                    <li>CSS3</li>
                    <li>JavaScript</li>
                    <li>React</li>
                </ul>
            </div>
            
            <div class="list-card">
                <h4>Backend Skills</h4>
                <ul>
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>Databases</li>
                    <li>APIs</li>
                </ul>
            </div>
            
            <div class="list-card">
                <h4>Tools & Technologies</h4>
                <ul>
                    <li>Git & GitHub</li>
                    <li>VS Code</li>
                    <li>Docker</li>
                    <li>AWS</li>
                </ul>
            </div>
        </div>
    </section>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Lists</title>
    <style>
        /* Add your custom list styles here */
        
    </style>
</head>
<body>
    <!-- Create various types of lists -->
    
    <!-- 1. Create a recipe with ordered steps -->
    
    <!-- 2. Make a feature list for a product -->
    
    <!-- 3. Build a nested navigation menu -->
    
    <!-- 4. Create a glossary with description lists -->
    
    <!-- 5. Style lists with custom icons -->
    
    <!-- 6. Make responsive list layouts -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "30 min",
    },
    {
      id: "html-block-inline",
      title: "HTML Block & Inline Elements",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Block & Inline Elements</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Understanding block and inline elements is fundamental to HTML layout. Master how elements behave, stack, and interact to create proper document structure and layouts.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🧱 Block-Level Elements</h3>
          
          <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">📦 Block Element Characteristics</h4>
            <div style="color: #2d3748;">
              <ul style="margin: 0; line-height: 1.8;">
                <li><strong>Full width:</strong> Takes up the entire available width</li>
                <li><strong>New line:</strong> Always starts on a new line</li>
                <li><strong>Height/Width:</strong> Accepts width and height properties</li>
                <li><strong>Box model:</strong> Supports margin, padding, and borders</li>
                <li><strong>Contains content:</strong> Can contain other block and inline elements</li>
              </ul>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔤 Inline Elements</h3>
          
          <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <h4 style="color: #2b6cb0; font-weight: 600; margin: 0 0 1rem 0;">✨ Inline Element Characteristics</h4>
            <div style="color: #2d3748;">
              <ul style="margin: 0; line-height: 1.8;">
                <li><strong>Content width:</strong> Only takes up necessary space</li>
                <li><strong>Same line:</strong> Flows with surrounding content</li>
                <li><strong>Limited sizing:</strong> Width and height properties ignored</li>
                <li><strong>Horizontal spacing:</strong> Only horizontal margin and padding</li>
                <li><strong>Text-level:</strong> Contains only text and other inline elements</li>
              </ul>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Common Elements by Type</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #553c9a; font-weight: 600; margin: 0 0 1rem 0;">Block Elements</h4>
              <div style="color: #553c9a; line-height: 1.8;">
                &lt;div&gt;, &lt;p&gt;, &lt;h1-h6&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;section&gt;, &lt;article&gt;, &lt;aside&gt;, &lt;footer&gt;, &lt;form&gt;, &lt;table&gt;
              </div>
            </div>
            
            <div style="border-left: 4px solid #ed8936; background: #fffaf0; padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">Inline Elements</h4>
              <div style="color: #9c4221; line-height: 1.8;">
                &lt;span&gt;, &lt;a&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;img&gt;, &lt;input&gt;, &lt;label&gt;, &lt;code&gt;, &lt;small&gt;, &lt;sub&gt;, &lt;sup&gt;, &lt;button&gt;
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">⚡ CSS Display Property</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #234e52; line-height: 1.8;">
              <p><strong>display: block;</strong> - Force inline element to behave as block</p>
              <p><strong>display: inline;</strong> - Force block element to behave as inline</p>
              <p><strong>display: inline-block;</strong> - Hybrid: inline flow with block properties</p>
              <p style="margin: 0;"><strong>display: none;</strong> - Hide element completely</p>
            </div>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Block & Inline Elements</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .demo-container {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #ddd;
          border-radius: 0;        }
        
        /* Visualizing block elements */
        .block-demo {
            background-color: #e8f4f8;
            border: 2px solid #2196F3;
            padding: 10px;
            margin: 10px 0;
        }
        
        /* Visualizing inline elements */
        .inline-demo {
            background-color: #fff3e0;
            border: 2px solid #FF9800;
            padding: 5px;
        }
        
        /* Display property demonstrations */
        .block-to-inline {
            display: inline;
            background-color: #e8f5e8;
            border: 2px solid #4CAF50;
            padding: 5px;
            margin: 5px;
        }
        
        .inline-to-block {
            display: block;
            background-color: #fce4ec;
            border: 2px solid #E91E63;
            padding: 10px;
            margin: 10px 0;
        }
        
        .inline-block-demo {
            display: inline-block;
            background-color: #f3e5f5;
            border: 2px solid #9C27B0;
            padding: 10px;
            margin: 5px;
            width: 150px;
            height: 80px;
            text-align: center;
        }
        
        /* Layout examples */
        .layout-example {
            background-color: #f5f5f5;
            padding: 15px;
            margin: 20px 0;
          border-radius: 0;        }
        
        .header-block {
            background-color: #2196F3;
            color: white;
            padding: 20px;
            text-align: center;
            margin-bottom: 10px;
        }
        
        .nav-block {
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            margin-bottom: 10px;
        }
        
        .content-block {
            background-color: #FF9800;
            color: white;
            padding: 20px;
            margin-bottom: 10px;
            min-height: 100px;
        }
        
        .sidebar-block {
            background-color: #9C27B0;
            color: white;
            padding: 15px;
            margin-bottom: 10px;
        }
        
        .footer-block {
            background-color: #607D8B;
            color: white;
            padding: 15px;
            text-align: center;
        }
        
        /* Inline text formatting */
        .text-content {
            font-size: 16px;
            line-height: 1.8;
        }
        
        .highlight {
            background-color: yellow;
            padding: 2px 4px;
        }
        
        .emphasis {
            color: #E91E63;
            font-weight: bold;
        }
        
        .code-inline {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <h1>HTML Block & Inline Elements Demonstration</h1>
    
    <!-- Block Elements Demo -->
    <section class="demo-container">
        <h2>1. Block-Level Elements</h2>
        <p>Block elements take up the full width and start on new lines:</p>
        
        <div class="block-demo">This is a DIV (block element)</div>
        <p class="block-demo">This is a paragraph (block element)</p>
        <h3 class="block-demo">This is a heading (block element)</h3>
        
        <ul style="background-color: #e8f4f8; border: 2px solid #2196F3; padding: 10px;">
            <li>List item 1 (block element)</li>
            <li>List item 2 (block element)</li>
        </ul>
    </section>
    
    <!-- Inline Elements Demo -->
    <section class="demo-container">
        <h2>2. Inline Elements</h2>
        <p>Inline elements flow with the text and only take necessary space:</p>
        
        <div class="text-content">
            This is regular text with 
            <span class="inline-demo">inline span</span>, 
            <strong class="inline-demo">strong text</strong>, 
            <em class="inline-demo">emphasized text</em>, 
            <a href="#" class="inline-demo">a link</a>, and 
            <code class="inline-demo">inline code</code> 
            all flowing together on the same line.
        </div>
        
        <br><br>
        
        <div>
            <img src="https://via.placeholder.com/50x30/FF9800/ffffff?text=IMG" alt="Inline image" class="inline-demo">
            <input type="text" placeholder="Inline input" class="inline-demo">
            <button class="inline-demo">Inline button</button>
            <label class="inline-demo">Inline label</label>
        </div>
    </section>
    
    <!-- CSS Display Property -->
    <section class="demo-container">
        <h2>3. Changing Display Behavior with CSS</h2>
        
        <h3>Block Elements Made Inline</h3>
        <p>These DIVs are displayed as inline elements:</p>
        <div class="block-to-inline">DIV 1</div>
        <div class="block-to-inline">DIV 2</div>
        <div class="block-to-inline">DIV 3</div>
        
        <h3>Inline Elements Made Block</h3>
        <p>These spans are displayed as block elements:</p>
        <span class="inline-to-block">Span 1 (now block)</span>
        <span class="inline-to-block">Span 2 (now block)</span>
        
        <h3>Inline-Block Elements</h3>
        <p>These elements flow inline but accept width/height:</p>
        <div class="inline-block-demo">Box 1<br>150px wide</div>
        <div class="inline-block-demo">Box 2<br>150px wide</div>
        <div class="inline-block-demo">Box 3<br>150px wide</div>
    </section>
    
    <!-- Practical Layout Example -->
    <section class="demo-container">
        <h2>4. Practical Layout with Block Elements</h2>
        
        <div class="layout-example">
            <header class="header-block">
                <h2 style="margin: 0;">Website Header (block)</h2>
            </header>
            
            <nav class="nav-block">
                Navigation Menu (block)
            </nav>
            
            <main class="content-block">
                <h3 style="margin-top: 0;">Main Content Area (block)</h3>
                <p>This is the main content area where articles, posts, or page content would go. Block elements stack vertically.</p>
            </main>
            
            <aside class="sidebar-block">
                Sidebar Content (block)
            </aside>
            
            <footer class="footer-block">
                Website Footer (block)
            </footer>
        </div>
    </section>
    
    <!-- Text Content with Inline Elements -->
    <section class="demo-container">
        <h2>5. Rich Text Content with Inline Elements</h2>
        
        <article class="text-content">
            <h3>Understanding Web Development</h3>
            <p>
                Web development involves many technologies. 
                <strong class="emphasis">HTML</strong> provides the structure, 
                <em>CSS</em> handles the styling, and 
                <span class="highlight">JavaScript</span> adds interactivity. 
                You can use <code class="code-inline">console.log()</code> to debug your 
                <a href="#">JavaScript code</a>. 
                Remember that <small>inline elements</small> flow with the text, 
                while block elements create new lines.
            </p>
            
            <p>
                When learning HTML, it's important to understand that 
                <sup>superscript</sup> and <sub>subscript</sub> are inline elements, 
                just like <strong>bold</strong> and <em>italic</em> text. 
                You can even include <img src="https://via.placeholder.com/20x20" alt="small icon" style="vertical-align: middle;"> 
                small images inline with your text.
            </p>
        </article>
    </section>
    
    <!-- Common Mistakes -->
    <section class="demo-container">
        <h2>6. Common Mistakes to Avoid</h2>
        
        <div style="background-color: #ffebee; padding: 15px; border-left: 4px solid #f44336; margin: 10px 0;">
            <h4 style="color: #c62828; margin-top: 0;">❌ Don't Do This:</h4>
            <p style="margin-bottom: 0;">
                Putting block elements inside inline elements:<br>
                <code>&lt;span&gt;&lt;div&gt;Block inside inline&lt;/div&gt;&lt;/span&gt;</code>
            </p>
        </div>
        
        <div style="background-color: #e8f5e8; padding: 15px; border-left: 4px solid #4caf50; margin: 10px 0;">
            <h4 style="color: #2e7d32; margin-top: 0;">✅ Do This Instead:</h4>
            <p style="margin-bottom: 0;">
                Use proper nesting:<br>
                <code>&lt;div&gt;&lt;span&gt;Inline inside block&lt;/span&gt;&lt;/div&gt;</code>
            </p>
        </div>
    </section>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice Block & Inline Elements</title>
    <style>
        /* Add your display property experiments here */
        
    </style>
</head>
<body>
    <!-- Practice with block and inline elements -->
    
    <!-- 1. Create a layout using only block elements -->
    
    <!-- 2. Style inline elements within paragraphs -->
    
    <!-- 3. Experiment with display properties -->
    
    <!-- 4. Build a navigation bar with inline-block -->
    
    <!-- 5. Create a card layout mixing both types -->
    
</body>
</html>`,
      language: "html",
      difficulty: "intermediate" as const,
      estimatedTime: "35 min",
    },
    {
      id: "html-div",
      title: "HTML Div Element",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Div Element</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              The &lt;div&gt; element is HTML's most versatile container. Master this fundamental building block to create layouts, group content, and structure modern web applications.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📦 What is a Div?</h3>
          
          <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <div style="color: #2d3748;">
              <p><strong>Division Element:</strong> A generic container with no semantic meaning</p>
              <p><strong>Block-level:</strong> Takes full width and starts on a new line</p>
              <p><strong>Purpose:</strong> Grouping and styling content, creating layouts</p>
              <p style="margin: 0;"><strong>Flexibility:</strong> Can contain any type of content</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Common Use Cases</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">🏗️ Layout Structure</h4>
              <ul style="color: #2d3748; margin: 0;">
                <li>Creating page layouts and sections</li>
                <li>Building grid and flexbox containers</li>
                <li>Wrapping content for styling</li>
              </ul>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">🎨 Styling Groups</h4>
              <ul style="color: #2d3748; margin: 0;">
                <li>Applying CSS to multiple elements</li>
                <li>Creating visual containers and cards</li>
                <li>Background and border styling</li>
              </ul>
            </div>
            
            <div style="border: 2px solid #805ad5; background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #553c9a; font-weight: 600; margin: 0 0 1rem 0;">⚡ JavaScript Interaction</h4>
              <ul style="color: #2d3748; margin: 0;">
                <li>Targeting elements for manipulation</li>
                <li>Event handling and dynamic content</li>
                <li>Component containers</li>
              </ul>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🏷️ Div vs Semantic Elements</h3>
          
          <div style="background: #fff5f5; border: 2px solid #e53e3e; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #c53030; line-height: 1.8;">
              <p><strong>Use semantic elements when possible:</strong></p>
              <p>• &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;section&gt;, &lt;article&gt;, &lt;aside&gt;, &lt;footer&gt;</p>
              <p><strong>Use div for:</strong></p>
              <p style="margin: 0;">• Styling wrappers, layout containers, purely presentational grouping</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">💡 Best Practices</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #234e52; margin: 0; line-height: 1.8;">
              <li><strong>Use classes and IDs</strong> - For styling and JavaScript targeting</li>
              <li><strong>Keep structure logical</strong> - Nest divs meaningfully</li>
              <li><strong>Avoid div soup</strong> - Don't overuse divs unnecessarily</li>
              <li><strong>Consider accessibility</strong> - Add ARIA labels when needed</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Div Element Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
          border-radius: 0;            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        /* Basic div styling */
        .basic-div {
            background-color: #e3f2fd;
            border: 2px solid #2196F3;
            padding: 20px;
            margin: 10px 0;
            border-radius: 5px;
        }
        
        /* Layout containers */
        .header-container {
            background-color: #1976d2;
            color: white;
            padding: 20px;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .content-wrapper {
            display: flex;
            gap: 20px;
            margin: 20px 0;
        }
        
        .main-content {
            flex: 2;
            background-color: #f8f9fa;
            padding: 20px;
          border-radius: 0;        }
        
        .sidebar {
            flex: 1;
            background-color: #e9ecef;
            padding: 20px;
          border-radius: 0;        }
        
        /* Grid layout with divs */
        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .grid-item {
            background-color: #fff;
            padding: 20px;
          border-radius: 0;            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            border-left: 4px solid #4caf50;
        }
        
        /* Card components */
        .card {
            background-color: white;
          border-radius: 0;            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
            margin: 20px 0;
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
        }
        
        .card-header {
            background-color: #6c757d;
            color: white;
            padding: 15px;
            font-weight: bold;
        }
        
        .card-body {
            padding: 20px;
        }
        
        .card-footer {
            background-color: #f8f9fa;
            padding: 15px;
            border-top: 1px solid #dee2e6;
        }
        
        /* Form styling with divs */
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
          border-radius: 0;            font-size: 16px;
        }
        
        .form-row {
            display: flex;
            gap: 15px;
        }
        
        .form-col {
            flex: 1;
        }
        
        /* Navigation styling */
        .navbar {
            background-color: #343a40;
            padding: 0;
            border-radius: 5px;
            overflow: hidden;
        }
        
        .nav-list {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        .nav-item {
            flex: 1;
        }
        
        .nav-link {
            display: block;
            color: white;
            text-decoration: none;
            padding: 15px;
            text-align: center;
            transition: background-color 0.3s;
        }
        
        .nav-link:hover {
            background-color: #495057;
        }
        
        /* Alert boxes */
        .alert {
            padding: 15px;
            margin-bottom: 20px;
          border-radius: 0;            border-left: 4px solid;
        }
        
        .alert-success {
            background-color: #d4edda;
            border-color: #28a745;
            color: #155724;
        }
        
        .alert-warning {
            background-color: #fff3cd;
            border-color: #ffc107;
            color: #856404;
        }
        
        .alert-error {
            background-color: #f8d7da;
            border-color: #dc3545;
            color: #721c24;
        }
        
        /* Image gallery */
        .gallery {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 20px 0;
        }
        
        .gallery-item {
            flex: 0 1 calc(25% - 7.5px);
            aspect-ratio: 1;
            background-color: #dee2e6;
          border-radius: 0;            display: flex;
            align-items: center;
            justify-content: center;
            color: #6c757d;
            font-weight: bold;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .content-wrapper {
                flex-direction: column;
            }
            
            .form-row {
                flex-direction: column;
            }
            
            .nav-list {
                flex-direction: column;
            }
            
            .gallery-item {
                flex: 0 1 calc(50% - 5px);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>HTML Div Element - Complete Guide</h1>
        
        <!-- Basic Div Usage -->
        <section>
            <h2>1. Basic Div Container</h2>
            <div class="basic-div">
                <h3>This is a basic div container</h3>
                <p>Divs are block-level elements that take up the full width of their container. They're perfect for grouping content and applying styles.</p>
            </div>
        </section>
        
        <!-- Layout Structure -->
        <section>
            <h2>2. Layout Structure with Divs</h2>
            
            <div class="header-container">
                <h2>Website Header</h2>
                <p>This div creates a header section</p>
            </div>
            
            <div class="content-wrapper">
                <div class="main-content">
                    <h3>Main Content Area</h3>
                    <p>This div contains the primary content of the page. It uses flexbox to create a two-column layout alongside the sidebar.</p>
                    <p>You can put articles, blog posts, product listings, or any main content here.</p>
                </div>
                
                <div class="sidebar">
                    <h3>Sidebar</h3>
                    <p>This div creates a sidebar for secondary content like navigation, ads, or related information.</p>
                    <ul>
                        <li>Navigation links</li>
                        <li>Recent posts</li>
                        <li>Social media</li>
                    </ul>
                </div>
            </div>
        </section>
        
        <!-- Grid Layout -->
        <section>
            <h2>3. Grid Layout with Divs</h2>
            <div class="grid-container">
                <div class="grid-item">
                    <h4>Feature 1</h4>
                    <p>Responsive design that adapts to different screen sizes automatically.</p>
                </div>
                <div class="grid-item">
                    <h4>Feature 2</h4>
                    <p>Clean, modern interface that's easy to navigate and understand.</p>
                </div>
                <div class="grid-item">
                    <h4>Feature 3</h4>
                    <p>Fast performance with optimized code and efficient loading.</p>
                </div>
                <div class="grid-item">
                    <h4>Feature 4</h4>
                    <p>Cross-browser compatibility ensuring it works everywhere.</p>
                </div>
            </div>
        </section>
        
        <!-- Card Components -->
        <section>
            <h2>4. Card Components</h2>
            
            <div class="card">
                <div class="card-header">
                    Product Card Example
                </div>
                <div class="card-body">
                    <h4>Professional Laptop</h4>
                    <p>High-performance laptop perfect for developers and designers. Features the latest processor and ample storage.</p>
                    <p><strong>Price: $1,299.99</strong></p>
                </div>
                <div class="card-footer">
                    <button style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px;">Add to Cart</button>
                </div>
            </div>
        </section>
        
        <!-- Form Layout -->
        <section>
            <h2>5. Form Layout with Divs</h2>
            
            <form>
                <div class="form-group">
                    <label for="fullname">Full Name</label>
                    <input type="text" id="fullname" name="fullname" placeholder="Enter your full name">
                </div>
                
                <div class="form-row">
                    <div class="form-col">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="your@email.com">
                        </div>
                    </div>
                    <div class="form-col">
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567">
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="4" placeholder="Enter your message here..."></textarea>
                </div>
                
                <div class="form-group">
                    <button type="submit" style="background: #28a745; color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer;">Send Message</button>
                </div>
            </form>
        </section>
        
        <!-- Navigation -->
        <section>
            <h2>6. Navigation with Divs</h2>
            
            <div class="navbar">
                <ul class="nav-list">
                    <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">About</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Services</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Portfolio</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>
                </ul>
            </div>
        </section>
        
        <!-- Alert Messages -->
        <section>
            <h2>7. Alert Messages</h2>
            
            <div class="alert alert-success">
                <strong>Success!</strong> Your form has been submitted successfully.
            </div>
            
            <div class="alert alert-warning">
                <strong>Warning!</strong> Please fill in all required fields.
            </div>
            
            <div class="alert alert-error">
                <strong>Error!</strong> There was a problem processing your request.
            </div>
        </section>
        
        <!-- Image Gallery -->
        <section>
            <h2>8. Image Gallery Layout</h2>
            
            <div class="gallery">
                <div class="gallery-item">Image 1</div>
                <div class="gallery-item">Image 2</div>
                <div class="gallery-item">Image 3</div>
                <div class="gallery-item">Image 4</div>
                <div class="gallery-item">Image 5</div>
                <div class="gallery-item">Image 6</div>
                <div class="gallery-item">Image 7</div>
                <div class="gallery-item">Image 8</div>
            </div>
        </section>
    </div>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Div</title>
    <style>
        /* Add your div styling here */
        
    </style>
</head>
<body>
    <!-- Practice using div elements -->
    
    <!-- 1. Create a page layout with header, main, and footer divs -->
    
    <!-- 2. Build a card component with multiple div layers -->
    
    <!-- 3. Create a responsive grid layout -->
    
    <!-- 4. Design a navigation bar using divs -->
    
    <!-- 5. Make a contact form with proper div structure -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "25 min",
    },
    {
      id: "html-classes",
      title: "HTML Classes",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Classes</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Classes are one of HTML's most powerful features for styling and organizing content. Learn to use the class attribute to create reusable styles and target elements efficiently.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🏷️ What are Classes?</h3>
          
          <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <div style="color: #2d3748;">
              <p><strong>Definition:</strong> A class is a global attribute that groups elements for styling</p>
              <p><strong>Reusable:</strong> Multiple elements can share the same class</p>
              <p><strong>CSS Target:</strong> Use .className in CSS to style class elements</p>
              <p style="margin: 0;"><strong>JavaScript:</strong> Use document.getElementsByClassName() to select</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">✨ Benefits of Using Classes</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">🔄 Reusability</h4>
              <div style="color: #2d3748;">
                <p>Write CSS once, apply to multiple elements</p>
                <p style="margin: 0;">Maintain consistent styling across your website</p>
              </div>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">🛠️ Maintainability</h4>
              <div style="color: #2d3748;">
                <p>Update styles in one place to affect all elements</p>
                <p style="margin: 0;">Easy to modify and refactor code</p>
              </div>
            </div>
            
            <div style="border: 2px solid #805ad5; background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #553c9a; font-weight: 600; margin: 0 0 1rem 0;">🎯 Organization</h4>
              <div style="color: #2d3748;">
                <p>Group related elements logically</p>
                <p style="margin: 0;">Create semantic naming conventions</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📝 Class Naming Best Practices</h3>
          
          <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <strong>Use descriptive names:</strong> .button-primary, .card-header<br>
              <strong>Follow conventions:</strong> BEM, kebab-case, or camelCase<br>
              <strong>Be specific:</strong> .nav-menu-item vs .item<br>
              <strong>Avoid styling in names:</strong> .large-text → .heading-primary
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔧 Multiple Classes</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #234e52; line-height: 1.8;">
              <p><strong>Space-separated:</strong> class="btn btn-large btn-primary"</p>
              <p><strong>Modular approach:</strong> Combine base styles with modifiers</p>
              <p style="margin: 0;"><strong>Utility classes:</strong> Mix structural and utility classes</p>
            </div>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Classes - Complete Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
          border-radius: 0;            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        /* Basic Class Examples */
        .highlight {
            background-color: yellow;
            padding: 2px 6px;
            border-radius: 3px;
        }
        
        .important {
            color: #dc3545;
            font-weight: bold;
        }
        
        .success {
            color: #28a745;
            font-weight: bold;
        }
        
        /* Button Classes */
        .btn {
            display: inline-block;
            padding: 10px 20px;
            text-decoration: none;
            border: none;
          border-radius: 0;            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
            text-align: center;
        }
        
        .btn-primary {
            background-color: #007bff;
            color: white;
        }
        
        .btn-primary:hover {
            background-color: #0056b3;
        }
        
        .btn-secondary {
            background-color: #6c757d;
            color: white;
        }
        
        .btn-secondary:hover {
            background-color: #545b62;
        }
        
        .btn-success {
            background-color: #28a745;
            color: white;
        }
        
        .btn-success:hover {
            background-color: #218838;
        }
        
        .btn-large {
            padding: 15px 30px;
            font-size: 18px;
        }
        
        .btn-small {
            padding: 5px 15px;
            font-size: 14px;
        }
        
        /* Card Component Classes */
        .card {
            background-color: white;
            border: 1px solid #dee2e6;
          border-radius: 0;            margin: 20px 0;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: box-shadow 0.3s ease;
        }
        
        .card:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .card-header {
            background-color: #f8f9fa;
            padding: 15px 20px;
            border-bottom: 1px solid #dee2e6;
            font-weight: bold;
        }
        
        .card-body {
            padding: 20px;
        }
        
        .card-footer {
            background-color: #f8f9fa;
            padding: 15px 20px;
            border-top: 1px solid #dee2e6;
        }
        
        .card-title {
            margin: 0 0 15px 0;
            color: #212529;
            font-size: 1.25em;
        }
        
        .card-text {
            margin: 0;
            color: #6c757d;
        }
        
        /* Alert Classes */
        .alert {
            padding: 15px;
            margin: 20px 0;
          border-radius: 0;            border-left: 4px solid;
        }
        
        .alert-info {
            background-color: #cce7ff;
            border-color: #007bff;
            color: #004085;
        }
        
        .alert-warning {
            background-color: #fff3cd;
            border-color: #ffc107;
            color: #856404;
        }
        
        .alert-danger {
            background-color: #f8d7da;
            border-color: #dc3545;
            color: #721c24;
        }
        
        .alert-success {
            background-color: #d4edda;
            border-color: #28a745;
            color: #155724;
        }
        
        /* Layout Classes */
        .grid {
            display: grid;
            gap: 20px;
        }
        
        .grid-2 {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .grid-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        
        .grid-4 {
            grid-template-columns: repeat(4, 1fr);
        }
        
        .flex {
            display: flex;
        }
        
        .flex-center {
            justify-content: center;
            align-items: center;
        }
        
        .flex-between {
            justify-content: space-between;
        }
        
        .flex-wrap {
            flex-wrap: wrap;
        }
        
        /* Utility Classes */
        .text-center {
            text-align: center;
        }
        
        .text-left {
            text-align: left;
        }
        
        .text-right {
            text-align: right;
        }
        
        .text-large {
            font-size: 1.5em;
        }
        
        .text-small {
            font-size: 0.875em;
        }
        
        .text-muted {
            color: #6c757d;
        }
        
        .margin-top {
            margin-top: 20px;
        }
        
        .margin-bottom {
            margin-bottom: 20px;
        }
        
        .padding {
            padding: 20px;
        }
        
        .border {
            border: 1px solid #dee2e6;
        }
        
        .border-radius {
          border-radius: 0;        }
        
        .shadow {
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        /* Navigation Classes */
        .navbar {
            background-color: #343a40;
            padding: 0;
          border-radius: 0;            overflow: hidden;
        }
        
        .nav-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
        }
        
        .nav-item {
            flex: 1;
        }
        
        .nav-link {
            display: block;
            color: white;
            text-decoration: none;
            padding: 15px;
            text-align: center;
            transition: background-color 0.3s;
        }
        
        .nav-link:hover {
            background-color: #495057;
        }
        
        .nav-link.active {
            background-color: #007bff;
        }
        
        /* Responsive Classes */
        @media (max-width: 768px) {
            .grid-2,
            .grid-3,
            .grid-4 {
                grid-template-columns: 1fr;
            }
            
            .nav-list {
                flex-direction: column;
            }
            
            .btn-large {
                width: 100%;
                margin: 5px 0;
            }
        }
        
        /* BEM Methodology Example */
        .product-card {
            background: white;
            border: 1px solid #e0e0e0;
          border-radius: 0;            overflow: hidden;
            margin: 20px 0;
        }
        
        .product-card__image {
            width: 100%;
            height: 200px;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
        }
        
        .product-card__content {
            padding: 20px;
        }
        
        .product-card__title {
            margin: 0 0 10px 0;
            font-size: 1.25em;
            color: #333;
        }
        
        .product-card__description {
            margin: 0 0 15px 0;
            color: #666;
            line-height: 1.5;
        }
        
        .product-card__price {
            font-size: 1.5em;
            font-weight: bold;
            color: #28a745;
            margin: 0;
        }
        
        .product-card--featured {
            border: 2px solid #007bff;
            box-shadow: 0 4px 12px rgba(0,123,255,0.2);
        }
        
        .product-card--sale {
            position: relative;
        }
        
        .product-card--sale::before {
            content: "SALE";
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #dc3545;
            color: white;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 0.8em;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>HTML Classes - Complete Guide</h1>
        
        <!-- Basic Class Usage -->
        <section class="margin-bottom">
            <h2>1. Basic Class Usage</h2>
            <p>Classes allow you to apply the same styling to multiple elements:</p>
            
            <p>This text has a <span class="highlight">highlighted section</span> and an <span class="important">important note</span>.</p>
            <p>Here's another paragraph with <span class="highlight">highlighted text</span> and a <span class="success">success message</span>.</p>
        </section>
        
        <!-- Button Classes -->
        <section class="margin-bottom">
            <h2>2. Button Classes</h2>
            <p>Create reusable button styles with classes:</p>
            
            <div class="text-center margin-bottom">
                <button class="btn btn-primary">Primary Button</button>
                <button class="btn btn-secondary">Secondary Button</button>
                <button class="btn btn-success">Success Button</button>
            </div>
            
            <div class="text-center margin-bottom">
                <button class="btn btn-primary btn-large">Large Primary</button>
                <button class="btn btn-secondary btn-small">Small Secondary</button>
            </div>
        </section>
        
        <!-- Multiple Classes -->
        <section class="margin-bottom">
            <h2>3. Multiple Classes</h2>
            <p>Combine multiple classes for flexible styling:</p>
            
            <div class="card border shadow">
                <div class="card-header">
                    <h3 class="card-title">Multiple Classes Example</h3>
                </div>
                <div class="card-body">
                    <p class="card-text">This card uses multiple classes: card, border, and shadow.</p>
                </div>
            </div>
        </section>
        
        <!-- Alert Messages -->
        <section class="margin-bottom">
            <h2>4. Alert Message Classes</h2>
            
            <div class="alert alert-info">
                <strong>Info:</strong> This is an informational alert message.
            </div>
            
            <div class="alert alert-warning">
                <strong>Warning:</strong> This is a warning alert message.
            </div>
            
            <div class="alert alert-success">
                <strong>Success:</strong> Operation completed successfully!
            </div>
            
            <div class="alert alert-danger">
                <strong>Error:</strong> Something went wrong. Please try again.
            </div>
        </section>
        
        <!-- Layout Classes -->
        <section class="margin-bottom">
            <h2>5. Layout Classes</h2>
            
            <h3>Grid Layout</h3>
            <div class="grid grid-3 margin-bottom">
                <div class="card">
                    <div class="card-body text-center">
                        <h4>Item 1</h4>
                        <p class="text-muted">Grid item content</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body text-center">
                        <h4>Item 2</h4>
                        <p class="text-muted">Grid item content</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body text-center">
                        <h4>Item 3</h4>
                        <p class="text-muted">Grid item content</p>
                    </div>
                </div>
            </div>
            
            <h3>Flexbox Layout</h3>
            <div class="flex flex-between border padding border-radius">
                <div>Left Content</div>
                <div>Right Content</div>
            </div>
        </section>
        
        <!-- Navigation Example -->
        <section class="margin-bottom">
            <h2>6. Navigation with Classes</h2>
            
            <nav class="navbar">
                <ul class="nav-list">
                    <li class="nav-item"><a href="#" class="nav-link active">Home</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">About</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Services</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>
                </ul>
            </nav>
        </section>
        
        <!-- BEM Methodology Example -->
        <section class="margin-bottom">
            <h2>7. BEM Methodology Example</h2>
            <p>Block Element Modifier (BEM) naming convention:</p>
            
            <div class="grid grid-2">
                <div class="product-card">
                    <div class="product-card__image">Product Image</div>
                    <div class="product-card__content">
                        <h3 class="product-card__title">Regular Product</h3>
                        <p class="product-card__description">This is a standard product card using BEM naming conventions.</p>
                        <p class="product-card__price">$29.99</p>
                    </div>
                </div>
                
                <div class="product-card product-card--featured">
                    <div class="product-card__image">Featured Image</div>
                    <div class="product-card__content">
                        <h3 class="product-card__title">Featured Product</h3>
                        <p class="product-card__description">This is a featured product with modified styling.</p>
                        <p class="product-card__price">$49.99</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Utility Classes -->
        <section class="margin-bottom">
            <h2>8. Utility Classes</h2>
            <p>Small, single-purpose classes for quick styling:</p>
            
            <div class="border padding border-radius margin-bottom">
                <p class="text-center text-large">Centered Large Text</p>
                <p class="text-right text-small text-muted">Right-aligned small muted text</p>
            </div>
        </section>
    </div>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Classes</title>
    <style>
        /* Create your reusable classes here */
        
    </style>
</head>
<body>
    <!-- Practice using classes -->
    
    <!-- 1. Create button classes with different styles -->
    
    <!-- 2. Build a card component with multiple classes -->
    
    <!-- 3. Make utility classes for spacing and text -->
    
    <!-- 4. Design a navigation bar with class-based styling -->
    
    <!-- 5. Create alert messages using classes -->
    
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "30 min",
    },
    {
      id: "html-id",
      title: "HTML ID Attribute",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML ID Attribute</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              The ID attribute provides unique identification for HTML elements. Master IDs for precise targeting, navigation anchors, and JavaScript manipulation.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🆔 What is an ID?</h3>
          
          <div style="border: 2px solid #e53e3e; background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <div style="color: #2d3748;">
              <p><strong>Unique identifier:</strong> Each ID must be unique on the page</p>
              <p><strong>Case-sensitive:</strong> "Header" and "header" are different</p>
              <p><strong>CSS targeting:</strong> Use #idName in CSS</p>
              <p style="margin: 0;"><strong>JavaScript access:</strong> document.getElementById()</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Primary Uses</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">🔗 Page Anchors</h4>
              <div style="color: #2d3748;">
                <p>Link to specific sections within the same page</p>
                <p style="margin: 0;">Create table of contents and navigation</p>
              </div>
            </div>
            
            <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #2b6cb0; font-weight: 600; margin: 0 0 1rem 0;">⚡ JavaScript Targeting</h4>
              <div style="color: #2d3748;">
                <p>Select specific elements for manipulation</p>
                <p style="margin: 0;">Form validation and dynamic content</p>
              </div>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">🎨 Specific Styling</h4>
              <div style="color: #2d3748;">
                <p>Apply unique styles to individual elements</p>
                <p style="margin: 0;">Override general class styles</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📏 ID vs Class</h3>
          
          <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <strong>ID:</strong> Unique, one per page, #syntax, higher CSS specificity<br>
              <strong>Class:</strong> Reusable, multiple elements, .syntax, lower specificity<br>
              <strong>Use ID for:</strong> Unique elements, anchors, JavaScript targets<br>
              <strong>Use Class for:</strong> Styling groups, reusable components
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">⚠️ Best Practices</h3>
          
          <div style="background: #fff5f5; border: 2px solid #e53e3e; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #c53030; margin: 0; line-height: 1.8;">
              <li><strong>Keep them unique</strong> - Never duplicate IDs on the same page</li>
              <li><strong>Use meaningful names</strong> - header, navigation, contact-form</li>
              <li><strong>Follow naming conventions</strong> - kebab-case or camelCase</li>
              <li><strong>Avoid spaces</strong> - Use hyphens or underscores instead</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML ID Attribute Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
          border-radius: 0;            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        /* ID-specific styling */
        #main-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 40px 20px;
          border-radius: 0;            margin-bottom: 30px;
        }
        
        #navigation {
            background-color: #343a40;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 30px;
        }
        
        #nav-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
        }
        
        #nav-list li {
            flex: 1;
        }
        
        #nav-list a {
            display: block;
            color: white;
            text-decoration: none;
            padding: 15px;
            text-align: center;
            transition: background-color 0.3s;
        }
        
        #nav-list a:hover {
            background-color: #495057;
        }
        
        #table-of-contents {
            background-color: #e9ecef;
            padding: 20px;
          border-radius: 0;            margin-bottom: 30px;
        }
        
        #toc-list {
            list-style: none;
            padding-left: 0;
        }
        
        #toc-list li {
            margin: 8px 0;
        }
        
        #toc-list a {
            color: #007bff;
            text-decoration: none;
            padding: 5px 10px;
            border-radius: 3px;
            transition: background-color 0.3s;
        }
        
        #toc-list a:hover {
            background-color: #007bff;
            color: white;
        }
        
        /* Section styling with IDs */
        #introduction {
            background-color: #d4edda;
            border-left: 4px solid #28a745;
            padding: 20px;
            margin: 30px 0;
        }
        
        #examples {
            background-color: #cce7ff;
            border-left: 4px solid #007bff;
            padding: 20px;
            margin: 30px 0;
        }
        
        #javascript-demo {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 20px;
            margin: 30px 0;
        }
        
        #contact-form {
            background-color: #f8f9fa;
            padding: 30px;
          border-radius: 0;            border: 1px solid #dee2e6;
            margin: 30px 0;
        }
        
        #special-element {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            padding: 20px;
            text-align: center;
          border-radius: 0;            margin: 20px 0;
            font-weight: bold;
            font-size: 1.2em;
        }
        
        #footer-section {
            background-color: #343a40;
            color: white;
            text-align: center;
            padding: 30px;
          border-radius: 0;            margin-top: 40px;
        }
        
        /* Form styling */
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ced4da;
          border-radius: 0;            font-size: 16px;
            box-sizing: border-box;
        }
        
        .btn {
            background-color: #007bff;
            color: white;
            padding: 12px 24px;
            border: none;
          border-radius: 0;            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        
        .btn:hover {
            background-color: #0056b3;
        }
        
        /* Back to top styling */
        #back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            font-size: 18px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            display: none;
        }
        
        #back-to-top:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            #nav-list {
                flex-direction: column;
            }
            
            .container {
                padding: 15px;
            }
            
            #main-header {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Unique header with ID -->
        <header id="main-header">
            <h1>HTML ID Attribute Guide</h1>
            <p>Learning to use IDs effectively in HTML</p>
        </header>
        
        <!-- Navigation with ID -->
        <nav id="navigation">
            <ul id="nav-list">
                <li><a href="#introduction">Introduction</a></li>
                <li><a href="#examples">Examples</a></li>
                <li><a href="#javascript-demo">JavaScript</a></li>
                <li><a href="#contact-form">Contact</a></li>
            </ul>
        </nav>
        
        <!-- Table of Contents -->
        <section id="table-of-contents">
            <h2>Table of Contents</h2>
            <ul id="toc-list">
                <li><a href="#introduction">What is an ID?</a></li>
                <li><a href="#examples">Practical Examples</a></li>
                <li><a href="#javascript-demo">JavaScript Integration</a></li>
                <li><a href="#contact-form">Form with IDs</a></li>
                <li><a href="#footer-section">Footer</a></li>
            </ul>
        </section>
        
        <!-- Introduction Section -->
        <section id="introduction">
            <h2>What is an ID?</h2>
            <p>An ID is a unique identifier for HTML elements. Unlike classes, each ID should only appear once per page. IDs are perfect for:</p>
            <ul>
                <li>Creating anchor links for navigation</li>
                <li>Targeting specific elements with JavaScript</li>
                <li>Applying unique styles to individual elements</li>
                <li>Form field associations</li>
            </ul>
        </section>
        
        <!-- Examples Section -->
        <section id="examples">
            <h2>Practical Examples</h2>
            <p>Here are some common ways to use IDs:</p>
            
            <h3>1. Page Anchors</h3>
            <p>Click the navigation links above to jump to different sections!</p>
            
            <h3>2. Unique Styling</h3>
            <div id="special-element">
                This element has a unique ID and special styling!
            </div>
            
            <h3>3. Multiple IDs on Different Elements</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                <div id="card-1" style="background-color: #ff6b6b; color: white; padding: 20px;     border-radius: 0; text-align: center;">
                    <h4>Card 1</h4>
                    <p>ID: card-1</p>
                </div>
                <div id="card-2" style="background-color: #4ecdc4; color: white; padding: 20px;     border-radius: 0; text-align: center;">
                    <h4>Card 2</h4>
                    <p>ID: card-2</p>
                </div>
                <div id="card-3" style="background-color: #45b7d1; color: white; padding: 20px;     border-radius: 0; text-align: center;">
                    <h4>Card 3</h4>
                    <p>ID: card-3</p>
                </div>
            </div>
        </section>
        
        <!-- JavaScript Demo Section -->
        <section id="javascript-demo">
            <h2>JavaScript Integration</h2>
            <p>IDs make it easy to select elements with JavaScript:</p>
            
            <div style="margin: 20px 0;">
                <p id="demo-text">This text will change when you click the button!</p>
                <button class="btn" onclick="changeText()">Change Text</button>
                <button class="btn" onclick="changeColor()" style="margin-left: 10px;">Change Color</button>
                <button class="btn" onclick="resetDemo()" style="margin-left: 10px;">Reset</button>
            </div>
            
            <div style="margin: 20px 0;">
                <p>Counter: <span id="counter">0</span></p>
                <button class="btn" onclick="incrementCounter()">Increment</button>
                <button class="btn" onclick="decrementCounter()" style="margin-left: 10px;">Decrement</button>
            </div>
        </section>
        
        <!-- Contact Form -->
        <section id="contact-form">
            <h2>Contact Form with IDs</h2>
            <p>Forms use IDs to associate labels with inputs:</p>
            
            <form>
                <div class="form-group">
                    <label for="full-name">Full Name:</label>
                    <input type="text" id="full-name" name="fullName" required>
                </div>
                
                <div class="form-group">
                    <label for="email-address">Email:</label>
                    <input type="email" id="email-address" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="phone-number">Phone:</label>
                    <input type="tel" id="phone-number" name="phone">
                </div>
                
                <div class="form-group">
                    <label for="subject-line">Subject:</label>
                    <select id="subject-line" name="subject">
                        <option value="">Choose a subject...</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="feedback">Feedback</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="message-content">Message:</label>
                    <textarea id="message-content" name="message" rows="5" required></textarea>
                </div>
                
                <button type="submit" class="btn">Send Message</button>
            </form>
        </section>
        
        <!-- Footer -->
        <footer id="footer-section">
            <h3>Footer Section</h3>
            <p>This footer has the ID "footer-section" and can be linked to from anywhere on the page.</p>
            <p><a href="#main-header" style="color: #cce7ff;">Back to Top</a></p>
        </footer>
    </div>
    
    <!-- Back to Top Button -->
    <button id="back-to-top" onclick="scrollToTop()" title="Back to Top">↑</button>
    
    <script>
        // JavaScript functions that use IDs
        function changeText() {
            document.getElementById('demo-text').textContent = 'Text has been changed using getElementById()!';
        }
        
        function changeColor() {
            const element = document.getElementById('demo-text');
            element.style.color = element.style.color === 'blue' ? 'red' : 'blue';
        }
        
        function resetDemo() {
            const element = document.getElementById('demo-text');
            element.textContent = 'This text will change when you click the button!';
            element.style.color = 'black';
        }
        
        let count = 0;
        function incrementCounter() {
            count++;
            document.getElementById('counter').textContent = count;
        }
        
        function decrementCounter() {
            count--;
            document.getElementById('counter').textContent = count;
        }
        
        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Show/hide back to top button
        window.addEventListener('scroll', function() {
            const backToTop = document.getElementById('back-to-top');
            if (window.scrollY > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    </script>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML IDs</title>
    <style>
        /* Add your ID-specific styles here */
        
    </style>
</head>
<body>
    <!-- Practice using ID attributes -->
    
    <!-- 1. Create a navigation menu with anchor links -->
    
    <!-- 2. Build a form with proper label-input associations -->
    
    <!-- 3. Add unique styling to specific elements -->
    
    <!-- 4. Create sections that can be linked to -->
    
    <!-- 5. Add JavaScript interactions using IDs -->
    
    <script>
        // Add your JavaScript that uses IDs
        
    </script>
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "25 min",
    },
    {
      id: "html-iframes",
      title: "HTML Iframes",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Iframes</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Iframes (inline frames) allow you to embed another HTML document within your current page. Master iframes for integrating external content, maps, videos, and third-party widgets.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🖼️ What is an Iframe?</h3>
          
          <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <div style="color: #2d3748;">
              <p><strong>Embedded document:</strong> Display another webpage inside your page</p>
              <p><strong>Sandboxed:</strong> Content runs in its own isolated context</p>
              <p><strong>Responsive:</strong> Can be made responsive with CSS</p>
              <p style="margin: 0;"><strong>Interactive:</strong> Users can interact with embedded content</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📋 Essential Attributes</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">🔗 src</h4>
              <div style="color: #2d3748;">
                <p>URL of the document to embed</p>
                <p style="margin: 0;">Required attribute for iframe functionality</p>
              </div>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">📏 width & height</h4>
              <div style="color: #2d3748;">
                <p>Control iframe dimensions</p>
                <p style="margin: 0;">Use pixels or percentages</p>
              </div>
            </div>
            
            <div style="border: 2px solid #805ad5; background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #553c9a; font-weight: 600; margin: 0 0 1rem 0;">🛡️ sandbox</h4>
              <div style="color: #2d3748;">
                <p>Security restrictions for embedded content</p>
                <p style="margin: 0;">Prevents scripts, forms, and navigation</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Common Use Cases</h3>
          
          <div style="border-left: 4px solid #48bb78; background: #f0fff4; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #276749; line-height: 1.8;">
              <strong>YouTube/Vimeo videos:</strong> Embed video players<br>
              <strong>Google Maps:</strong> Interactive maps and directions<br>
              <strong>Social media feeds:</strong> Twitter, Instagram, Facebook<br>
              <strong>Payment forms:</strong> Secure payment processing<br>
              <strong>Documentation:</strong> External help or reference content
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">⚠️ Security Considerations</h3>
          
          <div style="background: #fff5f5; border: 2px solid #e53e3e; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #c53030; margin: 0; line-height: 1.8;">
              <li><strong>Clickjacking attacks</strong> - Use X-Frame-Options header</li>
              <li><strong>Malicious content</strong> - Only embed trusted sources</li>
              <li><strong>Cross-origin issues</strong> - Be aware of CORS policies</li>
              <li><strong>Performance impact</strong> - Iframes add overhead</li>
            </ul>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎨 Styling Tips</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #234e52; line-height: 1.8;">
              <p><strong>Remove borders:</strong> border: none;</p>
              <p><strong>Responsive design:</strong> width: 100%; max-width: 100%;</p>
              <p><strong>Aspect ratio:</strong> Use padding-bottom trick</p>
              <p style="margin: 0;"><strong>Loading states:</strong> Show placeholder while loading</p>
            </div>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Iframes Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
          border-radius: 0;            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .iframe-container {
            margin: 30px 0;
            padding: 20px;
            border: 1px solid #dee2e6;
          border-radius: 0;            background-color: #f8f9fa;
        }
        
        .iframe-container h3 {
            margin-top: 0;
            color: #495057;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        
        /* Basic iframe styling */
        .basic-iframe {
            border: 2px solid #007bff;
          border-radius: 0;            width: 100%;
            height: 300px;
        }
        
        /* Responsive iframe wrapper */
        .responsive-iframe-wrapper {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            overflow: hidden;
          border-radius: 0;            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .responsive-iframe-wrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        
        /* Map iframe styling */
        .map-iframe {
            border: none;
          border-radius: 0;            width: 100%;
            height: 400px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        
        /* Grid layout for multiple iframes */
        .iframe-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .iframe-grid-item {
            background-color: white;
          border-radius: 0;            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .iframe-grid-item h4 {
            margin: 0;
            padding: 15px;
            background-color: #343a40;
            color: white;
            text-align: center;
        }
        
        .iframe-grid-item iframe {
            width: 100%;
            height: 200px;
            border: none;
            display: block;
        }
        
        /* Loading placeholder */
        .iframe-placeholder {
            background-color: #e9ecef;
            border: 2px dashed #6c757d;
          border-radius: 0;            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6c757d;
            font-size: 18px;
            margin: 20px 0;
        }
        
        /* Security warning box */
        .security-warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-left: 4px solid #f39c12;
            padding: 15px;
          border-radius: 0;            margin: 20px 0;
        }
        
        .security-warning h4 {
            color: #856404;
            margin-top: 0;
        }
        
        .security-warning p {
            color: #856404;
            margin-bottom: 0;
        }
        
        /* Code example styling */
        .code-example {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
          border-radius: 0;            padding: 15px;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
            overflow-x: auto;
        }
        
        /* Button for iframe interaction */
        .iframe-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
          border-radius: 0;            cursor: pointer;
            margin: 10px 5px;
            font-size: 14px;
            transition: background-color 0.3s;
        }
        
        .iframe-button:hover {
            background-color: #0056b3;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .iframe-grid {
                grid-template-columns: 1fr;
            }
            
            .basic-iframe {
                height: 250px;
            }
            
            .map-iframe {
                height: 300px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>HTML Iframes - Complete Guide</h1>
        <p>Learn how to embed external content using HTML iframes with various examples and best practices.</p>
        
        <!-- Basic Iframe Example -->
        <div class="iframe-container">
            <h3>1. Basic Iframe</h3>
            <p>A simple iframe embedding another webpage:</p>
            
            <div class="code-example">
&lt;iframe src="https://example.com" width="100%" height="300"&gt;&lt;/iframe&gt;
            </div>
            
            <!-- Note: Using a data URL since we can't embed external sites in this example -->
            <iframe 
                src="data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Ctitle%3EEmbedded%20Page%3C/title%3E%3Cstyle%3Ebody%7Bfont-family:Arial,sans-serif;padding:20px;background:linear-gradient(135deg,%23667eea%200%25,%23764ba2%20100%25);color:white;text-align:center;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Ch2%3EThis%20is%20an%20embedded%20page%3C/h2%3E%3Cp%3EThis%20content%20is%20loaded%20inside%20an%20iframe%3C/p%3E%3Cp%3ECurrent%20time:%20%3Cspan%20id='time'%3E%3C/span%3E%3C/p%3E%3Cscript%3Efunction%20updateTime()%7Bdocument.getElementById('time').textContent=new%20Date().toLocaleTimeString();%7DupdateTime();setInterval(updateTime,1000);%3C/script%3E%3C/body%3E%3C/html%3E"
                class="basic-iframe"
                title="Basic iframe example">
            </iframe>
        </div>
        
        <!-- Responsive Video Iframe -->
        <div class="iframe-container">
            <h3>2. Responsive Video Iframe</h3>
            <p>Responsive iframe for video content (16:9 aspect ratio):</p>
            
            <div class="code-example">
&lt;div class="responsive-iframe-wrapper"&gt;
    &lt;iframe src="video-url" frameborder="0" allowfullscreen&gt;&lt;/iframe&gt;
&lt;/div&gt;
            </div>
            
            <div class="responsive-iframe-wrapper">
                <iframe 
                    src="data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bmargin:0;padding:0;background:linear-gradient(45deg,%23ff6b6b,%234ecdc4);display:flex;align-items:center;justify-content:center;color:white;font-family:Arial,sans-serif;font-size:24px;%7D.video-placeholder%7Btext-align:center;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Cdiv%20class='video-placeholder'%3E%3Cp%3E%F0%9F%8E%AC%20Video%20Content%3C/p%3E%3Cp%20style='font-size:16px;'%3EResponsive%20iframe%20wrapper%3C/p%3E%3C/div%3E%3C/body%3E%3C/html%3E"
                    frameborder="0" 
                    allowfullscreen
                    title="Responsive video iframe">
                </iframe>
            </div>
        </div>
        
        <!-- Map Iframe -->
        <div class="iframe-container">
            <h3>3. Map Iframe</h3>
            <p>Embedding a map (Google Maps style):</p>
            
            <div class="code-example">
&lt;iframe src="map-embed-url" class="map-iframe"&gt;&lt;/iframe&gt;
            </div>
            
            <iframe 
                src="data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bmargin:0;font-family:Arial,sans-serif;background:%23f0f0f0;%7D.map-container%7Bheight:100vh;position:relative;background:linear-gradient(135deg,%23667eea%200%25,%23764ba2%20100%25);display:flex;align-items:center;justify-content:center;color:white;%7D.map-info%7Btext-align:center;%7D.coordinates%7Bfont-family:monospace;background:rgba(255,255,255,0.2);padding:10px;border-radius:5px;margin:10px;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Cdiv%20class='map-container'%3E%3Cdiv%20class='map-info'%3E%3Ch3%3E%F0%9F%97%BA%EF%B8%8F%20Interactive%20Map%3C/h3%3E%3Cp%3EMap%20embedded%20via%20iframe%3C/p%3E%3Cdiv%20class='coordinates'%3ELat:%2040.7128%2C%20Lng:%20-74.0060%3C/div%3E%3Cp%20style='font-size:14px;'%3EClick%20to%20interact%20with%20map%3C/p%3E%3C/div%3E%3C/div%3E%3C/body%3E%3C/html%3E"
                class="map-iframe"
                title="Map iframe example">
            </iframe>
        </div>
        
        <!-- Multiple Iframes Grid -->
        <div class="iframe-container">
            <h3>4. Multiple Iframes Grid</h3>
            <p>Grid layout with multiple iframe content:</p>
            
            <div class="iframe-grid">
                <div class="iframe-grid-item">
                    <h4>Dashboard</h4>
                    <iframe 
                        src="data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bmargin:0;padding:20px;font-family:Arial,sans-serif;background:%23f8f9fa;%7D.widget%7Bbackground:white;padding:15px;margin:10px%200;border-radius:5px;box-shadow:0%202px%204px%20rgba(0,0,0,0.1);%7D.metric%7Bfont-size:24px;font-weight:bold;color:%23007bff;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Cdiv%20class='widget'%3E%3Cdiv%20class='metric'%3E1,234%3C/div%3E%3Cdiv%3ETotal%20Users%3C/div%3E%3C/div%3E%3Cdiv%20class='widget'%3E%3Cdiv%20class='metric'%3E89%25%3C/div%3E%3Cdiv%3EUptime%3C/div%3E%3C/div%3E%3C/body%3E%3C/html%3E"
                        title="Dashboard widget">
                    </iframe>
                </div>
                
                <div class="iframe-grid-item">
                    <h4>Calendar</h4>
                    <iframe 
                        src="data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bmargin:0;padding:15px;font-family:Arial,sans-serif;background:%23fff;%7D.calendar%7Bborder:1px%20solid%20%23ddd;border-radius:5px;%7D.header%7Bbackground:%23007bff;color:white;padding:10px;text-align:center;font-weight:bold;%7D.days%7Bdisplay:grid;grid-template-columns:repeat(7,1fr);%7D.day%7Bpadding:8px;text-align:center;border:1px%20solid%20%23eee;%7D.today%7Bbackground:%23007bff;color:white;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Cdiv%20class='calendar'%3E%3Cdiv%20class='header'%3EJanuary%202024%3C/div%3E%3Cdiv%20class='days'%3E%3Cdiv%20class='day'%3ES%3C/div%3E%3Cdiv%20class='day'%3EM%3C/div%3E%3Cdiv%20class='day'%3ET%3C/div%3E%3Cdiv%20class='day'%3EW%3C/div%3E%3Cdiv%20class='day'%3ET%3C/div%3E%3Cdiv%20class='day'%3EF%3C/div%3E%3Cdiv%20class='day'%3ES%3C/div%3E%3Cdiv%20class='day'%3E%3C/div%3E%3Cdiv%20class='day'%3E1%3C/div%3E%3Cdiv%20class='day'%3E2%3C/div%3E%3Cdiv%20class='day'%3E3%3C/div%3E%3Cdiv%20class='day'%3E4%3C/div%3E%3Cdiv%20class='day'%3E5%3C/div%3E%3Cdiv%20class='day'%3E6%3C/div%3E%3Cdiv%20class='day'%3E7%3C/div%3E%3Cdiv%20class='day'%3E8%3C/div%3E%3Cdiv%20class='day'%3E9%3C/div%3E%3Cdiv%20class='day'%3E10%3C/div%3E%3Cdiv%20class='day'%3E11%3C/div%3E%3Cdiv%20class='day'%3E12%3C/div%3E%3Cdiv%20class='day'%3E13%3C/div%3E%3Cdiv%20class='day'%20class='today'%3E14%3C/div%3E%3C/div%3E%3C/div%3E%3C/body%3E%3C/html%3E"
                        title="Calendar widget">
                    </iframe>
                </div>
                
                <div class="iframe-grid-item">
                    <h4>Chart</h4>
                    <iframe 
                        src="data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bmargin:0;padding:20px;font-family:Arial,sans-serif;background:%23f8f9fa;%7D.chart%7Bheight:150px;background:white;border-radius:5px;position:relative;overflow:hidden;%7D.bar%7Bposition:absolute;bottom:0;background:%23007bff;border-radius:3px%203px%200%200;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Ch4%20style='margin:0%200%2010px%200;'%3ERevenue%20Chart%3C/h4%3E%3Cdiv%20class='chart'%3E%3Cdiv%20class='bar'%20style='left:10px;width:20px;height:60px;'%3E%3C/div%3E%3Cdiv%20class='bar'%20style='left:40px;width:20px;height:80px;'%3E%3C/div%3E%3Cdiv%20class='bar'%20style='left:70px;width:20px;height:120px;'%3E%3C/div%3E%3Cdiv%20class='bar'%20style='left:100px;width:20px;height:90px;'%3E%3C/div%3E%3Cdiv%20class='bar'%20style='left:130px;width:20px;height:110px;'%3E%3C/div%3E%3C/div%3E%3C/body%3E%3C/html%3E"
                        title="Chart widget">
                    </iframe>
                </div>
                
                <div class="iframe-grid-item">
                    <h4>News Feed</h4>
                    <iframe 
                        src="data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bmargin:0;padding:15px;font-family:Arial,sans-serif;background:%23fff;%7D.news-item%7Bpadding:10px;border-bottom:1px%20solid%20%23eee;%7D.news-title%7Bfont-weight:bold;margin-bottom:5px;%7D.news-time%7Bcolor:%23666;font-size:12px;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Cdiv%20class='news-item'%3E%3Cdiv%20class='news-title'%3ENew%20Feature%20Released%3C/div%3E%3Cdiv%20class='news-time'%3E2%20hours%20ago%3C/div%3E%3C/div%3E%3Cdiv%20class='news-item'%3E%3Cdiv%20class='news-title'%3ESystem%20Update%3C/div%3E%3Cdiv%20class='news-time'%3E1%20day%20ago%3C/div%3E%3C/div%3E%3Cdiv%20class='news-item'%3E%3Cdiv%20class='news-title'%3EUser%20Milestone%3C/div%3E%3Cdiv%20class='news-time'%3E3%20days%20ago%3C/div%3E%3C/div%3E%3C/body%3E%3C/html%3E"
                        title="News feed widget">
                    </iframe>
                </div>
            </div>
        </div>
        
        <!-- Sandbox Attribute Example -->
        <div class="iframe-container">
            <h3>5. Sandbox Attribute (Security)</h3>
            <p>Using the sandbox attribute to restrict iframe capabilities:</p>
            
            <div class="code-example">
&lt;iframe src="untrusted-content.html" sandbox&gt;&lt;/iframe&gt;
&lt;iframe src="form-content.html" sandbox="allow-forms"&gt;&lt;/iframe&gt;
            </div>
            
            <div class="security-warning">
                <h4>⚠️ Security Note</h4>
                <p>The sandbox attribute restricts what the iframe can do. Use it when embedding untrusted content to prevent malicious scripts, form submissions, and navigation.</p>
            </div>
            
            <iframe 
                src="data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bpadding:20px;font-family:Arial,sans-serif;background:%23ffe6e6;%7D.warning%7Bcolor:%23d63031;font-weight:bold;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Ch3%3ESandboxed%20Content%3C/h3%3E%3Cp%20class='warning'%3E%F0%9F%9B%A1%EF%B8%8F%20This%20iframe%20is%20sandboxed%3C/p%3E%3Cp%3EScripts%20are%20disabled%20for%20security%3C/p%3E%3Cbutton%20onclick='alert(%22This%20won%27t%20work!%22)'%3ETry%20Click%20Me%3C/button%3E%3C/body%3E%3C/html%3E"
                sandbox
                style="width: 100%; height: 200px; border: 2px solid #d63031;     border-radius: 0;"
                title="Sandboxed iframe example">
            </iframe>
        </div>
        
        <!-- JavaScript Iframe Interaction -->
        <div class="iframe-container">
            <h3>6. JavaScript Iframe Interaction</h3>
            <p>Programmatically control iframes with JavaScript:</p>
            
            <div class="code-example">
// Change iframe source
document.getElementById('myIframe').src = 'new-url.html';

// Access iframe content (same-origin only)
var iframeDoc = document.getElementById('myIframe').contentDocument;
            </div>
            
            <div style="margin: 20px 0;">
                <button class="iframe-button" onclick="changeIframeSrc('page1')">Load Page 1</button>
                <button class="iframe-button" onclick="changeIframeSrc('page2')">Load Page 2</button>
                <button class="iframe-button" onclick="changeIframeSrc('page3')">Load Page 3</button>
            </div>
            
            <iframe 
                id="dynamicIframe"
                src="data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bpadding:20px;font-family:Arial,sans-serif;background:linear-gradient(135deg,%23667eea%200%25,%23764ba2%20100%25);color:white;text-align:center;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Ch2%3EDefault%20Page%3C/h2%3E%3Cp%3EClick%20the%20buttons%20above%20to%20change%20this%20content%3C/p%3E%3C/body%3E%3C/html%3E"
                style="width: 100%; height: 250px; border: 2px solid #007bff;     border-radius: 0;"
                title="Dynamic iframe content">
            </iframe>
        </div>
        
        <!-- Loading Placeholder -->
        <div class="iframe-container">
            <h3>7. Loading Placeholder</h3>
            <p>Show a placeholder while iframe content loads:</p>
            
            <div class="iframe-placeholder">
                <div style="text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 10px;">⏳</div>
                    <div>Loading iframe content...</div>
                </div>
            </div>
        </div>
        
        <!-- Accessibility Considerations -->
        <div class="iframe-container">
            <h3>8. Accessibility Best Practices</h3>
            <div style="background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; padding: 15px;">
                <h4 style="color: #155724; margin-top: 0;">✅ Always include:</h4>
                <ul style="color: #155724; margin-bottom: 0;">
                    <li><strong>title attribute:</strong> Describes the iframe content</li>
                    <li><strong>meaningful names:</strong> Help screen readers understand purpose</li>
                    <li><strong>alternative content:</strong> Fallback for browsers that don't support iframes</li>
                    <li><strong>keyboard navigation:</strong> Ensure embedded content is accessible</li>
                </ul>
            </div>
            
            <div class="code-example">
&lt;iframe 
    src="content.html" 
    title="User Dashboard Analytics"
    width="100%" 
    height="400"&gt;
    &lt;p&gt;Your browser does not support iframes. 
       &lt;a href="content.html"&gt;View content directly&lt;/a&gt;&lt;/p&gt;
&lt;/iframe&gt;
            </div>
        </div>
    </div>
    
    <script>
        // JavaScript functions for iframe interaction
        function changeIframeSrc(page) {
            const iframe = document.getElementById('dynamicIframe');
            const pages = {
                'page1': "data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bpadding:20px;font-family:Arial,sans-serif;background:linear-gradient(135deg,%23ff6b6b%200%25,%234ecdc4%20100%25);color:white;text-align:center;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Ch2%3EPage%201%20Content%3C/h2%3E%3Cp%3EThis%20is%20the%20first%20page%20loaded%20dynamically%3C/p%3E%3Cp%3E%F0%9F%8D%95%20Pizza%20ordering%20system%3C/p%3E%3C/body%3E%3C/html%3E",
                'page2': "data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bpadding:20px;font-family:Arial,sans-serif;background:linear-gradient(135deg,%23a8edea%200%25,%23fed6e3%20100%25);color:%23333;text-align:center;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Ch2%3EPage%202%20Content%3C/h2%3E%3Cp%3EThis%20is%20the%20second%20page%20with%20different%20styling%3C/p%3E%3Cp%3E%F0%9F%93%8A%20Analytics%20dashboard%3C/p%3E%3C/body%3E%3C/html%3E",
                'page3': "data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bpadding:20px;font-family:Arial,sans-serif;background:linear-gradient(135deg,%23ffecd2%200%25,%23fcb69f%20100%25);color:%23333;text-align:center;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Ch2%3EPage%203%20Content%3C/h2%3E%3Cp%3EThis%20is%20the%20third%20page%20with%20warm%20colors%3C/p%3E%3Cp%3E%F0%9F%9B%8D%EF%B8%8F%20Shopping%20cart%20interface%3C/p%3E%3C/body%3E%3C/html%3E"
            };
            
            if (pages[page]) {
                iframe.src = pages[page];
            }
        }
        
        // Simulate loading state
        function showLoadingState() {
            const placeholder = document.querySelector('.iframe-placeholder');
            placeholder.innerHTML = \`
                <div style="text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 10px; animation: spin 2s linear infinite;">⟲</div>
                    <div>Content is loading...</div>
                </div>
            \`;
            
            setTimeout(() => {
                placeholder.innerHTML = \`
                    <div style="text-align: center;">
                        <div style="font-size: 48px; margin-bottom: 10px; color: #28a745;">✅</div>
                        <div>Content loaded successfully!</div>
                    </div>
                \`;
            }, 3000);
        }
        
        // Add CSS animation for loading spinner
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        \`;
        document.head.appendChild(style);
        
        // Demonstrate loading state
        setTimeout(showLoadingState, 2000);
    </script>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Iframes</title>
    <style>
        /* Add your iframe styles here */
        
    </style>
</head>
<body>
    <!-- Practice using iframes -->
    
    <!-- 1. Create a basic iframe -->
    
    <!-- 2. Make a responsive video iframe wrapper -->
    
    <!-- 3. Build a dashboard with multiple iframe widgets -->
    
    <!-- 4. Add security with sandbox attribute -->
    
    <!-- 5. Create dynamic iframe loading with JavaScript -->
    
    <script>
        // Add your iframe interaction JavaScript
        
    </script>
</body>
</html>`,
      language: "html",
      difficulty: "intermediate" as const,
      estimatedTime: "35 min",
    },
    {
      id: "html-javascript",
      title: "HTML JavaScript Integration",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML JavaScript Integration</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              JavaScript brings HTML to life with interactivity and dynamic behavior. Learn to integrate JavaScript seamlessly with HTML for modern web applications.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">⚡ JavaScript in HTML</h3>
          
          <div style="border: 2px solid #f6e05e; background: linear-gradient(135deg, #fffff0 0%, #fefcbf 100%); padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <div style="color: #2d3748;">
              <p><strong>&lt;script&gt; tag:</strong> Container for JavaScript code</p>
              <p><strong>External files:</strong> Link to .js files with src attribute</p>
              <p><strong>Event handlers:</strong> Respond to user interactions</p>
              <p style="margin: 0;"><strong>DOM manipulation:</strong> Change HTML content dynamically</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📝 Ways to Include JavaScript</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">📄 Inline JavaScript</h4>
              <div style="color: #2d3748;">
                <p>JavaScript directly in the HTML document</p>
                <p style="margin: 0;">Good for small scripts and quick prototyping</p>
              </div>
            </div>
            
            <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #2b6cb0; font-weight: 600; margin: 0 0 1rem 0;">🗂️ External JavaScript</h4>
              <div style="color: #2d3748;">
                <p>JavaScript in separate .js files</p>
                <p style="margin: 0;">Best practice for larger applications</p>
              </div>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">⚡ Event Attributes</h4>
              <div style="color: #2d3748;">
                <p>JavaScript in HTML element attributes</p>
                <p style="margin: 0;">Quick event handling for simple interactions</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Common JavaScript Tasks</h3>
          
          <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <strong>Form validation:</strong> Check user input before submission<br>
              <strong>Dynamic content:</strong> Update text, images, and styles<br>
              <strong>User interactions:</strong> Handle clicks, hovers, and keyboard input<br>
              <strong>API calls:</strong> Fetch data from servers<br>
              <strong>Animation effects:</strong> Create smooth transitions and movement
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎨 Best Practices</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #234e52; margin: 0; line-height: 1.8;">
              <li><strong>Place scripts at bottom</strong> - Load after HTML content</li>
              <li><strong>Use external files</strong> - Better organization and caching</li>
              <li><strong>Add event listeners</strong> - Modern alternative to inline events</li>
              <li><strong>Handle errors gracefully</strong> - Use try-catch blocks</li>
              <li><strong>Optimize performance</strong> - Minify and compress JavaScript files</li>
            </ul>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">⚠️ Security Considerations</h3>
          
          <div style="background: #fff5f5; border: 2px solid #e53e3e; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #c53030; margin: 0; line-height: 1.8;">
              <li><strong>Validate user input</strong> - Prevent injection attacks</li>
              <li><strong>Sanitize data</strong> - Clean data before displaying</li>
              <li><strong>Use HTTPS</strong> - Secure data transmission</li>
              <li><strong>Content Security Policy</strong> - Restrict script execution</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML JavaScript Integration</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
          border-radius: 0;            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .example-section {
            margin: 30px 0;
            padding: 20px;
            border: 1px solid #dee2e6;
          border-radius: 0;            background-color: #f8f9fa;
        }
        
        .example-section h3 {
            margin-top: 0;
            color: #495057;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        
        /* Button Styles */
        .btn {
            background-color: #007bff;
            color: white;
            padding: 12px 24px;
            border: none;
          border-radius: 0;            cursor: pointer;
            font-size: 16px;
            margin: 5px;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
        }
        
        .btn-success {
            background-color: #28a745;
        }
        
        .btn-success:hover {
            background-color: #218838;
        }
        
        .btn-warning {
            background-color: #ffc107;
            color: #212529;
        }
        
        .btn-warning:hover {
            background-color: #e0a800;
        }
        
        .btn-danger {
            background-color: #dc3545;
        }
        
        .btn-danger:hover {
            background-color: #c82333;
        }
        
        /* Form Styles */
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #495057;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ced4da;
          border-radius: 0;            font-size: 16px;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
        }
        
        .form-group input.error {
            border-color: #dc3545;
        }
        
        .error-message {
            color: #dc3545;
            font-size: 14px;
            margin-top: 5px;
            display: none;
        }
        
        .success-message {
            color: #28a745;
            font-size: 14px;
            margin-top: 5px;
            display: none;
        }
        
        /* Dynamic Content Styles */
        .dynamic-content {
            padding: 20px;
            border: 2px solid #007bff;
          border-radius: 0;            margin: 20px 0;
            background-color: white;
            transition: all 0.3s ease;
        }
        
        .dynamic-content.highlighted {
            background-color: #fff3cd;
            border-color: #ffc107;
        }
        
        /* Image Gallery Styles */
        .image-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .image-item {
            border: 1px solid #dee2e6;
          border-radius: 0;            overflow: hidden;
            transition: transform 0.3s ease;
            cursor: pointer;
        }
        
        .image-item:hover {
            transform: scale(1.05);
        }
        
        .image-item img {
            width: 100%;
            height: 150px;
            object-fit: cover;
        }
        
        .image-item .caption {
            padding: 10px;
            text-align: center;
            background-color: #f8f9fa;
        }
        
        /* Counter Styles */
        .counter-display {
            font-size: 48px;
            font-weight: bold;
            text-align: center;
            color: #007bff;
            margin: 20px 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          border-radius: 0;        }
        
        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        
        .modal-content {
            background-color: white;
            margin: 15% auto;
            padding: 20px;
          border-radius: 0;            width: 80%;
            max-width: 500px;
            position: relative;
        }
        
        .close-btn {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #aaa;
        }
        
        .close-btn:hover {
            color: #000;
        }
        
        /* Progress Bar */
        .progress-container {
            width: 100%;
            background-color: #e9ecef;
            border-radius: 10px;
            margin: 20px 0;
        }
        
        .progress-bar {
            height: 20px;
            background: linear-gradient(90deg, #28a745, #20c997);
            border-radius: 10px;
            transition: width 0.3s ease;
            text-align: center;
            line-height: 20px;
            color: white;
            font-size: 12px;
        }
        
        /* Dark Mode */
        .dark-mode {
            background-color: #343a40;
            color: white;
        }
        
        .dark-mode .container {
            background-color: #495057;
            color: white;
        }
        
        .dark-mode .example-section {
            background-color: #6c757d;
            border-color: #495057;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .image-gallery {
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            }
            
            .modal-content {
                width: 95%;
                margin: 20% auto;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>HTML JavaScript Integration Guide</h1>
        <p>Learn how to integrate JavaScript with HTML for dynamic and interactive web pages.</p>
        
        <!-- 1. Inline JavaScript -->
        <div class="example-section">
            <h3>1. Inline JavaScript</h3>
            <p>JavaScript code directly in HTML using the &lt;script&gt; tag:</p>
            
            <button class="btn" onclick="alert('Hello from inline JavaScript!')">Click for Alert</button>
            <button class="btn btn-success" onclick="document.getElementById('inline-demo').innerHTML = 'Content changed!'">Change Text</button>
            <button class="btn btn-warning" onclick="toggleHighlight()">Toggle Highlight</button>
            
            <div id="inline-demo" class="dynamic-content">
                <p>This content can be changed with JavaScript!</p>
            </div>
        </div>
        
        <!-- 2. DOM Manipulation -->
        <div class="example-section">
            <h3>2. DOM Manipulation</h3>
            <p>Dynamically modify HTML elements:</p>
            
            <div class="form-group">
                <label for="text-input">Enter text:</label>
                <input type="text" id="text-input" placeholder="Type something...">
            </div>
            
            <button class="btn" onclick="updateContent()">Update Content</button>
            <button class="btn btn-success" onclick="addListItem()">Add List Item</button>
            <button class="btn btn-danger" onclick="clearList()">Clear List</button>
            
            <div id="content-display" class="dynamic-content">
                <p>Your text will appear here...</p>
            </div>
            
            <ul id="dynamic-list">
                <li>Sample list item</li>
            </ul>
        </div>
        
        <!-- 3. Event Handling -->
        <div class="example-section">
            <h3>3. Event Handling</h3>
            <p>Respond to user interactions:</p>
            
            <button id="event-btn" class="btn">Hover over me!</button>
            <button id="click-counter" class="btn btn-success">Click Counter: 0</button>
            <button id="double-click-btn" class="btn btn-warning">Double Click Me</button>
            
            <div class="form-group">
                <label for="key-input">Type here (key events):</label>
                <input type="text" id="key-input" placeholder="Watch the console...">
            </div>
            
            <div id="event-display" class="dynamic-content">
                <p>Event information will appear here...</p>
            </div>
        </div>
        
        <!-- 4. Form Validation -->
        <div class="example-section">
            <h3>4. Form Validation</h3>
            <p>Validate user input with JavaScript:</p>
            
            <form id="validation-form">
                <div class="form-group">
                    <label for="name">Name (required):</label>
                    <input type="text" id="name" name="name" required>
                    <div class="error-message" id="name-error">Name is required</div>
                </div>
                
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email">
                    <div class="error-message" id="email-error">Please enter a valid email</div>
                </div>
                
                <div class="form-group">
                    <label for="age">Age (18-100):</label>
                    <input type="number" id="age" name="age" min="18" max="100">
                    <div class="error-message" id="age-error">Age must be between 18 and 100</div>
                </div>
                
                <button type="submit" class="btn">Submit Form</button>
                <div class="success-message" id="form-success">Form submitted successfully!</div>
            </form>
        </div>
        
        <!-- 5. Dynamic Image Gallery -->
        <div class="example-section">
            <h3>5. Dynamic Image Gallery</h3>
            <p>Create and modify content dynamically:</p>
            
            <button class="btn" onclick="addImage()">Add Random Image</button>
            <button class="btn btn-danger" onclick="clearGallery()">Clear Gallery</button>
            
            <div id="image-gallery" class="image-gallery">
                <!-- Images will be added dynamically -->
            </div>
        </div>
        
        <!-- 6. Counter and Progress -->
        <div class="example-section">
            <h3>6. Counter and Progress Bar</h3>
            <p>Interactive counters and progress indicators:</p>
            
            <div class="counter-display" id="counter">0</div>
            
            <button class="btn" onclick="incrementCounter()">Increment (+1)</button>
            <button class="btn btn-success" onclick="incrementCounter(5)">Increment (+5)</button>
            <button class="btn btn-warning" onclick="decrementCounter()">Decrement (-1)</button>
            <button class="btn btn-danger" onclick="resetCounter()">Reset</button>
            
            <div class="progress-container">
                <div class="progress-bar" id="progress" style="width: 0%">0%</div>
            </div>
            
            <button class="btn" onclick="updateProgress(25)">25%</button>
            <button class="btn" onclick="updateProgress(50)">50%</button>
            <button class="btn" onclick="updateProgress(75)">75%</button>
            <button class="btn" onclick="updateProgress(100)">100%</button>
        </div>
        
        <!-- 7. Modal Dialog -->
        <div class="example-section">
            <h3>7. Modal Dialog</h3>
            <p>Create popup dialogs with JavaScript:</p>
            
            <button class="btn" onclick="openModal()">Open Modal</button>
            <button class="btn btn-success" onclick="showCustomModal('Success!', 'Operation completed successfully.')">Success Modal</button>
            <button class="btn btn-danger" onclick="showCustomModal('Error!', 'Something went wrong.')">Error Modal</button>
        </div>
        
        <!-- 8. Theme Toggle -->
        <div class="example-section">
            <h3>8. Theme Toggle</h3>
            <p>Switch between light and dark themes:</p>
            
            <button class="btn" onclick="toggleTheme()">Toggle Dark Mode</button>
            <button class="btn btn-success" onclick="changeThemeColor('success')">blue Theme</button>
            <button class="btn btn-warning" onclick="changeThemeColor('warning')">Yellow Theme</button>
            <button class="btn btn-danger" onclick="changeThemeColor('danger')">Red Theme</button>
        </div>
        
        <!-- 9. Real-time Clock -->
        <div class="example-section">
            <h3>9. Real-time Clock</h3>
            <p>Display current time that updates automatically:</p>
            
            <div class="dynamic-content">
                <h4>Current Time: <span id="current-time">--:--:--</span></h4>
                <p>Date: <span id="current-date">----/--/--</span></p>
                <button class="btn" onclick="startClock()">Start Clock</button>
                <button class="btn btn-danger" onclick="stopClock()">Stop Clock</button>
            </div>
        </div>
    </div>
    
    <!-- Modal HTML -->
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal()">&times;</span>
            <h3 id="modal-title">Modal Title</h3>
            <p id="modal-message">Modal message content goes here.</p>
            <button class="btn" onclick="closeModal()">Close</button>
        </div>
    </div>
    
    <!-- External JavaScript file reference (commented out for this example) -->
    <!-- <script src="script.js"></script> -->
    
    <!-- Inline JavaScript -->
    <script>
        // Global variables
        let counter = 0;
        let clickCount = 0;
        let clockInterval;
        const images = [
            'https://picsum.photos/200/150?random=1',
            'https://picsum.photos/200/150?random=2',
            'https://picsum.photos/200/150?random=3',
            'https://picsum.photos/200/150?random=4',
            'https://picsum.photos/200/150?random=5'
        ];
        
        // 1. Basic DOM manipulation functions
        function toggleHighlight() {
            const element = document.getElementById('inline-demo');
            element.classList.toggle('highlighted');
        }
        
        function updateContent() {
            const input = document.getElementById('text-input');
            const display = document.getElementById('content-display');
            const text = input.value || 'No text entered';
            display.innerHTML = \`<p><strong>You entered:</strong> \${text}</p>\`;
        }
        
        function addListItem() {
            const list = document.getElementById('dynamic-list');
            const input = document.getElementById('text-input');
            const text = input.value || \`Item \${list.children.length}\`;
            
            const listItem = document.createElement('li');
            listItem.textContent = text;
            listItem.style.animation = 'fadeIn 0.5s ease-in';
            list.appendChild(listItem);
            
            input.value = '';
        }
        
        function clearList() {
            const list = document.getElementById('dynamic-list');
            list.innerHTML = '<li>Sample list item</li>';
        }
        
        // 2. Event handling setup
        document.addEventListener('DOMContentLoaded', function() {
            // Hover events
            const eventBtn = document.getElementById('event-btn');
            eventBtn.addEventListener('mouseenter', function() {
                this.textContent = 'Mouse is over me!';
                this.style.backgroundColor = '#28a745';
            });
            
            eventBtn.addEventListener('mouseleave', function() {
                this.textContent = 'Hover over me!';
                this.style.backgroundColor = '#007bff';
            });
            
            // Click counter
            const clickCounterBtn = document.getElementById('click-counter');
            clickCounterBtn.addEventListener('click', function() {
                clickCount++;
                this.textContent = \`Click Counter: \${clickCount}\`;
            });
            
            // Double click event
            const doubleClickBtn = document.getElementById('double-click-btn');
            doubleClickBtn.addEventListener('dblclick', function() {
                this.style.transform = 'rotate(360deg)';
                this.style.transition = 'transform 1s ease';
                setTimeout(() => {
                    this.style.transform = 'rotate(0deg)';
                }, 1000);
            });
            
            // Keyboard events
            const keyInput = document.getElementById('key-input');
            const eventDisplay = document.getElementById('event-display');
            
            keyInput.addEventListener('keyup', function(event) {
                eventDisplay.innerHTML = \`
                    <p><strong>Key Event:</strong></p>
                    <p>Key: \${event.key}</p>
                    <p>Key Code: \${event.keyCode}</p>
                    <p>Input Value: \${this.value}</p>
                \`;
            });
        });
        
        // 3. Form validation
        document.getElementById('validation-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const age = document.getElementById('age');
            
            let isValid = true;
            
            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.form-group input').forEach(el => el.classList.remove('error'));
            
            // Validate name
            if (!name.value.trim()) {
                showError('name', 'name-error');
                isValid = false;
            }
            
            // Validate email
            if (email.value && !isValidEmail(email.value)) {
                showError('email', 'email-error');
                isValid = false;
            }
            
            // Validate age
            if (age.value && (age.value < 18 || age.value > 100)) {
                showError('age', 'age-error');
                isValid = false;
            }
            
            if (isValid) {
                document.getElementById('form-success').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('form-success').style.display = 'none';
                    this.reset();
                }, 3000);
            }
        });
        
        function showError(inputId, errorId) {
            document.getElementById(inputId).classList.add('error');
            document.getElementById(errorId).style.display = 'block';
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            return emailRegex.test(email);
        }
        
        // 4. Image gallery functions
        function addImage() {
            const gallery = document.getElementById('image-gallery');
            const randomImage = images[Math.floor(Math.random() * images.length)];
            
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            imageItem.innerHTML = \`
                <img src="\${randomImage}" alt="Random image">
                <div class="caption">Image \${gallery.children.length + 1}</div>
            \`;
            
            imageItem.addEventListener('click', function() {
                showCustomModal('Image Details', \`This is image \${gallery.children.length} in the gallery.\`);
            });
            
            gallery.appendChild(imageItem);
        }
        
        function clearGallery() {
            document.getElementById('image-gallery').innerHTML = '';
        }
        
        // 5. Counter functions
        function incrementCounter(amount = 1) {
            counter += amount;
            document.getElementById('counter').textContent = counter;
            updateProgress(Math.min(counter * 5, 100));
        }
        
        function decrementCounter(amount = 1) {
            counter = Math.max(0, counter - amount);
            document.getElementById('counter').textContent = counter;
            updateProgress(Math.min(counter * 5, 100));
        }
        
        function resetCounter() {
            counter = 0;
            document.getElementById('counter').textContent = counter;
            updateProgress(0);
        }
        
        function updateProgress(percent) {
            const progressBar = document.getElementById('progress');
            progressBar.style.width = percent + '%';
            progressBar.textContent = percent + '%';
        }
        
        // 6. Modal functions
        function openModal() {
            showCustomModal('Information', 'This is a modal dialog created with JavaScript!');
        }
        
        function showCustomModal(title, message) {
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-message').textContent = message;
            document.getElementById('modal').style.display = 'block';
        }
        
        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                closeModal();
            }
        });
        
        // 7. Theme functions
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
        }
        
        function changeThemeColor(color) {
            const colors = {
                success: '#28a745',
                warning: '#ffc107',
                danger: '#dc3545'
            };
            
            document.documentElement.style.setProperty('--theme-color', colors[color]);
            document.querySelectorAll('.btn').forEach(btn => {
                if (!btn.classList.contains('btn-success') && !btn.classList.contains('btn-warning') && !btn.classList.contains('btn-danger')) {
                    btn.style.backgroundColor = colors[color];
                }
            });
        }
        
        // 8. Clock functions
        function startClock() {
            if (clockInterval) clearInterval(clockInterval);
            
            updateTime();
            clockInterval = setInterval(updateTime, 1000);
        }
        
        function stopClock() {
            if (clockInterval) {
                clearInterval(clockInterval);
                clockInterval = null;
            }
        }
        
        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            const dateString = now.toLocaleDateString();
            
            document.getElementById('current-time').textContent = timeString;
            document.getElementById('current-date').textContent = dateString;
        }
        
        // Start the clock automatically
        startClock();
        
        // Add some CSS animations
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        \`;
        document.head.appendChild(style);
    </script>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML JavaScript</title>
    <style>
        /* Add your styles here */
        
    </style>
</head>
<body>
    <!-- Practice JavaScript integration -->
    
    <!-- 1. Create interactive buttons -->
    
    <!-- 2. Build a form with validation -->
    
    <!-- 3. Make a dynamic content area -->
    
    <!-- 4. Add event listeners -->
    
    <!-- 5. Create a simple calculator or counter -->
    
    <script>
        // Add your JavaScript here
        
    </script>
</body>
</html>`,
      language: "html",
      difficulty: "intermediate" as const,
      estimatedTime: "45 min",
    },
    {
      id: "html-file-paths",
      title: "HTML File Paths",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML File Paths</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              File paths specify the location of files in your website. Master absolute and relative paths to properly link images, stylesheets, scripts, and other resources.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📁 Types of File Paths</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">📍 Absolute Paths</h4>
              <div style="color: #2d3748;">
                <p>Complete URL including protocol and domain</p>
                <p style="margin: 0;">Example: https://example.com/images/logo.png</p>
              </div>
            </div>
            
            <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #2b6cb0; font-weight: 600; margin: 0 0 1rem 0;">🔗 Relative Paths</h4>
              <div style="color: #2d3748;">
                <p>Path relative to current file's location</p>
                <p style="margin: 0;">Example: images/logo.png or ../assets/style.css</p>
              </div>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">🏠 Root-Relative Paths</h4>
              <div style="color: #2d3748;">
                <p>Path from the website's root directory</p>
                <p style="margin: 0;">Example: /images/logo.png</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🧭 Navigation Symbols</h3>
          
          <div style="border: 2px solid #805ad5; background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%); padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <p><strong>./</strong> - Current directory (optional)</p>
              <p><strong>../</strong> - Go up one directory level</p>
              <p><strong>/</strong> - Root directory of the website</p>
              <p style="margin: 0;"><strong>../../</strong> - Go up two directory levels</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">✅ Best Practices</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #234e52; margin: 0; line-height: 1.8;">
              <li><strong>Use relative paths</strong> - More portable and flexible</li>
              <li><strong>Organize files logically</strong> - Use folders for different types</li>
              <li><strong>Use lowercase names</strong> - Avoid case sensitivity issues</li>
              <li><strong>No spaces in filenames</strong> - Use hyphens or underscores</li>
              <li><strong>Test all links</strong> - Verify paths work correctly</li>
            </ul>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">⚠️ Common Mistakes</h3>
          
          <div style="background: #fff5f5; border: 2px solid #e53e3e; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #c53030; margin: 0; line-height: 1.8;">
              <li><strong>Wrong slash direction</strong> - Use forward slashes (/)</li>
              <li><strong>Case mismatches</strong> - File.jpg vs file.jpg</li>
              <li><strong>Missing file extensions</strong> - image vs image.png</li>
              <li><strong>Broken relative paths</strong> - When moving files</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML File Paths Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
          border-radius: 0;            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .section {
            margin: 30px 0;
            padding: 20px;
            border: 1px solid #dee2e6;
          border-radius: 0;            background-color: #f8f9fa;
        }
        
        .section h3 {
            margin-top: 0;
            color: #495057;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        
        .path-example {
            background-color: #e9ecef;
            padding: 15px;
          border-radius: 0;            font-family: 'Courier New', monospace;
            margin: 10px 0;
            border-left: 4px solid #007bff;
        }
        
        .path-type {
            background-color: white;
            border: 1px solid #dee2e6;
          border-radius: 0;            padding: 20px;
            margin: 15px 0;
        }
        
        .path-type h4 {
            margin-top: 0;
            color: #007bff;
        }
        
        .file-structure {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
          border-radius: 0;            padding: 15px;
            font-family: 'Courier New', monospace;
            white-space: pre;
            overflow-x: auto;
        }
        
        .example-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .success {
            color: #28a745;
            font-weight: bold;
        }
        
        .error {
            color: #dc3545;
            font-weight: bold;
        }
        
        .warning {
            color: #ffc107;
            font-weight: bold;
        }
        
        .demo-image {
            width: 100px;
            height: 100px;
            background: linear-gradient(45deg, #007bff, #6c757d);
          border-radius: 0;            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            margin: 10px 0;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .example-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>HTML File Paths - Complete Guide</h1>
        <p>Learn how to properly reference files and resources in your HTML documents.</p>
        
        <!-- Project Structure -->
        <div class="section">
            <h3>📁 Example Project Structure</h3>
            <p>Understanding your project structure is crucial for writing correct file paths:</p>
            
            <div class="file-structure">website/
├── index.html
├── about.html
├── contact.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── components/
│       └── buttons.css
├── js/
│   ├── main.js
│   ├── utils.js
│   └── modules/
│       └── navigation.js
├── images/
│   ├── logo.png
│   ├── hero.jpg
│   ├── gallery/
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   └── photo3.jpg
│   └── icons/
│       ├── facebook.svg
│       └── twitter.svg
├── pages/
│   ├── products/
│   │   ├── index.html
│   │   └── details.html
│   └── blog/
│       ├── index.html
│       └── article.html
└── assets/
    ├── fonts/
    └── documents/
        └── brochure.pdf</div>
        </div>
        
        <!-- Absolute Paths -->
        <div class="section">
            <h3>🌐 Absolute Paths</h3>
            <p>Complete URLs that include the protocol and domain name:</p>
            
            <div class="path-type">
                <h4>External Absolute Paths</h4>
                <div class="path-example">https://example.com/images/logo.png</div>
                <div class="path-example">https://cdn.example.com/css/bootstrap.min.css</div>
                <div class="path-example">https://fonts.googleapis.com/css2?family=Inter</div>
                <p><span class="success">✅ Good for:</span> External resources, CDNs, cross-domain links</p>
                <p><span class="error">❌ Bad for:</span> Local files (creates dependency on domain)</p>
            </div>
            
            <div class="path-type">
                <h4>Local Absolute Paths</h4>
                <div class="path-example">file:///C:/website/images/logo.png</div>
                <div class="path-example">file:///Users/john/website/css/style.css</div>
                <p><span class="error">❌ Avoid:</span> These only work on your local machine</p>
            </div>
        </div>
        
        <!-- Root-Relative Paths -->
        <div class="section">
            <h3>🏠 Root-Relative Paths</h3>
            <p>Paths that start from the website's root directory:</p>
            
            <div class="path-type">
                <h4>From index.html (root)</h4>
                <div class="path-example">/css/style.css</div>
                <div class="path-example">/images/logo.png</div>
                <div class="path-example">/js/main.js</div>
                <div class="path-example">/pages/products/index.html</div>
                <p><span class="success">✅ Good for:</span> Consistent paths across all pages</p>
                <p><span class="warning">⚠️ Note:</span> Requires proper server setup</p>
            </div>
            
            <div class="path-type">
                <h4>Examples in HTML</h4>
                <div class="path-example">&lt;link rel="stylesheet" href="/css/style.css"&gt;</div>
                <div class="path-example">&lt;img src="/images/logo.png" alt="Logo"&gt;</div>
                <div class="path-example">&lt;script src="/js/main.js"&gt;&lt;/script&gt;</div>
                <div class="path-example">&lt;a href="/pages/about.html"&gt;About Us&lt;/a&gt;</div>
            </div>
        </div>
        
        <!-- Relative Paths -->
        <div class="section">
            <h3>🔗 Relative Paths</h3>
            <p>Paths relative to the current file's location:</p>
            
            <div class="example-grid">
                <div class="path-type">
                    <h4>From index.html (root)</h4>
                    <div class="path-example">css/style.css</div>
                    <div class="path-example">images/logo.png</div>
                    <div class="path-example">js/main.js</div>
                    <div class="path-example">pages/about.html</div>
                    <p><span class="success">✅ Same directory or subdirectory</span></p>
                </div>
                
                <div class="path-type">
                    <h4>From pages/products/index.html</h4>
                    <div class="path-example">../../css/style.css</div>
                    <div class="path-example">../../images/logo.png</div>
                    <div class="path-example">../../js/main.js</div>
                    <div class="path-example">../about.html</div>
                    <p><span class="success">✅ Navigate up directories</span></p>
                </div>
                
                <div class="path-type">
                    <h4>From css/style.css</h4>
                    <div class="path-example">../images/bg.jpg</div>
                    <div class="path-example">../fonts/arial.woff</div>
                    <div class="path-example">components/buttons.css</div>
                    <p><span class="success">✅ Mixed navigation</span></p>
                </div>
                
                <div class="path-type">
                    <h4>Navigation Symbols</h4>
                    <div class="path-example">./images/logo.png</div>
                    <div class="path-example">../css/style.css</div>
                    <div class="path-example">../../index.html</div>
                    <div class="path-example">gallery/photo1.jpg</div>
                    <p><span class="success">✅ Clear navigation intent</span></p>
                </div>
            </div>
        </div>
        
        <!-- Practical Examples -->
        <div class="section">
            <h3>💡 Practical Examples</h3>
            <p>Real-world examples of file path usage:</p>
            
            <div class="path-type">
                <h4>HTML Document Links</h4>
                <div class="path-example">&lt;!-- From index.html --&gt;
&lt;link rel="stylesheet" href="css/style.css"&gt;
&lt;script src="js/main.js"&gt;&lt;/script&gt;
&lt;img src="images/logo.png" alt="Logo"&gt;

&lt;!-- From pages/products/index.html --&gt;
&lt;link rel="stylesheet" href="../../css/style.css"&gt;
&lt;script src="../../js/main.js"&gt;&lt;/script&gt;
&lt;img src="../../images/logo.png" alt="Logo"&gt;</div>
            </div>
            
            <div class="path-type">
                <h4>CSS Background Images</h4>
                <div class="path-example">/* From css/style.css */
.hero {
    background-image: url('../images/hero.jpg');
}

.icon {
    background-image: url('../images/icons/arrow.svg');
}

/* From css/components/buttons.css */
.btn-icon {
    background-image: url('../../images/icons/button.png');
}</div>
            </div>
            
            <div class="path-type">
                <h4>JavaScript File Imports</h4>
                <div class="path-example">// From js/main.js
import utils from './utils.js';
import navigation from './modules/navigation.js';

// From js/modules/navigation.js
import utils from '../utils.js';</div>
            </div>
        </div>
        
        <!-- Common Mistakes -->
        <div class="section">
            <h3>❌ Common Mistakes and Solutions</h3>
            
            <div class="example-grid">
                <div class="path-type">
                    <h4>Wrong Slash Direction</h4>
                    <div class="path-example error">❌ images\\logo.png</div>
                    <div class="path-example success">✅ images/logo.png</div>
                    <p>Always use forward slashes in web paths</p>
                </div>
                
                <div class="path-type">
                    <h4>Case Sensitivity</h4>
                    <div class="path-example error">❌ Images/Logo.PNG</div>
                    <div class="path-example success">✅ images/logo.png</div>
                    <p>Use consistent lowercase naming</p>
                </div>
                
                <div class="path-type">
                    <h4>Missing File Extensions</h4>
                    <div class="path-example error">❌ css/style</div>
                    <div class="path-example success">✅ css/style.css</div>
                    <p>Always include file extensions</p>
                </div>
                
                <div class="path-type">
                    <h4>Spaces in Filenames</h4>
                    <div class="path-example error">❌ images/my logo.png</div>
                    <div class="path-example success">✅ images/my-logo.png</div>
                    <p>Use hyphens or underscores instead</p>
                </div>
            </div>
        </div>
        
        <!-- Testing Section -->
        <div class="section">
            <h3>🧪 Test Your Paths</h3>
            <p>Click the buttons below to test different path examples:</p>
            
            <div style="margin: 20px 0;">
                <button onclick="testPath('images/demo.jpg')" style="margin: 5px; padding: 10px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Test Relative Path</button>
                <button onclick="testPath('/images/demo.jpg')" style="margin: 5px; padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Test Root-Relative</button>
                <button onclick="testPath('https://picsum.photos/100/100')" style="margin: 5px; padding: 10px 15px; background: #ffc107; color: black; border: none; border-radius: 4px; cursor: pointer;">Test Absolute URL</button>
                <button onclick="clearTest()" style="margin: 5px; padding: 10px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Clear Test</button>
            </div>
            
            <div id="path-test-result" style="margin: 20px 0; padding: 15px; border: 1px solid #dee2e6; border-radius: 4px; background: #f8f9fa;">
                <p>Click a button above to test different path types</p>
            </div>
        </div>
        
        <!-- Best Practices Summary -->
        <div class="section">
            <h3>📋 Best Practices Summary</h3>
            
            <div class="example-grid">
                <div class="path-type">
                    <h4>✅ Do This</h4>
                    <ul>
                        <li>Use relative paths for local files</li>
                        <li>Organize files in logical folders</li>
                        <li>Use lowercase filenames</li>
                        <li>Include file extensions</li>
                        <li>Use hyphens for spaces</li>
                        <li>Test all links regularly</li>
                    </ul>
                </div>
                
                <div class="path-type">
                    <h4>❌ Avoid This</h4>
                    <ul>
                        <li>Hardcoded absolute paths to local files</li>
                        <li>Inconsistent folder structures</li>
                        <li>Mixed case in filenames</li>
                        <li>Spaces in file/folder names</li>
                        <li>Missing file extensions</li>
                        <li>Broken or untested links</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        function testPath(path) {
            const resultDiv = document.getElementById('path-test-result');
            
            resultDiv.innerHTML = \`
                <h4>Testing Path: \${path}</h4>
                <p><strong>Path Type:</strong> \${getPathType(path)}</p>
                <p><strong>Testing image load...</strong></p>
                <img src="\${path}" 
                     alt="Test image" 
                     style="max-width: 100px; max-height: 100px; border: 1px solid #ccc;"
                     onload="showSuccess(this)" 
                     onerror="showError(this)">
            \`;
        }
        
        function getPathType(path) {
            if (path.startsWith('http://') || path.startsWith('https://')) {
                return 'Absolute URL';
            } else if (path.startsWith('/')) {
                return 'Root-relative path';
            } else {
                return 'Relative path';
            }
        }
        
        function showSuccess(img) {
            const container = img.parentElement;
            const successMsg = document.createElement('p');
            successMsg.innerHTML = '<span style="color: #28a745; font-weight: bold;">✅ Path is valid - Image loaded successfully!</span>';
            container.appendChild(successMsg);
        }
        
        function showError(img) {
            const container = img.parentElement;
            const errorMsg = document.createElement('p');
            errorMsg.innerHTML = '<span style="color: #dc3545; font-weight: bold;">❌ Path failed - Image could not be loaded</span>';
            container.appendChild(errorMsg);
            img.style.display = 'none';
        }
        
        function clearTest() {
            document.getElementById('path-test-result').innerHTML = '<p>Click a button above to test different path types</p>';
        }
    </script>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML File Paths</title>
    <style>
        /* Add your CSS file references here */
        
    </style>
</head>
<body>
    <!-- Practice file path references -->
    
    <!-- 1. Link to external CSS files -->
    
    <!-- 2. Include images with different path types -->
    
    <!-- 3. Link to JavaScript files -->
    
    <!-- 4. Create navigation links to other pages -->
    
    <!-- 5. Test both relative and absolute paths -->
    
    <script>
        // Add JavaScript file references
        
    </script>
</body>
</html>`,
      language: "html",
      difficulty: "beginner" as const,
      estimatedTime: "30 min",
    },
    {
      id: "html-head",
      title: "HTML Head Section",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Head Section</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              The HTML head section contains metadata about your document. Learn to optimize the head for SEO, performance, and proper browser behavior.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🏗️ Head Section Structure</h3>
          
          <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <div style="color: #2d3748;">
              <p><strong>Invisible content:</strong> Not displayed on the page</p>
              <p><strong>Browser instructions:</strong> How to handle the document</p>
              <p><strong>External resources:</strong> CSS, fonts, and script links</p>
              <p style="margin: 0;"><strong>Search engine data:</strong> Meta information for SEO</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📋 Essential Elements</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">📄 &lt;title&gt;</h4>
              <div style="color: #2d3748;">
                <p>Document title shown in browser tab</p>
                <p style="margin: 0;">Critical for SEO and user experience</p>
              </div>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">🔧 &lt;meta&gt;</h4>
              <div style="color: #2d3748;">
                <p>Document metadata and instructions</p>
                <p style="margin: 0;">Charset, viewport, description, keywords</p>
              </div>
            </div>
            
            <div style="border: 2px solid #805ad5; background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #553c9a; font-weight: 600; margin: 0 0 1rem 0;">🎨 &lt;link&gt;</h4>
              <div style="color: #2d3748;">
                <p>External resource connections</p>
                <p style="margin: 0;">Stylesheets, icons, fonts, preloading</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔍 SEO Meta Tags</h3>
          
          <div style="border-left: 4px solid #48bb78; background: #f0fff4; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #276749; line-height: 1.8;">
              <strong>Title tag:</strong> 50-60 characters for optimal display<br>
              <strong>Description:</strong> 150-160 characters summary<br>
              <strong>Keywords:</strong> Relevant search terms (less important now)<br>
              <strong>Open Graph:</strong> Social media sharing preview<br>
              <strong>Twitter Cards:</strong> Twitter-specific sharing format
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📱 Mobile Optimization</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #234e52; line-height: 1.8;">
              <p><strong>Viewport meta tag:</strong> Essential for responsive design</p>
              <p><strong>Apple touch icons:</strong> iOS home screen icons</p>
              <p><strong>Theme colors:</strong> Browser UI customization</p>
              <p style="margin: 0;"><strong>Web app manifest:</strong> Progressive Web App configuration</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">⚡ Performance Tips</h3>
          
          <div style="background: #fff5f5; border: 2px solid #f56565; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #c53030; margin: 0; line-height: 1.8;">
              <li><strong>Preload critical resources</strong> - Fonts, CSS, important images</li>
              <li><strong>DNS prefetch</strong> - Resolve external domains early</li>
              <li><strong>Minimize head content</strong> - Only essential metadata</li>
              <li><strong>Optimize script loading</strong> - Use async/defer attributes</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Essential Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Title (50-60 characters for SEO) -->
    <title>HTML Head Section Guide - Complete Tutorial</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Learn everything about HTML head section - meta tags, SEO optimization, performance tips, and mobile responsiveness for modern web development.">
    <meta name="keywords" content="HTML, head section, meta tags, SEO, web development, responsive design">
    <meta name="author" content="Web Developer">
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">
    
    <!-- Open Graph Meta Tags (Social Media) -->
    <meta property="og:title" content="HTML Head Section Guide - Complete Tutorial">
    <meta property="og:description" content="Master the HTML head section with this comprehensive guide covering SEO, performance, and mobile optimization.">
    <meta property="og:image" content="https://example.com/images/html-guide-preview.jpg">
    <meta property="og:url" content="https://example.com/html-head-guide">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Web Development Guides">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="HTML Head Section Guide">
    <meta name="twitter:description" content="Master the HTML head section with this comprehensive guide.">
    <meta name="twitter:image" content="https://example.com/images/html-guide-preview.jpg">
    <meta name="twitter:creator" content="@webdev">
    
    <!-- Favicon and Icons -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    
    <!-- Theme Colors -->
    <meta name="theme-color" content="#007bff">
    <meta name="msapplication-TileColor" content="#007bff">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    
    <!-- Preconnect to external domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/css/critical.css" as="style">
    
    <!-- External Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="/css/normalize.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/responsive.css" media="screen and (max-width: 768px)">
    <link rel="stylesheet" href="/css/print.css" media="print">
    
    <!-- Inline Critical CSS -->
    <style>
        /* Critical above-the-fold styles */
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            color: #333333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 60px 20px;
            margin-bottom: 40px;
          border-radius: 0;        }
        
        .header h1 {
            margin: 0 0 20px 0;
            font-size: 2.5rem;
            font-weight: 700;
        }
        
        .header p {
            margin: 0;
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .section {
            background: white;
          border-radius: 0;            padding: 30px;
            margin: 30px 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border: 1px solid #e2e8f0;
        }
        
        .section h2 {
            color: #2d3748;
            border-bottom: 3px solid #4299e1;
            padding-bottom: 10px;
            margin-top: 0;
        }
        
        .code-block {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
          border-radius: 0;            padding: 20px;
            font-family: 'Courier New', monospace;
            overflow-x: auto;
            margin: 20px 0;
            position: relative;
        }
        
        .code-block::before {
            content: 'HTML';
            position: absolute;
            top: 10px;
            right: 15px;
            background: #4299e1;
            color: white;
            padding: 4px 8px;
          border-radius: 0;            font-size: 12px;
            font-weight: bold;
        }
        
        .tag-explanation {
            background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%);
            border: 2px solid #4299e1;
          border-radius: 0;            padding: 20px;
            margin: 20px 0;
        }
        
        .tag-explanation h3 {
            color: #2b6cb0;
            margin-top: 0;
        }
        
        .tag-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .tag-item {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
          border-radius: 0;            padding: 20px;
        }
        
        .tag-item h4 {
            color: #495057;
            margin-top: 0;
            border-bottom: 2px solid #007bff;
            padding-bottom: 8px;
        }
        
        .tag-item code {
            background: #e9ecef;
            padding: 3px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        
        .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-left: 4px solid #f39c12;
            padding: 15px;
          border-radius: 0;            margin: 20px 0;
        }
        
        .tip {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            border-left: 4px solid #28a745;
            padding: 15px;
          border-radius: 0;            margin: 20px 0;
        }
        
        .example-head {
            background: #343a40;
            color: #f8f9fa;
            padding: 20px;
          border-radius: 0;            margin: 20px 0;
            font-family: 'Courier New', monospace;
            overflow-x: auto;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
            
            .header {
                padding: 40px 15px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .section {
                padding: 20px;
            }
            
            .tag-list {
                grid-template-columns: 1fr;
            }
        }
        
        /* Print Styles */
        @media print {
            .header {
                background: none !important;
                color: black !important;
            }
            
            .section {
                box-shadow: none !important;
                border: 1px solid #ccc !important;
            }
        }
    </style>
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "HTML Head Section Guide - Complete Tutorial",
        "description": "Learn everything about HTML head section - meta tags, SEO optimization, performance tips, and mobile responsiveness.",
        "author": {
            "@type": "Person",
            "name": "Web Developer"
        },
        "datePublished": "2024-01-15",
        "dateModified": "2024-01-15",
        "publisher": {
            "@type": "Organization",
            "name": "Web Development Guides"
        }
    }
    </script>
    
    <!-- Web App Manifest -->
    <link rel="manifest" href="/manifest.json">
    
    <!-- Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    </script>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>HTML Head Section Guide</h1>
            <p>Master the invisible but critical part of your HTML documents</p>
        </header>
        
        <!-- Document Title -->
        <section class="section">
            <h2>📄 Document Title</h2>
            <p>The title element is one of the most important elements in the head section:</p>
            
            <div class="code-block">
&lt;title&gt;Your Page Title - Brand Name&lt;/title&gt;</div>
            
            <div class="tag-explanation">
                <h3>Title Best Practices</h3>
                <ul>
                    <li><strong>Length:</strong> 50-60 characters for optimal SEO</li>
                    <li><strong>Unique:</strong> Each page should have a unique title</li>
                    <li><strong>Descriptive:</strong> Clearly describe page content</li>
                    <li><strong>Keywords:</strong> Include relevant keywords naturally</li>
                    <li><strong>Branding:</strong> Include brand name for recognition</li>
                </ul>
            </div>
        </section>
        
        <!-- Meta Tags -->
        <section class="section">
            <h2>🔧 Essential Meta Tags</h2>
            
            <div class="tag-list">
                <div class="tag-item">
                    <h4>Character Encoding</h4>
                    <code>&lt;meta charset="UTF-8"&gt;</code>
                    <p>Defines character encoding. Should be first meta tag.</p>
                </div>
                
                <div class="tag-item">
                    <h4>Viewport</h4>
                    <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>
                    <p>Essential for responsive design on mobile devices.</p>
                </div>
                
                <div class="tag-item">
                    <h4>Description</h4>
                    <code>&lt;meta name="description" content="Page description"&gt;</code>
                    <p>150-160 characters. Used by search engines.</p>
                </div>
                
                <div class="tag-item">
                    <h4>Keywords</h4>
                    <code>&lt;meta name="keywords" content="html, css, javascript"&gt;</code>
                    <p>Less important for modern SEO but still useful.</p>
                </div>
                
                <div class="tag-item">
                    <h4>Author</h4>
                    <code>&lt;meta name="author" content="Your Name"&gt;</code>
                    <p>Identifies the document author.</p>
                </div>
                
                <div class="tag-item">
                    <h4>Robots</h4>
                    <code>&lt;meta name="robots" content="index, follow"&gt;</code>
                    <p>Controls search engine crawling and indexing.</p>
                </div>
            </div>
        </section>
        
        <!-- Link Elements -->
        <section class="section">
            <h2>🎨 Link Elements</h2>
            <p>Link elements connect your document to external resources:</p>
            
            <div class="tag-list">
                <div class="tag-item">
                    <h4>Stylesheet</h4>
                    <code>&lt;link rel="stylesheet" href="styles.css"&gt;</code>
                    <p>Links to external CSS files.</p>
                </div>
                
                <div class="tag-item">
                    <h4>Favicon</h4>
                    <code>&lt;link rel="icon" type="image/x-icon" href="/favicon.ico"&gt;</code>
                    <p>Browser tab icon.</p>
                </div>
                
                <div class="tag-item">
                    <h4>Preload</h4>
                    <code>&lt;link rel="preload" href="font.woff2" as="font"&gt;</code>
                    <p>Preloads critical resources for better performance.</p>
                </div>
                
                <div class="tag-item">
                    <h4>Preconnect</h4>
                    <code>&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;</code>
                    <p>Establishes early connections to external domains.</p>
                </div>
            </div>
        </section>
        
        <!-- SEO and Social Media -->
        <section class="section">
            <h2>🔍 SEO and Social Media Meta Tags</h2>
            
            <div class="tag-explanation">
                <h3>Open Graph Tags (Facebook, LinkedIn)</h3>
                <div class="code-block">
&lt;meta property="og:title" content="Your Page Title"&gt;
&lt;meta property="og:description" content="Page description"&gt;
&lt;meta property="og:image" content="https://example.com/image.jpg"&gt;
&lt;meta property="og:url" content="https://example.com/page"&gt;
&lt;meta property="og:type" content="website"&gt;</div>
            </div>
            
            <div class="tag-explanation">
                <h3>Twitter Card Tags</h3>
                <div class="code-block">
&lt;meta name="twitter:card" content="summary_large_image"&gt;
&lt;meta name="twitter:title" content="Your Page Title"&gt;
&lt;meta name="twitter:description" content="Page description"&gt;
&lt;meta name="twitter:image" content="https://example.com/image.jpg"&gt;</div>
            </div>
        </section>
        
        <!-- Mobile Optimization -->
        <section class="section">
            <h2>📱 Mobile Optimization</h2>
            
            <div class="tag-explanation">
                <h3>Mobile-Specific Meta Tags</h3>
                <div class="code-block">
&lt;!-- Viewport for responsive design --&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;

&lt;!-- Apple-specific meta tags --&gt;
&lt;meta name="apple-mobile-web-app-capable" content="yes"&gt;
&lt;meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"&gt;
&lt;meta name="apple-mobile-web-app-title" content="App Name"&gt;

&lt;!-- Theme colors --&gt;
&lt;meta name="theme-color" content="#007bff"&gt;
&lt;meta name="msapplication-TileColor" content="#007bff"&gt;</div>
            </div>
        </section>
        
        <!-- Performance Optimization -->
        <section class="section">
            <h2>⚡ Performance Optimization</h2>
            
            <div class="tip">
                <h3>💡 Pro Tips for Better Performance</h3>
                <ul>
                    <li>Place CSS links before JavaScript for faster rendering</li>
                    <li>Use preload for critical resources (fonts, above-the-fold CSS)</li>
                    <li>Use preconnect for external domains you'll fetch from</li>
                    <li>Minimize the number of external requests in the head</li>
                    <li>Use resource hints (dns-prefetch, preconnect, prefetch)</li>
                </ul>
            </div>
            
            <div class="code-block">
&lt;!-- Resource hints for better performance --&gt;
&lt;link rel="dns-prefetch" href="//fonts.googleapis.com"&gt;
&lt;link rel="preconnect" href="https://fonts.gstatic.com" crossorigin&gt;
&lt;link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin&gt;</div>
        </section>
        
        <!-- Complete Example -->
        <section class="section">
            <h2>📋 Complete Head Section Example</h2>
            <p>Here's a comprehensive example of a well-optimized head section:</p>
            
            <div class="example-head">
&lt;head&gt;
    &lt;!-- Essential meta tags --&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
    
    &lt;!-- Title and SEO --&gt;
    &lt;title&gt;Complete Guide to HTML Head Section | Web Dev Tutorials&lt;/title&gt;
    &lt;meta name="description" content="Master HTML head section with our comprehensive guide covering SEO, performance, and mobile optimization."&gt;
    
    &lt;!-- Favicon --&gt;
    &lt;link rel="icon" href="/favicon.ico"&gt;
    &lt;link rel="apple-touch-icon" href="/apple-touch-icon.png"&gt;
    
    &lt;!-- Performance optimizations --&gt;
    &lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
    &lt;link rel="dns-prefetch" href="//cdn.jsdelivr.net"&gt;
    
    &lt;!-- Stylesheets --&gt;
    &lt;link rel="stylesheet" href="/css/main.css"&gt;
    
    &lt;!-- Social media meta tags --&gt;
    &lt;meta property="og:title" content="HTML Head Section Guide"&gt;
    &lt;meta property="og:description" content="Complete tutorial on HTML head optimization"&gt;
    &lt;meta property="og:image" content="/images/og-image.jpg"&gt;
    
    &lt;!-- Theme color --&gt;
    &lt;meta name="theme-color" content="#007bff"&gt;
&lt;/head&gt;</div>
        </section>
        
        <!-- Common Mistakes -->
        <section class="section">
            <h2>❌ Common Mistakes to Avoid</h2>
            
            <div class="warning">
                <h3>⚠️ Avoid These Common Pitfalls</h3>
                <ul>
                    <li><strong>Missing charset declaration</strong> - Always include UTF-8 encoding</li>
                    <li><strong>No viewport meta tag</strong> - Essential for mobile responsiveness</li>
                    <li><strong>Duplicate titles</strong> - Each page needs a unique title</li>
                    <li><strong>Too long descriptions</strong> - Keep under 160 characters</li>
                    <li><strong>Missing social media tags</strong> - Important for sharing</li>
                    <li><strong>Blocking resources</strong> - Don't block rendering with heavy scripts</li>
                    <li><strong>No error handling</strong> - Always have fallbacks for external resources</li>
                </ul>
            </div>
        </section>
    </div>
    
    <!-- JavaScript files - loaded at the end for performance -->
    <script src="/js/analytics.js" async></script>
    <script src="/js/main.js" defer></script>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Add your head section elements here -->
    
    <!-- 1. Essential meta tags -->
    
    <!-- 2. Title and SEO meta tags -->
    
    <!-- 3. Social media meta tags -->
    
    <!-- 4. Favicon and icons -->
    
    <!-- 5. External resource links -->
    
    <!-- 6. Performance optimizations -->
    
</head>
<body>
    <h1>Practice HTML Head Section</h1>
    <p>Check the head section of this document to see your additions.</p>
</body>
</html>`,
      language: "html",
      difficulty: "intermediate" as const,
      estimatedTime: "40 min",
    },
    {
      id: "html-layout",
      title: "HTML Layout Techniques",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Layout Techniques</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Master modern HTML layout techniques using semantic elements, Flexbox, CSS Grid, and responsive design patterns to create professional, accessible web layouts.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🏗️ Layout Methods Evolution</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #e53e3e; background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">📅 Old Methods (Avoid)</h4>
              <div style="color: #2d3748;">
                <p>Tables, floats, absolute positioning</p>
                <p style="margin: 0;">Inflexible, not responsive, accessibility issues</p>
              </div>
            </div>
            
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">✨ Modern Methods (Use These)</h4>
              <div style="color: #2d3748;">
                <p>Flexbox, CSS Grid, semantic HTML</p>
                <p style="margin: 0;">Flexible, responsive, accessible, maintainable</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📱 Semantic HTML Structure</h3>
          
          <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <div style="color: #2d3748;">
              <p><strong>&lt;header&gt;:</strong> Site/page header with navigation</p>
              <p><strong>&lt;nav&gt;:</strong> Navigation links and menus</p>
              <p><strong>&lt;main&gt;:</strong> Primary content area</p>
              <p><strong>&lt;section&gt;:</strong> Thematic content grouping</p>
              <p><strong>&lt;article&gt;:</strong> Self-contained content</p>
              <p><strong>&lt;aside&gt;:</strong> Sidebar content</p>
              <p style="margin: 0;"><strong>&lt;footer&gt;:</strong> Site/page footer</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔧 Flexbox Layouts</h3>
          
          <div style="border-left: 4px solid #805ad5; background: #faf5ff; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #553c9a; line-height: 1.8;">
              <strong>Perfect for:</strong> Navigation bars, card layouts, centering<br>
              <strong>One-dimensional:</strong> Either row or column direction<br>
              <strong>Flexible:</strong> Items grow/shrink based on available space<br>
              <strong>Alignment:</strong> Easy vertical and horizontal alignment
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 CSS Grid Layouts</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #234e52; line-height: 1.8;">
              <p><strong>Perfect for:</strong> Complex page layouts, magazine-style designs</p>
              <p><strong>Two-dimensional:</strong> Control both rows and columns</p>
              <p><strong>Powerful:</strong> Overlap items, create complex arrangements</p>
              <p style="margin: 0;"><strong>Responsive:</strong> Built-in responsive capabilities</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📐 Common Layout Patterns</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">📄 Header-Content-Footer</h4>
              <div style="color: #2d3748;">
                <p>Classic three-section layout</p>
                <p style="margin: 0;">Header at top, main content, footer at bottom</p>
              </div>
            </div>
            
            <div style="border: 2px solid #f56565; background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">📊 Holy Grail Layout</h4>
              <div style="color: #2d3748;">
                <p>Header, three-column content, footer</p>
                <p style="margin: 0;">Sidebar-Main-Sidebar with equal height columns</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎨 Best Practices</h3>
          
          <div style="background: #fff5f5; border: 2px solid #f56565; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #c53030; margin: 0; line-height: 1.8;">
              <li><strong>Mobile-first approach</strong> - Design for mobile, enhance for desktop</li>
              <li><strong>Semantic HTML first</strong> - Structure before styling</li>
              <li><strong>Flexible units</strong> - Use %, em, rem, fr instead of px</li>
              <li><strong>Test on real devices</strong> - Emulators aren't enough</li>
              <li><strong>Accessibility</strong> - Proper heading hierarchy, ARIA labels</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Layout Techniques Guide</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        /* Layout Examples Container */
        .layout-example {
            background: white;
          border-radius: 0;            padding: 30px;
            margin: 30px 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border: 1px solid #e2e8f0;
        }
        
        .layout-example h2 {
            color: #2d3748;
            border-bottom: 3px solid #4299e1;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        
        /* Demo Styles for Visual Examples */
        .demo-element {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
          border-radius: 0;            margin: 10px 0;
            font-weight: bold;
        }
        
        .demo-header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%); }
        .demo-nav { background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); }
        .demo-main { background: linear-gradient(135deg, #45b7d1 0%, #96c93d 100%); }
        .demo-aside { background: linear-gradient(135deg, #f9ca24 0%, #f0932b 100%); }
        .demo-footer { background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%); }
        .demo-section { background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%); }
        
        /* 1. Basic Semantic Layout */
        .semantic-layout {
            min-height: 500px;
            display: flex;
            flex-direction: column;
        }
        
        .semantic-layout header {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .semantic-layout nav {
            background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
            color: white;
            padding: 15px;
        }
        
        .semantic-layout nav ul {
            list-style: none;
            display: flex;
            gap: 20px;
            justify-content: center;
        }
        
        .semantic-layout nav a {
            color: white;
            text-decoration: none;
            padding: 8px 16px;
          border-radius: 0;            transition: background-color 0.3s;
        }
        
        .semantic-layout nav a:hover {
            background-color: rgba(255,255,255,0.2);
        }
        
        .semantic-layout main {
            background: linear-gradient(135deg, #45b7d1 0%, #96c93d 100%);
            color: white;
            padding: 30px;
            text-align: center;
            flex: 1;
        }
        
        .semantic-layout footer {
            background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        /* 2. Flexbox Navigation */
        .flex-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #343a40;
            padding: 1rem 2rem;
          border-radius: 0;        }
        
        .flex-nav .logo {
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
        }
        
        .flex-nav .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        
        .flex-nav .nav-links a {
            color: white;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .flex-nav .nav-links a:hover {
            color: #007bff;
        }
        
        .flex-nav .nav-actions {
            display: flex;
            gap: 1rem;
        }
        
        .btn {
            padding: 8px 16px;
            border: 1px solid #007bff;
          border-radius: 0;            text-decoration: none;
            transition: all 0.3s;
        }
        
        .btn-primary {
            background: #007bff;
            color: white;
        }
        
        .btn-outline {
            background: transparent;
            color: #007bff;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        /* 3. Flexbox Card Layout */
        .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            margin: 20px 0;
        }
        
        .card {
            background: white;
          border-radius: 0;            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
            flex: 1 1 300px;
            max-width: 350px;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .card-image {
            height: 200px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
        }
        
        .card-content {
            padding: 20px;
        }
        
        .card-title {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 10px;
            color: #2d3748;
        }
        
        .card-text {
            color: #4a5568;
            margin-bottom: 15px;
        }
        
        /* 4. CSS Grid Layout */
        .grid-layout {
            display: grid;
            grid-template-areas:
                "header header header"
                "nav main aside"
                "footer footer footer";
            grid-template-rows: auto 1fr auto;
            grid-template-columns: 200px 1fr 200px;
            gap: 20px;
            min-height: 500px;
        }
        
        .grid-header {
            grid-area: header;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
            color: white;
            padding: 20px;
            text-align: center;
          border-radius: 0;        }
        
        .grid-nav {
            grid-area: nav;
            background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
            color: white;
            padding: 20px;
          border-radius: 0;        }
        
        .grid-nav ul {
            list-style: none;
        }
        
        .grid-nav li {
            margin: 10px 0;
        }
        
        .grid-nav a {
            color: white;
            text-decoration: none;
            padding: 8px;
            display: block;
          border-radius: 0;            transition: background-color 0.3s;
        }
        
        .grid-nav a:hover {
            background-color: rgba(255,255,255,0.2);
        }
        
        .grid-main {
            grid-area: main;
            background: linear-gradient(135deg, #45b7d1 0%, #96c93d 100%);
            color: white;
            padding: 30px;
          border-radius: 0;        }
        
        .grid-aside {
            grid-area: aside;
            background: linear-gradient(135deg, #f9ca24 0%, #f0932b 100%);
            color: white;
            padding: 20px;
          border-radius: 0;        }
        
        .grid-footer {
            grid-area: footer;
            background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
            color: white;
            padding: 20px;
            text-align: center;
          border-radius: 0;        }
        
        /* 5. Complex Grid Layout */
        .complex-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(4, 100px);
            gap: 15px;
            margin: 20px 0;
        }
        
        .grid-item {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          border-radius: 0;            font-weight: bold;
            transition: transform 0.3s;
        }
        
        .grid-item:hover {
            transform: scale(1.05);
        }
        
        .item-1 { grid-column: 1 / 3; grid-row: 1 / 3; }
        .item-2 { grid-column: 3 / 5; grid-row: 1; }
        .item-3 { grid-column: 3; grid-row: 2; }
        .item-4 { grid-column: 4; grid-row: 2 / 4; }
        .item-5 { grid-column: 1; grid-row: 3 / 5; }
        .item-6 { grid-column: 2 / 4; grid-row: 3; }
        .item-7 { grid-column: 2 / 4; grid-row: 4; }
        
        /* 6. Responsive Layout */
        .responsive-layout {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .responsive-item {
            background: white;
          border-radius: 0;            padding: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border: 1px solid #e2e8f0;
        }
        
        .responsive-item h3 {
            color: #2d3748;
            margin-bottom: 10px;
        }
        
        /* 7. Flexbox Centering */
        .flex-center {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          border-radius: 0;            margin: 20px 0;
        }
        
        .centered-content {
            text-align: center;
            padding: 20px;
            background: rgba(255,255,255,0.1);
          border-radius: 0;            backdrop-filter: blur(10px);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
            
            .grid-layout {
                grid-template-areas:
                    "header"
                    "nav"
                    "main"
                    "aside"
                    "footer";
                grid-template-columns: 1fr;
                grid-template-rows: auto auto 1fr auto auto;
            }
            
            .flex-nav {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
            
            .flex-nav .nav-links {
                flex-direction: column;
                gap: 1rem;
            }
            
            .complex-grid {
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(6, 80px);
            }
            
            .item-1 { grid-column: 1 / 3; grid-row: 1 / 3; }
            .item-2 { grid-column: 1; grid-row: 3; }
            .item-3 { grid-column: 2; grid-row: 3; }
            .item-4 { grid-column: 1 / 3; grid-row: 4; }
            .item-5 { grid-column: 1; grid-row: 5; }
            .item-6 { grid-column: 2; grid-row: 5; }
            .item-7 { grid-column: 1 / 3; grid-row: 6; }
            
            .card-container {
                flex-direction: column;
                align-items: center;
            }
        }
        
        @media (max-width: 480px) {
            .complex-grid {
                grid-template-columns: 1fr;
                grid-template-rows: repeat(7, 80px);
            }
            
            .item-1, .item-2, .item-3, .item-4, .item-5, .item-6, .item-7 {
                grid-column: 1;
                grid-row: auto;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 style="text-align: center; color: #2d3748; margin-bottom: 2rem;">HTML Layout Techniques Guide</h1>
        
        <!-- 1. Semantic HTML Layout -->
        <div class="layout-example">
            <h2>1. Semantic HTML5 Layout</h2>
            <p>Using semantic elements for better accessibility and SEO:</p>
            
            <div class="semantic-layout">
                <header>
                    <h1>Website Header</h1>
                </header>
                
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                
                <main>
                    <h2>Main Content Area</h2>
                    <p>This is where your primary content goes. It's marked as the main landmark for accessibility.</p>
                </main>
                
                <footer>
                    <p>&copy; 2024 Your Website. All rights reserved.</p>
                </footer>
            </div>
        </div>
        
        <!-- 2. Flexbox Navigation -->
        <div class="layout-example">
            <h2>2. Flexbox Navigation Bar</h2>
            <p>Modern navigation using Flexbox for responsive behavior:</p>
            
            <nav class="flex-nav">
                <div class="logo">Brand</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#products">Products</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div class="nav-actions">
                    <a href="#login" class="btn btn-outline">Login</a>
                    <a href="#signup" class="btn btn-primary">Sign Up</a>
                </div>
            </nav>
        </div>
        
        <!-- 3. Flexbox Card Layout -->
        <div class="layout-example">
            <h2>3. Flexbox Card Layout</h2>
            <p>Responsive card layout using Flexbox wrap:</p>
            
            <div class="card-container">
                <div class="card">
                    <div class="card-image">Feature 1</div>
                    <div class="card-content">
                        <h3 class="card-title">Responsive Design</h3>
                        <p class="card-text">Create layouts that work on all devices with flexible containers and responsive units.</p>
                        <a href="#" class="btn btn-primary">Learn More</a>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-image">Feature 2</div>
                    <div class="card-content">
                        <h3 class="card-title">CSS Grid</h3>
                        <p class="card-text">Build complex layouts easily with the powerful two-dimensional CSS Grid system.</p>
                        <a href="#" class="btn btn-primary">Learn More</a>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-image">Feature 3</div>
                    <div class="card-content">
                        <h3 class="card-title">Flexbox</h3>
                        <p class="card-text">Master one-dimensional layouts with Flexbox for navigation, cards, and centering.</p>
                        <a href="#" class="btn btn-primary">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 4. CSS Grid Layout -->
        <div class="layout-example">
            <h2>4. CSS Grid Layout (Holy Grail)</h2>
            <p>Classic three-column layout with header and footer using CSS Grid:</p>
            
            <div class="grid-layout">
                <header class="grid-header">
                    <h2>Grid Header</h2>
                </header>
                
                <nav class="grid-nav">
                    <h3>Navigation</h3>
                    <ul>
                        <li><a href="#dashboard">Dashboard</a></li>
                        <li><a href="#profile">Profile</a></li>
                        <li><a href="#settings">Settings</a></li>
                        <li><a href="#help">Help</a></li>
                    </ul>
                </nav>
                
                <main class="grid-main">
                    <h2>Main Content</h2>
                    <p>This is the primary content area that takes up the most space. It's perfectly centered and responsive.</p>
                    <p>CSS Grid makes complex layouts simple and maintainable.</p>
                </main>
                
                <aside class="grid-aside">
                    <h3>Sidebar</h3>
                    <p>Additional content, ads, or related information goes here.</p>
                </aside>
                
                <footer class="grid-footer">
                    <p>Grid Footer - Equal width across all columns</p>
                </footer>
            </div>
        </div>
        
        <!-- 5. Complex Grid Layout -->
        <div class="layout-example">
            <h2>5. Complex CSS Grid Layout</h2>
            <p>Advanced grid with overlapping areas and custom positioning:</p>
            
            <div class="complex-grid">
                <div class="grid-item item-1">Large Item<br>2x2</div>
                <div class="grid-item item-2">Header</div>
                <div class="grid-item item-3">Nav</div>
                <div class="grid-item item-4">Sidebar<br>1x2</div>
                <div class="grid-item item-5">Side<br>1x2</div>
                <div class="grid-item item-6">Content<br>2x1</div>
                <div class="grid-item item-7">Footer<br>2x1</div>
            </div>
        </div>
        
        <!-- 6. Responsive Auto-Fit Layout -->
        <div class="layout-example">
            <h2>6. Responsive Auto-Fit Layout</h2>
            <p>Grid that automatically adjusts the number of columns based on screen size:</p>
            
            <div class="responsive-layout">
                <div class="responsive-item">
                    <h3>Auto-Responsive</h3>
                    <p>This layout automatically adjusts columns based on available space using auto-fit and minmax.</p>
                </div>
                <div class="responsive-item">
                    <h3>No Media Queries</h3>
                    <p>No media queries needed! CSS Grid handles the responsiveness automatically.</p>
                </div>
                <div class="responsive-item">
                    <h3>Flexible Design</h3>
                    <p>Items maintain minimum width but expand to fill available space efficiently.</p>
                </div>
                <div class="responsive-item">
                    <h3>Modern Approach</h3>
                    <p>This represents the future of responsive design with intelligent CSS.</p>
                </div>
            </div>
        </div>
        
        <!-- 7. Perfect Centering -->
        <div class="layout-example">
            <h2>7. Perfect Centering with Flexbox</h2>
            <p>The easiest way to center content both horizontally and vertically:</p>
            
            <div class="flex-center">
                <div class="centered-content">
                    <h3>Perfectly Centered</h3>
                    <p>Both horizontally and vertically centered content using Flexbox.</p>
                    <button class="btn btn-outline">Action Button</button>
                </div>
            </div>
        </div>
        
        <!-- Best Practices -->
        <div class="layout-example">
            <h2>📋 Layout Best Practices</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <div style="background: #d4edda; border: 1px solid #c3e6cb;     border-radius: 0; padding: 20px;">
                    <h3 style="color: #155724; margin-top: 0;">✅ Do This</h3>
                    <ul style="color: #155724;">
                        <li>Use semantic HTML elements</li>
                        <li>Mobile-first responsive design</li>
                        <li>Flexbox for one-dimensional layouts</li>
                        <li>CSS Grid for two-dimensional layouts</li>
                        <li>Test on real devices</li>
                        <li>Consider accessibility</li>
                    </ul>
                </div>
                
                <div style="background: #f8d7da; border: 1px solid #f5c6cb;     border-radius: 0; padding: 20px;">
                    <h3 style="color: #721c24; margin-top: 0;">❌ Avoid This</h3>
                    <ul style="color: #721c24;">
                        <li>Using tables for layout</li>
                        <li>Excessive use of floats</li>
                        <li>Fixed pixel widths</li>
                        <li>Inline styles for layout</li>
                        <li>Ignoring mobile users</li>
                        <li>Non-semantic div soup</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Layouts</title>
    <style>
        /* Add your layout styles here */
        
    </style>
</head>
<body>
    <!-- Practice creating layouts -->
    
    <!-- 1. Build a semantic HTML structure -->
    
    <!-- 2. Create a flexbox navigation -->
    
    <!-- 3. Design a card layout -->
    
    <!-- 4. Try a CSS Grid layout -->
    
    <!-- 5. Make it responsive -->
    
</body>
</html>`,
      language: "html",
      difficulty: "intermediate" as const,
      estimatedTime: "50 min",
    },
    {
      id: "html-responsive",
      title: "HTML Responsive Design",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Responsive Design</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Create websites that work beautifully on all devices. Learn responsive HTML techniques, viewport configuration, flexible layouts, and mobile-first design principles.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📱 Mobile-First Philosophy</h3>
          
          <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <div style="color: #2d3748;">
              <p><strong>Start small:</strong> Design for mobile devices first</p>
              <p><strong>Progressive enhancement:</strong> Add features for larger screens</p>
              <p><strong>Performance focus:</strong> Mobile users often have slower connections</p>
              <p style="margin: 0;"><strong>Touch-friendly:</strong> Consider finger navigation</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔧 Essential HTML Elements</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #2b6cb0; font-weight: 600; margin: 0 0 1rem 0;">📐 Viewport Meta Tag</h4>
              <div style="color: #2d3748;">
                <p>Controls how the page is displayed on mobile</p>
                <p style="margin: 0;">Essential for responsive behavior</p>
              </div>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #feebc8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #9c4221; font-weight: 600; margin: 0 0 1rem 0;">🖼️ Responsive Images</h4>
              <div style="color: #2d3748;">
                <p>Images that adapt to screen size</p>
                <p style="margin: 0;">Srcset, sizes, and picture elements</p>
              </div>
            </div>
            
            <div style="border: 2px solid #805ad5; background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #553c9a; font-weight: 600; margin: 0 0 1rem 0;">📊 Flexible Containers</h4>
              <div style="color: #2d3748;">
                <p>Containers that resize with viewport</p>
                <p style="margin: 0;">Flexbox and CSS Grid for layout</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📏 Breakpoints Strategy</h3>
          
          <div style="border-left: 4px solid #f56565; background: #fff5f5; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #c53030; line-height: 1.8;">
              <strong>Mobile:</strong> 320px - 768px (phones, small tablets)<br>
              <strong>Tablet:</strong> 768px - 1024px (tablets, small laptops)<br>
              <strong>Desktop:</strong> 1024px - 1440px (laptops, desktops)<br>
              <strong>Large:</strong> 1440px+ (large monitors, 4K displays)
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Content Strategy</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #234e52; line-height: 1.8;">
              <p><strong>Progressive disclosure:</strong> Show essential content first</p>
              <p><strong>Touch targets:</strong> Minimum 44px for finger taps</p>
              <p><strong>Readable text:</strong> 16px minimum font size</p>
              <p style="margin: 0;"><strong>Accessible navigation:</strong> Easy thumb reach zones</p>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">⚡ Performance Tips</h3>
          
          <div style="background: #fff5f5; border: 2px solid #f56565; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #c53030; margin: 0; line-height: 1.8;">
              <li><strong>Optimize images</strong> - Use appropriate formats and sizes</li>
              <li><strong>Lazy loading</strong> - Load content as needed</li>
              <li><strong>Minimize requests</strong> - Combine and compress resources</li>
              <li><strong>Critical CSS</strong> - Inline above-the-fold styles</li>
              <li><strong>Preload fonts</strong> - Prevent layout shifts</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- Essential viewport meta tag for responsive design -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>HTML Responsive Design Guide</title>
    
    <!-- Preload critical fonts -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* CSS Reset and Base Styles */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        html {
            font-size: 16px; /* Base font size for rem calculations */
            scroll-behavior: smooth;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
            overflow-x: hidden; /* Prevent horizontal scroll */
        }
        
        /* Container with max-width and responsive padding */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem;
            width: 100%;
        }
        
        /* Responsive Typography */
        h1 {
            font-size: clamp(1.75rem, 4vw, 3rem);
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        
        h2 {
            font-size: clamp(1.25rem, 3vw, 2rem);
            font-weight: 600;
            color: #2d3748;
            margin: 2rem 0 1rem 0;
            border-bottom: 3px solid #4299e1;
            padding-bottom: 0.5rem;
        }
        
        h3 {
            font-size: clamp(1.1rem, 2.5vw, 1.5rem);
            font-weight: 500;
            color: #4a5568;
            margin: 1.5rem 0 0.75rem 0;
        }
        
        p {
            font-size: clamp(0.9rem, 2vw, 1.1rem);
            margin-bottom: 1rem;
            max-width: 65ch; /* Optimal reading width */
        }
        
        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: clamp(2rem, 8vw, 6rem) 1rem;
            border-radius: 1rem;
            margin-bottom: 3rem;
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
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
            pointer-events: none;
        }
        
        .hero-content {
            position: relative;
            z-index: 1;
        }
        
        .hero h1 {
            color: white;
            margin-bottom: 1rem;
        }
        
        .hero p {
            font-size: clamp(1rem, 2.5vw, 1.25rem);
            opacity: 0.9;
            max-width: 50ch;
            margin: 0 auto;
        }
        
        /* Section Styles */
        .section {
            background: white;
            border-radius: 1rem;
            padding: clamp(1.5rem, 4vw, 3rem);
            margin: 2rem 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
        }
        
        /* Responsive Navigation */
        .navbar {
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
            margin-bottom: 2rem;
        }
        
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 4rem;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: #4299e1;
        }
        
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        
        .nav-menu a {
            color: #4a5568;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
            padding: 0.5rem 0;
        }
        
        .nav-menu a:hover {
            color: #4299e1;
        }
        
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #4a5568;
        }
        
        /* Responsive Grid */
        .responsive-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: clamp(1rem, 3vw, 2rem);
            margin: 2rem 0;
        }
        
        .grid-item {
            background: white;
            border-radius: 0.75rem;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border: 1px solid #e2e8f0;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .grid-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .grid-item h3 {
            color: #2d3748;
            margin-bottom: 1rem;
        }
        
        .grid-item p {
            color: #4a5568;
            font-size: 0.95rem;
        }
        
        /* Responsive Images */
        .image-container {
            width: 100%;
            margin: 2rem 0;
            border-radius: 0.75rem;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .responsive-image {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.3s ease;
        }
        
        .responsive-image:hover {
            transform: scale(1.02);
        }
        
        /* Picture element for art direction */
        .art-direction-example {
            margin: 2rem 0;
        }
        
        .art-direction-example picture {
            display: block;
            width: 100%;
            border-radius: 0.75rem;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .art-direction-example img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        /* Flexible Video Container */
        .video-container {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            margin: 2rem 0;
            border-radius: 0.75rem;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .video-container iframe,
        .video-container video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        
        /* Responsive Typography Scale */
        .typography-example {
            margin: 2rem 0;
        }
        
        .display-1 { font-size: clamp(2rem, 6vw, 4rem); font-weight: 700; }
        .display-2 { font-size: clamp(1.75rem, 5vw, 3.5rem); font-weight: 600; }
        .display-3 { font-size: clamp(1.5rem, 4vw, 3rem); font-weight: 500; }
        .lead { font-size: clamp(1.1rem, 2.5vw, 1.25rem); font-weight: 300; }
        .small { font-size: clamp(0.8rem, 1.5vw, 0.9rem); }
        
        /* Touch-Friendly Buttons */
        .btn {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            font-weight: 500;
            text-align: center;
            text-decoration: none;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            min-height: 44px; /* Touch target minimum */
            min-width: 44px;
            line-height: 1.2;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
            color: white;
        }
        
        .btn-primary:hover {
            background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
        }
        
        .btn-secondary {
            background: #e2e8f0;
            color: #4a5568;
        }
        
        .btn-secondary:hover {
            background: #cbd5e0;
            transform: translateY(-2px);
        }
        
        /* Button Group */
        .btn-group {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        
        /* Responsive Table */
        .table-container {
            width: 100%;
            overflow-x: auto;
            margin: 2rem 0;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .responsive-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            min-width: 600px; /* Minimum width before scrolling */
        }
        
        .responsive-table th,
        .responsive-table td {
            padding: 0.75rem 1rem;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .responsive-table th {
            background: #f7fafc;
            font-weight: 600;
            color: #2d3748;
        }
        
        .responsive-table tr:hover {
            background: #f7fafc;
        }
        
        /* Responsive Form */
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: #2d3748;
        }
        
        .form-control {
            width: 100%;
            padding: 0.75rem;
            font-size: 1rem;
            border: 1px solid #cbd5e0;
            border-radius: 0.5rem;
            transition: border-color 0.3s ease;
            min-height: 44px; /* Touch target */
        }
        
        .form-control:focus {
            outline: none;
            border-color: #4299e1;
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        /* Device-Specific Styles */
        
        /* Mobile Styles (default - mobile first) */
        @media (max-width: 767px) {
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                flex-direction: column;
                padding: 1rem;
                gap: 0;
            }
            
            .nav-menu.active {
                display: flex;
            }
            
            .nav-menu a {
                padding: 0.75rem 0;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .mobile-menu-btn {
                display: block;
            }
            
            .responsive-grid {
                grid-template-columns: 1fr;
            }
            
            .btn-group {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
                text-align: center;
            }
            
            .container {
                padding: 0.75rem;
            }
            
            .section {
                padding: 1.5rem;
            }
        }
        
        /* Tablet Styles */
        @media (min-width: 768px) and (max-width: 1023px) {
            .container {
                padding: 1.5rem;
            }
            
            .responsive-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .form-row {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .nav-menu {
                gap: 1.5rem;
            }
        }
        
        /* Desktop Styles */
        @media (min-width: 1024px) {
            .container {
                padding: 2rem;
            }
            
            .responsive-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            
            .form-row {
                grid-template-columns: repeat(3, 1fr);
            }
            
            .hero {
                padding: 6rem 2rem;
            }
        }
        
        /* Large Screen Styles */
        @media (min-width: 1440px) {
            .responsive-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        
        /* High DPI Displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            /* Styles for high-resolution displays */
            .hero::before {
                background-size: 50px 50px;
            }
        }
        
        /* Print Styles */
        @media print {
            .navbar,
            .mobile-menu-btn,
            .btn-group {
                display: none !important;
            }
            
            .hero {
                background: none !important;
                color: black !important;
            }
            
            .section {
                box-shadow: none !important;
                border: 1px solid #ccc !important;
            }
        }
        
        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #1a202c;
                color: #f7fafc;
            }
            
            .section {
                background: #2d3748;
                border-color: #4a5568;
            }
            
            .navbar {
                background: #2d3748;
            }
            
            .form-control {
                background: #4a5568;
                border-color: #718096;
                color: #f7fafc;
            }
        }
    </style>
</head>
<body>
    <!-- Responsive Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">ResponsiveHTML</div>
            <ul class="nav-menu" id="nav-menu">
                <li><a href="#basics">Basics</a></li>
                <li><a href="#images">Images</a></li>
                <li><a href="#layout">Layout</a></li>
                <li><a href="#typography">Typography</a></li>
                <li><a href="#forms">Forms</a></li>
            </ul>
            <button class="mobile-menu-btn" onclick="toggleMenu()">☰</button>
        </div>
    </nav>

    <div class="container">
        <!-- Hero Section -->
        <div class="hero">
            <div class="hero-content">
                <h1>HTML Responsive Design</h1>
                <p>Master the art of creating websites that work beautifully on every device, from smartphones to desktop computers.</p>
            </div>
        </div>

        <!-- Viewport Basics -->
        <section class="section" id="basics">
            <h2>📱 Viewport Configuration</h2>
            <p>The viewport meta tag is the foundation of responsive design:</p>
            
            <div style="background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1rem; font-family: monospace; margin: 1rem 0;">
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
            </div>
            
            <div class="responsive-grid">
                <div class="grid-item">
                    <h3>width=device-width</h3>
                    <p>Sets the width of the page to follow the screen-width of the device</p>
                </div>
                <div class="grid-item">
                    <h3>initial-scale=1.0</h3>
                    <p>Sets the initial zoom level when the page is first loaded</p>
                </div>
                <div class="grid-item">
                    <h3>user-scalable=yes</h3>
                    <p>Allows users to zoom in and out (accessibility friendly)</p>
                </div>
            </div>
        </section>

        <!-- Responsive Images -->
        <section class="section" id="images">
            <h2>🖼️ Responsive Images</h2>
            
            <h3>Basic Responsive Image</h3>
            <div class="image-container">
                <img src="https://picsum.photos/800/400?random=1" 
                     alt="Responsive image example" 
                     class="responsive-image"
                     loading="lazy">
            </div>
            
            <h3>Srcset for Different Resolutions</h3>
            <div class="image-container">
                <img src="https://picsum.photos/400/200?random=2" 
                     srcset="https://picsum.photos/400/200?random=2 400w,
                             https://picsum.photos/800/400?random=2 800w,
                             https://picsum.photos/1200/600?random=2 1200w"
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     alt="Srcset example"
                     class="responsive-image"
                     loading="lazy">
            </div>
            
            <h3>Picture Element for Art Direction</h3>
            <div class="art-direction-example">
                <picture>
                    <source media="(max-width: 767px)" 
                            srcset="https://picsum.photos/400/300?random=3">
                    <source media="(max-width: 1023px)" 
                            srcset="https://picsum.photos/600/300?random=3">
                    <img src="https://picsum.photos/800/400?random=3" 
                         alt="Art direction example">
                </picture>
            </div>
        </section>

        <!-- Layout Examples -->
        <section class="section" id="layout">
            <h2>📐 Responsive Layout</h2>
            
            <h3>Auto-Fit Grid</h3>
            <p>Grid that automatically adjusts columns based on available space:</p>
            
            <div class="responsive-grid">
                <div class="grid-item">
                    <h3>Flexible Columns</h3>
                    <p>This grid automatically adjusts the number of columns based on screen size.</p>
                </div>
                <div class="grid-item">
                    <h3>Minimum Width</h3>
                    <p>Each column maintains a minimum width of 280px before wrapping.</p>
                </div>
                <div class="grid-item">
                    <h3>Equal Heights</h3>
                    <p>All grid items automatically have equal heights.</p>
                </div>
                <div class="grid-item">
                    <h3>Responsive Gap</h3>
                    <p>The gap between items scales with the viewport using clamp().</p>
                </div>
                <div class="grid-item">
                    <h3>No Media Queries</h3>
                    <p>This layout works without any media queries needed!</p>
                </div>
                <div class="grid-item">
                    <h3>Future Proof</h3>
                    <p>Works on any screen size, including new devices.</p>
                </div>
            </div>
        </section>

        <!-- Typography -->
        <section class="section" id="typography">
            <h2>📝 Responsive Typography</h2>
            
            <div class="typography-example">
                <h1 class="display-1">Display 1 Heading</h1>
                <h2 class="display-2">Display 2 Heading</h2>
                <h3 class="display-3">Display 3 Heading</h3>
                <p class="lead">This is a lead paragraph that scales smoothly with the viewport size using the clamp() function.</p>
                <p>Regular paragraph text that maintains optimal readability across all devices. The font size scales appropriately.</p>
                <p class="small">Small text for captions and fine print.</p>
            </div>
            
            <h3>Typography Best Practices</h3>
            <div class="responsive-grid">
                <div class="grid-item">
                    <h3>Minimum 16px</h3>
                    <p>Never go below 16px font size on mobile to prevent zoom on iOS Safari.</p>
                </div>
                <div class="grid-item">
                    <h3>Optimal Line Length</h3>
                    <p>Keep lines between 45-75 characters (use max-width: 65ch).</p>
                </div>
                <div class="grid-item">
                    <h3>Line Height</h3>
                    <p>Use 1.4-1.6 line height for optimal readability on all screens.</p>
                </div>
            </div>
        </section>

        <!-- Responsive Video -->
        <section class="section">
            <h2>🎥 Responsive Video</h2>
            <p>Videos that maintain aspect ratio across all devices:</p>
            
            <div class="video-container">
                <iframe src="data:text/html;charset=utf-8,%3Chtml%3E%3Chead%3E%3Cstyle%3Ebody%7Bmargin:0;background:linear-gradient(135deg,%23667eea%200%25,%23764ba2%20100%25);display:flex;align-items:center;justify-content:center;color:white;font-family:Arial,sans-serif;%7D%3C/style%3E%3C/head%3E%3Cbody%3E%3Ch2%3E%F0%9F%8E%AC%20Responsive%20Video%20Container%3C/h2%3E%3Cp%3E16:9%20Aspect%20Ratio%20Maintained%3C/p%3E%3C/body%3E%3C/html%3E"
                        title="Responsive video example"></iframe>
            </div>
        </section>

        <!-- Responsive Forms -->
        <section class="section" id="forms">
            <h2>📋 Responsive Forms</h2>
            <p>Forms that work great on touch devices:</p>
            
            <form>
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" class="form-control" rows="4" style="resize: vertical;"></textarea>
                </div>
                
                <div class="btn-group">
                    <button type="submit" class="btn btn-primary">Send Message</button>
                    <button type="reset" class="btn btn-secondary">Reset Form</button>
                </div>
            </form>
        </section>

        <!-- Responsive Table -->
        <section class="section">
            <h2>📊 Responsive Table</h2>
            <p>Tables that scroll horizontally on small screens:</p>
            
            <div class="table-container">
                <table class="responsive-table">
                    <thead>
                        <tr>
                            <th>Device</th>
                            <th>Screen Size</th>
                            <th>Breakpoint</th>
                            <th>Layout Changes</th>
                            <th>Typography</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mobile</td>
                            <td>320px - 767px</td>
                            <td>Default (Mobile First)</td>
                            <td>Single column, stacked navigation</td>
                            <td>Larger touch targets</td>
                        </tr>
                        <tr>
                            <td>Tablet</td>
                            <td>768px - 1023px</td>
                            <td>@media (min-width: 768px)</td>
                            <td>Two columns, horizontal nav</td>
                            <td>Increased font sizes</td>
                        </tr>
                        <tr>
                            <td>Desktop</td>
                            <td>1024px - 1439px</td>
                            <td>@media (min-width: 1024px)</td>
                            <td>Multi-column layouts</td>
                            <td>Optimal reading sizes</td>
                        </tr>
                        <tr>
                            <td>Large</td>
                            <td>1440px+</td>
                            <td>@media (min-width: 1440px)</td>
                            <td>Maximum content width</td>
                            <td>Enhanced typography</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Performance Tips -->
        <section class="section">
            <h2>⚡ Performance Optimization</h2>
            
            <div class="responsive-grid">
                <div class="grid-item">
                    <h3>Image Optimization</h3>
                    <p>Use WebP format, appropriate sizes, and lazy loading for better performance.</p>
                </div>
                <div class="grid-item">
                    <h3>Critical CSS</h3>
                    <p>Inline above-the-fold styles to prevent render blocking.</p>
                </div>
                <div class="grid-item">
                    <h3>Font Loading</h3>
                    <p>Preload critical fonts and use font-display: swap for better perceived performance.</p>
                </div>
                <div class="grid-item">
                    <h3>Resource Hints</h3>
                    <p>Use preconnect for external domains and prefetch for likely navigation.</p>
                </div>
            </div>
        </section>

        <!-- Testing Tools -->
        <section class="section">
            <h2>🔧 Testing Your Responsive Design</h2>
            
            <div class="responsive-grid">
                <div class="grid-item">
                    <h3>Browser DevTools</h3>
                    <p>Use responsive mode in Chrome, Firefox, or Safari DevTools.</p>
                </div>
                <div class="grid-item">
                    <h3>Real Devices</h3>
                    <p>Test on actual phones, tablets, and different screen sizes.</p>
                </div>
                <div class="grid-item">
                    <h3>Online Tools</h3>
                    <p>Use tools like BrowserStack or ResponsiveDesignChecker.com.</p>
                </div>
                <div class="grid-item">
                    <h3>Accessibility Testing</h3>
                    <p>Test with screen readers and keyboard navigation.</p>
                </div>
            </div>
        </section>
    </div>

    <script>
        // Mobile menu toggle
        function toggleMenu() {
            const navMenu = document.getElementById('nav-menu');
            navMenu.classList.toggle('active');
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('nav-menu').classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const navMenu = document.getElementById('nav-menu');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all grid items for scroll animations
        document.querySelectorAll('.grid-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    </script>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice Responsive Design</title>
    <style>
        /* Add your responsive styles here */
        
        /* Mobile-first approach */
        
        /* Tablet styles */
        @media (min-width: 768px) {
            
        }
        
        /* Desktop styles */
        @media (min-width: 1024px) {
            
        }
    </style>
</head>
<body>
    <!-- Practice responsive design -->
    
    <!-- 1. Create a responsive navigation -->
    
    <!-- 2. Build responsive grid layouts -->
    
    <!-- 3. Add responsive images -->
    
    <!-- 4. Make responsive typography -->
    
    <!-- 5. Test on different screen sizes -->
    
</body>
</html>`,
      language: "html",
      difficulty: "intermediate" as const,
      estimatedTime: "45 min",
    },
    {
      id: "html-semantics",
      title: "HTML Semantics",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Semantics</h2>
          
          <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: white; padding: 1.5rem;     border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Write meaningful HTML that communicates structure and purpose. Learn semantic elements, accessibility benefits, SEO improvements, and best practices for modern web development.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Why Semantics Matter</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #2b6cb0; font-weight: 600; margin: 0 0 1rem 0;">🔍 SEO Benefits</h4>
              <div style="color: #2d3748;">
                <p>Search engines understand content better</p>
                <p>Improved rankings and featured snippets</p>
                <p style="margin: 0;">Better content categorization</p>
              </div>
            </div>
            
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">♿ Accessibility</h4>
              <div style="color: #2d3748;">
                <p>Screen readers navigate content easily</p>
                <p>Keyboard navigation improvements</p>
                <p style="margin: 0;">Better user experience for all</p>
              </div>
            </div>
            
            <div style="border: 2px solid #805ad5; background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #553c9a; font-weight: 600; margin: 0 0 1rem 0;">🛠️ Developer Experience</h4>
              <div style="color: #2d3748;">
                <p>Code is more readable and maintainable</p>
                <p>Easier debugging and updates</p>
                <p style="margin: 0;">Better team collaboration</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🏗️ Document Structure</h3>
          
          <div style="border-left: 4px solid #4299e1; background: #ebf8ff; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #2b6cb0; line-height: 1.8;">
              <strong>&lt;header&gt;</strong> - Site or section header content<br>
              <strong>&lt;nav&gt;</strong> - Navigation links and menus<br>
              <strong>&lt;main&gt;</strong> - Primary content of the page<br>
              <strong>&lt;article&gt;</strong> - Standalone, distributable content<br>
              <strong>&lt;section&gt;</strong> - Thematic grouping of content<br>
              <strong>&lt;aside&gt;</strong> - Sidebar or supplementary content<br>
              <strong>&lt;footer&gt;</strong> - Site or section footer content
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📝 Content Elements</h3>
          
          <div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
            <div style="border: 1px solid #e2e8f0; background: #f7fafc; padding: 1rem;     border-radius: 0;">
              <strong style="color: #2d3748;">&lt;h1&gt; - &lt;h6&gt;</strong>
              <span style="color: #4a5568; margin-left: 1rem;">Hierarchical headings (only one h1 per page)</span>
            </div>
            
            <div style="border: 1px solid #e2e8f0; background: #f7fafc; padding: 1rem;     border-radius: 0;">
              <strong style="color: #2d3748;">&lt;p&gt;</strong>
              <span style="color: #4a5568; margin-left: 1rem;">Paragraphs of text content</span>
            </div>
            
            <div style="border: 1px solid #e2e8f0; background: #f7fafc; padding: 1rem;     border-radius: 0;">
              <strong style="color: #2d3748;">&lt;blockquote&gt;</strong>
              <span style="color: #4a5568; margin-left: 1rem;">Extended quotations from external sources</span>
            </div>
            
            <div style="border: 1px solid #e2e8f0; background: #f7fafc; padding: 1rem;     border-radius: 0;">
              <strong style="color: #2d3748;">&lt;figure&gt; / &lt;figcaption&gt;</strong>
              <span style="color: #4a5568; margin-left: 1rem;">Images, diagrams, code with captions</span>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📋 List Elements</h3>
          
          <div style="background: #fff5f5; border: 2px solid #f56565; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #c53030; line-height: 1.8;">
              <strong>&lt;ol&gt;</strong> - Ordered lists (numbered sequence matters)<br>
              <strong>&lt;ul&gt;</strong> - Unordered lists (bullet points)<br>
              <strong>&lt;dl&gt;</strong> - Description lists (term-definition pairs)<br>
              <strong>&lt;dt&gt;</strong> - Description term<br>
              <strong>&lt;dd&gt;</strong> - Description definition
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔗 Interactive Elements</h3>
          
          <div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
            <div style="border: 1px solid #ed8936; background: #fffaf0; padding: 1rem;     border-radius: 0;">
              <strong style="color: #9c4221;">&lt;a&gt;</strong>
              <span style="color: #744210; margin-left: 1rem;">Links to other pages or sections</span>
            </div>
            
            <div style="border: 1px solid #ed8936; background: #fffaf0; padding: 1rem;     border-radius: 0;">
              <strong style="color: #9c4221;">&lt;button&gt;</strong>
              <span style="color: #744210; margin-left: 1rem;">Interactive buttons for actions</span>
            </div>
            
            <div style="border: 1px solid #ed8936; background: #fffaf0; padding: 1rem;     border-radius: 0;">
              <strong style="color: #9c4221;">&lt;details&gt; / &lt;summary&gt;</strong>
              <span style="color: #744210; margin-left: 1rem;">Collapsible content sections</span>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎨 Inline Semantics</h3>
          
          <div style="background: #e6fffa; border: 2px solid #38b2ac; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #234e52; line-height: 1.8;">
              <strong>&lt;strong&gt;</strong> - Strong importance (not just bold)<br>
              <strong>&lt;em&gt;</strong> - Emphasized text (not just italic)<br>
              <strong>&lt;mark&gt;</strong> - Highlighted/marked text<br>
              <strong>&lt;abbr&gt;</strong> - Abbreviations with title attribute<br>
              <strong>&lt;time&gt;</strong> - Dates and times with datetime attribute<br>
              <strong>&lt;code&gt;</strong> - Inline code snippets<br>
              <strong>&lt;kbd&gt;</strong> - Keyboard input<br>
              <strong>&lt;samp&gt;</strong> - Sample output
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🏷️ ARIA and Accessibility</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #805ad5; background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #553c9a; font-weight: 600; margin: 0 0 1rem 0;">Essential ARIA Attributes</h4>
              <div style="color: #2d3748;">
                <p><strong>aria-label:</strong> Accessible name for elements</p>
                <p><strong>aria-describedby:</strong> Additional description</p>
                <p><strong>role:</strong> Element's purpose or function</p>
                <p style="margin: 0;"><strong>aria-hidden:</strong> Hide decorative elements</p>
              </div>
            </div>
            
            <div style="border: 2px solid #f56565; background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); padding: 1.5rem;     border-radius: 0;">
              <h4 style="color: #fff; font-weight: 600; margin: 0 0 1rem 0;">Skip Links & Landmarks</h4>
              <div style="color: #2d3748;">
                <p>Provide skip links for keyboard navigation</p>
                <p>Use landmarks (main, nav, aside) correctly</p>
                <p style="margin: 0;">Ensure logical heading hierarchy</p>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">✅ Best Practices</h3>
          
          <div style="background: #f0fff4; border: 2px solid #48bb78; padding: 1.5rem;     border-radius: 0;">
            <ul style="color: #276749; margin: 0; line-height: 1.8;">
              <li><strong>Use appropriate heading hierarchy</strong> - Don't skip levels</li>
              <li><strong>One main per page</strong> - Only one &lt;main&gt; element</li>
              <li><strong>Meaningful link text</strong> - Avoid "click here" or "read more"</li>
              <li><strong>Alt text for images</strong> - Describe function, not appearance</li>
              <li><strong>Form labels</strong> - Always associate labels with inputs</li>
              <li><strong>Language attributes</strong> - Set lang on html element</li>
            </ul>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🚫 Common Mistakes</h3>
          
          <div style="background: #fff5f5; border: 2px solid #f56565; padding: 1.5rem;     border-radius: 0;">
            <div style="color: #c53030; line-height: 1.8;">
              <p><strong>❌ Using divs for everything</strong> - Choose semantic elements first</p>
              <p><strong>❌ Multiple h1 elements</strong> - One h1 per page for better SEO</p>
              <p><strong>❌ Skipping heading levels</strong> - h1 → h3 breaks screen reader navigation</p>
              <p><strong>❌ Empty alt attributes</strong> - Use alt="" only for decorative images</p>
              <p style="margin: 0;"><strong>❌ Non-descriptive links</strong> - "Click here" doesn't help anyone</p>
            </div>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Semantics Guide - Modern Web Development</title>
    <style>
        /* Base Styles */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        /* Skip Link for Accessibility */
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
          border-radius: 0;        }
        
        .skip-link:focus {
            top: 6px;
        }
        
        /* Header Styles */
        .site-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem 0;
            margin-bottom: 2rem;
        }
        
        .site-header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            text-align: center;
        }
        
        .site-header p {
            font-size: 1.1rem;
            text-align: center;
            opacity: 0.9;
        }
        
        /* Navigation Styles */
        .main-nav {
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
            margin-bottom: 2rem;
        }
        
        .nav-list {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 2rem;
            list-style: none;
            padding: 1rem 0;
        }
        
        .nav-list a {
            color: #4a5568;
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 1rem;
          border-radius: 0;            transition: all 0.3s ease;
        }
        
        .nav-list a:hover,
        .nav-list a:focus {
            background: #4299e1;
            color: white;
            outline: none;
        }
        
        /* Main Content Styles */
        .main-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        @media (min-width: 1024px) {
            .main-content {
                grid-template-columns: 2fr 1fr;
            }
        }
        
        /* Article Styles */
        .article {
            background: white;
          border-radius: 0;            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
        }
        
        .article-header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .article-title {
            font-size: 2rem;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 0.5rem;
        }
        
        .article-meta {
            display: flex;
            gap: 1rem;
            color: #718096;
            font-size: 0.9rem;
            align-items: center;
        }
        
        .article-meta time {
            font-weight: 500;
        }
        
        .article-content h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2d3748;
            margin: 2rem 0 1rem 0;
            padding-left: 1rem;
            border-left: 4px solid #4299e1;
        }
        
        .article-content h3 {
            font-size: 1.25rem;
            font-weight: 500;
            color: #4a5568;
            margin: 1.5rem 0 0.75rem 0;
        }
        
        .article-content p {
            margin-bottom: 1rem;
            color: #4a5568;
        }
        
        /* Semantic Elements Examples */
        .semantic-examples {
            display: grid;
            gap: 1.5rem;
            margin: 2rem 0;
        }
        
        .example-card {
            border: 2px solid #e2e8f0;
          border-radius: 0;            padding: 1.5rem;
            background: #f7fafc;
            transition: all 0.3s ease;
        }
        
        .example-card:hover {
            border-color: #4299e1;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(66, 153, 225, 0.15);
        }
        
        .example-card h3 {
            color: #2d3748;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .example-card code {
            background: #2d3748;
            color: #e2e8f0;
            padding: 0.25rem 0.5rem;
          border-radius: 0;            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
        }
        
        /* Blockquote Styles */
        .featured-quote {
            border-left: 4px solid #48bb78;
            background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%);
            padding: 1.5rem;
            margin: 2rem 0;
          border-radius: 0;            font-style: italic;
            position: relative;
        }
        
        .featured-quote::before {
            content: '"';
            font-size: 4rem;
            color: #48bb78;
            position: absolute;
            top: -10px;
            left: 10px;
            font-family: Georgia, serif;
        }
        
        .featured-quote p {
            font-size: 1.1rem;
            color: #2d3748;
            margin: 0;
            padding-left: 2rem;
        }
        
        .featured-quote cite {
            display: block;
            text-align: right;
            margin-top: 1rem;
            font-style: normal;
            font-weight: 500;
            color: #4a5568;
        }
        
        /* Figure Styles */
        .content-figure {
            margin: 2rem 0;
            text-align: center;
        }
        
        .content-figure img {
            max-width: 100%;
            height: auto;
          border-radius: 0;            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .content-figure figcaption {
            margin-top: 0.5rem;
            font-style: italic;
            color: #718096;
            font-size: 0.9rem;
        }
        
        /* List Styles */
        .semantic-list {
            background: white;
            border: 1px solid #e2e8f0;
          border-radius: 0;            padding: 1.5rem;
            margin: 1rem 0;
        }
        
        .semantic-list h3 {
            margin-bottom: 1rem;
            color: #2d3748;
        }
        
        .semantic-list ul,
        .semantic-list ol {
            margin-left: 1.5rem;
        }
        
        .semantic-list li {
            margin-bottom: 0.5rem;
            color: #4a5568;
        }
        
        .semantic-list li strong {
            color: #2d3748;
        }
        
        /* Description List Styles */
        .definition-list {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
          border-radius: 0;            padding: 1.5rem;
            margin: 1rem 0;
        }
        
        .definition-list dt {
            font-weight: 600;
            color: #2d3748;
            margin-top: 1rem;
        }
        
        .definition-list dt:first-child {
            margin-top: 0;
        }
        
        .definition-list dd {
            margin-left: 1rem;
            margin-bottom: 0.5rem;
            color: #4a5568;
        }
        
        /* Details/Summary Styles */
        .collapsible-content {
            border: 1px solid #e2e8f0;
          border-radius: 0;            margin: 1rem 0;
            overflow: hidden;
        }
        
        .collapsible-content summary {
            background: #f7fafc;
            padding: 1rem;
            cursor: pointer;
            font-weight: 500;
            color: #2d3748;
            border-bottom: 1px solid #e2e8f0;
            list-style: none;
            position: relative;
        }
        
        .collapsible-content summary::-webkit-details-marker {
            display: none;
        }
        
        .collapsible-content summary::after {
            content: '+';
            position: absolute;
            right: 1rem;
            font-size: 1.2rem;
            transition: transform 0.3s ease;
        }
        
        .collapsible-content[open] summary::after {
            transform: rotate(45deg);
        }
        
        .collapsible-content summary:hover {
            background: #edf2f7;
        }
        
        .collapsible-content-body {
            padding: 1rem;
            background: white;
        }
        
        /* Inline Semantic Elements */
        .inline-examples {
            background: #fff5f5;
            border: 1px solid #fed7d7;
          border-radius: 0;            padding: 1.5rem;
            margin: 1rem 0;
        }
        
        .inline-examples strong {
            color: #c53030;
            font-weight: 600;
        }
        
        .inline-examples em {
            color: #d69e2e;
            font-style: italic;
        }
        
        .inline-examples mark {
            background: #fefcbf;
            padding: 0.125rem 0.25rem;
            border-radius: 2px;
        }
        
        .inline-examples code {
            background: #2d3748;
            color: #e2e8f0;
            padding: 0.125rem 0.25rem;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        
        .inline-examples kbd {
            background: #4a5568;
            color: white;
            padding: 0.125rem 0.375rem;
            border-radius: 3px;
            font-family: monospace;
            font-size: 0.9em;
            border: 1px solid #2d3748;
        }
        
        .inline-examples abbr {
            border-bottom: 1px dotted #4a5568;
            cursor: help;
        }
        
        /* Sidebar Styles */
        .sidebar {
            background: white;
          border-radius: 0;            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
            height: fit-content;
            position: sticky;
            top: 100px;
        }
        
        .sidebar h2 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 1rem;
            border-bottom: 2px solid #4299e1;
            padding-bottom: 0.5rem;
        }
        
        .sidebar-section {
            margin-bottom: 1.5rem;
        }
        
        .sidebar-section h3 {
            font-size: 1rem;
            font-weight: 500;
            color: #4a5568;
            margin-bottom: 0.5rem;
        }
        
        .sidebar-section ul {
            list-style: none;
        }
        
        .sidebar-section li {
            margin-bottom: 0.25rem;
        }
        
        .sidebar-section a {
            color: #4299e1;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s ease;
        }
        
        .sidebar-section a:hover {
            color: #2b6cb0;
            text-decoration: underline;
        }
        
        /* Footer Styles */
        .site-footer {
            background: #2d3748;
            color: #e2e8f0;
            padding: 3rem 0 1rem 0;
            margin-top: 3rem;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .footer-section h3 {
            color: white;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        
        .footer-section ul {
            list-style: none;
        }
        
        .footer-section li {
            margin-bottom: 0.5rem;
        }
        
        .footer-section a {
            color: #cbd5e0;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .footer-section a:hover {
            color: white;
        }
        
        .footer-bottom {
            border-top: 1px solid #4a5568;
            padding-top: 1rem;
            text-align: center;
            color: #a0aec0;
            font-size: 0.9rem;
        }
        
        /* Accessibility Enhancements */
        .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        
        /* Focus Styles */
        *:focus {
            outline: 2px solid #4299e1;
            outline-offset: 2px;
        }
        
        /* Button Styles */
        .action-button {
            background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
          border-radius: 0;            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
        }
        
        .action-button:hover {
            background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .site-header h1 {
                font-size: 2rem;
            }
            
            .nav-list {
                flex-direction: column;
                gap: 0;
            }
            
            .nav-list a {
                display: block;
                text-align: center;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .article {
                padding: 1rem;
            }
            
            .sidebar {
                order: -1;
            }
        }
    </style>
</head>
<body>
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- Site Header -->
    <header class="site-header">
        <div class="container">
            <h1>HTML Semantics Guide</h1>
            <p>Master the art of meaningful HTML for better accessibility, SEO, and maintainability</p>
        </div>
    </header>

    <!-- Main Navigation -->
    <nav class="main-nav" aria-label="Main navigation">
        <div class="container">
            <ul class="nav-list">
                <li><a href="#structure">Document Structure</a></li>
                <li><a href="#content">Content Elements</a></li>
                <li><a href="#lists">Lists</a></li>
                <li><a href="#interactive">Interactive</a></li>
                <li><a href="#inline">Inline Semantics</a></li>
                <li><a href="#accessibility">Accessibility</a></li>
            </ul>
        </div>
    </nav>

    <div class="container">
        <!-- Main Content Area -->
        <div class="main-content">
            <!-- Primary Content -->
            <main id="main-content" class="main-area">
                <!-- Introduction Article -->
                <article class="article">
                    <header class="article-header">
                        <h1 class="article-title">Understanding HTML Semantics</h1>
                        <div class="article-meta">
                            <span>By <strong>Web Standards Team</strong></span>
                            <time datetime="2024-01-15">January 15, 2024</time>
                            <span>8 min read</span>
                        </div>
                    </header>

                    <div class="article-content">
                        <p>HTML semantics refers to the meaning and purpose of HTML elements, not just their appearance. When we write semantic HTML, we're creating a document structure that conveys meaning to browsers, search engines, screen readers, and other tools.</p>

                        <blockquote class="featured-quote">
                            <p>The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect.</p>
                            <cite>— Tim Berners-Lee, W3C Director and inventor of the World Wide Web</cite>
                        </blockquote>

                        <h2 id="structure">Document Structure Elements</h2>
                        
                        <p>Modern HTML5 provides semantic elements that clearly define the different parts of a web page:</p>

                        <div class="semantic-examples">
                            <div class="example-card">
                                <h3><code>&lt;header&gt;</code> - Page or Section Header</h3>
                                <p>Contains introductory content, logos, navigation, or headings. Can be used multiple times in a document for different sections.</p>
                            </div>

                            <div class="example-card">
                                <h3><code>&lt;nav&gt;</code> - Navigation Links</h3>
                                <p>Represents navigation links, whether within the current document or to other documents. Not all links need to be in a nav element.</p>
                            </div>

                            <div class="example-card">
                                <h3><code>&lt;main&gt;</code> - Primary Content</h3>
                                <p>Represents the dominant content of the body. There should be only one main element per page, and it shouldn't be contained within article, aside, footer, header, or nav elements.</p>
                            </div>

                            <div class="example-card">
                                <h3><code>&lt;article&gt;</code> - Standalone Content</h3>
                                <p>Represents a complete, self-contained piece of content that could be distributed independently, such as blog posts, news articles, or forum posts.</p>
                            </div>

                            <div class="example-card">
                                <h3><code>&lt;section&gt;</code> - Thematic Grouping</h3>
                                <p>Represents a thematic grouping of content with a heading. If you can't give a section a meaningful heading, consider using a div instead.</p>
                            </div>

                            <div class="example-card">
                                <h3><code>&lt;aside&gt;</code> - Sidebar Content</h3>
                                <p>Represents content that is tangentially related to the main content, such as sidebars, call-out boxes, or advertisements.</p>
                            </div>

                            <div class="example-card">
                                <h3><code>&lt;footer&gt;</code> - Section or Page Footer</h3>
                                <p>Contains footer information for its nearest sectioning element or the entire page. Usually includes copyright, contact info, or related links.</p>
                            </div>
                        </div>

                        <h2 id="content">Content Elements</h2>

                        <p>Semantic HTML provides specific elements for different types of content:</p>

                        <figure class="content-figure">
                            <img src="https://picsum.photos/600/300?random=semantic" 
                                 alt="Diagram showing HTML semantic element hierarchy" 
                                 loading="lazy">
                            <figcaption>Visual representation of HTML semantic element relationships</figcaption>
                        </figure>

                        <h3>Headings Hierarchy</h3>
                        <div class="semantic-list">
                            <p>Proper heading structure is crucial for accessibility and SEO:</p>
                            <ul>
                                <li><strong>h1:</strong> Main page title (only one per page)</li>
                                <li><strong>h2:</strong> Major section headings</li>
                                <li><strong>h3-h6:</strong> Subsection headings in order</li>
                            </ul>
                        </div>

                        <h3>Text Content Elements</h3>
                        <div class="definition-list">
                            <dl>
                                <dt>&lt;p&gt; - Paragraph</dt>
                                <dd>Represents a paragraph of text. The most common text container.</dd>
                                
                                <dt>&lt;blockquote&gt; - Extended Quotation</dt>
                                <dd>Indicates that the enclosed text is an extended quotation from another source.</dd>
                                
                                <dt>&lt;pre&gt; - Preformatted Text</dt>
                                <dd>Represents preformatted text with preserved whitespace and line breaks.</dd>
                                
                                <dt>&lt;address&gt; - Contact Information</dt>
                                <dd>Provides contact information for a person, people, or organization.</dd>
                            </dl>
                        </div>

                        <h2 id="lists">List Elements</h2>

                        <p>HTML provides different list types for different purposes:</p>

                        <div class="semantic-list">
                            <h3>Ordered List (sequence matters)</h3>
                            <ol>
                                <li><strong>Plan your content structure</strong></li>
                                <li><strong>Choose appropriate semantic elements</strong></li>
                                <li><strong>Write meaningful headings</strong></li>
                                <li><strong>Add proper ARIA labels where needed</strong></li>
                                <li><strong>Test with screen readers</strong></li>
                            </ol>
                        </div>

                        <div class="semantic-list">
                            <h3>Unordered List (no specific order)</h3>
                            <ul>
                                <li><strong>Better SEO rankings</strong></li>
                                <li><strong>Improved accessibility</strong></li>
                                <li><strong>Easier maintenance</strong></li>
                                <li><strong>Better browser compatibility</strong></li>
                                <li><strong>Future-proof code</strong></li>
                            </ul>
                        </div>

                        <div class="definition-list">
                            <h3>Description List (term-definition pairs)</h3>
                            <dl>
                                <dt>Semantic HTML</dt>
                                <dd>HTML that conveys meaning about the content, not just its presentation</dd>
                                
                                <dt>Accessibility</dt>
                                <dd>The practice of making websites usable by people with disabilities</dd>
                                
                                <dt>Screen Reader</dt>
                                <dd>Assistive technology that reads web content aloud for users with visual impairments</dd>
                                
                                <dt>ARIA</dt>
                                <dd>Accessible Rich Internet Applications - attributes that enhance semantic meaning</dd>
                            </dl>
                        </div>

                        <h2 id="interactive">Interactive Elements</h2>

                        <p>HTML provides semantic elements for user interaction:</p>

                        <details class="collapsible-content">
                            <summary>Click to expand: Button vs Link Guidelines</summary>
                            <div class="collapsible-content-body">
                                <p><strong>Use buttons for:</strong></p>
                                <ul>
                                    <li>Submitting forms</li>
                                    <li>Opening modals or dialogs</li>
                                    <li>Triggering JavaScript actions</li>
                                    <li>Any action that doesn't navigate to a new page</li>
                                </ul>
                                
                                <p><strong>Use links for:</strong></p>
                                <ul>
                                    <li>Navigation to other pages</li>
                                    <li>Jumping to sections within a page</li>
                                    <li>Downloading files</li>
                                    <li>External resources</li>
                                </ul>
                                
                                <button class="action-button" type="button">Example Button</button>
                            </div>
                        </details>

                        <details class="collapsible-content">
                            <summary>Advanced Interactive Elements</summary>
                            <div class="collapsible-content-body">
                                <p>HTML5 introduced several interactive elements:</p>
                                <ul>
                                    <li><strong>&lt;details&gt; / &lt;summary&gt;:</strong> Native collapsible content</li>
                                    <li><strong>&lt;dialog&gt;:</strong> Modal dialogs and popups</li>
                                    <li><strong>&lt;progress&gt;:</strong> Progress indicators</li>
                                    <li><strong>&lt;meter&gt;:</strong> Scalar measurements within a range</li>
                                </ul>
                            </div>
                        </details>

                        <h2 id="inline">Inline Semantic Elements</h2>

                        <div class="inline-examples">
                            <p>Inline semantic elements add meaning to specific words or phrases:</p>
                            
                            <p><strong>Important content</strong> should use the strong element, while <em>emphasized text</em> uses the em element. You can <mark>highlight important information</mark> with the mark element.</p>
                            
                            <p>Code snippets like <code>document.querySelector()</code> should use the code element. When showing keyboard instructions, use <kbd>Ctrl</kbd> + <kbd>C</kbd> for copy.</p>
                            
                            <p>Abbreviations like <abbr title="HyperText Markup Language">HTML</abbr> should include the full form in the title attribute.</p>
                            
                            <p>Time-sensitive content should use the time element: <time datetime="2024-01-15T10:30:00Z">January 15, 2024 at 10:30 AM UTC</time>.</p>
                        </div>

                        <h2 id="accessibility">Accessibility Considerations</h2>

                        <p>Semantic HTML is the foundation of web accessibility. Here are key practices:</p>

                        <div class="semantic-examples">
                            <div class="example-card">
                                <h3>🏷️ Proper Labeling</h3>
                                <p>Every form control should have an associated label. Use explicit labels with the for attribute or implicit labels by wrapping the input.</p>
                            </div>

                            <div class="example-card">
                                <h3>🔗 Meaningful Link Text</h3>
                                <p>Link text should describe the destination or purpose. Avoid generic phrases like "click here" or "read more."</p>
                            </div>

                            <div class="example-card">
                                <h3>🖼️ Alternative Text</h3>
                                <p>All images should have alt attributes. Use empty alt="" for decorative images, descriptive text for informative images.</p>
                            </div>

                            <div class="example-card">
                                <h3>🎯 Focus Management</h3>
                                <p>Ensure all interactive elements are keyboard accessible and have visible focus indicators.</p>
                            </div>
                        </div>

                        <details class="collapsible-content">
                            <summary>ARIA Best Practices</summary>
                            <div class="collapsible-content-body">
                                <p>ARIA (Accessible Rich Internet Applications) attributes enhance semantic meaning:</p>
                                
                                <div class="definition-list">
                                    <dl>
                                        <dt>aria-label</dt>
                                        <dd>Provides an accessible name when the visible text isn't sufficient</dd>
                                        
                                        <dt>aria-describedby</dt>
                                        <dd>References elements that provide additional description</dd>
                                        
                                        <dt>aria-expanded</dt>
                                        <dd>Indicates if a collapsible element is expanded</dd>
                                        
                                        <dt>aria-hidden</dt>
                                        <dd>Hides decorative elements from screen readers</dd>
                                        
                                        <dt>role</dt>
                                        <dd>Defines what an element is or does when semantic HTML isn't enough</dd>
                                    </dl>
                                </div>
                                
                                <p><strong>Remember:</strong> Use ARIA to enhance semantic HTML, not replace it. Always prefer semantic HTML elements when available.</p>
                            </div>
                        </details>
                    </div>
                </article>
            </main>

            <!-- Sidebar -->
            <aside class="sidebar" aria-label="Related resources">
                <h2>Quick Reference</h2>
                
                <div class="sidebar-section">
                    <h3>Structure Elements</h3>
                    <ul>
                        <li><a href="#structure">header, nav, main</a></li>
                        <li><a href="#structure">article, section, aside</a></li>
                        <li><a href="#structure">footer</a></li>
                    </ul>
                </div>
                
                <div class="sidebar-section">
                    <h3>Content Elements</h3>
                    <ul>
                        <li><a href="#content">Headings (h1-h6)</a></li>
                        <li><a href="#content">Paragraphs and blockquotes</a></li>
                        <li><a href="#content">Figure and figcaption</a></li>
                    </ul>
                </div>
                
                <div class="sidebar-section">
                    <h3>Interactive Elements</h3>
                    <ul>
                        <li><a href="#interactive">Buttons vs Links</a></li>
                        <li><a href="#interactive">Details and Summary</a></li>
                        <li><a href="#interactive">Form Elements</a></li>
                    </ul>
                </div>
                
                <div class="sidebar-section">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="https://www.w3.org/WAI/WCAG21/quickref/">WCAG Guidelines</a></li>
                        <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">MDN HTML Elements</a></li>
                        <li><a href="https://www.w3.org/WAI/ARIA/apg/">ARIA Authoring Practices</a></li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>

    <!-- Site Footer -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Learn More</h3>
                    <ul>
                        <li><a href="#structure">Document Structure</a></li>
                        <li><a href="#accessibility">Accessibility</a></li>
                        <li><a href="#interactive">Interactive Elements</a></li>
                        <li><a href="#inline">Inline Semantics</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="https://validator.w3.org/">HTML Validator</a></li>
                        <li><a href="https://wave.webaim.org/">WAVE Accessibility Checker</a></li>
                        <li><a href="https://www.w3.org/TR/html52/">HTML5.2 Specification</a></li>
                        <li><a href="https://html5doctor.com/">HTML5 Doctor</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Tools</h3>
                    <ul>
                        <li><a href="https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd">axe DevTools</a></li>
                        <li><a href="https://www.nngroup.com/articles/screen-reader-testing/">Screen Reader Testing</a></li>
                        <li><a href="https://webaim.org/resources/contrastchecker/">Color Contrast Checker</a></li>
                        <li><a href="https://pagespeed.web.dev/">PageSpeed Insights</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Community</h3>
                    <ul>
                        <li><a href="https://www.a11yproject.com/">A11Y Project</a></li>
                        <li><a href="https://webaim.org/">WebAIM</a></li>
                        <li><a href="https://www.w3.org/WAI/">W3C WAI</a></li>
                        <li><a href="https://inclusive-components.design/">Inclusive Components</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 HTML Semantics Guide. Made with semantic HTML and accessibility in mind.</p>
            </div>
        </div>
    </footer>

    <script>
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Allow escape key to close any open details elements
            if (e.key === 'Escape') {
                document.querySelectorAll('details[open]').forEach(details => {
                    details.removeAttribute('open');
                });
            }
        });

        // Add focus management for details elements
        document.querySelectorAll('details').forEach(details => {
            const summary = details.querySelector('summary');
            
            details.addEventListener('toggle', () => {
                if (details.open) {
                    // Focus the first focusable element inside when opened
                    const firstFocusable = details.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
                    if (firstFocusable) {
                        setTimeout(() => firstFocusable.focus(), 100);
                    }
                }
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Focus the target for screen readers
                    if (target.getAttribute('tabindex') === null) {
                        target.setAttribute('tabindex', '-1');
                    }
                    target.focus();
                }
            });
        });

        // Add visual feedback for interactions
        document.querySelectorAll('.action-button').forEach(button => {
            button.addEventListener('click', function() {
                // Provide feedback that the button was clicked
                const originalText = this.textContent;
                this.textContent = 'Clicked!';
                this.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                }, 1000);
            });
        });

        // Announce dynamic content changes to screen readers
        function announceToScreenReader(message) {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'visually-hidden';
            announcement.textContent = message;
            
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }

        // Example of using the announcement function
        document.querySelectorAll('details').forEach(details => {
            details.addEventListener('toggle', () => {
                const summary = details.querySelector('summary').textContent;
                const state = details.open ? 'expanded' : 'collapsed';
                announceToScreenReader(\`\${summary} \${state}\`);
            });
        });
    </script>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice HTML Semantics</title>
</head>
<body>
    <!-- Practice semantic HTML structure -->
    
    <!-- 1. Create a proper document structure with header, nav, main, aside, footer -->
    
    <!-- 2. Use appropriate heading hierarchy (h1, h2, h3, etc.) -->
    
    <!-- 3. Mark up different types of content with semantic elements -->
    
    <!-- 4. Add proper lists (ordered, unordered, description) -->
    
    <!-- 5. Include interactive elements with proper semantics -->
    
    <!-- 6. Use inline semantic elements for text emphasis -->
    
    <!-- 7. Add ARIA attributes where needed -->
    
    <!-- 8. Test with screen reader or accessibility tools -->
    
</body>
</html>`,
      language: "html",
      difficulty: "intermediate" as const,
      estimatedTime: "35 min",
    },
    {
      id: "html-style-guide",
      title: "HTML Style Guide",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Style Guide & Best Practices</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Following consistent HTML coding standards improves readability, maintainability, and team collaboration. These guidelines represent industry best practices.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">📝 Naming Conventions</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #000; font-weight: 600; margin: 0 0 1rem 0;">✅ Use Meaningful Names</h4>
              <div style="background: #2d3748; color: #e2e8f0; padding: 1rem; border-radius: 4px; font-family: 'Fira Code', Consolas, monospace;">
                <!-- Good --><br>
                &lt;header class="site-header"&gt;<br>
                &lt;nav class="main-navigation"&gt;<br>
                &lt;section id="hero-section"&gt;<br>
                &lt;button class="primary-button"&gt;
              </div>
            </div>
            
            <div style="border: 2px solid #e53e3e; background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #000; font-weight: 600; margin: 0 0 1rem 0;">❌ Avoid Generic Names</h4>
              <div style="background: #2d3748; color: #e2e8f0; padding: 1rem; border-radius: 4px; font-family: 'Fira Code', Consolas, monospace;">
                <!-- Bad --><br>
                &lt;div class="div1"&gt;<br>
                &lt;span class="text"&gt;<br>
                &lt;section id="section"&gt;<br>
                &lt;button class="btn"&gt;
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎯 Semantic HTML Rules</h3>
          
          <div style="border-left: 4px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem; border-radius: 0;">
            <ul style="color: #2b6cb0; margin: 0; line-height: 1.8;">
              <li><strong>Use semantic elements:</strong> &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;article&gt;, &lt;section&gt;, &lt;aside&gt;, &lt;footer&gt;</li>
              <li><strong>Proper heading hierarchy:</strong> Only one &lt;h1&gt; per page, logical h2-h6 order</li>
              <li><strong>Use lists for grouped content:</strong> &lt;ul&gt;, &lt;ol&gt;, &lt;dl&gt; instead of divs</li>
              <li><strong>Button vs Link:</strong> &lt;button&gt; for actions, &lt;a&gt; for navigation</li>
              <li><strong>Form semantics:</strong> Proper &lt;label&gt;, &lt;fieldset&gt;, &lt;legend&gt; usage</li>
            </ul>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔧 Code Formatting</h3>
          
          <div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748;">Indentation:</strong> Use 2 spaces consistently (avoid tabs)
            </div>
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748;">Line Length:</strong> Keep lines under 120 characters
            </div>
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748;">Attribute Order:</strong> class, id, data-*, src, href, type, value
            </div>
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <strong style="color: #2d3748;">Quotes:</strong> Always use double quotes for attributes
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">♿ Accessibility Guidelines</h3>
          
          <div style="border-left: 4px solid #805ad5; background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%); padding: 1.5rem; border-radius: 0;">
            <ul style="color: #6b46c1; margin: 0; line-height: 1.8;">
              <li><strong>Alt text:</strong> Descriptive alt attributes for all images</li>
              <li><strong>ARIA labels:</strong> Use aria-label, aria-describedby when needed</li>
              <li><strong>Keyboard navigation:</strong> Logical tab order, focus indicators</li>
              <li><strong>Color contrast:</strong> Ensure sufficient contrast ratios</li>
              <li><strong>Language declaration:</strong> Always include lang attribute</li>
            </ul>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🚀 Performance Best Practices</h3>
          
          <div style="border-left: 4px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #fbd38d 100%); padding: 1.5rem; border-radius: 0;">
            <ul style="color: #c05621; margin: 0; line-height: 1.8;">
              <li><strong>Minimize HTTP requests:</strong> Combine CSS/JS files when possible</li>
              <li><strong>Optimize images:</strong> Proper formats (WebP, AVIF), lazy loading</li>
              <li><strong>Resource hints:</strong> Use preload, prefetch, preconnect</li>
              <li><strong>Critical CSS:</strong> Inline critical styles, defer non-critical</li>
              <li><strong>Minimize DOM depth:</strong> Avoid excessive nesting</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!-- Good HTML Structure Example -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Professional Blog - Web Development Tips</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Site Header -->
  <header class="site-header">
    <div class="container">
      <h1 class="site-title">
        <a href="/" aria-label="Home - Professional Blog">DevBlog</a>
      </h1>
      
      <nav class="main-navigation" aria-label="Main navigation">
        <ul class="nav-list">
          <li><a href="/articles" class="nav-link">Articles</a></li>
          <li><a href="/tutorials" class="nav-link">Tutorials</a></li>
          <li><a href="/about" class="nav-link">About</a></li>
          <li><a href="/contact" class="nav-link">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="main-content">
    <div class="container">
      <!-- Featured Article -->
      <section class="hero-section" aria-labelledby="hero-heading">
        <article class="featured-article">
          <header class="article-header">
            <h2 id="hero-heading" class="article-title">
              Modern CSS Grid Layouts
            </h2>
            <p class="article-meta">
              <time datetime="2025-01-15">January 15, 2025</time>
              <span class="author">by John Doe</span>
            </p>
          </header>
          
          <div class="article-content">
            <p class="article-excerpt">
              Discover advanced CSS Grid techniques that will revolutionize 
              your layout skills and improve responsive design workflow.
            </p>
            
            <img 
              src="css-grid-hero.webp" 
              alt="CSS Grid layout diagram showing container and grid items"
              class="article-image"
              loading="lazy"
              width="800"
              height="400">
          </div>
          
          <footer class="article-footer">
            <a href="/articles/css-grid-layouts" class="read-more-button">
              Read Full Article
            </a>
          </footer>
        </article>
      </section>

      <!-- Articles Grid -->
      <section class="articles-section" aria-labelledby="recent-articles">
        <h2 id="recent-articles" class="section-title">Recent Articles</h2>
        
        <div class="articles-grid">
          <article class="article-card">
            <header class="card-header">
              <h3 class="card-title">
                <a href="/articles/javascript-performance">JavaScript Performance Tips</a>
              </h3>
            </header>
            <p class="card-excerpt">
              Learn essential optimization techniques for faster JavaScript execution.
            </p>
            <footer class="card-footer">
              <time datetime="2025-01-10">January 10, 2025</time>
            </footer>
          </article>
        </div>
      </section>
    </div>
  </main>

  <!-- Sidebar -->
  <aside class="sidebar" aria-labelledby="sidebar-heading">
    <h2 id="sidebar-heading" class="visually-hidden">Sidebar</h2>
    
    <section class="newsletter-signup" aria-labelledby="newsletter-heading">
      <h3 id="newsletter-heading">Subscribe to Newsletter</h3>
      <form class="newsletter-form" action="/subscribe" method="post">
        <fieldset class="form-fieldset">
          <legend class="visually-hidden">Newsletter Subscription</legend>
          
          <div class="form-group">
            <label for="email-input" class="form-label">Email Address</label>
            <input 
              type="email" 
              id="email-input"
              name="email"
              class="form-input"
              placeholder="your@email.com"
              required
              aria-describedby="email-hint">
            <small id="email-hint" class="form-hint">
              We'll never share your email
            </small>
          </div>
          
          <button type="submit" class="submit-button">
            Subscribe
          </button>
        </fieldset>
      </form>
    </section>
  </aside>

  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="container">
      <p class="copyright">
        &copy; 2025 Professional Blog. All rights reserved.
      </p>
      
      <nav class="footer-navigation" aria-label="Footer navigation">
        <ul class="footer-links">
          <li><a href="/privacy" class="footer-link">Privacy Policy</a></li>
          <li><a href="/terms" class="footer-link">Terms of Service</a></li>
        </ul>
      </nav>
    </div>
  </footer>
</body>
</html>`,
      tryItCode: `<!-- Practice: Create a semantic, accessible webpage -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Title Here</title>
</head>
<body>
  <!-- 
  TODO: Create a complete webpage following best practices:
  
  1. Add a semantic header with navigation
  2. Create a main content area with articles/sections
  3. Include a sidebar with additional content
  4. Add a footer with site information
  5. Use proper heading hierarchy (h1-h6)
  6. Include accessibility attributes (aria-label, alt text)
  7. Use semantic HTML5 elements
  8. Follow proper naming conventions
  9. Ensure keyboard navigation works
  10. Add meta information and structured data
  -->
  
</body>
</html>`,
      language: "html",
      difficulty: "intermediate" as const,
      estimatedTime: "45 min",
    },
    {
      id: "html-entities-symbols",
      title: "HTML Entities and Symbols",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">HTML Entities & Special Characters</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              HTML entities allow you to display special characters, symbols, and reserved HTML characters safely in your web content.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔤 Reserved HTML Characters</h3>
          
          <div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; align-items: center;">
                <strong style="color: #2d3748;">Character</strong>
                <strong style="color: #2d3748;">Entity Name</strong>
                <strong style="color: #2d3748;">Entity Number</strong>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; align-items: center; font-family: monospace;">
                <span style="font-size: 1.2rem; font-weight: bold; color: #e53e3e;">&lt;</span>
                <code style="color: #2b6cb0;">&amp;lt;</code>
                <code style="color: #805ad5;">&amp;#60;</code>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; align-items: center; font-family: monospace;">
                <span style="font-size: 1.2rem; font-weight: bold; color: #e53e3e;">&gt;</span>
                <code style="color: #2b6cb0;">&amp;gt;</code>
                <code style="color: #805ad5;">&amp;#62;</code>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; align-items: center; font-family: monospace;">
                <span style="font-size: 1.2rem; font-weight: bold; color: #e53e3e;">&amp;</span>
                <code style="color: #2b6cb0;">&amp;amp;</code>
                <code style="color: #805ad5;">&amp;#38;</code>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; align-items: center; font-family: monospace;">
                <span style="font-size: 1.2rem; font-weight: bold; color: #e53e3e;">"</span>
                <code style="color: #2b6cb0;">&amp;quot;</code>
                <code style="color: #805ad5;">&amp;#34;</code>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; align-items: center; font-family: monospace;">
                <span style="font-size: 1.2rem; font-weight: bold; color: #e53e3e;">'</span>
                <code style="color: #2b6cb0;">&amp;apos;</code>
                <code style="color: #805ad5;">&amp;#39;</code>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff margin: 2rem 0 1rem 0;">💰 Currency & Financial Symbols</h3>
          
          <div style="border-left: 4px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem; border-radius: 0;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; color: #276749;">
              <div><span style="font-size: 1.2rem;">€</span> <code>&amp;euro;</code></div>
              <div><span style="font-size: 1.2rem;">£</span> <code>&amp;pound;</code></div>
              <div><span style="font-size: 1.2rem;">¥</span> <code>&amp;yen;</code></div>
              <div><span style="font-size: 1.2rem;">¢</span> <code>&amp;cent;</code></div>
              <div><span style="font-size: 1.2rem;">₹</span> <code>&amp;#8377;</code></div>
              <div><span style="font-size: 1.2rem;">₦</span> <code>&amp;#8358;</code></div>
              <div><span style="font-size: 1.2rem;">₽</span> <code>&amp;#8381;</code></div>
              <div><span style="font-size: 1.2rem;">₩</span> <code>&amp;#8361;</code></div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🧮 Mathematical Symbols</h3>
          
          <div style="border-left: 4px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem; border-radius: 0;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; color: #2b6cb0;">
              <div><span style="font-size: 1.2rem;">±</span> <code>&amp;plusmn;</code></div>
              <div><span style="font-size: 1.2rem;">×</span> <code>&amp;times;</code></div>
              <div><span style="font-size: 1.2rem;">÷</span> <code>&amp;divide;</code></div>
              <div><span style="font-size: 1.2rem;">∞</span> <code>&amp;infin;</code></div>
              <div><span style="font-size: 1.2rem;">≠</span> <code>&amp;ne;</code></div>
              <div><span style="font-size: 1.2rem;">≤</span> <code>&amp;le;</code></div>
              <div><span style="font-size: 1.2rem;">≥</span> <code>&amp;ge;</code></div>
              <div><span style="font-size: 1.2rem;">∑</span> <code>&amp;sum;</code></div>
              <div><span style="font-size: 1.2rem;">√</span> <code>&amp;radic;</code></div>
              <div><span style="font-size: 1.2rem;">∫</span> <code>&amp;int;</code></div>
              <div><span style="font-size: 1.2rem;">π</span> <code>&amp;pi;</code></div>
              <div><span style="font-size: 1.2rem;">α</span> <code>&amp;alpha;</code></div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">➡️ Arrows & Directional</h3>
          
          <div style="border-left: 4px solid #805ad5; background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%); padding: 1.5rem; border-radius: 0;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; color: #6b46c1;">
              <div><span style="font-size: 1.2rem;">←</span> <code>&amp;larr;</code></div>
              <div><span style="font-size: 1.2rem;">→</span> <code>&amp;rarr;</code></div>
              <div><span style="font-size: 1.2rem;">↑</span> <code>&amp;uarr;</code></div>
              <div><span style="font-size: 1.2rem;">↓</span> <code>&amp;darr;</code></div>
              <div><span style="font-size: 1.2rem;">↔</span> <code>&amp;harr;</code></div>
              <div><span style="font-size: 1.2rem;">⇐</span> <code>&amp;lArr;</code></div>
              <div><span style="font-size: 1.2rem;">⇒</span> <code>&amp;rArr;</code></div>
              <div><span style="font-size: 1.2rem;">⇔</span> <code>&amp;hArr;</code></div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🌟 Popular Symbols</h3>
          
          <div style="border-left: 4px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #fbd38d 100%); padding: 1.5rem; border-radius: 0;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; color: #c05621;">
              <div><span style="font-size: 1.2rem;">©</span> <code>&amp;copy;</code></div>
              <div><span style="font-size: 1.2rem;">®</span> <code>&amp;reg;</code></div>
              <div><span style="font-size: 1.2rem;">™</span> <code>&amp;trade;</code></div>
              <div><span style="font-size: 1.2rem;">§</span> <code>&amp;sect;</code></div>
              <div><span style="font-size: 1.2rem;">¶</span> <code>&amp;para;</code></div>
              <div><span style="font-size: 1.2rem;">†</span> <code>&amp;dagger;</code></div>
              <div><span style="font-size: 1.2rem;">‡</span> <code>&amp;Dagger;</code></div>
              <div><span style="font-size: 1.2rem;">•</span> <code>&amp;bull;</code></div>
              <div><span style="font-size: 1.2rem;">…</span> <code>&amp;hellip;</code></div>
              <div><span style="font-size: 1.2rem;">‰</span> <code>&amp;permil;</code></div>
              <div><span style="font-size: 1.2rem;">★</span> <code>&amp;#9733;</code></div>
              <div><span style="font-size: 1.2rem;">☆</span> <code>&amp;#9734;</code></div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🌍 International Characters</h3>
          
          <div style="border-left: 4px solid #38b2ac; background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%); padding: 1.5rem; border-radius: 0;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; color: #2c7a7b;">
              <div><span style="font-size: 1.2rem;">À</span> <code>&amp;Agrave;</code></div>
              <div><span style="font-size: 1.2rem;">Á</span> <code>&amp;Aacute;</code></div>
              <div><span style="font-size: 1.2rem;">Ñ</span> <code>&amp;Ntilde;</code></div>
              <div><span style="font-size: 1.2rem;">Ü</span> <code>&amp;Uuml;</code></div>
              <div><span style="font-size: 1.2rem;">ß</span> <code>&amp;szlig;</code></div>
              <div><span style="font-size: 1.2rem;">Ç</span> <code>&amp;Ccedil;</code></div>
              <div><span style="font-size: 1.2rem;">æ</span> <code>&amp;aelig;</code></div>
              <div><span style="font-size: 1.2rem;">œ</span> <code>&amp;oelig;</code></div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">⚡ Pro Tips</h3>
          
          <div style="background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); border: 2px solid #e2e8f0; padding: 1.5rem; border-radius: 0; margin: 1rem 0;">
            <ul style="color: #2d3748; margin: 0; line-height: 1.8;">
              <li><strong>Use numeric entities</strong> for better compatibility: &amp;#8364; instead of &amp;euro;</li>
              <li><strong>UTF-8 encoding</strong> allows direct Unicode characters in most cases</li>
              <li><strong>Entity references</strong> are case-sensitive: &amp;Aacute; ≠ &amp;aacute;</li>
              <li><strong>Always end with semicolon</strong> to avoid rendering issues</li>
              <li><strong>Use entities in attributes</strong> when characters might conflict</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Entities Example</title>
</head>
<body>
    <h1>Special Characters &amp; Symbols</h1>
    
    <!-- Reserved HTML Characters -->
    <section>
        <h2>Code Examples</h2>
        <p>
            To display HTML tags as text: 
            &lt;div class="example"&gt;Hello World&lt;/div&gt;
        </p>
        <p>
            Use &amp;amp; to show ampersands: 
            Johnson &amp; Johnson, AT&amp;T
        </p>
        <p>
            Quotes in text: He said, &quot;Hello World!&quot; 
            and she replied, &apos;Hi there!&apos;
        </p>
    </section>

    <!-- Mathematical Expressions -->
    <section>
        <h2>Mathematical Formulas</h2>
        <p>Einstein's equation: E = mc&sup2;</p>
        <p>Temperature: 25&deg;C &plusmn; 2&deg;</p>
        <p>Calculations: 10 &times; 5 = 50, 100 &divide; 4 = 25</p>
        <p>Inequalities: x &gt; 5, y &le; 10, z &ne; 0</p>
        <p>Greek letters: &alpha;, &beta;, &gamma;, &pi; = 3.14159...</p>
        <p>Infinity symbol: ∞</p>
    </section>

    <!-- Currency and Finance -->
    <section>
        <h2>Pricing &amp; Currency</h2>
        <p>Prices:</p>
        <ul>
            <li>USD: $99.99</li>
            <li>Euro: &euro;89.50</li>
            <li>British Pound: &pound;75.99</li>
            <li>Japanese Yen: &yen;10,500</li>
            <li>Indian Rupee: &#8377;7,500</li>
        </ul>
    </section>

    <!-- Arrows and Navigation -->
    <section>
        <h2>Navigation Indicators</h2>
        <p>&larr; Previous | Home | Next &rarr;</p>
        <p>Scroll &uarr; to top or &darr; to bottom</p>
        <p>Bi-directional: &harr; &uarr;&darr;</p>
        <p>Double arrows: &lArr; &rArr; &uArr; &dArr;</p>
    </section>

    <!-- International Text -->
    <section>
        <h2>International Examples</h2>
        <p>French: Caf&eacute;, r&eacute;sum&eacute;, na&iuml;ve</p>
        <p>Spanish: Espa&ntilde;ol, Se&ntilde;or, ni&ntilde;o</p>
        <p>German: M&uuml;nchen, Gr&ouml;&szlig;e, &Uuml;ber</p>
        <p>Scandinavian: &AElig;ther, &Oslash;rsted</p>
    </section>

    <!-- Legal and Copyright -->
    <section>
        <h2>Legal Notices</h2>
        <p>&copy; 2025 My Company&trade;. All rights reserved&reg;.</p>
        <p>Section &sect;4.2 &para;3 of the agreement&dagger;</p>
        <p>&dagger;Terms and conditions apply</p>
    </section>

    <!-- Miscellaneous Symbols -->
    <section>
        <h2>Decorative Elements</h2>
        <p>Rating: &starf;&starf;&starf;&star;&star; (3.5/5 stars)</p>
        <p>Menu items&hellip;</p>
        <ul>
            <li>&bull; Item 1</li>
            <li>&bull; Item 2</li>
            <li>&bull; Item 3</li>
        </ul>
        <p>Statistics: 85&permil; success rate</p>
    </section>

    <!-- Unicode Emoji (Modern Alternative) -->
    <section>
        <h2>Modern Unicode Characters</h2>
        <p>Emoji: &#128512; &#128525; &#128077; &#10084;&#65039;</p>
        <p>Symbols: &#9742; &#9993; &#127968; &#9851;</p>
    </section>

    <!-- In Attributes -->
    <img src="logo.png" alt="Company Logo &amp; Brand Identity" title="Our brand &quot;Excellence&quot; &amp; quality">
    
    <button onclick="alert('Price: &euro;29.99')">Show Price</button>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entity Practice</title>
</head>
<body>
    <!-- Practice using HTML entities -->
    
    <!-- 1. Create a code example showing HTML tags as text -->
    <section>
        <h2>Code Display</h2>
        <p>
            <!-- Show how to display: <p class="example">Hello</p> as text -->
        </p>
    </section>

    <!-- 2. Create a mathematical formula -->
    <section>
        <h2>Math Formula</h2>
        <p>
            <!-- Display: Area = π × r² -->
        </p>
    </section>

    <!-- 3. Create a pricing table with currencies -->
    <section>
        <h2>Pricing</h2>
        <!-- Add prices in different currencies using entities -->
    </section>

    <!-- 4. Create navigation with arrows -->
    <section>
        <h2>Navigation</h2>
        <!-- Add: ← Back | Next → -->
    </section>

    <!-- 5. Add copyright notice -->
    <footer>
        <!-- Add: © 2025 YourCompany™. All rights reserved® -->
    </footer>
</body>
</html>`,
      language: "html",
      difficulty: "intermediate" as const,
      estimatedTime: "30 min",
    },
    {
      id: "html-forms-advanced",
      title: "HTML Forms (Advanced)",
      content: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #1a202c;">
          <h2 style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; border-bottom: 3px solid #4299e1; padding-bottom: 0.5rem;">Advanced HTML Forms & Validation</h2>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 0; margin: 1.5rem 0;">
            <p style="font-size: 1.1rem; margin: 0; font-weight: 500;">
              Master advanced form techniques including HTML5 validation, custom controls, accessibility features, and modern form patterns for professional web applications.
            </p>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔍 HTML5 Input Types</h3>
          
          <div style="display: grid; gap: 1rem; margin: 1.5rem 0;">
            <div style="border: 1px solid #e2e8f0; background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 1.2rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem; align-items: center;">
                <strong style="color: #2d3748;">Input Type</strong>
                <strong style="color: #2d3748;">Purpose</strong>
                <strong style="color: #2d3748;">Mobile Keyboard</strong>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem; align-items: center;">
                <code style="color: #2b6cb0;">email</code>
                <span>Email validation & autocomplete</span>
                <span style="color: #48bb78;">@ key</span>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem; align-items: center;">
                <code style="color: #2b6cb0;">tel</code>
                <span>Phone number input</span>
                <span style="color: #48bb78;">Number pad</span>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem; align-items: center;">
                <code style="color: #2b6cb0;">url</code>
                <span>Website URLs</span>
                <span style="color: #48bb78;">.com key</span>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem; align-items: center;">
                <code style="color: #2b6cb0;">number</code>
                <span>Numeric input with step control</span>
                <span style="color: #48bb78;">Numbers</span>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem; align-items: center;">
                <code style="color: #2b6cb0;">date</code>
                <span>Date picker</span>
                <span style="color: #48bb78;">Calendar</span>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem; align-items: center;">
                <code style="color: #2b6cb0;">time</code>
                <span>Time picker</span>
                <span style="color: #48bb78;">Time wheel</span>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem; align-items: center;">
                <code style="color: #2b6cb0;">color</code>
                <span>Color picker</span>
                <span style="color: #48bb78;">Color wheel</span>
              </div>
            </div>
            <div style="border: 1px solid #e2e8f0; background: #f8f9fa; padding: 1rem; border-radius: 0;">
              <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1rem; align-items: center;">
                <code style="color: #2b6cb0;">range</code>
                <span>Slider control</span>
                <span style="color: #48bb78;">Slider</span>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">✅ Built-in Validation</h3>
          
          <div style="border-left: 4px solid #48bb78; background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%); padding: 1.5rem; border-radius: 0;">
            <div style="display: grid; gap: 1rem; color: #276749;">
              <div><strong>required:</strong> Field must be filled</div>
              <div><strong>pattern:</strong> Custom regex validation</div>
              <div><strong>min/max:</strong> Numeric range validation</div>
              <div><strong>minlength/maxlength:</strong> Text length validation</div>
              <div><strong>step:</strong> Numeric increment validation</div>
              <div><strong>multiple:</strong> Allow multiple values (email, file)</div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🎨 Custom Validation Messages</h3>
          
          <div style="border-left: 4px solid #4299e1; background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%); padding: 1.5rem; border-radius: 0;">
            <div style="color: #2b6cb0; font-family: monospace; line-height: 1.8;">
              <div><strong>:valid</strong> - Styles for valid inputs</div>
              <div><strong>:invalid</strong> - Styles for invalid inputs</div>
              <div><strong>:required</strong> - Styles for required fields</div>
              <div><strong>:optional</strong> - Styles for optional fields</div>
              <div><strong>:in-range</strong> - Values within min/max</div>
              <div><strong>:out-of-range</strong> - Values outside range</div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🔧 Advanced Form Elements</h3>
          
          <div style="display: grid; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="border: 2px solid #805ad5; background: linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #000; font-weight: 600; margin: 0 0 1rem 0;">📋 Datalist</h4>
              <p style="color: #553c9a; margin: 0 0 0.5rem 0;">Provides autocomplete suggestions for text inputs</p>
              <div style="background: #2d3748; color: #e2e8f0; padding: 1rem; border-radius: 4px; font-family: monospace; font-size: 0.9rem;">
                &lt;input list="browsers" name="browser"&gt;<br>
                &lt;datalist id="browsers"&gt;<br>
                &nbsp;&nbsp;&lt;option value="Chrome"&gt;<br>
                &nbsp;&nbsp;&lt;option value="Firefox"&gt;<br>
                &nbsp;&nbsp;&lt;option value="Safari"&gt;<br>
                &lt;/datalist&gt;
              </div>
            </div>
            
            <div style="border: 2px solid #ed8936; background: linear-gradient(135deg, #fffaf0 0%, #fbd38d 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #000; font-weight: 600; margin: 0 0 1rem 0;">📊 Progress & Meter</h4>
              <p style="color: #9c4221; margin: 0 0 0.5rem 0;">Visual progress indicators and gauge displays</p>
              <div style="background: #2d3748; color: #e2e8f0; padding: 1rem; border-radius: 4px; font-family: monospace; font-size: 0.9rem;">
                &lt;progress value="70" max="100"&gt;70%&lt;/progress&gt;<br>
                &lt;meter value="0.7" min="0" max="1"&gt;70%&lt;/meter&gt;
              </div>
            </div>
            
            <div style="border: 2px solid #38b2ac; background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%); padding: 1.5rem; border-radius: 0;">
              <h4 style="color: #000; font-weight: 600; margin: 0 0 1rem 0;">📁 File Upload</h4>
              <p style="color: #285e61; margin: 0 0 0.5rem 0;">Advanced file handling with multiple files and constraints</p>
              <div style="background: #2d3748; color: #e2e8f0; padding: 1rem; border-radius: 4px; font-family: monospace; font-size: 0.9rem;">
                &lt;input type="file" multiple<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accept="image/*,.pdf"<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;capture="user"&gt;
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">♿ Form Accessibility</h3>
          
          <div style="border-left: 4px solid #e53e3e; background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%); padding: 1.5rem; border-radius: 0;">
            <ul style="color: #c53030; margin: 0; line-height: 1.8;">
              <li><strong>Labels:</strong> Associate every input with a label using 'for' attribute</li>
              <li><strong>Fieldsets:</strong> Group related form controls with legend</li>
              <li><strong>ARIA attributes:</strong> aria-describedby, aria-invalid, aria-required</li>
              <li><strong>Error handling:</strong> Clear, specific error messages</li>
              <li><strong>Focus management:</strong> Logical tab order and focus indicators</li>
              <li><strong>Screen reader support:</strong> Meaningful names and instructions</li>
            </ul>
          </div>

          <h3 style="font-size: 1.5rem; font-weight: 600; color: #fff; margin: 2rem 0 1rem 0;">🚀 Modern Form Patterns</h3>
          
          <div style="background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); border: 2px solid #e2e8f0; padding: 1.5rem; border-radius: 0; margin: 1rem 0;">
            <ul style="color: #2d3748; margin: 0; line-height: 1.8;">
              <li><strong>Progressive enhancement:</strong> Start with basic HTML, enhance with JavaScript</li>
              <li><strong>Real-time validation:</strong> Immediate feedback without form submission</li>
              <li><strong>Auto-save:</strong> Preserve user input in case of accidental page loss</li>
              <li><strong>Multi-step forms:</strong> Break complex forms into manageable steps</li>
              <li><strong>Smart defaults:</strong> Pre-fill known information to reduce friction</li>
              <li><strong>Conditional fields:</strong> Show/hide fields based on user selections</li>
            </ul>
          </div>
        </div>
      `,
      codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced HTML Forms</title>
    <style>
        /* Modern Form Styling */
        .form-container {
            max-width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #2d3748;
        }
        
        input, select, textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 4px;
            font-size: 1rem;
            transition: all 0.2s;
        }
        
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #4299e1;
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
        }
        
        /* Validation Styles */
        input:valid {
            border-color: #48bb78;
        }
        
        input:invalid:not(:placeholder-shown) {
            border-color: #e53e3e;
        }
        
        .error-message {
            color: #e53e3e;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .success-message {
            color: #48bb78;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        /* Custom Checkbox/Radio */
        .custom-control {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        
        .custom-control input {
            width: auto;
            margin-right: 0.5rem;
        }
        
        /* Progress styling */
        progress {
            width: 100%;
            height: 20px;
            border-radius: 10px;
        }
        
        meter {
            width: 100%;
            height: 20px;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h1>Advanced Registration Form</h1>
        
        <form id="advancedForm" novalidate>
            <!-- Personal Information Fieldset -->
            <fieldset>
                <legend>Personal Information</legend>
                
                <div class="form-group">
                    <label for="fullName">Full Name *</label>
                    <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        required
                        minlength="2"
                        maxlength="50"
                        pattern="[A-Za-z\\s]+"
                        title="Only letters and spaces allowed"
                        aria-describedby="nameHelp">
                    <small id="nameHelp">Enter your first and last name</small>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        placeholder="user@example.com"
                        aria-describedby="emailHelp">
                    <small id="emailHelp">We'll never share your email</small>
                </div>
                
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="123-456-7890"
                        title="Format: 123-456-7890">
                </div>
                
                <div class="form-group">
                    <label for="birthdate">Date of Birth</label>
                    <input 
                        type="date" 
                        id="birthdate" 
                        name="birthdate"
                        min="1900-01-01"
                        max="2010-12-31">
                </div>
                
                <div class="form-group">
                    <label for="website">Personal Website</label>
                    <input 
                        type="url" 
                        id="website" 
                        name="website"
                        placeholder="https://example.com">
                </div>
            </fieldset>
            
            <!-- Preferences Fieldset -->
            <fieldset>
                <legend>Preferences</legend>
                
                <div class="form-group">
                    <label for="favoriteColor">Favorite Color</label>
                    <input type="color" id="favoriteColor" name="favoriteColor" value="#4299e1">
                </div>
                
                <div class="form-group">
                    <label for="experience">Experience Level (1-10)</label>
                    <input 
                        type="range" 
                        id="experience" 
                        name="experience"
                        min="1" 
                        max="10" 
                        value="5"
                        oninput="updateExperience(this.value)">
                    <output id="experienceOutput">5</output>
                </div>
                
                <div class="form-group">
                    <label for="skills">Skills</label>
                    <input 
                        list="skillsList" 
                        id="skills" 
                        name="skills"
                        placeholder="Type to see suggestions">
                    <datalist id="skillsList">
                        <option value="JavaScript">
                        <option value="Python">
                        <option value="React">
                        <option value="Node.js">
                        <option value="HTML/CSS">
                        <option value="SQL">
                        <option value="Git">
                    </datalist>
                </div>
                
                <div class="form-group">
                    <label for="profilePicture">Profile Picture</label>
                    <input 
                        type="file" 
                        id="profilePicture" 
                        name="profilePicture"
                        accept="image/*"
                        onchange="previewImage(this)">
                    <div id="imagePreview"></div>
                </div>
            </fieldset>
            
            <!-- Subscription Options -->
            <fieldset>
                <legend>Newsletter Preferences</legend>
                
                <div class="custom-control">
                    <input type="checkbox" id="newsletter" name="newsletter" value="weekly">
                    <label for="newsletter">Weekly Newsletter</label>
                </div>
                
                <div class="custom-control">
                    <input type="checkbox" id="promotions" name="promotions" value="monthly">
                    <label for="promotions">Monthly Promotions</label>
                </div>
                
                <div class="form-group">
                    <label>Preferred Contact Method</label>
                    <div class="custom-control">
                        <input type="radio" id="contactEmail" name="contactMethod" value="email" checked>
                        <label for="contactEmail">Email</label>
                    </div>
                    <div class="custom-control">
                        <input type="radio" id="contactPhone" name="contactMethod" value="phone">
                        <label for="contactPhone">Phone</label>
                    </div>
                    <div class="custom-control">
                        <input type="radio" id="contactSMS" name="contactMethod" value="sms">
                        <label for="contactSMS">SMS</label>
                    </div>
                </div>
            </fieldset>
            
            <!-- Form Progress -->
            <div class="form-group">
                <label for="formProgress">Form Completion</label>
                <progress id="formProgress" value="0" max="100">0%</progress>
                <small>Complete all required fields</small>
            </div>
            
            <!-- Submit Button -->
            <div class="form-group">
                <button type="submit">Create Account</button>
                <button type="reset">Reset Form</button>
            </div>
        </form>
    </div>
    
    <script>
        // Form validation and interaction
        function updateExperience(value) {
            document.getElementById('experienceOutput').textContent = value;
            updateProgress();
        }
        
        function previewImage(input) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = '';
            
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '200px';
                    img.style.marginTop = '10px';
                    preview.appendChild(img);
                };
                reader.readAsDataURL(input.files[0]);
            }
            updateProgress();
        }
        
        function updateProgress() {
            const form = document.getElementById('advancedForm');
            const inputs = form.querySelectorAll('input[required], input[type="file"]');
            let completed = 0;
            
            inputs.forEach(input => {
                if (input.type === 'file') {
                    if (input.files.length > 0) completed++;
                } else if (input.checkValidity() && input.value.trim() !== '') {
                    completed++;
                }
            });
            
            const progress = (completed / inputs.length) * 100;
            document.getElementById('formProgress').value = progress;
        }
        
        // Real-time validation
        document.getElementById('advancedForm').addEventListener('input', updateProgress);
        
        // Form submission
        document.getElementById('advancedForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (this.checkValidity()) {
                alert('Form submitted successfully!');
            } else {
                alert('Please correct the errors and try again.');
            }
        });
        
        // Custom validation messages
        document.getElementById('email').addEventListener('input', function() {
            if (this.validity.typeMismatch) {
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.setCustomValidity('');
            }
        });
    </script>
</body>
</html>`,
      tryItCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Practice</title>
</head>
<body>
    <!-- Practice: Create an advanced contact form -->
    
    <!-- 1. Create a contact form with multiple sections -->
    <form>
        <!-- Personal Info Section -->
        <fieldset>
            <legend>Contact Information</legend>
            
            <!-- Name field with validation -->
            
            <!-- Email field with proper type -->
            
            <!-- Phone field with pattern -->
            
            <!-- Website URL field -->
            
        </fieldset>
        
        <!-- Message Section -->
        <fieldset>
            <legend>Your Message</legend>
            
            <!-- Subject with datalist suggestions -->
            
            <!-- Priority level with radio buttons -->
            
            <!-- Message textarea with character count -->
            
            <!-- File attachment -->
            
        </fieldset>
        
        <!-- Preferences -->
        <fieldset>
            <legend>Preferences</legend>
            
            <!-- Best time to contact (time input) -->
            
            <!-- Preferred contact method (checkboxes) -->
            
            <!-- Urgency level (range slider) -->
            
        </fieldset>
        
        <!-- Submit button -->
        
    </form>
    
    <!-- Add JavaScript for: -->
    <!-- - Real-time validation -->
    <!-- - Character counting -->
    <!-- - File preview -->
    <!-- - Form progress tracking -->
</body>
</html>`,
      language: "html",
      difficulty: "advanced" as const,
      estimatedTime: "60 min",
    }
  ],
};

export default htmlData;
