import { serverUrl } from '../App';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCourseData } from '../redux/courseSlice';


const getPublishedCourse = () => {
    const  dispatch= useDispatch();
     //useDipatch course data ko leene ke liye aur store me set karne ke liye 
     //useEffect to fetch the published courses when the component mounts
     //useSelector to get the course data from the store

    useEffect(() => {
       const getCourseData = async()=>{
    try{
       const result = await axios.get(`${serverUrl}/api/v1/course/published`, {withCredentials:true});
            dispatch(setCourseData(result.data.data));
            console.log(result.data.data);


    } catch(error){
        console.log(error);

    }
  }
    getCourseData();

    }, []);

}

export default getPublishedCourse