import { useEffect, useState } from "react";
import {ArrowLeft} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Entries() {

  const [entries, setEntries] = useState([]);
  const[search,setSearch]=useState("");
  const [expandedId,setExpandedId]=useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedEntry, setEditedEntry] = useState("");
  const [darkMode] = useState(() => {
  return localStorage.getItem("darkMode") === "true";
   });
   const navigate=useNavigate();
   const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {

    try {

      const response = await fetch("http://localhost:5000/journal");

      const data = await response.json();

      setEntries(data);

    } catch (error) {

      console.log(error);

    }

  };

const getMoodColor = (mood) => {

  switch (mood) {

    case "😊":
      return "bg-[#FDE68A]";

    case "😌":
      return "bg-[#BBF7D0]";

    case "😭":
      return "bg-[#BFDBFE]";

    case "😡":
      return "bg-[#FECACA]";

    case "😴":
      return "bg-[#DDD6FE]";

    default:
      return "bg-[#F3F4F6]";

  }

};
  const filteredEntries = entries.filter((journal) => {

  return (

    journal.title.toLowerCase().includes(search.toLowerCase()) ||

    journal.entry.toLowerCase().includes(search.toLowerCase())

  );

});
     const handleUpdate = async () => {

  try {

    await fetch(`http://localhost:5000/journal/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entry: editedEntry,
      }),
    });

    setEditingId(null);

    fetchEntries();

  } catch (error) {

    console.log(error);

  }
};
  const handleDelete = (id) => {
  setDeleteId(id);
  setShowDeleteModal(true);
};

const confirmDelete = async () => {
  try {
    await fetch(`http://localhost:5000/journal/${deleteId}`, {
      method: "DELETE",
    });

    fetchEntries();
    setShowDeleteModal(false);
    setDeleteId(null);

  } catch (error) {
    console.log(error);
  }
};

  const cancelDelete = () => {
  setShowDeleteModal(false);
  setDeleteId(null);
};
 
const handleCancel = () => {
  setEditingId(null);
  setEditedEntry("");
};


  return (
    <div
     className={`min-h-screen px-5 py-8 pb-24 transition-all duration-300 ${
       darkMode ? "bg-[#1E1E1E]" : "bg-[#F8F3EE]"
      }`}
     >   

     <div className="mb-6">
      <button
      onClick={() => navigate("/dashboard")}
      className={`w-11 h-11 rounded-full flex items-center justify-center shadow transition ${
      darkMode
        ? "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
        : "bg-white text-[#3D352E]   hover:bg-gray-100"
      }`}  
     >
      <ArrowLeft size={20} />
     </button>
    </div>

      {/* Header */}
      <div className="mb-8">

       <h1
       className={`text-4xl font-bold ${
       darkMode ? "text-white" : "text-[#3D352E]"
      }`}
      >
      My Journal 📔
      </h1>
  
      <p
       className={`mt-2 ${
        darkMode ? "text-gray-400" : "text-[#7C7C7C]"
       }`}
       >    
      Revisit your thoughts and memories.
      </p>


        {/* Search Bar */}
        <div className="mt-6">

          <input
       type="text"
       placeholder="🔍 Search your journal..."
       value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={`w-full p-4 rounded-2xl shadow outline-none border transition-all duration-300 ${
      darkMode
      ? "bg-[#2A2A2A] border-[#444] text-white placeholder:text-gray-400"
      : "bg-white border-[#E7DED5] text-[#3D352E]"
     }`}
     />

        </div>

      </div>

      {/* Empty State */}
      {entries.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

          <div className="text-7xl">
            📭
          </div>

         <h2
        className={`text-2xl font-bold mt-4 ${
        darkMode ? "text-white" : "text-[#3D352E]"
          }`}
        >
        No Journal Entries Yet
        </h2>
         

         <p
          className={`mt-2 ${
        darkMode ? "text-gray-400" : "text-gray-500"
        }`}
       >
       Start writing your first journal and it will appear here.
      </p>


        </div>

      ) : (

        <div className="space-y-6">

          {filteredEntries.map((journal) => (

            <div
              key={journal._id}
              className={`${getMoodColor(journal.mood)} rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300`}
            >

              {/* Top */}
              <div className="flex justify-between items-start">

                <div className="flex gap-4">

                  <div className="text-5xl">
                    {journal.mood}
                  </div>

                  <div>

                 <h2 className="text-2xl font-bold text-[#3D352E] dark:text-[#4B5563]">
                    {journal.title}
                 </h2>

                    <p className="text-sm text-[#9CA3AF] mt-1">
                      {new Date(journal.createdAt).toLocaleDateString()}
                    </p>

                  </div>

                </div>
   
              </div>

                       {/* Preview */}

            {editingId === journal._id ? (

                    <textarea
                   value={editedEntry}
                 onChange={(e) => setEditedEntry(e.target.value)}
                 rows="6"
                className="w-full mt-5 p-4 rounded-2xl border border-[#E7DED5] outline-none resize-none"
                 />

                      ) : (
              <p className="mt-5 text-[#5F5F5F] leading-7">

                  {expandedId === journal._id
                  ? journal.entry
                 : journal.entry.length > 180
                 ? journal.entry.substring(0, 180) + "..."
                 : journal.entry}

              </p>
            )}
            

            {/* Divider */}
              <hr className="my-5 border-[#E7DED5]" />

              {/* Buttons */}
              <div className="flex justify-end gap-3 flex-wrap">

        {editingId === journal._id ? (
            <>
            <button
               onClick={handleUpdate}
               className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition"
               >
               💾 Save
            </button>

              <button
                 onClick={handleCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded-full shadow"
                  >
                ❌ 
               </button>
              </>
              ) : (

          <button
               onClick={() => {
              setEditingId(journal._id);
              setEditedEntry(journal.entry);
             }}
             className="bg-white px-4 py-2 rounded-full shadow hover:scale-105 transition"
             >
             ✏️
           </button>
       )}


            <button
                onClick={()=>handleDelete(journal._id)}
                 className="bg-red-100 text-red-600 px-4 py-2 rounded-full shadow hover:scale-105 transition">
                  🗑 
                </button>

           <button
             onClick={() =>
              setExpandedId(
              expandedId === journal._id ? null : journal._id
             )
             }
             className="bg-[#F4C542] text-[#3D352E] font-semibold px-5 py-2 rounded-full shadow hover:scale-105 transition"
             >
             {expandedId === journal._id ? "Show Less" : "📖  Read More"}
          </button>

              </div>

            </div>

          ))}

        </div>

      )}
     {showDeleteModal && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-5">

    <div
      className={`rounded-3xl p-6 w-full max-w-sm shadow-2xl ${
        darkMode ? "bg-[#2A2A2A]" : "bg-white"
      }`}
    >

      <h2
        className={`text-2xl font-bold ${
          darkMode ? "text-white" : "text-[#3D352E]"
        }`}
      >
        Delete Journal
      </h2>

      <p
        className={`mt-3 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Are you sure you want to delete this journal?
      </p>

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={cancelDelete}
          className={`px-5 py-2 rounded-xl transition ${
            darkMode
              ? "bg-[#3A3A3A] text-white hover:bg-[#4A4A4A]"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          className="px-5 py-2 rounded-xl text-white bg-red-500 hover:bg-red-600 transition"
        >
          Delete
        </button>

      </div>

    </div>

  </div>
)}



    </div>

  );

}

export default Entries;