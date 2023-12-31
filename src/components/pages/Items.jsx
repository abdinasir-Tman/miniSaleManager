import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebase";
import { getItemsListFromFirebase } from "../../features/itemsFromFireStore";

const Items = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.allItemsList);
  const { invoicesList } = useSelector((store) => store.invoices);
  //geting items from firestore
  const getItems = async () => {
    try {
      const itemsCollection = collection(db, "items");
      const data = await getDocs(itemsCollection);
      const pureData = data.docs.map((doc) => doc.data());

      dispatch(getItemsListFromFirebase(pureData));
    } catch (err) {
      console.error(err);
    }
  };

  //calculate Items in fireStore
  const calculateItemInFireStore = (id) => {
    let sum = 0;

    let item = items.find((item) => item.name == id);

    invoicesList.map((invoice) => {
      invoice.currentItems.map((i) => (sum += Number(i.qty)));
    });

    return item.qty - sum;
  };

  useEffect(() => {
    getItems();
  }, [items, invoicesList]);

  return (
    <div>
      <div className="px-2">
        <table className="w-full border-collapse border-slate-200">
          <caption>
            <h1 className="text-center text-2xl font-robo mt-3 font-medium">
              Items Lists
            </h1>
          </caption>
          <thead>
            <tr className="text-left">
              <th className="Thead">Item Name</th>
              <th className="Thead">Qty</th>
              <th className="Thead"> Price</th>
              <th className="Thead">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, i) => (
              <tr key={i}>
                <td className="Tbody">{item.name}</td>
                <td className="Tbody">{calculateItemInFireStore(item.name)}</td>
                <td className="Tbody">{item.price}</td>
                <td className="Tbody">{item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Items;
