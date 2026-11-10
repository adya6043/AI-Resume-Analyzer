import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    try {

      setLoading(true);

      const res = await axios.post(
        "https://ai-resume-analyzer-1-lu4n.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      window.location.href = "/";

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-white text-center">
          🚀 AI Resume Analyzer
        </h1>

        <p className="text-center text-blue-100 mt-2 mb-8">
          Login to continue
        </p>

        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

          className="w-full mb-4 p-3 rounded-xl outline-none bg-white text-black"

        />

        <div className="relative">

          <input

            type={
              showPassword
                ? "text"
                : "password"
            }

            placeholder="Password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            onKeyDown={(e)=>{

              if(e.key==="Enter"){

                handleLogin();

              }

            }}

            className="w-full p-3 rounded-xl outline-none bg-white text-black"

          />

          <button

            type="button"

            onClick={()=>

              setShowPassword(!showPassword)

            }

            className="absolute right-4 top-3"

          >

            {

              showPassword

                ? "🙈"

                : "👁"

            }

          </button>

        </div>

        <button

          onClick={handleLogin}

          disabled={loading}

          className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"

        >

          {

            loading

              ? "Logging in..."

              : "Login"

          }

        </button>

        <p className="text-center text-white mt-6">

          Don't have an account?

          <a

            href="/register"

            className="font-bold ml-2 underline"

          >

            Register

          </a>

        </p>

      </div>

    </div>

  );

}

export default Login;