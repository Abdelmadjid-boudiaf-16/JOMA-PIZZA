import Header from "./header/Header";
import CartOverView from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import IsLoading from "./IsLoading";
export default function Layout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-[100vh] grid-rows-[auto_1fr_auto]">
      {isLoading && <IsLoading />}
      {/* {isLoading && <IsLoading />} */}
      <Header />
      <div>
        <main className="mx-auto max-w-4xl">
          <Outlet />
        </main>
      </div>
      <CartOverView />
    </div>
  );
}
