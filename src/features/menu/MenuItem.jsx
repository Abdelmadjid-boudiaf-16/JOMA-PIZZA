import { formatCurrency } from "../../utils/helpers";

import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentItemQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateCartItemQuantity from "../cart/UpdateCartItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentItemQuantity = useSelector(getCurrentItemQuantityById(id));
  const isInCart = currentItemQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 p-2">
      <img
        src={imageUrl}
        alt={name}
        className={`max-w-full object-cover ${soldOut ? "opacity-95 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0" : ""}`}
      />
      <div className="flex flex-1 flex-col">
        <p className="text-md font-medium tracking-wide sm:text-lg">{name}</p>
        <p className="text-sm font-normal capitalize italic text-gray-500 sm:text-lg">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium uppercase text-gray-400">Sold out</p>
          )}
          {isInCart ? (
            <div className="flex gap-2">
              {" "}
              <UpdateCartItemQuantity pizzaId={id} /> <DeleteItem pizzaId={id} />{" "}
            </div>
          ) : null}
          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} disabled={false}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
