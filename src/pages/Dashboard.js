import { useState, useEffect } from "react";
import ErrorOverlay from "../components/utils/ErrorOverlay";
import { useNavigate, useLocation } from "react-router-dom";
import userService from "../http/userService";
import SideBar from "../components/utils/SideBar";
import Header from "../components/utils/Header";
import { useDispatch } from "react-redux";
import { getAutos } from "../features/autoSlice";

const Dashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const response = await userService.getUser();
      if (response.message === "authorized") {
        setUser(response.user);
      }
    } catch (err) {
      const errorMessage = err.response.data.error || err.errorMessage;
      setError(errorMessage);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };
  return (
    <main className="w-full flex justify-center items-start">
      <SideBar user={user} pathname={pathname} />
      <div className="w-4/5 flex flex-col justify-start items-center">
        <div className="w-full ">{error && <ErrorOverlay error={error} />}</div>
        <Header />
      </div>
    </main>
  );
};

export default Dashboard;
