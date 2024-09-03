import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  getCurrentItemQuantityById,
  increaseItemQuantity,
} from "./cartSlice";

export default function UpdateCartItemQuantity({ pizzaId }) {
  const currentQuantity = useSelector(getCurrentItemQuantityById(pizzaId));
  const oneItem = currentQuantity <= 1
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2">
      {!oneItem ? (
        <button
          className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-4 text-sm font-normal text-gray-900"
          onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        >
          -
        </button>
      ) : null}
      <span className="text-md flex h-4 w-4 items-center justify-center p-2 font-bold text-gray-900">
        {currentQuantity}
      </span>
      <button
        className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 p-4 text-sm font-normal text-gray-900"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </button>
    </div>
  );
}
