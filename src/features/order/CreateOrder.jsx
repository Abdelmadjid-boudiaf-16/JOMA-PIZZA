import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import store from "../../store";

import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";
  console.log(
    "addressStatus:",
    addressStatus,
    "isLoadingAddress:",
    isLoadingAddress,
  );

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const dispatch = useDispatch();

  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="my-10 flex w-full flex-col items-center gap-5 p-4">
      <h2 className="text-base font-semibold text-orange-600 sm:text-2xl">
        {"Ready to order? Let's go!"}
      </h2>

      <Form
        method="POST"
        className="flex w-full flex-col gap-4 rounded-md bg-gradient-to-r from-orange-50 via-pink-50 to-red-50 p-3 shadow-lg md:w-3/5"
      >
        <div className="flex flex-col gap-4">
          <label>First Name</label>
          <input
            type="text"
            name="customer"
            required
            placeholder="First Name"
            defaultValue={username}
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label>Phone number</label>
          <div>
            <input
              type="tel"
              name="phone"
              required
              placeholder="Phone Number"
              className="input"
            />
            {formErrors?.phone && (
              <p className="mt-4 rounded-lg bg-red-400/15 p-2 text-sm text-red-500">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label>Address</label>
          <div>
            <input
              type="text"
              name="address"
              required
              placeholder="Address"
              defaultValue={address}
              className="input"
              disabled={isLoadingAddress}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <div className="my-5">
              <button
                className="text-sm font-semibold text-blue-400/90 underline"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </button>
            </div>
          )}
        </div>

        <div className="space-x-2">
          <input
            className="accent-gray-900"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="flex items-center justify-center">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting}>
            {isSubmitting
              ? "Placing Order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "please make sure to write your phone number correctly, we might need it to contact you :).";

  if (Object.keys(errors).length > 0) return errors;

  store.dispatch(clearCart());
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
