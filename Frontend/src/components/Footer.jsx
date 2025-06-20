import React from 'react'
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";


const Footer = () => {
  return (
    <>
    <div className="text-center mt-12 text-gray-600">
          <p className="text-3xl">Ready to boost your LinkedIn presence? 🚀</p>
          <p className="text-sm mt-2">Generate unlimited posts and watch your network grow!</p>
            <p className="text-xs mt-4">© LinkedIn Post Generator. All rights reserved.</p>
            <p className="text-xs mt-2">Made with ❤️ by Astitva Bhate</p>
            <div className='flex justify-center items-center-safe mt-2 gap-10'>
            <div className='flex flex-col md:flex-row gap-4 justify-center items-center mt-4'>
            <p className="text-xs flex flex-col"><a href="mailto:astitvaworks@gmail.com"><IoIosMail size={20} className='mx-auto'  />astitvaworks@gmail.com</a></p>
            <p className="text-xs flex flex-col"><a href="https://linkedin.com/in/astitva-bhate" target="_blank" rel="noopener noreferrer"><FaLinkedinIn size={20} className='mx-auto' /> linkedin.com/in/astitva-bhate</a></p>
            <p className="text-xs flex flex-col"><IoLogoGithub size={20} className='mx-auto' /> <a href="https://github.com/astitvabhate" target="_blank" rel="noopener noreferrer"> github.com/astitvabhate</a></p>
            </div>
            </div>
            </div>
    </>
  )
}

export default Footer