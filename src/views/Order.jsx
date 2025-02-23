import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoReturnUpBack } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, createOrder } from "../store/CartSlice";
import "./css/order.css";

const Order = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClick = () => {
    if (items.length > 0) {
      dispatch(createOrder());
      navigate("/eta");
    } else {
      window.alert("Var god gör en beställning");
    }
  };

  return (
    <div className="order-wrapper">
      <div>
        <div className="order-header">
          <IoReturnUpBack className="icon" onClick={() => navigate("/")} />
          <HiOutlineShoppingBag className="icon" />
        </div>
        <ul className="order-list">
          {items.length === 0 ? (
            <p className="empty-cart">Varukorgen är tom.</p>
          ) : (
            items.map((item) => (
              <li className="order-item" key={item.id}>
                <div className="order-item-left">
                  <IoIosRemoveCircleOutline
                    className="remove-icon"
                    onClick={() => handleRemove(item)}
                  />
                  <h2>
                    {item.name} x {item.quantity}
                  </h2>
                </div>
                <h2 className="order-item-right">
                  {item.price * item.quantity} kr
                </h2>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="footer">
        <div className="totalamount">
          <h3>TOTALT</h3>
          <h3>
            {items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}{" "}
            SEK
          </h3>
        </div>
        <button className="submit-order" onClick={handleClick}>
          TAKE MY MONEY
        </button>
      </div>
    </div>
  );
};

export default Order;
