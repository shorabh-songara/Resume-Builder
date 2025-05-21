import React , {createContext , useState , useEffect}from 'react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

export const UserContext=  createContext();

const UserProvider = ({children})=>{

    const [loading , setLoading] = useState(true);
    const [user , setUser]= useState(null);

    useEffect(()=>{

        if(user) return;
        const accessToken = localStorage.getItem("token")
        if(!accessToken){
            setLoading(false)
            return;
        }

        const fetchuser = async()=>{
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data)
            } catch (error) {
                console.log("user not authenticated", error);
                clearuser()
                
            }finally{
                setLoading(false)
            }
        }
        fetchuser();
    },[])

    const updateuser = (userData)=>{
        setUser(userData);
        localStorage.setItem("token",userData.token) // save token
        setLoading(false);
    }

    const clearuser = ()=>{
        setUser(null);
        localStorage.removeItem("token");
    }

    return (
        <UserContext.Provider value={{user , loading , updateuser , clearuser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;