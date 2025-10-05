// "use client";
// import { useState } from 'react';
// import { Code, Play } from 'lucide-react';

// const CodeLanguageSection = () => {
//   const [activeDemo, setActiveDemo] = useState<string | null>(null);

//   const languages = [
//     {
//       id: 'html',
//       name: 'HTML',
//       description: 'The language for building web pages',
//       links: ['Learn HTML', 'HTML Reference', 'Get Certified'],
//       exampleCode: `<!DOCTYPE html>
// <html>
// <head>
//   <title>HTML Tutorial</title>
// </head>
// <body>
//   <h1>This is a heading</h1>
//   <p>This is a paragraph.</p>
// </body>
// </html>`,
//       codePreview: `<!DOCTYPE html>
// <html>
// <head>
//   <title>HTML Tutorial</title>
// </head>
// <body>
//   <h1>This is a heading</h1>
//   <p>This is a paragraph.</p>
// </body>
// </html>`,
//     },
//     {
//       id: 'css',
//       name: 'CSS',
//       description: 'The language for styling web pages',
//       links: ['Learn CSS', 'CSS Reference', 'Get Certified'],
//       exampleCode: `body {
//   background-color: lightblue;
// }

// h1 {
//   color: white;
//   text-align: center;
// }

// p {
//   font-family: verdana;
// }`,
//       codePreview: `<style>
// body {
//   background-color: lightblue;
// }

// h1 {
//   color: white;
//   text-align: center;
// }

// p {
//   font-family: verdana;
// }
// </style>

// <h1>This is a heading</h1>
// <p>This is a paragraph.</p>`,
//     },
//     {
//       id: 'javascript',
//       name: 'JavaScript',
//       description: 'The language for programming web pages',
//       links: ['Learn JavaScript', 'JavaScript Reference', 'Get Certified'],
//       exampleCode: `<button onclick="myFunction()">Click Me!</button>

// <script>
// function myFunction() {
//   let x = document.getElementById("demo");
//   x.style.fontSize = "25px";
//   x.style.color = "red";
// }
// </script>`,
//       codePreview: `<p id="demo">Click the button to change this text.</p>
// <button onclick="myFunction()">Click Me!</button>

// <script>
// function myFunction() {
//   let x = document.getElementById("demo");
//   x.style.fontSize = "25px";
//   x.style.color = "red";
// }
// </script>`,
//     },
//     {
//       id: 'python',
//       name: 'Python',
//       description: 'A popular programming language',
//       links: ['Learn Python', 'Python Reference', 'Get Certified'],
//       exampleCode: `if 5 > 2:
//   print("Five is greater than two!")`,
//       codePreview: `# Python code cannot be executed directly in browser
// # This is a simulation of output

// >>> if 5 > 2:
// ...     print("Five is greater than two!")
// ...
// Five is greater than two!`,
//     },
//     {
//       id: 'sql',
//       name: 'SQL',
//       description: 'A language for accessing databases',
//       links: ['Learn SQL', 'SQL Reference', 'Get Certified'],
//       exampleCode: `SELECT * FROM Customers WHERE Country='Mexico';`,
//       codePreview: `-- SQL query result simulation:

// CustomerID | CustomerName        | ContactName      | Country
// --------------------------------------------------------------------------
// 1          | Alfreds Futterkiste | Maria Anders     | Mexico
// 2          | Ana Trujillo        | Ana Trujillo     | Mexico`,
//     },
//   ];

//   const renderDemo = (language: { id: any; name: any; description?: string; links?: string[]; exampleCode?: string; codePreview: any; }) => {
//     if (activeDemo !== language.id) return null;

//     let content;
//     if (language.id === 'html' || language.id === 'css' || language.id === 'javascript') {
//       content = (
//         <div className="mt-4  bg-white p-4 shadow-md">
//           <div className="mb-2 flex items-center justify-between">
//             <h3 className="text-sm font-medium">Live Preview</h3>
//             <button
//               onClick={() => setActiveDemo(null)}
//               className="text-xs text-gray-500 hover:text-gray-700"
//             >
//               Close
//             </button>
//           </div>
//           <div className="overflow-hidden rounded border border-gray-200">
//             <iframe
//               srcDoc={language.codePreview}
//               className="h-64 w-full"
//               title={`${language.name} Demo`}
//             />
//           </div>
//         </div>
//       );
//     } else {
//       // For Python and SQL, show simulated output
//       content = (
//         <div className="mt-4  bg-white p-4 shadow-md">
//           <div className="mb-2 flex items-center justify-between">
//             <h3 className="text-sm font-medium">Simulated Output</h3>
//             <button
//               onClick={() => setActiveDemo(null)}
//               className="text-xs text-gray-500 hover:text-gray-700"
//             >
//               Close
//             </button>
//           </div>
//           <div className="overflow-x-auto rounded border border-gray-200   bg-gray-900 p-4">
//             <pre className="text-sm text-green-400 whitespace-pre-wrap">{language.codePreview}</pre>
//           </div>
//         </div>
//       );
//     }

//     return content;
//   };

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-12">Popular Programming Languages</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {languages.map((language) => (
//             <div key={language.id} className="bg-white  shadow-lg overflow-hidden">
//               <div className="px-6 py-8">
//                 <div className="flex items-center mb-4">
//                   <Code className="w-8 h-8 text-blue-600 mr-3" />
//                   <h3 className="text-xl font-bold">{language.name}</h3>
//                 </div>

//                 <p className="text-gray-600 mb-6">{language.description}</p>

//                 <div className="flex flex-wrap gap-3 mb-6">
//                   {language.links.map((link, index) => (
//                     <a
//                       key={index}
//                       href="#"
//                       className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                     >
//                       {link}
//                     </a>
//                   ))}
//                 </div>

//                 <div className="bg-gray-100  p-4 mb-6">
//                   <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
//                     <code>{language.exampleCode}</code>
//                   </pre>
//                 </div>

//                 <button
//                   onClick={() => setActiveDemo(language.id)}
//                   className="flex items-center justify-center w-full py-2 px-4 bg-pink-600 text-white  hover:bg-pink-700 transition-colors"
//                 >
//                   <Play className="w-4 h-4 mr-2" />
//                   Try it Yourself
//                 </button>
//               </div>

//               {renderDemo(language)}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CodeLanguageSection;
