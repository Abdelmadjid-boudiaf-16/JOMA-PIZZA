import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button disabled={false} onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}