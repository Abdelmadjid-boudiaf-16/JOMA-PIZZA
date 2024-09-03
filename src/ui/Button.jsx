
export default function Button({ children, disabled, onClick }) {
  
  if (onClick) {
     return (
       <button
         className="rounded-lg bg-gray-900 p-2 font-bold text-gray-100 transition-all duration-500  hover:bg-gray-300 hover:text-orange-600 hover:outline-none hover:ring hover:ring-gray-900 hover:ring-offset-1"
         disabled={disabled}
         onClick={onClick}
       >
         {children}
       </button>
     );
  }

  return (
    <button
      className="text-gray-100 rounded-lg bg-gray-900 p-2 font-bold transition-all duration-300 hover:scale-105 hover:border-2 hover:border-gray-900 hover:bg-gray-300 hover:text-orange-600 focus:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-900 focus:ring-offset-1"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
