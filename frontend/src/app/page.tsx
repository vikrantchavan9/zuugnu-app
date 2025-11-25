"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LOGO_URL from "../assets/zuugnu_logo.png";

export default function ZuugnuHome() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);

  // Generate Particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    container.innerHTML = "";

    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      // Tailwind classes for basic particle shape
      particle.className =
        "absolute w-[3px] h-[3px] bg-gold/60 rounded-full animate-float";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      // Randomize animation timing via inline styles since Tailwind doesn't support dynamic arbitrary values easily
      particle.style.animationDelay = Math.random() * 10 + "s";
      particle.style.animationDuration = 15 + Math.random() * 10 + "s";
      container.appendChild(particle);
    }
  }, []);

  // Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroLogoRef.current) {
        heroLogoRef.current.style.transform = `translateY(${
          window.scrollY * 0.3
        }px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Scroll Handler
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-midnight via-midnight-light to-midnight-lighter text-white overflow-x-hidden font-sans selection:bg-gold selection:text-midnight">
      {/* Animated Particles Container */}
      <div
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      />

      {/* Header */}
      <header className="sticky top-0 z-50 px-[5%] py-2 flex justify-between items-center bg-midnight/95 backdrop-blur-xl border-b border-gold/10 shadow-lg">
        <Image
          src={LOGO_URL}
          alt="Zuugnu"
          width={60}
          height={40}
          className="h-[60px] w-auto drop-shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => scrollToSection("home")}
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-9 items-center">
          {[
            "home",
            "features",
            "about",
            "compatibility",
            "contact",
            "sign in",
          ].map((item) => {
            const label = item.charAt(0).toUpperCase() + item.slice(1);

            // If the item is 'sign in', return a Link
            if (item === "sign in") {
              return (
                <Link
                  key={item}
                  href="/signin"
                  className="relative text-white font-medium text-base py-1 group transition-colors hover:text-gold cursor-pointer"
                >
                  {label}
                  {/* Animated Underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-gold to-coral transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            }

            // Otherwise, return the Scroll Button
            return (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative text-white font-medium text-base py-1 group transition-colors hover:text-gold cursor-pointer"
              >
                {label}
                {/* Animated Underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-gold to-coral transition-all duration-300 group-hover:w-full" />
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <div
          className="flex flex-col gap-[5px] cursor-pointer md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            className={`w-[25px] h-[3px] bg-gold rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-[25px] h-[3px] bg-gold rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-[25px] h-[3px] bg-gold rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </div>

        {/* Mobile Nav Menu */}
        <div
          className={`fixed top-20 right-0 w-full md:w-auto md:hidden bg-midnight/98 backdrop-blur-xl p-8 rounded-bl-2xl shadow-2xl transition-all duration-500 transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-6 text-center">
            {[
              "home",
              "features",
              "about",
              "compatibility",
              "contact",
              "sign in",
            ].map((item) => {
              const label = item.charAt(0).toUpperCase() + item.slice(1);

              // HANDLE SIGN IN LINK IN MOBILE MENU
              if (item === "sign in") {
                return (
                  <Link
                    key={item}
                    href="/signin"
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked
                    className="text-white font-medium text-lg hover:text-gold transition-colors"
                  >
                    {label}
                  </Link>
                );
              }

              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-white font-medium text-lg hover:text-gold transition-colors"
                >
                  {label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 min-h-[90vh] flex flex-col justify-center items-center text-center px-[5%] py-20"
      >
        <div ref={heroLogoRef} className="mb-10 animate-fadeInScale">
          {/* <Image
            src={LOGO_URL}
            width={600}
            height={200}
            alt="Zuugnu Logo"
            className="max-w-[600px] w-full h-auto drop-shadow-[0_10px_30px_rgba(255,215,0,0.4)]"
          /> */}
        </div>

        <div className="text-2xl sm:text-4xl mb-8 text-gold font-light tracking-widest animate-fadeInUp">
          Your Birth. Your Bond. Your Blueprint.
        </div>

        <div className="max-w-[900px] text-lg sm:text-md leading-relaxed mb-12 text-gray-200 animate-[fadeInUp_1s_ease_0.5s_both]">
          <p className="mb-4">
            Zuugnu is a next-generation platform combining{" "}
            <strong className="text-gold font-semibold">Psychometrics</strong>,{" "}
            <strong className="text-gold font-semibold">Astrology</strong>, and{" "}
            <strong className="text-gold font-semibold">Numerology</strong> to
            help individuals discover their potential, choose the right
            direction, and build meaningful relationships.
          </p>
          <p>
            From career guidance for students to compatibility assessments for
            couples, we empower every person to understand their unique
            blueprint— blending ancient wisdom with modern psychology.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 animate-[fadeInUp_1s_ease_0.7s_both]">
          {/* Primary Button */}
          <a
            href="#start"
            className="group relative px-12 py-4 rounded-full bg-linear-to-br from-gold to-coral text-white font-semibold shadow-[0_8px_25px_rgba(255,215,0,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(255,215,0,0.6)] transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:w-[300px] group-hover:h-[300px]" />
          </a>

          {/* Secondary Button */}
          <a
            href="#explore"
            className="group relative px-12 py-4 rounded-full bg-white/10 border-2 border-teal text-white font-semibold shadow-[0_4px_15px_rgba(78,205,196,0.2)] hover:-translate-y-1 hover:bg-teal/10 hover:shadow-[0_8px_25px_rgba(78,205,196,0.4)] transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Explore Assessments</span>
          </a>

          {/* Secondary Button */}
          <a
            href="#explore"
            className="group relative px-12 py-4 rounded-full bg-white/10 border-2 border-teal text-white font-semibold shadow-[0_4px_15px_rgba(78,205,196,0.2)] hover:-translate-y-1 hover:bg-teal/10 hover:shadow-[0_8px_25px_rgba(78,205,196,0.4)] transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Check Compatibility</span>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 py-24 px-[5%] bg-linear-to-b from-transparent to-black/30"
      >
        <h2 className="text-center text-4xl sm:text-5xl font-bold mb-5 bg-linear-to-br from-teal via-gold to-coral bg-clip-text text-transparent">
          Discover Your Journey
        </h2>
        <p className="text-center text-gray-400 text-xl mb-16">
          Unlock your potential with our holistic approach
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 max-w-[1300px] mx-auto">
          {[
            {
              icon: "🎯",
              title: "Career Guidance",
              desc: "Find your child's hidden strengths and ideal career path through comprehensive psychometric assessments.",
            },
            {
              icon: "💑",
              title: "Relationship Harmony",
              desc: "Understand compatibility and harmony in relationships with our blended numerological system.",
            },
            {
              icon: "🧠",
              title: "Emotional Intelligence",
              desc: "Uncover your innate talents and emotional intelligence with scientific precision and ancient wisdom.",
            },
            {
              icon: "⭐",
              title: "Holistic Insights",
              desc: "Blend destiny and data with scientific psychometric and astrological insights powered by AI.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative p-10 text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_15px_50px_rgba(255,215,0,0.3)] hover:border-gold/30 hover:bg-white/10 overflow-hidden"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-gold/10 to-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 text-6xl mb-6 inline-block transition-transform duration-500 group-hover:scale-110 group-hover:transform:rotateY(360deg)">
                {feature.icon}
              </div>
              <h3 className="relative z-10 text-2xl font-semibold text-gold mb-4">
                {feature.title}
              </h3>
              <p className="relative z-10 text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-[5%] flex flex-wrap justify-center gap-16">
        {[
          { num: "3", label: "Methodologies" },
          { num: "∞", label: "Possibilities" },
          { num: "1", label: "True You" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl min-w-[200px] transition-all hover:-translate-y-2 hover:bg-white/10"
          >
            <div className="text-5xl font-bold text-gold mb-2">{stat.num}</div>
            <div className="text-lg text-gray-300">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Mission Section */}
      <section
        id="about"
        className="relative z-10 py-24 px-[5%] bg-black/20 text-center"
      >
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-10 bg-linear-to-br from-coral via-gold to-teal bg-clip-text text-transparent">
            Join the Movement
          </h2>

          <p className="text-xl text-gray-300 leading-loose italic mb-12">
            Because when every firefly glows, the night itself becomes brighter.
          </p>

          <p className="text-xl text-gray-300 leading-loose mb-12">
            Let&apos;s raise a generation of self-aware, purpose-driven, and
            emotionally balanced citizens. We believe that when individuals
            align with their true purpose, families thrive, careers grow, and
            our nation moves toward a brighter future.
          </p>

          <button className="px-12 py-4 rounded-full bg-linear-to-br from-gold to-coral text-white font-semibold text-lg shadow-[0_8px_25px_rgba(255,215,0,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(255,215,0,0.6)] transition-all">
            Join Zuugnu Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-[5%] text-center bg-black/50 backdrop-blur-md border-t border-gold/20">
        <Image
          src={LOGO_URL}
          width={600}
          height={200}
          alt="Zuugnu"
          className="h-[50px] w-auto mx-auto mb-5 opacity-90"
        />
        <div className="text-lg text-gold mb-8">Where Science Meets Soul</div>

        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {["Privacy Policy", "Terms of Service", "Contact Us", "Careers"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-gray-300 hover:text-gold transition-colors"
              >
                {link}
              </a>
            )
          )}
        </div>

        <p className="text-gray-400 text-sm">
          &copy; 2025 Zuugnu. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
