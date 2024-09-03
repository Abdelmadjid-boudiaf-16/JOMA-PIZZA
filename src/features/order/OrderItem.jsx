import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="w-full">
      <div className="flex items-center justify-between py-2 text-base">
        <p className="">
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="text-sm font-semibold text-gray-500">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <p className="text-sm text-gray-400 italic pb-2">{isLoadingIngredients ? "Loading..." : ingredients.join(", ")}</p>
    </li>
  );
}

export default OrderItem;
