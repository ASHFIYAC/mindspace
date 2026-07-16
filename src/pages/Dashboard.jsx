import { Link } from "react-router-dom";
import { useEffect,useState } from "react";

function Dashboard() {
  const username=localStorage.getItem("username");
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("darkMode") === "true";
  });
  const today=new Date();

  const days = [];

for (let i = -2; i <= 2; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  days.push({
    day: date.toLocaleDateString("en-US", {
      weekday: "short",
    }),
    number: date.getDate(),
    isToday: i === 0,
  });
}
const[journals,setJournals]=useState([]);
const[streak,setStreak]=useState(0);
const [tasks, setTasks] = useState([
  { id: 1, text: "Journal Today", completed: false },
  { id: 2, text: "Drink Water", completed: false },
  { id: 3, text: "Walk 30 Minutes", completed: false },
  { id: 4, text: "Read 10 Pages", completed: false },
]);

const toggleTask = (id) => {
  setTasks(
    tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
};
useEffect(() => {

  fetch("http://localhost:5000/journal")
    .then((response) => response.json())
    .then((data) => {
      setJournals(data);
      calculateStreak(data);
    })
    .catch((error) => console.log(error));

}, []);


const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

const hasJournalOnDay = (dayIndex) => {

  return journals.some((journal) => {

    const journalDate = new Date(journal.createdAt);

    return journalDate.getDay() === dayIndex;

  });

};
const calculateStreak = (journalData) => {

  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const journalDates = journalData.map((journal) => {

    const date = new Date(journal.createdAt);
    date.setHours(0, 0, 0, 0);

    return date.getTime();

  });

  let count = 0;

while (journalDates.includes(currentDate.getTime())) {

  count++;

  currentDate.setDate(currentDate.getDate() - 1);
}
 setStreak(count);

  console.log(journalDates);

};
useEffect(() => {
  localStorage.setItem("darkMode", darkMode);
}, [darkMode]);
  return (
    <div
       className={`min-h-screen pb-24 px-5 transition-all duration-300 ${
       darkMode ? "bg-[#1E1E1E]" : "bg-[#F8F3EE]"
       }`}
    >
   
      {/* Greeting Section */}
      <div className="flex items-center justify-between pt-8">

        <div>

           <h1
          className={`text-3xl font-bold ${
           darkMode ? "text-white" : "text-[#3D352E]"
           }`}
          > Hi {username}! 🌿
          </h1>

             <p
            className={`mt-1 ${
            darkMode ? "text-gray-400" : "text-[#7C7C7C]"
            }`}
          >Welcome back to your safe space
          </p>

        </div>

        <button
         onClick={() => setDarkMode(!darkMode)}
         className="w-14 h-14 rounded-full bg-[#F4CFC8] flex items-center justify-center text-2xl shadow-md"
         >
         {darkMode ? "☀️" : "🌙"}
        </button>

      </div>

      <div className="flex gap-3 mt-8 overflow-x-auto">

  {days.map((day, index) => (

    <div key={index} className="flex flex-col items-center">

      <p className="text-sm text-gray-500">
        {day.day}
      </p>

      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mt-2 shadow ${
          day.isToday
            ? "bg-[#F4C542] text-white"
            : "bg-white"
        }`}
      >
        {day.number}
      </div>

    </div>

  ))}

</div>

      {/* Main Journal Card */}
      <div className="bg-[#F4C542] rounded-3xl p-6 mt-8 shadow-lg">

        <h2 className="text-2xl font-bold text-[#3D352E]">
          Let’s start your day ☀️
        </h2>

        <p className="text-[#5E503F] mt-2">
          Begin with mindful reflections and positive thoughts.
        </p>

        <div className="mt-6 text-6xl text-center">
          🌞
        </div>

      </div>
  
     {/* Today's Intentions */}

<div className="mt-8">

  <div className="flex justify-between items-center mb-2">

        <h2
      className={`text-2xl font-bold ${
      darkMode ? "text-white" : "text-[#3D352E]"
     }`}
    > 🌿 Today's Intentions
     </h2>

    <p className="text-sm text-[#9B8F86]">
      {tasks.filter(task => task.completed).length}/{tasks.length} Done
    </p>

  </div>

  <div
  className={`rounded-2xl shadow-lg p-4 ${
    darkMode ? "bg-[#2A2A2A]" : "bg-white"
  }`}
>

    {tasks.map((task) => (

      <div
        key={task.id}
        onClick={() => toggleTask(task.id)}
        className="flex items-center gap-2 py-2 cursor-pointer border-b border-[#F1ECE6] last:border-none"
      >

        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center transition ${
            task.completed
              ? "bg-[#F4C542]"
              : "border-2 border-[#D8CFC7]"
          }`}
        >
          {task.completed && (
            <span className="text-white font-bold">✓</span>
          )}
        </div>

          <p
        className={`text-base transition ${
          task.completed
         ? "line-through text-gray-400"
        : darkMode
        ? "text-white"
       : "text-[#3D352E]"
       }`}
      >
          {task.text}
        </p>

      </div>

    ))}

  </div>

</div>
      
      {/* Your Journey */}

<div className="mt-8">

  <div className="flex justify-between items-center mb-4">

     <h2
      className={`text-2xl font-bold ${
      darkMode ? "text-white" : "text-[#3D352E]"
     }`}
    >🌱 Your Journey
    </h2>

     <p
    className={`text-sm ${
    darkMode ? "text-gray-400" : "text-[#9B8F86]"
    }`}
   >
  This Week
  </p>

  </div>

     <div
    className={`rounded-3xl shadow-lg p-5 ${
    darkMode ? "bg-[#2A2A2A]" : "bg-white"
    }`}
>

    <div className="grid grid-cols-7 gap-3 text-center">
        {weekDays.map((day, index) => (

  <div key={index}>

    <p className="text-xs text-gray-500 mb-2">
      {day}
    </p>
     <div
  className={`w-9 h-9 rounded-xl mx-auto shadow-sm border border-white ${
    hasJournalOnDay(index===6?0:index+1)
      ? "bg-[#F4C542]"
      : "bg-[#EEE7DF]"
  }`}
></div>

  </div>

))}
    
    </div>

     <div className="mt-6 text-center">
        <p
       className={`text-sm ${
       darkMode ? "text-gray-400" : "text-gray-500"
      }`}
    >
     Current Streak
    </p>

       <h3
      className={`text-3xl font-bold mt-1 ${
      darkMode ? "text-white" : "text-[#3D352E]"
     }`}
    >
    🔥 {streak} Day{streak !== 1 ? "s" : ""}
    </h3>

      <p className="text-sm text-gray-500">
     {streak === 1 ? "Day" : "Days"}
     </p>
     
    </div>

  </div>

</div>
      

      {/* Navigation Bar */}
      <div
     className={`fixed bottom-0 left-0 w-full flex justify-center items-center gap-20 rounded-t-3xl py-3 shadow-2xl ${
    darkMode ? "bg-[#2A2A2A]" : "bg-white"
     }`}
   >
      

        
       <Link to="/entries">
        <button className="text-3xl text-[#8C7A6B] hover:text-[#F4C542]transition">
           📔 
        </button>
      </Link>
        
        <Link to="/journal">
          <button className="w-14 h-14 rounded-full bg-[#F4C542] text-3xl shadow-lg -mt-10">
            +
          </button>

        </Link>


        <Link to ="/profile">
        <button className="text-3xl text-[#8C7A6B] hover:text-[#F4C542]transition">
          👤
        </button>
        </Link>

      </div>

    </div>

  );

}

export default Dashboard;