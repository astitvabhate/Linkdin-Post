import React from 'react'
import { Sparkles } from 'lucide-react'
import InstagramPost from '../pages/InstagramPost'

const HeroSection = () => {
  return (
<>
    <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#609bdf] to-[#9170c5] text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-bounce">
            <Sparkles className="w-4 h-4" />
            AI-Powered Content Creation
          </div>
          <img  src="/linkedIn_logo.png" alt="logo" className='w-28 h-30 mx-auto opacity-50 hover:opacity-100 transition-opacity duration-300' />
          <h1 className="text-5xl font-bold bg-gradient-to-l from-[#00B4DB] to-[#0083B0] bg-clip-text text-transparent mb-4">
            LinkedIn Post Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create engaging, professional LinkedIn posts that drive conversations and boost your professional presence
          </p>
        </div>
    </div>
</> 
  )
}

export default HeroSection