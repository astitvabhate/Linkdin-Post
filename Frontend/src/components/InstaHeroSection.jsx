import React from 'react'
import { Sparkles } from 'lucide-react'
import InstagramPost from '../pages/InstagramPost'

const HeroSection = () => {
  return (
<>
    <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#94BBE9] to-[#c13c76] text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-bounce">
            <Sparkles className="w-4 h-4" />
            AI-Powered Content Creation
          </div>
          <img  src="/insta_logo.png" alt="logo" className='w-28 h-30 mx-auto opacity-50 hover:opacity-100 transition-opacity duration-300' />
          <h1 className="text-5xl font-bold bg-gradient-to-l from-[#f58529] via-[#dd2a7b] to-[#8134af] bg-clip-text text-transparent pb-7">
            Instagram Caption Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Craft scroll-stopping Instagram captions that spark conversations and grow your social presence
          </p>
        </div>
    </div>
</> 
  )
}

export default HeroSection