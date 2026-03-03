import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Card from './Card';
import { FiArrowRight } from 'react-icons/fi';

const CardPage = () => {
  const { courseData } = useSelector((state) => state.course);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    if (courseData) {
      const filtered = courseData
        .filter((course) => course.isPublished === true)
        .slice(0, 3);
      setPopularCourses(filtered);
    }
  }, [courseData]);

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-14">
        <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-400/10 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-4 inline-block">
          Top Picks
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
          Explore Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Latest Courses
          </span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          From Web Development to AI/ML — explore a diverse range of courses to
          fuel your learning journey and empower your future success!
        </p>
      </div>

      {/* Cards Grid */}
      {popularCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
          {popularCourses.map((course, i) => (
            <Card
              key={course._id || i}
              thumbnail={course.thumbnailUrl}
              title={course.title}
              price={course.price}
              category={course.category}
              id={course._id}
            />
          ))}
        </div>
      ) : (
        /* Loading skeleton */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 animate-pulse"
            >
              <div className="h-48 bg-gray-800" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-800 rounded w-3/4" />
                <div className="h-4 bg-gray-800 rounded w-1/2" />
                <div className="h-px bg-gray-800" />
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-800 rounded w-1/4" />
                  <div className="h-9 bg-gray-800 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="flex justify-center mt-12">
        <button className="group flex items-center gap-2 px-8 py-3 border border-gray-700 hover:border-cyan-500 text-white hover:text-cyan-400 rounded-xl font-semibold transition-all duration-300 hover:bg-cyan-500/5">
          View All Courses
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CardPage;