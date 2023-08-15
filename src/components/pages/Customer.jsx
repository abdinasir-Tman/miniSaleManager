import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCustomers, setModal } from "../../features/customerSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import CustomerModal from "../Modal";

const Customer = () => {
  const dispatch = useDispatch();
  const { customersList, currentCustomer } = useSelector(
    (store) => store.customers
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerCollection = collection(db, "customers");
        const data = await getDocs(customerCollection);
        const filteredData = data.docs.map((doc) => doc.data());
        dispatch(readCustomers(filteredData));
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [currentCustomer]);
  return (
    <div>
      <div className="px-2">
        <button
          onClick={() => dispatch(setModal(true))}
          className="btn bg-teal-500 py-3 px-5 float-right text-white"
        >
          Add new Customer
        </button>
        <table className="w-full border-collapse border-slate-200">
          <caption>
            <h1 className="text-center text-2xl font-robo mt-3 font-medium">
              Customers Lists
            </h1>
          </caption>
          <thead>
            <tr className="text-left">
              <th className="Thead">Customer Name</th>
              <th className="Thead">Phone</th>
              <th className="Thead"> Company</th>
              <th className="Thead">Balance</th>
            </tr>
          </thead>
          <tbody>
            {customersList.map((customer, i) => (
              <tr key={i}>
                <td className="Tbody">{customer.name}</td>
                <td className="Tbody">{customer.phone}</td>
                <td className="Tbody">{customer.company}</td>
                <td className="Tbody">16.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomerModal />
    </div>
  );
};

export default Customer;
