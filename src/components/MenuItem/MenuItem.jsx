import { useDispatch } from "react-redux";
import "./menuitem.css";
import { addToCart } from "../../store/CartSlice";

const MenuItem = ({ item }) => {
  const ingredientsList = Array.isArray(item.ingredients)
    ? item.ingredients.map((ingredient) => ingredient.trim())
    : [];

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <ul>
      <li className="listitem" onClick={handleAddToCart}>
        <div className="item-top">
          <h2>{item.name}</h2>
          <h2>{item.price} kr</h2>
        </div>
        <p className="itemtype">({item.type})</p>
        <p className="ingredients">
          {ingredientsList.length > 0 ? ingredientsList.join(", ") : ""}
        </p>
      </li>
    </ul>
  );
};

export default MenuItem;
