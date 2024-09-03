import { Link } from "react-router-dom";

export default function LinkButton({ children, to }) {
  return (
    <Link
      to={to}
      className="rounded-full px-4 py-2 text-center text-sm text-blue-400 transition-all duration-500 hover:bg-blue-200/60 hover:text-blue-500 md:text-lg hover:-translate-x-2"
    >
      {children}
    </Link>
  );
}
