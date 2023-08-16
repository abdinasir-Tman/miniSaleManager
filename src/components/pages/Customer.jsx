import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomer,
  getCustomer,
  readCustomers,
  setModal,
} from "../../features/customerSlice";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import CustomerModal from "../Modal";
import { MdDeleteSweep } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { ConfirmToast } from "react-confirm-toast";
import toast, { Toaster } from "react-hot-toast";
import { CustomerContext } from "../../App";
const Customer = () => {
  const dispatch = useDispatch();
  const { customersList, currentCustomer } = useSelector(
    (store) => store.customers
  );
  //reading data
  const { fetchData } = useContext(CustomerContext);
  useEffect(() => {
    fetchData();
  }, [currentCustomer]);
  //delete Customer
  const deleteCustomerMethod = (id) => {
    dispatch(deleteCustomer(id));
    toast.success("Deleted");
    fetchData();
  };
  //geting update customer
  const getCustomerUpdate = async (id) => {
    const deletingDoc = doc(db, "customers", id);
    const data = await getDoc(deletingDoc);
    dispatch(getCustomer({ data: data.data(), id }));
    dispatch(setModal(true));
  };
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
              <th className="Thead">Action</th>
            </tr>
          </thead>
          <tbody>
            {customersList.map((customer, i) => (
              <tr key={i}>
                <td className="Tbody">{customer.name}</td>
                <td className="Tbody">{customer.phone}</td>
                <td className="Tbody">{customer.company}</td>
                <td className="Tbody">
                  <button>
                    <ConfirmToast
                      position="top-right"
                      customFunction={() => {
                        deleteCustomerMethod(customer.id);
                        console.log(customer.id);
                      }}
                    >
                      <MdDeleteSweep
                        className="text-pink-600 text-xl cursor-pointer"
                        // onClick={() => deleteCustomerMethod(customer.id)}
                      />
                    </ConfirmToast>
                  </button>
                  <button>
                    <BiSolidEditAlt
                      onClick={() => getCustomerUpdate(customer.id)}
                      className="text-pink-600 text-xl cursor-pointer"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <Toaster />
        </table>
      </div>
      <CustomerModal />
    </div>
  );
};

export default Customer;
