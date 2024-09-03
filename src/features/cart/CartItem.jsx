import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";

import UpdateCartItemQuantity from "./UpdateCartItemQuantity";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="sm:text-md flex w-full flex-col py-2 text-sm md:flex-row md:items-center md:justify-between">
      <p className="md:text-lg">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between md:gap-5">
        <p className="font-medium text-gray-500">
          {formatCurrency(totalPrice)}
        </p>
        <UpdateCartItemQuantity pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
