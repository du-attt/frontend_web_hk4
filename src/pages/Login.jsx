import React, { useEffect, useState } from "react";
import { Await, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import bannerHero from "../assets/bannerHero.jpg";
import { Logo } from "../components";
import { useAuthContext } from "../contexts";
import axios from "axios";
import URLBASE from '../utils/axios-config'
const Login = () => {
  const { loginHandler, token, loggingIn } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    let id;
    if (token) {
      id = setTimeout(() => {
        navigate(location?.state?.from?.pathname ?? "/");
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
  }, [token]);


  const handleSubmit = () => {
    const data = {
      email: loginCredentials.email,
      password: loginCredentials.password
    }
    axios.post("https://localhost:7060/api/login",data).then((response) => {
      const status = response.status;
      if(status === 200){
        loginHandler(loginCredentials);
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("token", response?.data.access_token);
        navigate("/");
      }else{
        alert(response.data.message);
      }
    }).catch((error)=>{
      alert(error);
    })
  };

  return (
    <main className="grid  grid-rows-1 lg:grid-cols-2 w-full  h-screen m-auto">
      <section className=" hidden lg:block max-h-screen  rounded-lg">
        <img src={bannerHero} alt="" className="w-full h-full object-cover" />
      </section>
      <div className="flex items-center justify-center w-full px-5">
        <section className="px-7 py-10 rounded-md shadow-md bg-white/[0.7] flex flex-col gap-6 w-full max-w-lg">
          <Logo />
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold mb-3 ">Đăng nhập vào tài khoản</h1>

            <form
              action=""
              className="flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              <label className="flex flex-col">
                Email
                <input
                  type="email"
                  className="border rounded-md p-1.5 shadow-sm"
                  value={loginCredentials.email}
                  onChange={(e) =>
                    setLoginCredentials({
                      ...loginCredentials,
                      email: e.target.value,
                    })
                  }
                />
              </label>
              <label className="flex flex-col">
                Mật khẩu
                <input
                  type="password"
                  className="border rounded-md p-1.5 shadow-sm"
                  value={loginCredentials.password}
                  onChange={(e) =>
                    setLoginCredentials({
                      ...loginCredentials,
                      password: e.target.value,
                    })
                  }
                />
              </label>
              <div className="w-full py-2   flex flex-col gap-4 items-center ">
                <button
                  className="btn-primary w-2/3 text-lg text-center "
                  disabled={
                    loggingIn ||
                    !loginCredentials.email ||
                    !loginCredentials.password
                  }
                >
                  {loggingIn ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
                
                <Link to="/signup" className="underline text-gray-600">
                  Tạo tài khoản mới
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
