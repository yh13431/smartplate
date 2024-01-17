import React from 'react';
import Image from 'next/image';

const Hero = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Image src="/hero.jpg" alt="hero" layout="fill" objectFit="cover"/>
        <div className="relative z-8 text-center text-white">
          <h1 className="text-7xl font-extrabold mb-4">SmartPlate</h1>
          <p className="text-lg mb-8">Discover the simplicity of healthy eating</p>
        </div>
      </div>
    );
  };
  

export default Hero;