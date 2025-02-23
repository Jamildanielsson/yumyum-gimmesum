import "./css/eta.css";
import wontonimg from "../assets/topbox.png";
import { useNavigate } from "react-router-dom";
import { MdOutlineHome } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/CartSlice";

const Eta = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart.orders);
  const latestOrder = orders[orders.length - 1];

  const handleNewOrder = () => {
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="eta-wrapper">
      <div className="eta-header">
        <p>LOGO</p>
        <MdOutlineHome
          className="icon icon-colorchange"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="main">
        <img src={wontonimg} alt="fastfood box" className="image" />
        <h2>DINA WONTONS TILLAGAS!</h2>
        <h3>ETA 5 MIN</h3>
        <h4>Order-ID: {latestOrder ? latestOrder.id : "Ingen order"}</h4>
      </div>
      <div className="footer">
        <button className="new-order" onClick={handleNewOrder}>
          GÖR EN NY BESTÄLLNING
        </button>
        <button className="see-receit" onClick={() => navigate("/receit")}>
          SE KVITTO
        </button>
      </div>
    </div>
  );
};

export default Eta;
