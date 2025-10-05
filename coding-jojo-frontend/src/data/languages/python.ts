// Python language data for coding-jojo platform
export const pythonData = {
  description:
    "Python is a high-level, interpreted programming language known for its simple syntax and readability. It's widely used for web development, data science, artificial intelligence, and automation.",
  topics: [
    {
      id: "python-introduction",
      title: "Python Introduction",
      content: `
        <h2>What is Python?</h2>
        <p>Python is a high-level programming language that emphasizes code readability and simplicity.</p>
        <ul>
          <li>Python has a simple and easy-to-learn syntax</li>
          <li>Python is interpreted, meaning code is executed line by line</li>
          <li>Python is versatile and used in many fields</li>
          <li>Python has a large standard library and community</li>
        </ul>
        
        <h3>Python Features</h3>
        <p>Python is known for its clean syntax and powerful capabilities.</p>
      `,
      codeExample: `# This is a comment in Python
print("Hello, World!")

# Variables in Python
name = "Alice"
age = 25
height = 5.6

# Displaying variables
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}")

# Python is dynamically typed
message = "Hello"
message = 123  # This is valid in Python`,
      tryItCode: `# Try your first Python program
print("Welcome to Python!")

# Create some variables
your_name = "Your Name Here"
favorite_number = 42

# Display them
print(f"Hello, {your_name}!")
print(f"Your favorite number is {favorite_number}")

# Try changing the values and run again`,
      language: "python",
      difficulty: "beginner" as const,
      estimatedTime: "5 min",
    },
    {
      id: "python-variables",
      title: "Python Variables",
      content: `
        <h2>Python Variables</h2>
        <p>Variables in Python are used to store data values.</p>
        
        <h3>Variable Rules:</h3>
        <ul>
          <li>Variable names must start with a letter or underscore</li>
          <li>Variable names can contain letters, numbers, and underscores</li>
          <li>Variable names are case-sensitive</li>
          <li>Cannot use Python keywords as variable names</li>
        </ul>
      `,
      codeExample: `# Creating variables
name = "John Doe"
age = 30
is_student = True
height = 5.9

# Multiple assignment
x, y, z = 1, 2, 3

# Same value to multiple variables
a = b = c = 10

# Variable types
print(type(name))      # <class 'str'>
print(type(age))       # <class 'int'>
print(type(is_student)) # <class 'bool'>
print(type(height))    # <class 'float'>`,
      tryItCode: `# Practice with Python variables
student_name = "Alice"
student_age = 20
gpa = 3.85

# Display student information
print(f"Student: {student_name}")
print(f"Age: {student_age}")
print(f"GPA: {gpa}")

# Try creating your own variables`,
      language: "python",
      difficulty: "beginner" as const,
      estimatedTime: "8 min",
    },
    // Add more Python topics here...
  ],
};

export default pythonData;
