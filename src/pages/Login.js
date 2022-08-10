import LoginComponent from "../components/users/LoginComponent";
import { useEffect, useState } from "react";
import userService from "../http/userService";

const Login = () => {
  const [loading, setLaoding] = useState(false);
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const response = await userService.getUser();
      if (response.message === "authorized") {
        window.location.replace("/dashboard");

        setLaoding(false);
      }
    } catch (err) {
      console.log(err);
      setLaoding(true);
    }
  };
  return (
    <section className="w-full h-screen bg-cyan-500 flex justify-center items-center">
      {loading && <LoginComponent />}
    </section>
  );
};

export default Login;
