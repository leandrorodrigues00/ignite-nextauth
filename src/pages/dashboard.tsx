import { AuthContext } from "@/contexts/AuthContext"
import { api } from "@/services/api"
import { useContext, useEffect } from "react"

export default function DashBoard(){
    const {user} = useContext(AuthContext)


    useEffect(() =>{
        api.get('/me').then(response => console.log(response))
        .catch(err => console.error(err));
    }, [])
    
    return(
        <h1>DashBoard: {user?.email}</h1>
    )
}