import React, { useState } from 'react';
import axios from 'axios';
import { Send, Copy, Sparkles, Users, TrendingUp, MessageCircle, Lightbulb } from 'lucide-react';
import Footer from '../components/Footer';

export default function CreativeLinkedInGenerator() {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('');
  const [length, setLength] = useState('');
  const [tone, setTone] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
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
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = ()=>{
    window.location.reload(true);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { icon: Users, label: "10M+ Posts", value: "Generated" },
    { icon: TrendingUp, label: "85% Increase", value: "in Engagement" },
    { icon: MessageCircle, label: "50K+ Users", value: "Trust Us" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#0083B0] text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-bounce">
            <Sparkles className="w-4 h-4" />
            AI-Powered Content Creation
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-l from-[#00B4DB] to-[#0083B0] bg-clip-text text-transparent mb-4">
            LinkedIn Post Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create engaging, professional LinkedIn posts that drive conversations and boost your professional presence
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-l from-[#00B4DB] to-[#0083B0] p-3 rounded-xl">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Generator */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-l from-[#00B4DB] to-[#0083B0] p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Create Your Post</h2>
            </div>
            <p className="text-blue-100">Transform your ideas into engaging LinkedIn content in seconds</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-700">
                What's on your mind? ✨
              </label>
              <div className="relative">
                <textarea
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 resize-none text-lg"
                  rows="4"
                  placeholder="Share your thoughts, insights, or experiences... e.g., 'remote work productivity tips' or 'career growth strategies'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  maxLength={500}
                />
                <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                  {prompt.length}/500
                </div>
              </div>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Language 🌍</label>
                <select
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="" disabled>Choose Language</option>
                  <option value="english">English</option>
                  <option value="hinglish">Hinglish</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Length 📏</label>
                <select
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                >
                  <option value="" disabled>Choose Length</option>
                  <option value="short">Short & Simple</option>
                  <option value="medium">Medium & Insightful</option>
                  <option value="long">Long & Detailed</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Tone 🎭</label>
                <select
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="" disabled>Choose Tone</option>
                  <option value="professional">Professional</option>
                  <option value="engaging">Engaging</option>
                  <option value="inspirational">Inspirational</option>
                  <option value="motivational">Motivational</option>
                  <option value="informative">Informative</option>
                  <option value="casual">Casual</option>
                  <option value="sarcastic">Sarcastic</option>
                </select>
              </div>
            </div>

            {/* Generate Button  */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-gradient-to-l from-[#00B4DB] to-[#0083B0] text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-[#00B4DB] hover:to-[#0083B0] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating Magic...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Re-Generate LinkedIn Post
                </>
              )}
            </button>

            {/*Clear button on click i want to reloade page*/}
            <button
            onClick={handleClear}
            className="w-full  text-black  border-grey-300 py-4 px-8 rounded-2xl font-bold text-lg hover:from-[#00B4DB] hover:to-[#0083B0] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 hover: border-1 cursor-pointer"
            disabled = {isGenerating || (!prompt && !language && !length && !tone)}
            >Clear
            </button>
            {/* Output Section */}
            {output && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Your Generated Post 🎉</h3>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-100 ${
                      copied 
                        ? 'bg-green-100 text-green-700 border-2 border-green-300 ' 
                        : 'bg-blue-100 text-blue-700 border-2 border-blue-300 hover:bg-blue-200'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied! ✅' : 'Copy Post'}
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border-2 border-gray-200">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                      {output}
                    </pre>
                  </div>
                </div>

                {/* Post Preview Stats */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-green-700">
                      <TrendingUp className="w-4 h-4" />
                      <span>High Engagement Potential</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-700">
                      <MessageCircle className="w-4 h-4" />
                      <span>Conversation Starter</span>
                    </div>
                    <div className="flex items-center gap-1 text-purple-700">
                      <Sparkles className="w-4 h-4" />
                      <span>Professional Quality</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}