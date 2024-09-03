import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="mx-auto my-20 flex w-3/4 flex-col items-center justify-center gap-4 rounded-md bg-gradient-to-tl from-orange-100 via-pink-100 to-red-100 p-8 shadow-lg">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <p className="text-sm text-red-500">
        Your cart is still empty. Start adding some pizzas ☹
      </p>
    </div>
  );
}

export default EmptyCart;
