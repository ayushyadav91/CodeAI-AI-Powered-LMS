import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { FiArrowRight, FiCode, FiZap, FiTarget } from 'react-icons/fi';
import { FaBrain } from "react-icons/fa";
import Snowfall from 'react-snowfall';




function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSnowing, setIsSnowing] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const toggleSnowfall = () => {
    setIsSnowing(isSnowing);
  };
  // Track mouse position for gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const courses = [
    { id: 1, title: 'Web Development', level: 'Beginner', students: '12.5K', color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'React Mastery', level: 'Intermediate', students: '8.3K', color: 'from-purple-500 to-pink-500' },
    { id: 3, title: 'Full Stack Pro', level: 'Advanced', students: '5.2K', color: 'from-green-500 to-emerald-500' },
    { id: 4, title: 'Mobile Dev', level: 'Intermediate', students: '6.8K', color: 'from-orange-500 to-red-500' },
  ];

  const features = [
    { icon: FiCode, title: 'Live Coding', desc: 'Code along with expert instructors in real-time' },
    { icon: FiZap, title: 'Fast Learning', desc: 'Master concepts in weeks, not months' },
    { icon: FiTarget, title: 'Career Ready', desc: 'Get job-ready with industry projects' },
  ];

  return (
    <div className="w-full overflow-hidden bg-black text-white" >
      {isSnowing && <Snowfall />}
      {/* Navigation */}
      <Nav />
      {/* Hero Section with Dynamic Background */}
      <section className="relative w-full min-h-screen pt-20 overflow-hidden"
      >
        {/* Animated background grid */}
        {/* <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-transparent to-purple-600"
            style={{
              backgroundPosition: `${mousePosition.x * 0.05}px ${mousePosition.y * 0.05}px`,
              transition: 'background-position 0.3s ease-out'
            }}
          />
        </div> */}

        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-7xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-7xl opacity-20 animate-blob animation-delay-4000" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-7xl opacity-20 animate-blob" />


        {/* Hero Content */}
        <div className="relative z-10 max-w-10xl mx-auto px-6 py-20 text-center">
          {/* Animated badge */}
          <div className="inline-block mb-6 animate-fade-in-down">
            <span className="px-8 py-2 rounded-full border border-blue-450/30 bg-blue-400/10 text-blue-250 text-sm font-medium backdrop-blur-md hover:border-blue-500/60 transition-all duration-300">
              🚀 Learn with the Best Engineers
            </span>
          </div>


          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 animate-fade-in-up animation-delay-200">
            Master web development, mobile apps, and AI with hands-on projects. Learn from industry experts and launch your dream career.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-in-up animation-delay-400">
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-0 to-cyan-900 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                animation: 'pulse-glow 2s ease-in-out infinite'
              }}>
              Search With AI <FaBrain className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-gray-600 hover:border-white rounded-lg font-bold text-lg transition-all duration-300 hover:bg-white/5">
              View All Courses 
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-20 animate-fade-in-up animation-delay-600">
            {[
              { number: '50K+', label: 'Active Learners' },
              { number: '200+', label: 'Courses' },
              { number: '95%', label: 'Success Rate' }
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-lg border border-gray-700/50 bg-gray-900/30 hover:bg-gray-900/60 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400">{stat.number}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400">Scroll to explore</span>
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4">Why Choose Us?</h2>
          <p className="text-gray-400 text-lg">Everything you need to succeed in tech</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="group p-8 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                style={{
                  animation: `slide-up 0.6s ease-out ${i * 0.1}s both`
                }}>
                <Icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4">Popular Courses</h2>
          <p className="text-gray-400 text-lg">Start your learning journey today</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <div key={course.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
              style={{
                animation: `slide-up 0.6s ease-out ${i * 0.15}s both`
              }}>

              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-20 group-hover:opacity-40 transition-opacity`} />

              {/* Border glow effect */}
              <div className="absolute inset-0 border border-gray-700 group-hover:border-cyan-500/50 rounded-xl transition-colors" />

              {/* Content */}
              <div className="relative p-6 bg-gray-900/80 backdrop-blur-sm rounded-xl h-full flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 mb-3">
                    {course.level}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{course.title}</h3>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{course.students} students</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-2xl" />

            {/* Content */}
            <div className="relative bg-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Transform Your Career?</h2>
              <p className="text-gray-300 text-lg mb-8">Join thousands of successful learners worldwide</p>
              <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Home;




// import Snowfall from 'react-snowfall';
//  const [isSnowing, setIsSnowing] = useState(false);

//   const toggleSnowfall = () => {
//     setIsSnowing(!isSnowing);
//   };

//    <button
//         onClick={toggleSnowfall}
//         className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 z-10"
//       >
//         {isSnowing ? 'Stop Snowfall' : 'Start Snowfall'}
//     </button>

