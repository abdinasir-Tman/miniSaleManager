import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";
import {
  updateItemName,
  updateItemPrice,
  updateItemQty,
  calculateAmount,
  getSubtotal,
  makeDiscount,
  MainTotal,
  addRow,
  removeRow,
  updateCustId,
  updateDate,
} from "../../features/itemSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { updateInvoicesList } from "../../features/itemsListSlice";

const Sales = () => {
  //all State
  const getInvoicesFromFirestore = async () => {
    try {
      const invoicesCollection = collection(db, "invoices");
      const data = await getDocs(invoicesCollection);
      const invoices = data.docs.map((doc) => doc.data());
      console.log(invoices);
      dispatch(updateInvoicesList(invoices));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getInvoicesFromFirestore();
  }, []);
  const { currentItems, subtotal, discount, total } = useSelector(
    (store) => store.items
  );

  const dispatch = useDispatch();

  // Calculate Amount of item and update item amount
  useEffect(() => {
    dispatch(getSubtotal());
    dispatch(MainTotal());
  }, [currentItems]);
  // calculating amount and updating Pric
  const calculateItem = (price, id) => {
    dispatch(
      updateItemPrice({
        id: id,
        price,
      })
    );
    dispatch(
      calculateAmount({
        id,
      })
    );
  };
  // calculating amount and updating Qty
  const calculatinAmountUpdateQty = (qty, id) => {
    dispatch(
      updateItemQty({
        id: id,
        qty,
      })
    );
    dispatch(
      calculateAmount({
        id,
      })
    );
  };

  return (
    <div className="px-2">
      <h1 className="text-center text-xl mt-2">Invoice</h1>
      <form>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label htmlFor="">Customer</label>
            <select
              name="company"
              className="bg-transparent cursor-pointer hover:border"
              id=""
              onChange={(e) => dispatch(updateCustId(e.target.value))}
            >
              <option value="choose here">Choose here</option>
              <option value="cust001">zakawa</option>
              <option value="cust002">Al naim</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Date</label>
            <input
              type="date"
              className="bg-transparent cursor-pointer hover:border date"
              id=""
              onChange={(e) => dispatch(updateDate(e.target.value))}
            />
          </div>
        </div>

        <div className="invoic_form">
          <table className="w-full border-collapse border-slate-200">
            <caption>
              <h1 className="text-center text-2xl font-robo mt-3 font-medium">
                Items Lists
              </h1>
            </caption>
            <thead>
              <tr className="text-left">
                <th className="Thead">No</th>
                <th className="Thead">Item Name</th>
                <th className="Thead">Qty</th>
                <th className="Thead"> Price</th>
                <th className="Thead">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((it, index) => (
                <tr key={it.id}>
                  <td
                    className="Tbody flex gap-2 items-center"
                    onMouseOver={(e) =>
                      e.target.firstElementChild.classList.remove("hidden")
                    }
                    onMouseLeave={(e) =>
                      e.target.firstElementChild.classList.add("hidden")
                    }
                  >
                    <span className="px-2 w-full hidden">
                      <FaRegTimesCircle
                        onClick={(e) =>
                          dispatch(
                            removeRow({ keyward: "Backspace", id: it.id })
                          )
                        }
                        className="text-red-600 cursor-pointer  duration-500 times"
                      />
                    </span>
                    {index + 1}
                  </td>
                  <td className="Tbody">
                    <input
                      itemID={it.id}
                      onChange={(e) =>
                        dispatch(
                          updateItemName({
                            id: it.id,
                            item: e.target.value,
                          })
                        )
                      }
                      onKeyDown={(e) =>
                        dispatch(removeRow({ keyward: e.key, id: it.id }))
                      }
                      type="text"
                      className="Input item"
                      name="item"
                      id=""
                      value={it.item}
                    />
                  </td>
                  <td className="Tbody">
                    <input
                      itemID={it.id}
                      type="number"
                      className="Input qty"
                      id=""
                      name="qty"
                      onChange={(e) =>
                        calculatinAmountUpdateQty(e.target.value, it.id)
                      }
                      value={it.qty}
                    />
                  </td>
                  <td className="Tbody">
                    <input
                      itemID={it.id}
                      type="text"
                      className="Input price"
                      id=""
                      name="price"
                      onChange={(e) => calculateItem(e.target.value, it.id)}
                      value={it.price}
                    />
                  </td>
                  <td className="Tbody">
                    <input
                      // itemID={it.id}
                      type="text"
                      className="Input amount"
                      value={it.amount}
                      name="amount"
                      id=""
                      onKeyDown={(e) =>
                        dispatch(addRow({ keyward: e.key, id: it.id }))
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-right px-2">sub total</td>
                <td className="Tbody">
                  <input
                    type="number"
                    className="Input sub_total"
                    id=""
                    value={subtotal}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-right px-2">Discount</td>
                <td className="Tbody">
                  <input
                    type="number"
                    onChange={(e) => {
                      dispatch(makeDiscount(e.target.value));
                      dispatch(MainTotal());
                    }}
                    className="Input discount"
                    id=""
                    value={discount}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-right px-2">Total</td>
                <td className="Tbody">
                  <input
                    type="number"
                    className="Input total"
                    id=""
                    value={total}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </form>
    </div>
  );
};

export default Sales;
