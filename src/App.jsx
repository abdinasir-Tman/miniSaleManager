import { createContext } from "react";
import logo from "./assets/logo.png";
import CustomerModal from "./components/Modal";
import MainBar from "./components/mainbar/MainBar";
import Sidebar from "./components/sidebar/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { useDispatch } from "react-redux";
import { readCustomers } from "./features/customerSlice";
export const CustomerContext = createContext();
function App() {
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const customerCollection = collection(db, "customers");
      const data = await getDocs(customerCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      dispatch(readCustomers(filteredData));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="grid grid-cols-5 h-screen">
      <CustomerContext.Provider value={{ name: "cali", fetchData }}>
        <Sidebar />
        <MainBar />
      </CustomerContext.Provider>
    </div>
  );
}

export default App;
