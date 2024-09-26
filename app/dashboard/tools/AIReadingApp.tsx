"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from './components/ui/button';
import { TextArea } from './components/ui/textarea';
import styles from '@/styles/Home.module.css';
import { Send, Sun, Moon, Type, VolumeX, Volume2, Info } from 'lucide-react';

const AIReadingApp: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [showInfo, setShowInfo] = useState(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setWordCount(inputText.split(/\s+/).filter(Boolean).length);
  }, [inputText]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const processText = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/process-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      if (!response.ok) throw new Error("Failed to process text");
      const data = await response.json();
      setResult(data);
      setShowInfo(false);
    } catch (err) {
      setError("An error occurred while processing the text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextToSpeech = () => {
    if (!isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(inputText);
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const changeFontSize = (increment: number) => setFontSize(prevSize => Math.max(12, Math.min(24, prevSize + increment)));

  return (
    <div className={`${styles.aiReadingApp} ${isDarkMode ? styles.darkMode : ''}`}>
      <div className={styles.toolbar}>
        <Button onClick={handleTextToSpeech} className={styles.iconButton}>
          {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
        <span className={styles.wordCount}><Type size={20} /> {wordCount}</span>
        <Button onClick={toggleTheme} className={styles.iconButton}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        <Button onClick={() => changeFontSize(-2)} className={styles.iconButton}>
          <Type size={16} />
        </Button>
        <Button onClick={() => changeFontSize(2)} className={styles.iconButton}>
          <Type size={24} />
        </Button>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.inputContainer}>
          <TextArea
            ref={textAreaRef}
            value={inputText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
            style={{ fontSize: `${fontSize}px` }}
            className={styles.textArea}
          />
          <Button
            onClick={processText}
            disabled={isLoading || inputText.trim() === ""}
            className={styles.sendButton}
          >
            <Send size={20} />
          </Button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {showInfo && (
          <div className={styles.infoBox}>
            <p><Info size={16} /> Enter text, click send to analyze.</p>
          </div>
        )}

        {result && (
          <div className={styles.results}>
            <h3>Analysis Results</h3>
            <p><strong>Summary:</strong> {result.summary}</p>
            <p><strong>Keywords:</strong> {result.keywords.join(", ")}</p>
            <p><strong>Word Count:</strong> {result.wordCount}</p>
            <p><strong>Character Count:</strong> {result.charCount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIReadingApp;