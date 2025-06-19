// src/components/PostForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function PostForm() {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('');
  const [length, setLength] = useState('');
  const [output, setOutput] = useState('');
  const [tone, setTone] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/generate', {
        prompt,
        language,
        length,
        tone,
      });
      setOutput(res.data.generated);
    } catch (err) {
      setOutput('❌ Failed to generate post. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4 bg-white shadow-xl rounded-xl mt-10">
      <h1 className="text-2xl font-bold text-center">LinkedIn Post Generator</h1>
      
      <textarea
        className="w-full p-3 border rounded-md"
        rows="4"
        placeholder="What do you want to post about?"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {/* why cant i see placeholder in textarea? */}
      <div className="flex justify-between gap-4">
        <select
          className="flex-1 p-2 border rounded-md"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="" disabled>Select Language</option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="hinglish">Hinglish</option>
        </select>

        <select
          className="flex-1 p-2 border rounded-md"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        >
          <option value="" disabled>Select Length</option>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      
        <select
          className="flex-1 p-2 border rounded-md"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="" disabled>Select Tone</option>      
          <option value="friendly">Friendly</option>
          <option value="sarcastic">Sarcastic</option>
          <option value="professional">Professional</option>
          <option value="engaging">Engaging</option>
          <option value="informative">Informative</option>
          <option value="casual">Casual</option>
          <option value="motivational">Motivational</option>
          <option value="inspirational">Inspirational</option>
        </select>
        </div>
      <button 
        onClick={handleGenerate}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer"
      >
        Generate Post
      </button>

      {output && (
        <div className="p-4 bg-gray-100 rounded-md mt-4">
          <p className="whitespace-pre-wrap">{output}</p>
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="mt-2 text-blue-600 text-sm cursor-pointer hover:underline"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}
