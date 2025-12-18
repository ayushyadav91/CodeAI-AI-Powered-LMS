
import React, { useState } from 'react';
import Nav from '../component/Nav';


function Home() {


  return (
   <div className="ClassName=w-[100%] overflow-hidden">
          <div className="w-[100] lg:h-[140vh] h-[70vh] relative ">
            <Nav />
          </div>
    
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

