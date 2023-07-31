import React from "react";

const Items = () => {
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
              <th className="Thead">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="Tbody">Hard Disk Drive</td>
              <td className="Tbody">20</td>
              <td className="Tbody">30.00</td>
              <td className="Tbody">600.00</td>
            </tr>
            <tr>
              <td className="Tbody">Hard Disk Drive</td>
              <td className="Tbody">20</td>
              <td className="Tbody">30.00</td>
              <td className="Tbody">600.00</td>
            </tr>
            <tr>
              <td className="Tbody">Hard Disk Drive</td>
              <td className="Tbody">20</td>
              <td className="Tbody">30.00</td>
              <td className="Tbody">600.00</td>
            </tr>
            <tr>
              <td className="Tbody">Hard Disk Drive</td>
              <td className="Tbody">20</td>
              <td className="Tbody">30.00</td>
              <td className="Tbody">600.00</td>
            </tr>
            <tr>
              <td className="Tbody">Hard Disk Drive</td>
              <td className="Tbody">20</td>
              <td className="Tbody">30.00</td>
              <td className="Tbody">600.00</td>
            </tr>
            <tr>
              <td className="Tbody">Hard Disk Drive</td>
              <td className="Tbody">20</td>
              <td className="Tbody">30.00</td>
              <td className="Tbody">600.00</td>
            </tr>
            <tr>
              <td className="Tbody">Hard Disk Drive</td>
              <td className="Tbody">20</td>
              <td className="Tbody">30.00</td>
              <td className="Tbody">600.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Items;
