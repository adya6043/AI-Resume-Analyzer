import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Success");

      window.location.href = "/";

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>
          setEmail(e.target.value)
        }
        className="border p-2 block mb-4"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>
          setPassword(e.target.value)
        }
        className="border p-2 block mb-4"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Login
      </button>

    </div>
  );
}

export default Login;