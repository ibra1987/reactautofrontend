import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import Loader from "../utils/Loader";
import userService from "../../http/userService";
import { useNavigate } from "react-router-dom";
const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    Name: "lhabib",
    Password: "lhabib@2018",
  });
  const onChange = (e) => {
    setIsLoading(false);
    setError("");
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!userData.Name || !userData.Password)
      return setError("Merci de vous identifier");

    try {
      const response = await userService.Login(userData);
      setIsLoading(false);
      if ((response.message = "success")) return navigate("/dashboard");
    } catch (err) {
      const errorMessage = err.response.data.error || err.message;
      setError(errorMessage);
      setIsLoading(false);
    }
  };
  return (
    <form
      className="w-4/5 md:w-2/3 lg:w-2/4 flex flex-col justify-start items-center bg-white rounded-md"
      onSubmit={onSubmit}
    >
      <div className="w-full text-center text-sm mt-4 h-10  text-red-500">
        {error}
      </div>

      <h1 className="text-2xl font-bold tracking-widest text-gray-600 mt-6">
        Veuillez vous identifier
      </h1>
      <div className="flex justify-start items-center border my-4 text-gray-700 border-gray-400 py-2 rounded w-4/5">
        <span className="text-xl ml-4 text-cyan-500">
          <BiUserCircle />
        </span>
        <input
          className="px-4 outline-none w-full"
          text="text"
          placeholder="Nom d'utilisateur"
          onChange={onChange}
          name="Name"
          value={userData.Name}
        />
      </div>
      <div className="border flex justify-start items-center text-gray-700 my-4 border-gray-400 py-2 rounded w-4/5">
        <span className="text-xl ml-4 text-cyan-500">
          <RiLockPasswordFill />
        </span>
        <input
          className="px-4 outline-none w-full"
          type="password"
          placeholder="Mot de pass"
          onChange={onChange}
          name="Password"
          value={userData.Password}
        />
      </div>
      <div className=" mt-4 mb-8 py-2 w-4/5">
        <input
          className="outline-none w-full py-2 tracking-widest cursor-pointer hover:bg-cyan-600 rounded text-white bg-cyan-500 "
          type="submit"
          value="Se coonnecter"
        />

        <div className="w-full h-10 flex py-2 justify-center items-center">
          {isLoading && <Loader />}
        </div>
      </div>
    </form>
  );
};

export default LoginComponent;
