"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  RotateCcw,
  Maximize2,
  Minimize2,
  Copy,
  Download,
  Settings,
  Moon,
  Sun,
  FileText,
  Terminal,
  Eye,
  EyeOff,
  Zap,
  Save,
  FolderOpen,
  Search,
  Bug,
  GitBranch,
} from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/hooks/useToast";

interface VSCodeEditorProps {
  initialCode: string;
  language: string;
  onCodeChange?: (code: string) => void;
}

export default function VSCodeEditor({
  initialCode,
  language,
  onCodeChange,
}: VSCodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<"editor" | "output" | "preview">(
    "editor"
  );
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [fontSize, setFontSize] = useState(14);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(false);
  const [autoComplete, setAutoComplete] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle code changes
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setHasUnsavedChanges(true);
    onCodeChange?.(newCode);
  };

  // Reset code to initial state
  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
    setHasUnsavedChanges(false);
  };

  // Save code (simulated)
  const saveCode = () => {
    setHasUnsavedChanges(false);
    // In a real implementation, this would save to a backend
    console.log("Code saved");
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
    a.download = `code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Code downloaded as code.${extension}`);
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
      sql: "sql",
      r: "r",
    };
    return extensions[lang.toLowerCase()] || "txt";
  };

  // Enhanced code execution simulation
  const runCode = async () => {
    setIsRunning(true);
    setActiveTab("output");

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let simulatedOutput = "";

    try {
      switch (language.toLowerCase()) {
        case "javascript":
          simulatedOutput = simulateJavaScript(code);
          break;
        case "python":
          simulatedOutput = simulatePython(code);
          break;
        case "java":
          simulatedOutput = simulateJava(code);
          break;
        case "html":
          setActiveTab("preview");
          simulatedOutput = "HTML rendered in preview tab";
          break;
        case "css":
          simulatedOutput = simulateCSS(code);
          break;
        default:
          simulatedOutput = `// Code executed successfully!\n// Language: ${language}\n// Add output statements to see results here.`;
      }
    } catch (error) {
      simulatedOutput = `Error: ${error}`;
    }

    setOutput(simulatedOutput);
    setIsRunning(false);
  };

  // JavaScript simulation
  const simulateJavaScript = (code: string): string => {
    const outputs: string[] = [];

    // Extract console.log statements
    const consoleMatches = code.match(/console\.log\([^)]+\)/g);
    if (consoleMatches) {
      consoleMatches.forEach((match) => {
        try {
          const content = match.match(/console\.log\((.+)\)/)?.[1];
          if (content) {
            // Simple evaluation for demonstration
            if (content.includes('"') || content.includes("'")) {
              outputs.push(content.replace(/['"]/g, ""));
            } else if (content.includes("+")) {
              outputs.push(`Result of: ${content}`);
            } else {
              outputs.push(content);
            }
          }
        } catch (e) {
          outputs.push(`Error evaluating: ${match}`);
        }
      });
    }

    // Check for variable declarations
    const variableMatches = code.match(/(let|const|var)\s+\w+\s*=\s*[^;]+/g);
    if (variableMatches) {
      outputs.push("// Variables declared successfully");
    }

    return outputs.length > 0
      ? outputs.join("\n")
      : "// Code executed successfully\n// Add console.log() statements to see output";
  };

  // Python simulation
  const simulatePython = (code: string): string => {
    const outputs: string[] = [];

    const printMatches = code.match(/print\([^)]+\)/g);
    if (printMatches) {
      printMatches.forEach((match) => {
        const content = match.match(/print\((.+)\)/)?.[1];
        if (content) {
          if (content.includes('"') || content.includes("'")) {
            outputs.push(content.replace(/['"]/g, ""));
          } else {
            outputs.push(`Result: ${content}`);
          }
        }
      });
    }

    return outputs.length > 0
      ? outputs.join("\n")
      : "# Code executed successfully\n# Add print() statements to see output";
  };

  // Java simulation
  const simulateJava = (code: string): string => {
    const outputs: string[] = [];

    const printMatches = code.match(/System\.out\.println\([^)]+\)/g);
    if (printMatches) {
      printMatches.forEach((match) => {
        const content = match.match(/System\.out\.println\((.+)\)/)?.[1];
        if (content) {
          if (content.includes('"')) {
            outputs.push(content.replace(/"/g, ""));
          } else {
            outputs.push(`Result: ${content}`);
          }
        }
      });
    }

    return outputs.length > 0
      ? outputs.join("\n")
      : "// Code compiled and executed successfully\n// Add System.out.println() statements to see output";
  };

  // CSS simulation
  const simulateCSS = (code: string): string => {
    const selectors = code.match(/[^{}]+\s*\{[^}]*\}/g);
    return `CSS parsed successfully!\nFound ${
      selectors?.length || 0
    } CSS rules\nStyles would be applied to the HTML elements.`;
  };

  // Handle cursor position tracking
  const handleCursorMove = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    const lines = textarea.value.substr(0, textarea.selectionStart).split("\n");
    setCursorPosition({
      line: lines.length,
      column: lines[lines.length - 1].length + 1,
    });
  };

  // Format code (basic)
  const formatCode = () => {
    // Basic formatting - in a real implementation, you'd use proper formatters
    let formattedCode = code;

    if (language === "javascript" || language === "typescript") {
      // Basic JS formatting
      formattedCode = formattedCode
        .replace(/\{/g, " {\n  ")
        .replace(/\}/g, "\n}")
        .replace(/;/g, ";\n");
    }

    setCode(formattedCode);
    setHasUnsavedChanges(true);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            e.preventDefault();
            saveCode();
            break;
          case "Enter":
            if (e.shiftKey) {
              e.preventDefault();
              runCode();
            }
            break;
          case "/":
            e.preventDefault();
            // Toggle comment - basic implementation
            break;
        }
      }

      // F11 for fullscreen
      if (e.key === "F11") {
        e.preventDefault();
        setIsFullscreen(!isFullscreen);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const renderPreview = () => {
    if (language.toLowerCase() === "html") {
      return (
        <iframe
          srcDoc={code}
          className="w-full h-full border-none bg-white"
          title="HTML Preview"
        />
      );
    }

    if (language.toLowerCase() === "css") {
      const htmlWithCSS = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${code}</style>
        </head>
        <body>
          <h1>CSS Preview</h1>
          <p>This is a paragraph to show your CSS styles.</p>
          <div class="box">This is a div with class "box"</div>
          <span id="special">This is a span with id "special"</span>
        </body>
        </html>
      `;

      return (
        <iframe
          srcDoc={htmlWithCSS}
          className="w-full h-full border-none bg-white"
          title="CSS Preview"
        />
      );
    }

    return (
      <div className="p-4 text-gray-400 text-center">
        Preview not available for {language}
      </div>
    );
  };

  return (
    <div
      className={`${theme === "dark" ? "  bg-gray-900" : "bg-white"} border ${
        theme === "dark" ? "border-gray-800" : "border-gray-300"
      } overflow-hidden ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-100 border-gray-300"
        } px-4 py-3 border-b`}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span
              className={`font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              code.{getFileExtension(language)}
              {hasUnsavedChanges && (
                <span className="text-orange-500 ml-1">●</span>
              )}
            </span>
          </div>

          <div className="flex bg-gray-700 p-1">
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                activeTab === "editor"
                  ? "bg-gray-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Editor
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
            {(language.toLowerCase() === "html" ||
              language.toLowerCase() === "css") && (
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  activeTab === "preview"
                    ? "bg-gray-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Preview
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white transition-colors text-sm"
          >
            {" "}
            {isRunning ? (
              <LoadingSpinner size="xs" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isRunning ? "Running..." : "Run"}
          </button>

          <button
            onClick={saveCode}
            className={`p-1.5 rounded transition-colors ${
              hasUnsavedChanges
                ? "text-orange-400 hover:text-orange-300 hover:bg-gray-700"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
            title="Save (Ctrl+S)"
          >
            <Save className="h-4 w-4" />
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
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title={isFullscreen ? "Exit Fullscreen (F11)" : "Fullscreen (F11)"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-300"
          } border-b p-4`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <label
                className={`block mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as "dark" | "light")}
                className={`w-full p-1 rounded border ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div>
              <label
                className={`block mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Font Size
              </label>
              <input
                type="range"
                min="10"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
              <span
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {fontSize}px
              </span>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={lineNumbers}
                  onChange={(e) => setLineNumbers(e.target.checked)}
                />
                <span
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }
                >
                  Line Numbers
                </span>
              </label>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={wordWrap}
                  onChange={(e) => setWordWrap(e.target.checked)}
                />
                <span
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }
                >
                  Word Wrap
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className={`flex ${isFullscreen ? "h-screen" : "h-96"}`}>
        {/* Editor */}
        {activeTab === "editor" && (
          <div className="flex-1 flex">
            {lineNumbers && (
              <div
                className={`${
                  theme === "dark"
                    ? "bg-gray-800 text-gray-500 border-gray-700"
                    : "bg-gray-50 text-gray-400 border-gray-300"
                } 
                w-12 p-2 border-r text-right font-mono text-sm select-none`}
              >
                {code.split("\n").map((_, index) => (
                  <div key={index} className="leading-6">
                    {index + 1}
                  </div>
                ))}
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => {
                handleCodeChange(e.target.value);
                handleCursorMove(e);
              }}
              onSelect={handleCursorMove}
              className={`flex-1 p-4 font-mono text-sm resize-none outline-none ${
                theme === "dark"
                  ? "  bg-gray-900 text-white"
                  : "bg-white text-gray-900"
              }`}
              style={{
                fontSize: `${fontSize}px`,
                whiteSpace: wordWrap ? "pre-wrap" : "pre",
                overflowWrap: wordWrap ? "break-word" : "normal",
              }}
              placeholder="Write your code here..."
              spellCheck={false}
            />
          </div>
        )}

        {/* Output */}
        {activeTab === "output" && (
          <div
            className={`flex-1 p-4 ${
              theme === "dark"
                ? "bg-gray-950 text-gray-300"
                : "bg-gray-50 text-gray-700"
            } font-mono text-sm overflow-auto`}
          >
            {" "}
            {isRunning ? (
              <div className="flex items-center gap-2 text-yellow-400">
                <LoadingSpinner size="sm" className="border-yellow-400" />
                Executing code...
              </div>
            ) : output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <div
                className={`${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                } italic`}
              >
                Click "Run" to execute your code and see the output here.
                <br />
                <br />
                <strong>Shortcuts:</strong>
                <br />
                • Ctrl+S (or Cmd+S) - Save
                <br />
                • Ctrl+Shift+Enter - Run code
                <br />• F11 - Toggle fullscreen
              </div>
            )}
          </div>
        )}

        {/* Preview */}
        {activeTab === "preview" && (
          <div className="flex-1">{renderPreview()}</div>
        )}
      </div>

      {/* Status Bar */}
      <div
        className={`${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-gray-400"
            : "bg-gray-100 border-gray-300 text-gray-600"
        } 
        px-4 py-2 border-t text-xs flex items-center justify-between`}
      >
        <div className="flex items-center gap-4">
          <span>
            Language: {language.charAt(0).toUpperCase() + language.slice(1)}
          </span>
          <span>Lines: {code.split("\n").length}</span>
          <span>
            Ln {cursorPosition.line}, Col {cursorPosition.column}
          </span>
          {hasUnsavedChanges && (
            <span className="text-orange-500">● Unsaved changes</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>{getFileExtension(language).toUpperCase()}</span>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:text-white transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
