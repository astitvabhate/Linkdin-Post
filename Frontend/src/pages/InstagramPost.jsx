import React, { useState } from 'react';
import axios from 'axios';
import { Send, Copy, Sparkles, TrendingUp, MessageCircle, Lightbulb, Image as ImageIcon } from 'lucide-react';
import InstaHeroSection from "../components/InstaHeroSection.jsx"
import States from '../components/states';
import colabrative_heroNavbar from "../components/colabrative_heroNavbar.jsx"
import Instastates from '../components/instastates.jsx';

export default function InstagramPost() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('');
  const [length, setLength] = useState('');
  const [tone, setTone] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image && !prompt){
    };
    setIsGenerating(true);
    setOutput('');
    
    try {
      const formData = new FormData();
      if (image) formData.append('image', image);
      formData.append('prompt', prompt);
      formData.append('language', language);
      formData.append('length', length);
      formData.append('tone', tone);

      const res = await axios.post('http://localhost:5000/generate-insta-caption', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setOutput(res.data.generated);
    } catch (err) {
      setOutput('❌ Failed to generate caption. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setImage(null);
    setImagePreview('');
    setPrompt('');
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      {/* ... (keep your existing hero section and other components) ... */}
      <InstaHeroSection/>

      <Instastates />

      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-l from-[#f58529] via-[#dd2a7b] to-[#8134af] p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Instagram Caption Generator</h2>
            </div>
            <p className="text-pink-100">Upload an image or describe your post to get a creative caption</p>
          </div>
          
          <div className="p-8 space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-700">
               <ImageIcon className="inline w-5 h-5 text-[#dd2a7b]" /> Upload your Image  
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-pink-50 file:text-pink-700
                  hover:file:bg-pink-100"
                disabled={isGenerating}
              />
              {imagePreview && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 rounded-xl border border-gray-200 shadow"
                  />
                </div>
              )}
            </div>

            {/* Text Prompt Section */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Describe about your Post 
              </label>
              <textarea
                value={prompt}
                required
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="E.g. 'beach sunset with friends'"
                rows={3}
                disabled={isGenerating}
              />
            </div>

            {/* Options Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language🌍</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  disabled={isGenerating}
                >
                  <option value="" disabled>Choose Language </option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Hinglish">Hinglish</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Length📏</label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  disabled={isGenerating}
                >
                  <option value="" disabled>Choose Length </option>
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone🎭</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  disabled={isGenerating}
                >
                  <option value="" disabled>Choose Tone</option>
                  <option value="aesthetic">Aesthetic</option>
                  <option value="funny">Funny</option>
                  <option value="sarcastic">Sarcastic</option>
                  <option value="witty">Witty</option>
                  <option value="emotional">Emotional</option>
                  <option value="bold">Bold</option>
                  <option value="romantic">Romantic</option>
                  <option value="deep">Deep</option>
                  <option value="vibey">Vibey</option>
                  <option value="motivational">Motivational</option>
                  <option value="grateful">Grateful</option>
                  <option value="relatable">Relatable</option>
                  <option value="sassy">Sassy</option>
                  <option value="chill">Chill</option>
                  <option value="adventurous">Adventurous</option>
                  <option value="playful">Playful</option>
                  <option value="captionless">Captionless</option>

                </select>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="flex gap-4">
              <button
                onClick={handleGenerate}
                disabled={(!image && !prompt) || isGenerating}
                className="flex-1 bg-gradient-to-l from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-[#f58529] hover:to-[#515bd4] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Generate Caption
                  </>
                )}
              </button>

              <button
                onClick={handleClear}
                className="flex-1 text-black border border-gray-300 py-4 px-8 rounded-2xl font-bold text-lg hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                disabled={isGenerating}
              >
                Clear
              </button>
            </div>

            {/* Output Section */}
            {output && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Your Generated Caption 🎉</h3>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-100 ${
                      copied
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : 'bg-pink-100 text-pink-700 border-2 border-pink-300 hover:bg-pink-200'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied! ✅' : 'Copy Caption'}
                  </button>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border-2 border-pink-200">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                      {output}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}