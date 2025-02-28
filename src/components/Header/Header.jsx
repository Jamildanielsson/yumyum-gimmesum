import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="menu-header">
      <div className="cart" onClick={() => navigate("/order")}>
        <div className="counter">{totalItems}</div>
        <div className="cartbox">
          <HiOutlineShoppingBag className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
