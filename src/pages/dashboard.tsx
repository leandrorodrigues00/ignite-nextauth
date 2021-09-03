import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"

export default function DashBoard(){
    const {user} = useContext(AuthContext)
    
    return(
        <h1>DashBoard: {user?.email}</h1>
    )
}