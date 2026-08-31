import {Routes,Route,Navigate} from "react-router-dom"
import Dashboard from "../pages/Dashboard.Pages"
import {Register} from "../pages/Register.Pages"
import {Login }from "../pages/Login.Pages";


export default function Routing (){
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path= "/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            
            </Routes>
    );
}