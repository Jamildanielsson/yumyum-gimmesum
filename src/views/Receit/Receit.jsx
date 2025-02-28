import "./receit.css";
import image from "../../assets/topbox.png";
import { MdOutlineHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearCart } from "../../store/CartSlice";

const Receit = () => {
  const API_KEY = "yum-7BTxHCyHhzI";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const tenantId = useSelector((state) => state.cart.tenantId);
  const latestOrderId = useSelector((state) => state.cart.latestOrderId);
  const itemQuantity = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const response = await fetch(
          `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantId}/orders/${latestOrderId}`,
          {
            method: "GET",
            headers: {
              "x-zocom": API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setOrderData(data);
        } else {
          console.error("Fel vid hämtning av order");
        }
      } catch (error) {
        console.error("Nätverksfel:", error);
      }
    };
    fetchLatestOrder();
  }, [latestOrderId, tenantId]);
  const handleNewOrder = () => {
    dispatch(clearCart());
    navigate("/");
  };

  const totalPrice = orderData
    ? orderData.order.items.reduce((total, item) => {
        const matchingItem = itemQuantity.find((qItem) => qItem.id === item.id);
        const quantity = matchingItem ? matchingItem.quantity : 1;
        return total + item.price * quantity;
      }, 0)
    : 0;

  return (
    <div className="receit-wrapper">
      <div className="eta-header">
        <p>LOGO</p>
        <MdOutlineHome
          className="icon icon-colorchange"
          onClick={handleNewOrder}
        />
      </div>
      <div className="receit-main">
        <div>
          <img src={image} className="receit-img" alt="fastfood box" />
          <h3>KVITTO</h3>
          <p>Order-ID: {orderData ? orderData.order.id : "Ingen order"}</p>
        </div>
        <div>
          {" "}
          <ul className="receit-list">
            {orderData ? (
              orderData.order.items.map((item) => {
                const matchingItem = itemQuantity.find(
                  (qItem) => qItem.id === item.id
                );
                const quantity = matchingItem ? matchingItem.quantity : 1;

                return (
                  <li key={item.id} className="receit-item">
                    <span>
                      {item.name} x {quantity}
                    </span>
                    <span>{item.price * quantity} SEK</span>
                  </li>
                );
              })
            ) : (
              <p>Ingen order att visa.</p>
            )}
          </ul>
        </div>
        <div className="receit-main-footer">
          <h4>TOTALT</h4>
          <p>{totalPrice} SEK</p>
        </div>
      </div>
      <div className="receit-footer">
        <button className="new-order" onClick={handleNewOrder}>
          GÖR EN NY BESTÄLLNING
        </button>
      </div>
    </div>
  );
};

export default Receit;
