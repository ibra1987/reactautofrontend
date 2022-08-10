import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { AiOutlineSchedule } from "react-icons/ai";
import { RiTeamLine } from "react-icons/ri";
import moment from "moment";

const SideBar = ({ pathname, user }) => {
  const isActive = (path) => {
    return pathname.includes(path);
  };

  const linkClass =
    "w-11/12 transition ease-in-out delay-75 my-1 text-gray-700 rounded-sm py-2 hover:text-white hover:bg-cyan-600  flex justify-start items-center  ";
  const activeLinkClass =
    "w-11/12 transition ease-in-out delay-75 my-1 hover:bg-cyan-700  rounded-sm py-2 text-white bg-cyan-600  flex justify-start items-center  ";
  return (
    <div className="w-1/5 h-screen bg-white   flex flex-col justify-start items-center shadow-md border-r">
      <div className="w-full text-cyan-600  flex flex-col justify-start items-start p-4">
        <span className="text-sm">Bienvenue: {user}</span>
        <span className="text-sm">
          Date du jour: {moment().format("DD-MM-YYYY")}
        </span>
      </div>
      <ul className=" bg-white w-full flex flex-col justify-start items-center ">
        <Link
          to="/dashboard"
          className={isActive("/dashboard") ? activeLinkClass : linkClass}
        >
          <MdOutlineDashboardCustomize className="ml-8 mr-2 text-2xl" />
          <li className="w-full py-1 tracking-widest   ">Tableau de bord</li>
        </Link>
        <Link
          to="/candidats"
          className={isActive("/candidats") ? activeLinkClass : linkClass}
        >
          <FiUsers className="ml-8 mr-2 text-2xl" />
          <li className="w-full py-1 tracking-widest   ">Candidats</li>
        </Link>
        <Link
          to="/charges"
          className={isActive("/charges") ? activeLinkClass : linkClass}
        >
          <AiOutlineDollarCircle className="ml-8 mr-2 text-2xl" />
          <li className="w-full py-1 tracking-widest   ">Charges</li>
        </Link>
        <Link
          to="/vehicules"
          className={isActive("/vehicules") ? activeLinkClass : linkClass}
        >
          <BsTruck className="ml-8 mr-2 text-2xl" />
          <li className="w-full py-1 tracking-widest   ">Véhicules</li>
        </Link>
        <Link
          to="/echeances"
          className={isActive("/echeances") ? activeLinkClass : linkClass}
        >
          <AiOutlineSchedule className="ml-8 mr-2 text-2xl" />
          <li className="w-full py-1 tracking-widest   ">Echeances</li>
        </Link>
        <Link
          to="/personnel"
          className={isActive("/oersonnel") ? activeLinkClass : linkClass}
        >
          <RiTeamLine className="ml-8 mr-2 text-2xl " />
          <li className="w-full py-1 tracking-widest   ">Personnel</li>
        </Link>
      </ul>
    </div>
  );
};

export default SideBar;
