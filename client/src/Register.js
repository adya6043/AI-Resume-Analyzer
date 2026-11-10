import React, { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleRegister = async () => {

    try {

      await axios.post(
        "https://ai-resume-analyzer-1-lu4n.onrender.com/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert("Registered Successfully");

      window.location.href =
        "/login";

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Register
      </h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e)=>
          setName(e.target.value)
        }
        className="border p-2 block mb-4"
      />

      <input
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
        onClick={handleRegister}
        className="bg-green-500 text-white px-4 py-2"
      >
        Register
      </button>

    </div>
  );
}

export default Register;