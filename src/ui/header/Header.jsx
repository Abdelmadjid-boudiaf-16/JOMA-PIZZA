import { Link } from "react-router-dom";
import SearchOrder from "../../features/order/SearchOrder";
import Username from "../../features/user/Username";

export default function Header() {
  return (
    <header className="flex flex-col items-center sm:flex-row gap-4 sm:justify-between bg-gradient-to-r from-orange-200  to-orange-300 px-6 py-3 sm:px-8 sm:py-4 ">
      <Link to="/" className="text-3xl font-bold text-blue-900 tracking-widest uppercase">
          <span className="text-orange-600">J</span>OMA 
       
        <span className="text-orange-600"> P</span>izza
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
