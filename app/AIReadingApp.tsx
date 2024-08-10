"use client";

import React, { useState } from "react";

const AIReadingApp: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processText = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/process-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to process text: ${errorData.error || response.statusText}`
        );
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error processing text:", err);
      setError(
        `An error occurred while processing the text: ${err.message}. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>AI Reading Assistant</h1>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text here..."
        style={{ width: "100%", height: "150px", marginBottom: "10px" }}
      />

      <button
        onClick={processText}
        disabled={isLoading || inputText.trim() === ""}
        style={{ marginBottom: "10px" }}
      >
        {isLoading ? "Processing..." : "Process Text"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h2>Analysis Results</h2>
          <p>
            <strong>Summary:</strong> {result.summary}
          </p>
          <p>
            <strong>Keywords:</strong> {result.keywords.join(", ")}
          </p>
          <p>
            <strong>Word Count:</strong> {result.wordCount}
          </p>
          <p>
            <strong>Character Count:</strong> {result.charCount}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIReadingApp;
