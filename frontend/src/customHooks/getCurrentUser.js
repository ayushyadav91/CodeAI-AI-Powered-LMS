import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

import { serverUrl } from '../App.jsx'


const getCurrentUser = () => {
    const dispatchEvent = useDispatch()

   useEffect(() => {
    const  fetchUserData = async () => {
       try{
        const result = await axios.get(`${serverUrl}/api/v1/user/current`,{withCredentials:true})
        dispatchEvent(setUserData(result.data));


       } catch (error) {
           console.log(error)
           dispatchEvent(setUserData(null));
       }
    }

   fetchUserData();
   }, [])
}

export default getCurrentUser