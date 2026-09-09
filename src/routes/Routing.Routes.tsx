import {Routes,Route,Navigate,Outlet} from "react-router-dom"
import Dashboard from "../pages/Dashboard.Pages"
import { ProductsPage } from "../pages/Products.Pages"
import { StorePage } from "../pages/Store.Pages"
import {Register} from "../pages/Register.Pages"
import {Login }from "../pages/Login.Pages";
import { AppLayout } from "../components/Aside.Component"
import {
    clearAuthSession,
} from "../services/Interceptors.Services";

function ProtectedRoute() {
    const hasInvalidSession = () => {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
    

        return (
            !accessToken ||
            !refreshToken 
           
        );
    };

    if (hasInvalidSession()) {
        clearAuthSession();
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}


export default function Routing (){
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/store" element={<StorePage />} />
                </Route>
            </Route>
            <Route path= "/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            </Routes>
    );
}