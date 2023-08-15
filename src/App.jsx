import logo from "./assets/logo.png";
import CustomerModal from "./components/Modal";
import MainBar from "./components/mainbar/MainBar";
import Sidebar from "./components/sidebar/Sidebar";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="grid grid-cols-5 h-screen">
      <Sidebar />
      <MainBar />
    </div>
  );
}

export default App;
