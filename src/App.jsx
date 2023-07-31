import logo from "./assets/logo.png";
import MainBar from "./components/mainbar/MainBar";
import Sidebar from "./components/sidebar/Sidebar";
function App() {
  return (
    <div className="grid grid-cols-5 h-screen">
      <Sidebar />
      <MainBar />
    </div>
  );
}

export default App;
