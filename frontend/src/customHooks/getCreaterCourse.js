import { serverUrl } from "../App";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCreaterCourseData } from "../redux/courseSlice.js";

const getCreaterCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchCreatorCourses = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/v1/course/getcreator`, {
          withCredentials: true,
        });
        console.log(result.data);
        dispatch(setCreaterCourseData(result.data.data));
      } catch (error) {
        console.error(error);
      }
    };
      fetchCreatorCourses();
  }, [userData, dispatch]);
  // Optionally return anything if needed
};

export default getCreaterCourse;