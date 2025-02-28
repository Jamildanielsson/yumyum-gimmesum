import "./eta.css";
import wontonimg from "../../assets/topbox.png";
import { useNavigate } from "react-router-dom";
import { MdOutlineHome } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/CartSlice";

const API_KEY = "yum-7BTxHCyHhzI";

const Eta = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const latestOrderId = useSelector((state) => state.cart.latestOrderId);
  const tenantId = useSelector((state) => state.cart.tenantId);

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
        <h3>ETA: 5 min</h3>
        <h4>Order-ID: {latestOrderId ? latestOrderId : "Ingen order"}</h4>
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
