import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { BiSolidHome } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { MdInventory } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
const Sidebar = () => {
  return (
    <div className="bg-green-300 px-3 h-screen col-span-1">
      <Link to="/" className="flex items-center pb-2">
        <img src={logo} alt="" className="w-16" />
        <span className="text-yellow-500 font-robo text-2xl">
          Mini <span className="text-gray-500">Sale</span>
        </span>
      </Link>
      <ul>
        <li>
          <Link to="/" className="flex items-center gap-3 text-xl font-robo">
            <span>
              <BiSolidHome className="text-yellow-500" />
            </span>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/customer"
            className="flex items-center gap-3 text-xl font-robo"
          >
            <span>
              <BsPeopleFill className="text-yellow-500" />
            </span>
            Customer
          </Link>
        </li>
        <li>
          <Link
            to="/items"
            className="flex items-center gap-3 text-xl font-robo"
          >
            <span>
              <MdInventory className="text-yellow-500" />
            </span>
            Items
          </Link>
        </li>
        <li>
          <Link
            to="/sales"
            className="flex items-center gap-3 text-xl font-robo"
          >
            <span>
              <FcSalesPerformance />
            </span>
            Sales
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
