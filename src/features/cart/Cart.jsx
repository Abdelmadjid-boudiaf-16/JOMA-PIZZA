import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";

import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  deleteItem,
  getCart,
  getTotalCartQuantity,
} from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="mx-auto my-20 flex w-3/4 flex-col items-center justify-center gap-4 rounded-md bg-gradient-to-tl from-orange-100 via-pink-100 to-red-100 p-8 shadow-lg">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="text-xl text-gray-600">Your cart 😊</h2>
      <ul className="w-full divide-y divide-gray-300 border-b border-gray-300">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="mt-10 flex items-center justify-center gap-3">
        <LinkButton to="/order/new">Order pizzas</LinkButton>
        <Button disabled={false} onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
