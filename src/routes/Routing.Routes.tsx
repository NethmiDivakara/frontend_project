import {Routes,Route} from "react-router-dom"
import Dashboard from "../pages/Dashboard.Pages"

import {Login }from "../pages/Login.Pages";


export default function Routing (){
    return (
        <Routes>
            <Route path= "/" element={<Login/>}/>
            <Route path="" element={<Dashboard />} />
            
            </Routes>
    );
}