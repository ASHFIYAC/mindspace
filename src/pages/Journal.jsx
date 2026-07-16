import { useState } from "react";
import {ArrowLeft} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Journal() {

  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [mood, setMood ] = useState("");
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [darkMode] = useState(() => {
  return localStorage.getItem("darkMode") === "true";
});
  const closeSuccessModal = () => {
  setShowSuccessModal(false);
};

  const handleSave=async()=>{
    try{
      const response=await
      fetch("http://localhost:5000/journal",{
        method:"POST",
        headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
        entry,
        mood,
      }),
    });

    const data = await response.json();
   
    setShowSuccessModal(true);

    setTitle("");
    setEntry("");
    setMood("");

  } catch (error) {

    console.log(error);

  }

};
      return (

        <div
       className={`min-h-screen px-5 py-8 pb-28 transition-all duration-300 ${
       darkMode ? "bg-[#1E1E1E]" : "bg-[#F8F3EE]"
       }`}
       >
       <div className="mb-6">
     <button
       onClick={() => navigate("/dashboard")}
       className={`w-11 h-11 rounded-full flex items-center justify-center shadow transition ${
      darkMode
        ? "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
        : "bg-white text-[#3D352E] hover:bg-gray-100"
      }`}
     >
      <ArrowLeft size={20} />
    </button>
   </div>


      {/* Top Section */}
      <div>

        <h1
      className={`text-4xl font-bold ${
       darkMode ? "text-white" : "text-[#3D352E]"
       }`}
       >
          Journal 🌿
        </h1>

        <p
       className={`mt-2 ${
       darkMode ? "text-gray-400" : "text-[#7C7C7C]"
         }`}
       >
          Write your thoughts and feelings freely.
        </p>

      </div>

      {/* Quote Card */}
       <div
        className={`rounded-3xl p-6 mt-8 shadow-md ${
      darkMode ? "bg-[#4A3B40]" : "bg-[#F4CFC8]"
      }`}
      >
         
        <p
        className={`text-lg font-medium leading-relaxed ${
         darkMode ? "text-[#E5E7EB]" : "text-[#3D352E]"
       }`}
       >
       “Your mind deserves the same care as your body.”
      </p>

      </div>

      {/* Mood Section */}
      <div className="mt-8">

        <h2
         className={`text-2xl font-bold mb-4 ${
       darkMode ? "text-white" : "text-[#3D352E]"
       }`}
        >
          How are you feeling today?
        </h2>

        <div className="flex gap-4 overflow-x-auto">

        <button
        onClick={() => setMood("😊")}
        className={`w-14 h-14 rounded-full text-2xl shadow transition-all ${
        mood === "😊"
        ? "bg-green-300 scale-110"
       : "bg-[#FFE5B4]"
        }`}
       >  
      😊
      </button>

      <button
        onClick={() => setMood("😌")}
        className={`w-14 h-14 rounded-full text-2xl shadow transition-all ${
        mood === "😌"
        ? "bg-green-300 scale-110"
       : "bg-[#FFE5B4]"
        }`}
       >  
      😌
      </button>

       <button
        onClick={() => setMood("😭")}
        className={`w-14 h-14 rounded-full text-2xl shadow transition-all ${
        mood === "😭"
        ? "bg-green-300 scale-110"
       : "bg-[#FFE5B4]"
        }`}
       >  
      😭
      </button>

        <button
        onClick={() => setMood("😡")}
        className={`w-14 h-14 rounded-full text-2xl shadow transition-all ${
        mood === "😡"
        ? "bg-green-300 scale-110"
       : "bg-[#FFE5B4]"
        }`}
       >  
      😡
      </button>   
         

      < button
        onClick={() => setMood("😴")}
        className={`w-14 h-14 rounded-full text-2xl shadow transition-all ${
        mood === "😴"
        ? "bg-green-300 scale-110"
       : "bg-[#FFE5B4]"
        }`}
       >  
      😴
      </button>      

        </div>
        
      </div>

      {/* Journal Form */}
      <div className="mt-10 space-y-6">

        {/* Title Input */}
        <div>

        <label
         className={`font-semibold text-lg ${
        darkMode ? "text-white" : "text-[#3D352E]"
         }`}
        >
            Title
          </label>

          <input
            type="text"
            placeholder="Today's thoughts..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full mt-3 p-5 rounded-3xl outline-none shadow-sm border transition-all ${
            darkMode
           ? "bg-[#2A2A2A] border-[#555] text-white placeholder:text-gray-400"
           : "bg-white border-[#E7DED5] text- [#3D352E]"
          }`}
          />

        </div>

        {/* Textarea */}
        <div>

          <label
        className={`font-semibold text-lg ${
       darkMode ? "text-white" : "text-[#3D352E]"
       }`}
       >
            Journal Entry
          </label>

          <textarea
            placeholder="Write everything on your mind..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows="10"
            className={`w-full mt-3 p-5 rounded-3xl outline-none shadow-sm border resize-none transition-all ${
           darkMode
            ? "bg-[#2A2A2A] border-[#555] text-white placeholder:text-gray-400"
           : "bg-white border-[#E7DED5] text-[#3D352E]"
          }`}
          ></textarea>

        </div>

        {/* Character Count */}
        <p
        className={`text-right text-sm ${
        darkMode ? "text-gray-400" : "text-gray-500"
        }`}
        >
          {entry.length} characters
        </p>

        {/* Save Button */}
        <button 
        onClick={handleSave}
        className={`w-full py-5 rounded-3xl text-lg font-semibold shadow-lg hover:scale-[1.02] transition-all ${
       darkMode
       ? "bg-[#5F7A46] hover:bg-[#6D8C50] text-white"
      : "bg-[#7C9A5D] hover:bg-[#6E8B52] text-white"
      }`}
      >

          Save Journal ✨

        </button>

      </div>

      {showSuccessModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div
      className={`w-[90%] max-w-sm rounded-3xl p-6 shadow-xl ${
        darkMode ? "bg-[#2A2A2A]" : "bg-white"
      }`}
    >
      <div className="text-5xl text-center">🎉</div>

      <h2
        className={`text-2xl font-bold text-center mt-4 ${
          darkMode ? "text-white" : "text-[#3D352E]"
        }`}
      >
        Journal Saved!
      </h2>

      <p
        className={`text-center mt-2 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Your journal entry has been saved successfully.
      </p>

      <button
        onClick={closeSuccessModal}
        className="w-full mt-6 bg-[#7C9A5D] text-white py-3 rounded-2xl font-semibold hover:bg-[#6E8B52] transition"
      >
        Awesome ✨
      </button>
    </div>
  </div>
)}




    </div>

  );

}

export default Journal;