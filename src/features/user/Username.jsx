import { useSelector } from "react-redux";
import { getUsername } from "./userSlice";

export default function Username() {
  const username = useSelector(getUsername);
  if (!username) return null;
  return (
    <div className="hidden rounded-lg bg-gray-200/20 px-3 py-1 text-xl font-bold text-gray-800 md:block">
      {username}
    </div>
  );
}
