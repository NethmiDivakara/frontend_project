import {Routes,Route} from "react-router-dom"
import Dashboard from "../pages/Dashboard.Pages"


export default function Routing (){
    return (
        <Routes>
            <Route path= "/" element={<Dashboard/>}/>
            </Routes>
    );
}