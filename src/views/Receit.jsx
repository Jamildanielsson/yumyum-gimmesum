import "./css/receit.css";
import { MdOutlineHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import image from "../assets/topbox.png";

const Receit = () => {
  const navigate = useNavigate();
  const orders = useSelector((state) => state.cart.orders);
  const latestOrder = orders[orders.length - 1];

  return (
    <div className="receit-wrapper">
      <div className="eta-header">
        <p>LOGO</p>
        <MdOutlineHome
          className="icon icon-colorchange"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="receit-main">
        <div>
          <img src={image} className="receit-img" alt="fastfood box" />
          <h3>KVITTO</h3>
          <p>Order-ID: {latestOrder ? latestOrder.id : "Ingen order"}</p>
        </div>
        <div>
          {" "}
          <ul className="receit-list">
            {latestOrder ? (
              latestOrder.items.map((item) => (
                <li key={item.id} className="receit-item">
                  <span>
                    {item.name} x {Math.max(1, item.quantity)}
                  </span>
                  <span>{item.price * item.quantity} SEK</span>
                </li>
              ))
            ) : (
              <p>Ingen order att visa.</p>
            )}
          </ul>
        </div>
        <div className="receit-main-footer">
          <h4>TOTALT</h4>
          <p>{latestOrder ? latestOrder.total : "0"} SEK</p>
        </div>
      </div>
      <div className="receit-footer">
        <button className="new-order" onClick={() => navigate("/")}>
          GÖR EN NY BESTÄLLNING
        </button>
      </div>
    </div>
  );
};

export default Receit;
