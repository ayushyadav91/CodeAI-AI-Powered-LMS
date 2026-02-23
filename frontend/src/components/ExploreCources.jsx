import React from 'react'
import { SiViaplay } from "react-icons/si"
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { MdAppShortcut } from "react-icons/md";
import { FaBrain, FaShieldAlt } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiData } from "react-icons/bi";
import { MdOutlineAnalytics } from "react-icons/md";

const courseCards = [
  {
    icon: <TbDeviceDesktopAnalytics className="text-4xl text-purple-400" />,
    bg: "bg-purple-500/10 border-purple-500/20 group-hover:border-purple-400/50",
    iconBg: "bg-purple-500/20",
    label: "Web Devlopment",
  },
  {
    icon: <MdAppShortcut className="text-4xl text-green-400" />,
    bg: "bg-green-500/10 border-green-500/20 group-hover:border-green-400/50",
    iconBg: "bg-green-500/20",
    label: "UI UX Designing",
  },
  {
    icon: <MdAppShortcut className="text-4xl text-pink-400" />,
    bg: "bg-pink-500/10 border-pink-500/20 group-hover:border-pink-400/50",
    iconBg: "bg-pink-500/20",
    label: "App Devlopment",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-cyan-400" />,
    bg: "bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-400/50",
    iconBg: "bg-cyan-500/20",
    label: "Ethical Hacking",
  },
  {
    icon: <FaBrain className="text-4xl text-emerald-400" />,
    bg: "bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-400/50",
    iconBg: "bg-emerald-500/20",
    label: "AI/ML",
  },
  {
    icon: <BiData className="text-4xl text-pink-400" />,
    bg: "bg-pink-500/10 border-pink-500/20 group-hover:border-pink-400/50",
    iconBg: "bg-pink-500/20",
    label: "Data Science",
  },
  {
    icon: <AiOutlineBarChart className="text-4xl text-purple-400" />,
    bg: "bg-purple-500/10 border-purple-500/20 group-hover:border-purple-400/50",
    iconBg: "bg-purple-500/20",
    label: "Data Analytics",
  },
  {
    icon: <MdOutlineAnalytics className="text-4xl text-cyan-400" />,
    bg: "bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-400/50",
    iconBg: "bg-cyan-500/20",
    label: "AI Tools",
  },
];

function ExploreCources() {
  return (
    <div className=" bg-gray-900/40 border border-gray-700/50 text-white py-30 px-20 mb-10 rounded-3xl shadow-4xl relative overflow-hidden transition-all duration-300 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">

      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6">
          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
            Explore <br />
            <span className="text-cyan-400">Our Courses</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-md leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem vel
            iure explicabo laboriosam accusantium expedita laudantium facere magnam.
          </p>

          <button className="w-fit px-8 py-3 bg-black text-white border border-gray-700 rounded-xl font-semibold 
            hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 
            transition-all duration-300 flex items-center gap-2">
            Explore Courses
            <SiViaplay className="text-cyan-400" />
          </button>
        </div>

        {/* RIGHT SIDE - Course Grid */}
        <div className="grid grid-cols-4 gap-8 md:gap-5">
          {courseCards.map((card, i) => (
            <div
              key={i}
              className={`group flex flex-col items-center text-center gap-3 cursor-pointer 
                hover:-translate-y-2 transition-all duration-300 p-4 rounded-2xl border ${card.bg}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center 
                group-hover:scale-110 transition-all duration-300`}>
                {card.icon}
              </div>
              <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors leading-tight">
                {card.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default ExploreCources