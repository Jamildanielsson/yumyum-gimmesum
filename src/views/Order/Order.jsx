import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoReturnUpBack } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, setLatestOrderId, setLatestOrderEta } from "../../store/CartSlice";
import "./order.css";

const Order = () => {
  const API_KEY = "yum-7BTxHCyHhzI";
  const items = useSelector((state) => state.cart.items);
  const tenantId = useSelector((state) => state.cart.tenantId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

const handleCreateOrder = async () => {
  if (items.length === 0) {
    window.alert("Var god gör en beställning");
    return;
  }

  try {
    let response = await fetch(
      `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantId}/orders`,
      {
        method: "POST",
        headers: {
          "x-zocom": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map(item => item.id),
        }),
      }
    );

    if (response.ok) {
      let data = await response.json();
      dispatch(setLatestOrderEta(data.order.eta));
      dispatch(setLatestOrderId(data.order.id));
      navigate("/eta");
    } else {
      const errorData = await response.json();
      console.error("Felmeddelande:", errorData);
      alert("Misslyckades med att skapa order: " + errorData.message);
    }
  } catch (error) {
    console.error("Fel vid skapande av order", error);
  }
};

  return (
    <div className="order-wrapper">
      <div>
        <div className="order-header">
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
        <button className="submit-order" onClick={handleCreateOrder}>
          TAKE MY MONEY
        </button>
      </div>
    </div>
  );
};

export default Order;
