import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import LinkButton from "./LinkButton";
import { getUsername } from "../features/user/userSlice";
function Home() {
  const username = useSelector(getUsername);
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-10 text-xl font-semibold text-gray-800 sm:text-2xl">
        The best pizza.
        <br />
        <span className="text-orange-600">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <div className="flex justify-center items-center">
        {!username ? (
          <CreateUser />
        ) : (
            <LinkButton to="/menu">Continue Ordering, {username}😊</LinkButton>
        )}
      </div>
    </div>
  );
}

export default Home;
