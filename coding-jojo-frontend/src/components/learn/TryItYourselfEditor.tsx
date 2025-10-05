"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  RotateCcw,
  Maximize2,
  Minimize2,
  Copy,
  Download,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/hooks/useToast";

interface TryItYourselfEditorProps {
  initialCode: string;
  language: string;
}

export default function TryItYourselfEditor({
  initialCode,
  language,
}: TryItYourselfEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const toast = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "output">("code");

  // Reset code to initial state
  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
  };
  // Copy code to clipboard
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy code. Please try again.");
    }
  };

  // Download code as file
  const downloadCode = () => {
    const extension = getFileExtension(language);
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `example.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Code downloaded as example.${extension}`);
  };

  // Get file extension based on language
  const getFileExtension = (lang: string): string => {
    const extensions: { [key: string]: string } = {
      javascript: "js",
      typescript: "ts",
      python: "py",
      java: "java",
      cpp: "cpp",
      "c++": "cpp",
      csharp: "cs",
      "c#": "cs",
      php: "php",
      ruby: "rb",
      go: "go",
      rust: "rs",
      swift: "swift",
      kotlin: "kt",
      dart: "dart",
      scala: "scala",
      html: "html",
      css: "css",
    };
    return extensions[lang.toLowerCase()] || "txt";
  };

  // Simulate code execution (for demo purposes)
  const runCode = async () => {
    setIsRunning(true);
    setActiveTab("output");

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple simulation based on language
    let simulatedOutput = "";

    switch (language.toLowerCase()) {
      case "javascript":
        if (code.includes("console.log")) {
          const matches = code.match(/console\.log\(['"`](.+?)['"`]\)/g);
          if (matches) {
            simulatedOutput = matches
              .map((match) => {
                const content = match.match(/console\.log\(['"`](.+?)['"`]\)/);
                return content ? content[1] : "";
              })
              .join("\n");
          }
        } else {
          simulatedOutput =
            "// Code executed successfully\n// Add console.log() statements to see output";
        }
        break;

      case "python":
        if (code.includes("print")) {
          const matches = code.match(/print\(['"`](.+?)['"`]\)/g);
          if (matches) {
            simulatedOutput = matches
              .map((match) => {
                const content = match.match(/print\(['"`](.+?)['"`]\)/);
                return content ? content[1] : "";
              })
              .join("\n");
          }
        } else {
          simulatedOutput =
            "# Code executed successfully\n# Add print() statements to see output";
        }
        break;

      case "java":
        if (code.includes("System.out.println")) {
          const matches = code.match(
            /System\.out\.println\(['"`](.+?)['"`]\)/g
          );
          if (matches) {
            simulatedOutput = matches
              .map((match) => {
                const content = match.match(
                  /System\.out\.println\(['"`](.+?)['"`]\)/
                );
                return content ? content[1] : "";
              })
              .join("\n");
          }
        } else {
          simulatedOutput =
            "// Code compiled and executed successfully\n// Add System.out.println() statements to see output";
        }
        break;

      case "html":
        simulatedOutput =
          "HTML rendered successfully! Check the preview above.";
        break;

      case "css":
        simulatedOutput =
          "CSS styles applied successfully! Check the preview above.";
        break;

      default:
        simulatedOutput = `Code executed successfully!\nLanguage: ${language}\nNo output to display.`;
    }

    setOutput(simulatedOutput);
    setIsRunning(false);
  };

  return (
    <div
      className={`  bg-gray-900 border border-gray-800 overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between  bg-gray-900 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <h4 className="text-white font-medium">Interactive Editor</h4>
          <div className="flex bg-gray-700 p-1">
            <button
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                activeTab === "code"
                  ? "bg-gray-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                activeTab === "output"
                  ? "bg-gray-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Output
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded transition-colors text-sm"
          >
            <Play className="h-4 w-4" />
            {isRunning ? "Running..." : "Run"}
          </button>

          <button
            onClick={resetCode}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Reset Code"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={copyCode}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Copy Code"
          >
            <Copy className="h-4 w-4" />
          </button>

          <button
            onClick={downloadCode}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Download Code"
          >
            <Download className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex h-96">
        {/* Code Editor */}
        <div className={`${activeTab === "code" ? "block" : "hidden"} w-full`}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4   bg-gray-900 text-white font-mono text-sm resize-none outline-none"
            placeholder="Write your code here..."
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div
          className={`${activeTab === "output" ? "block" : "hidden"} w-full`}
        >
          <div className="h-full p-4 bg-gray-950 text-gray-300 font-mono text-sm overflow-auto">
            {" "}
            {isRunning ? (
              <div className="flex items-center gap-2 text-yellow-400">
                <LoadingSpinner size="sm" className="border-yellow-400" />
                Executing code...
              </div>
            ) : output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <div className="text-gray-500 italic">
                Click "Run" to execute your code and see the output here.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>
            Language: {language.charAt(0).toUpperCase() + language.slice(1)}
          </span>
          <span>Lines: {code.split("\n").length}</span>
        </div>
      </div>
    </div>
  );
}
