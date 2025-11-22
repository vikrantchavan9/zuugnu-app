"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Eye, EyeOff, Phone, ArrowRight } from 'lucide-react';
import LOGO_URL from '../../assets/zuugnu_logo.png';


export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ phone: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Add your login logic here
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-midnight via-midnight-light to-midnight-lighter text-white font-sans flex flex-col">
      
      {/* Header */}
      <header className="flex justify-between items-center px-6 border-b border-gold/10 bg-midnight/50 backdrop-blur-md">
        <Link href="/">
            <Image 
              src={LOGO_URL} 
              alt="Zuugnu" 
              width={100} 
              height={50} 
              className=""
            />
        </Link>
        <div className="text-gold font-semibold text-lg tracking-wide uppercase">
            Login Panel
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeInUp">
        
        <div className="w-full max-w-md space-y-8">
            
            {/* Register Instruction Card */}
            <div className="bg-linear-to-r from-midnight-light to-midnight border border-gold/30 rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(255,215,0,0.15)] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-gold to-coral"></div>
                
                <div className="flex justify-center mb-3 text-gold">
                    {/* Register Logo/Icon Placeholder */}
                                        <Image 
                        src={LOGO_URL} 
                        alt="Login" 
                        width={100} 
                        height={40} 
                        className="mx-auto mb-2 opacity-80" 
                    />
                </div>
                
                <h2 className="text-xl font-bold text-white mb-2">Register</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                    WhatsApp your <span className="text-gold font-semibold">Full Name</span> to <br />
                    <a href="https://wa.me/918800607598" className="text-xl font-bold text-teal hover:underline decoration-dotted decoration-teal underline-offset-4">
                        +91 88006 07598
                    </a>
                    <br />
                    To Receive the Login Password.
                </p>
            </div>

            {/* Login Form */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <Image 
                        src={LOGO_URL} 
                        alt="Login" 
                        width={100} 
                        height={40} 
                        className="mx-auto mb-2 opacity-80" 
                    />
                    <h3 className="text-2xl font-bold text-gold">Login</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* WhatsApp Number Input */}
                    <div className="space-y-2">
                        <div className="relative flex items-center">
                            {/* Country Flag / Code */}
                            <div className="absolute left-0 pl-3 flex items-center pointer-events-none border-r border-white/10 pr-3 h-full">
                                <span className="text-xl mr-2">🇮🇳</span>
                                <span className="text-gray-400 font-mono">+91</span>
                            </div>
                            <input 
                                type="tel" 
                                placeholder="WhatsApp No"
                                className="w-full bg-midnight-light/50 border border-white/10 rounded-xl py-3.5 pl-[110px] pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <div className="relative flex items-center">
                            {/* Lock Icon */}
                            <div className="absolute left-4 text-gray-400">
                                <Lock className="w-5 h-5" />
                            </div>
                            
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password"
                                className="w-full bg-midnight-light/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />

                            {/* View/Eye Icon */}
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-gray-400 hover:text-gold transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-linear-to-r from-gold to-coral text-white font-bold py-4 rounded-xl shadow-[0_4px_15px_rgba(255,215,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,215,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        <span>Secure Login</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Footer Links */}
                    <div className="flex items-center justify-center text-sm mt-6 pt-6 border-t border-white/10">
                        <button type="button" className="text-gray-400 hover:text-white transition-colors">
                            Forget Password?
                        </button>
                    </div>

                </form>
            </div>

        </div>
      </main>

      {/* Copyright Footer */}
      <footer className="py-6 text-center text-xs text-gray-500 border-t border-white/5">
        <p>&copy; 2025 Zuugnu.com <span className="mx-2 opacity-30">||</span> All rights reserved.</p>
      </footer>

    </div>
  );
}