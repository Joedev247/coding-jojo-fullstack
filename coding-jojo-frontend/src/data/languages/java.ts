// Java language data for coding-jojo platform
export const javaData = {
  description:
    "Java is a popular object-oriented programming language known for its portability ('write once, run anywhere'), strong memory management, and widespread use in enterprise applications.",
  topics: [
    {
      id: "java-introduction",
      title: "Java Introduction",
      content: `
        <h2>What is Java?</h2>
        <p>Java is a high-level, object-oriented programming language developed by Sun Microsystems (now Oracle).</p>
        <ul>
          <li>Java is platform-independent (runs on any system with JVM)</li>
          <li>Java is object-oriented and class-based</li>
          <li>Java has automatic memory management (garbage collection)</li>
          <li>Java is widely used in enterprise applications</li>
        </ul>
        
        <h3>Java Features</h3>
        <p>Java emphasizes reliability, security, and performance.</p>
      `,
      codeExample: `// Java Hello World Program
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Variables in Java
        String name = "Alice";
        int age = 25;
        double height = 5.6;
        boolean isStudent = true;
        
        // Displaying variables
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height);
        System.out.println("Is Student: " + isStudent);
    }
}`,
      tryItCode: `// Try your first Java program
public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Java!");
        
        // Create some variables
        String yourName = "Your Name Here";
        int favoriteNumber = 42;
        
        // Display them
        System.out.println("Hello, " + yourName + "!");
        System.out.println("Your favorite number is " + favoriteNumber);
        
        // Try creating more variables and methods
    }
}`,
      language: "java",
      difficulty: "beginner" as const,
      estimatedTime: "8 min",
    },
    {
      id: "java-variables",
      title: "Java Variables",
      content: `
        <h2>Java Variables</h2>
        <p>Variables in Java are strongly typed and must be declared before use.</p>
        
        <h3>Java Data Types:</h3>
        <ul>
          <li><strong>Primitive types:</strong> int, double, boolean, char, byte, short, long, float</li>
          <li><strong>Reference types:</strong> String, Arrays, Objects</li>
        </ul>
        
        <h3>Variable Declaration:</h3>
        <p>Variables must be declared with a specific type before they can be used.</p>
      `,
      codeExample: `public class Variables {
    public static void main(String[] args) {
        // Primitive data types
        int number = 10;
        double price = 19.99;
        boolean isAvailable = true;
        char grade = 'A';
        
        // String (reference type)
        String message = "Hello Java";
        
        // Constants (final keyword)
        final int MAX_SIZE = 100;
        
        // Arrays
        int[] numbers = {1, 2, 3, 4, 5};
        String[] names = {"Alice", "Bob", "Charlie"};
        
        // Display values
        System.out.println("Number: " + number);
        System.out.println("Price: $" + price);
        System.out.println("Available: " + isAvailable);
        System.out.println("Grade: " + grade);
        System.out.println("Message: " + message);
    }
}`,
      tryItCode: `// Practice with Java variables
public class StudentInfo {
    public static void main(String[] args) {
        // Student information
        String studentName = "Alice";
        int studentAge = 20;
        double gpa = 3.85;
        boolean isGraduating = true;
        
        // Display information
        System.out.println("Student: " + studentName);
        System.out.println("Age: " + studentAge);
        System.out.println("GPA: " + gpa);
        System.out.println("Graduating: " + isGraduating);
        
        // Try creating your own variables
    }
}`,
      language: "java",
      difficulty: "beginner" as const,
      estimatedTime: "10 min",
    },
  ],
};

export default javaData;
