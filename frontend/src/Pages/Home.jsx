
import React, { useState } from 'react';
import Snowfall from 'react-snowfall';

function Home() {

  const [isSnowing, setIsSnowing] = useState(false);

  const toggleSnowfall = () => {
    setIsSnowing(!isSnowing); 
  };
  return (
   <div className="flex flex-col items-center justify-center h-screen relative overflow-hidden">
      
    
      {isSnowing && (
        <Snowfall 
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          snowflakeCount={100}
        />
      )}

      <h1 className="text-4xl font-bold text-center z-10">
        Welcome to AI Power LMS
      </h1>
      <p className="text-center z-10 p-4">
        AI Power LMS is a platform that allows you to create and manage your
        virtual courses. With AI Power LMS, you can easily create, manage, and
        track your virtual courses, and access them from anywhere.
      </p>

     
      <button
        onClick={toggleSnowfall}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 z-10"
      >
        {isSnowing ? 'Stop Snowfall' : 'Start Snowfall'}
      </button>
    </div>
  );
}

export default Home;




