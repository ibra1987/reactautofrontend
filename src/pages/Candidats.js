import { useState, useEffect } from "react";
import ErrorOverlay from "../components/utils/ErrorOverlay";
import { useNavigate, useLocation } from "react-router-dom";
import userService from "../http/userService";
import SideBar from "../components/utils/SideBar";
import Header from "../components/utils/Header";
import AddCandidat from "../components/candidats/AddCandidat";
import CandidatsList from "../components/candidats/CandidatsList";
import { useSelector, useDispatch } from "react-redux";
import { getCandidats, candidatsPerAuto } from "../features/candidatsSlice";
import EditCandidat from "../components/candidats/EditCandidat";

const Candidats = () => {
  const { resetMessage } = useSelector((state) => state.candidats);
  const [edit, setEdit] = useState(false);
  const { selectedAuto } = useSelector((state) => state.autos);
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const pathname = location.pathname;
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    checkUser();
  }, []);

  const toggleEdit = () => {
    setEdit(true);
  };
  const closeEdit = () => {
    setEdit(false);
  };

  const checkUser = async () => {
    try {
      const response = await userService.getUser();
      if (response.message === "authorized") {
        setUser(response.user);
        dispatch(getCandidats());
      }
    } catch (err) {
      const errorMessage = err.response.data.error || err.mesage;
      setError(errorMessage);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };
  return (
    <main className="w-full flex justify-center items-start ">
      <SideBar user={user} pathname={pathname} />
      <div className="w-4/5 flex flex-col justify-start items-center">
        <div className="w-full ">{error && <ErrorOverlay error={error} />}</div>
        <Header />
        <div className="w-full flex justify-start items-center"></div>
        {edit ? <EditCandidat closeEdit={closeEdit} /> : <AddCandidat />}
        <CandidatsList edit={edit} toggleEdit={toggleEdit} />
      </div>
    </main>
  );
};

export default Candidats;
