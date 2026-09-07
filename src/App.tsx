import { BrowserRouter } from "react-router-dom";
import Routing from "./routes/Routing.Routes";
import "./services/Interceptors.Services";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
    <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;