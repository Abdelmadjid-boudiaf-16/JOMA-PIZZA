import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useFetcher, useLoaderData } from "react-router-dom";
import { useEffect } from "react";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  return (
    <div className="my-10 flex flex-col items-center gap-4 rounded-xl bg-gradient-to-tr from-orange-100 via-pink-100 to-red-100 p-8 shadow-lg">
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-5">
        <h2 className="text-xl font-bold uppercase">Order #{id} Status</h2>

        <div className="space-x-4">
          {priority && (
            <span className="rounded-full bg-orange-600 p-1 font-semibold uppercase tracking-wide text-orange-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-600 p-1 font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between rounded-xl bg-blue-200/20 px-4 py-2">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-gray-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="w-full divide-y divide-gray-300 border-y border-gray-300">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>
      <div className="flex w-full flex-col gap-3 rounded-xl bg-blue-200/20 px-4 py-2">
        <p className="text-sm font-medium text-gray-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-gray-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-sm font-bold text-gray-600">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
