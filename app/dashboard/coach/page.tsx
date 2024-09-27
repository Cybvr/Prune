'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EditorState } from 'draft-js';
import Editor from '../components/Editor';

const OptionsSelect: React.FC<{ options: string[]; selectedOption: string | null; onOptionClick: (option: string) => void }> = ({ options, selectedOption, onOptionClick }) => (
  <div className="mb-4">
    <h2 className="text-sm font-semibold mb-2">What would you like to do?</h2>
    <Select value={selectedOption || ''} onValueChange={onOptionClick}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const UserInput: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }> = ({ value, onChange }) => (
  <div className="mb-4">
    <h2 className="text-sm font-semibold mb-2">Describe what you want</h2>
    <Textarea
      value={value}
      onChange={onChange}
      placeholder="e.g How can I attract more customers to my online coaching service?"
      className="w-full text-sm"
      rows={4}
    />
  </div>
);

const ExamplesList: React.FC<{ examples: { icon: string; text: string }[] }> = ({ examples }) => (
  <div className="mb-4">
    <h2 className="text-sm font-semibold mb-2">Examples</h2>
    <ul className="space-y-2">
      {examples.map((example, index) => (
        <li key={index} className="flex items-center mb-2 text-xs">
          <span className="mr-2">{example.icon}</span>
          <span>{example.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CoachPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [content, setContent] = useState(EditorState.createEmpty()); // Ensure initial editor state is created

  const options = [
    'Get Awareness',
    'Get Users',
    'Product-Market Fit',
    'Build my Product',
    'Get better visibility',
    'Scaling my business'
  ];

  const examples = [
    { icon: '🎨', text: 'What\'s a good pricing strategy for "ClayCraft" pottery classes?' },
    { icon: '🎵', text: 'How can "MelodyMakers" keep fans engaged between album releases?' }
  ];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Submitting:', selectedOption, userInput);
    // Process the input and get response from OpenAI
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold">Coach</h1>
        <p className="text-sm text-muted-foreground">Your AI-powered business advisor</p>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 p-4 border-r border-border overflow-y-auto">
          <OptionsSelect options={options} selectedOption={selectedOption} onOptionClick={handleOptionClick} />
          <UserInput value={userInput} onChange={handleInputChange} />
          <Button onClick={handleSubmit} className="w-full mb-4 text-sm bg-muted text-primary hover:bg-primary/90">
            Submit
          </Button>
          <ExamplesList examples={examples} />
        </aside>
        <section className="w-3/4 p-4 overflow-y-auto bg-card text-card-foreground">
          {content && (
            <Editor
              editorState={content}
              onChange={setContent}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default CoachPage;