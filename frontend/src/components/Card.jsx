import React from 'react';
import { FaStar, FaUsers, FaPlay } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const Card = ({ thumbnail, title, price, category, id }) => {
  return (
    <div className="group relative w-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-48">
        <img
          src={thumbnail || "https://placehold.co/400x200/1a1a2e/cyan?text=Course"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Play overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center">
            <FaPlay className="text-white text-sm ml-1" />
          </div>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm text-cyan-400 text-xs font-semibold rounded-full border border-cyan-500/30">
          {category || "Development"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h2 className="text-white text-lg font-bold leading-tight group-hover:text-cyan-400 transition-colors duration-200 line-clamp-2">
          {title || "Course Title"}
        </h2>

        {/* Rating + Students */}
        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 text-yellow-400 font-semibold">
            <FaStar className="text-xs" /> 4.9
          </span>
          <span className="text-gray-500">·</span>
          <span className="flex items-center gap-1 text-gray-400">
            <FaUsers className="text-xs" /> 2.4k students
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-white">${price || "0"}</span>
            <span className="text-gray-500 text-xs ml-1 line-through">$99</span>
          </div>
          <button className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 group/btn">
            Enroll
            <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;