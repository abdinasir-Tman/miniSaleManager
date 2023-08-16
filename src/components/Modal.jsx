import React, { useContext, useRef, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  registerCustomer,
  setModal,
  updateCompany,
  updateCustomer,
  updateName,
  updatePhone,
} from "../features/customerSlice";
import toast, { Toaster } from "react-hot-toast";
import { CustomerContext } from "../App";
// import { fetchData } from "./pages/Customer";
const CustomerModal = () => {
  let subtitle;
  const { currentCustomer, IsModal, IsUpdate } = useSelector(
    (store) => store.customers
  );
  const dispatch = useDispatch();

  function openModal() {
    dispatch(setModal(true));
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    dispatch(setModal(false));
  }
  const formRef = useRef();
  const { fetchData } = useContext(CustomerContext);
  //register Customer
  const registerationCustomer = (e) => {
    e.preventDefault();
    if (IsUpdate) {
      dispatch(updateCustomer());
      formRef.current.reset();
      toast.success("Updated Successfully");
      fetchData();
      dispatch(setModal(false));
    } else {
      dispatch(registerCustomer());
      formRef.current.reset();
      toast.success("Registered Successfully");
      dispatch(setModal(false));
    }
  };
  return (
    <div>
      <Modal
        isOpen={IsModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
        className="fixed bg-white p-4 rounded-md top-10 left-40 right-40 bottom-20"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="text-2xl text-center"
        >
          Customer Regestration
        </h2>
        <button
          onClick={closeModal}
          className="absolute top-3 right-4 text-3xl font-bold "
        >
          &times;
        </button>

        <form ref={formRef} onSubmit={registerationCustomer}>
          <div className="grid grid-cols-2 my-3 gap-2">
            <div>
              <label htmlFor="" className="block text-2xl font-thin mb-2">
                Customer Name
              </label>
              <input
                value={currentCustomer.name}
                autoComplete="of"
                type="text"
                className="formInput"
                onChange={(e) => dispatch(updateName(e.target.value))}
                required
              />
            </div>
            <div>
              <label htmlFor="" className="block text-2xl font-thin mb-2">
                Customer Phone
              </label>
              <input
                value={currentCustomer.phone}
                autoComplete="of"
                type="text"
                className="formInput"
                onChange={(e) => dispatch(updatePhone(e.target.value))}
                required
              />
            </div>
            <div>
              <label htmlFor="" className="block text-2xl font-thin mb-2">
                Company Name
              </label>
              <input
                value={currentCustomer.company}
                type="text"
                autoComplete="of"
                className="formInput"
                onChange={(e) => dispatch(updateCompany(e.target.value))}
                required
              />
            </div>
          </div>

          <button
            className="btn bg-blue-400 float-right w-full text-2xl"
            type="submit"
          >
            Save{" "}
          </button>
        </form>
      </Modal>
      <Toaster />
    </div>
  );
};

export default CustomerModal;
