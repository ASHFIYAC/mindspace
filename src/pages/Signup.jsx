import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate=useNavigate();

const handleSignup = async (e) => {
  e.preventDefault();

  try {

    const response = await fetch("https://mindspace-jw73.onrender.com/signup", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
   const data = await response.json();

if (response.ok) {
  console.log(data);
  navigate("/");
} else {
  alert(data.message);
}

  } catch (error) {

    console.log(error);

  }
};
  return (
    <div className="min-h-screen bg-[#B7C9A8] flex items-center justify-center px-4">

      <div className="w-full max-w-sm bg-[#F3EDE2] rounded-[35px] p-6 shadow-xl">

        {/* Top Section */}
        <div className="mb-8">

          <div className="w-16 h-16 rounded-2xl bg-[#DDE5B6] flex items-center justify-center text-3xl shadow-md">
            🌿
          </div>

          <h1 className="text-3xl font-bold text-[#3D352E] mt-5">
            Create Account
          </h1>

          <p className="text-[#6B705C] mt-2 text-sm">
            Start your self-growth journey today.
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleSignup}
         className="space-y-5">

          <div>
            <label className="text-sm text-[#6B705C] font-medium">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full mt-2 p-4 rounded-2xl bg-white border border-[#D6CCC2] outline-none focus:ring-2 focus:ring-[#7C9A5D]"
            />
          </div>

          <div>
            <label className="text-sm text-[#6B705C] font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full mt-2 p-4 rounded-2xl bg-white border border-[#D6CCC2] outline-none focus:ring-2 focus:ring-[#7C9A5D]"
            />
          </div>

          <div>
            <label className="text-sm text-[#6B705C] font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full mt-2 p-4 rounded-2xl bg-white border border-[#D6CCC2] outline-none focus:ring-2 focus:ring-[#7C9A5D]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7C9A5D] text-white py-4 rounded-2xl font-semibold text-lg hover:scale-[1.02] transition-all"
          >
            Sign Up
          </button>

        </form>

        {/* Bottom Text */}
        <p className="text-center text-sm text-[#6B705C] mt-8">
          Already have an account?

          <Link
            to="/"
            className="text-[#588157] font-semibold ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;