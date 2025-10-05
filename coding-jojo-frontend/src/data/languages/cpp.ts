// C++ language data for coding-jojo platform
export const cppData = {
  description:
    "C++ is a general-purpose programming language that supports procedural, object-oriented, and generic programming.",
  topics: [
    {
      id: "cpp-introduction",
      title: "C++ Introduction",
      content: `
        <h2>What is C++?</h2>
        <p>C++ is a general-purpose programming language that supports procedural, object-oriented, and generic programming.</p>
        <ul>
          <li>C++ is widely used in the industry</li>
          <li>C++ has a large community and ecosystem</li>
          <li>C++ offers powerful features and capabilities</li>
          <li>C++ is continuously evolving with new updates</li>
        </ul>
        
        <h3>C++ Features</h3>
        <p>C++ provides many features that make development efficient and enjoyable.</p>
      `,
      codeExample: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      tryItCode: `// Try C++ here
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;

// Add your own code here`,
      language: "cpp",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
    {
      id: "cpp-getting-started",
      title: "Getting Started with C++",
      content: `
        <h2>Getting Started</h2>
        <p>Learn the basics of C++ and start building amazing projects.</p>
        
        <h3>Prerequisites:</h3>
        <ul>
          <li>Basic understanding of programming concepts</li>
          <li>Text editor or IDE</li>
          <li>C++ development environment</li>
        </ul>
        
        <h3>Next Steps:</h3>
        <ul>
          <li>Set up your development environment</li>
          <li>Learn C++ syntax and concepts</li>
          <li>Build your first C++ project</li>
          <li>Explore C++ libraries and frameworks</li>
        </ul>
      `,
      codeExample: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      tryItCode: `// Practice C++ basics
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}

// Try modifying this code`,
      language: "cpp",
      difficulty: "beginner" as const,
      estimatedTime: "15 min",
    },
  ],
};

export default cppData;