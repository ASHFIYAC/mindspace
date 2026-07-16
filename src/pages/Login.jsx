import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
   const[email,setEmail]=useState("");
   const[password,setPassword]=useState("");  
   const [error, setError] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const navigate=useNavigate();

   const handleLogin = async(e) => {
  e.preventDefault();
   
   if (!email || !password) {
    setError("Please fill all fields");
    return;
  }

  if (!email.includes("@")) {
    setError("Enter a valid email");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  setError("");
  try {

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    console.log(data);
    localStorage.setItem("username",data.username);
    navigate("/dashboard");

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
            😊
          </div>

          <h1 className="text-3xl font-bold text-[#3D352E] mt-5">
            Welcome Back
          </h1>

          <p className="text-[#6B705C] mt-2 text-sm">
            Continue your journaling journey today.
          </p>

        </div>
           {
            error && (
            <p className="bg-red-100 text-red-600   p-3       rounded-xl mb-4 text-sm">
           {error}
             </p>
           )
          }

        {/* Form */}
        <form onSubmit ={handleLogin}className="space-y-5">

          <div>
            <label className="text-sm text-[#6B705C] font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
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
              type={showPassword?"text":"password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full mt-2 p-4 rounded-2xl bg-white border border-[#D6CCC2] outline-none focus:ring-2 focus:ring-[#7C9A5D]"
            />
            <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-[#588157] mt-2"
             >
             {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>

          <button
          type="submit"
            className="w-full bg-[#7C9A5D] text-white py-4 rounded-2xl font-semibold text-lg hover:scale-[1.02] transition-all"
          >
            Login
          </button>

          
        </form>

        {/* Bottom Text */}
        <p className="text-center text-sm text-[#6B705C] mt-8">
          Don’t have an account?
          <Link to="/signup" className="text-[#588157] font-semibold ml-1">
          Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
} 

export default Login;