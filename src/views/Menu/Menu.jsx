import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTenantId } from "../../store/CartSlice";
import Header from "../../components/Header/Header";
import MenuList from "../../components/MenuList/MenuList";
import "./menu.css";

const Menu = () => {
  const API_KEY = "yum-7BTxHCyHhzI";
  const [menuList, setMenuList] = useState([]);
  const [tenantId, setTenantIdLocal] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getMenu() {
      try {
        const response = await fetch(
          "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu",
          {
            method: "GET",
            headers: { "x-zocom": API_KEY },
          }
        );
        const data = await response.json();
        setMenuList(data.items);
      } catch (error) {
        console.error("Det gick inte att hämta menyn", error);
      }
    }
    getMenu();
  }, []);

  const handleCreateTenant = async () => {
    if (!tenantId.trim()) return;

    try {
      let resp = await fetch(
        "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants",
        {
          method: "POST",
          headers: {
            "x-zocom": API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: tenantId.trim() }),
        }
      );
      const data = resp.json();
      if (resp.ok) {
        alert("Kundnamn skapat framgångsrikt!");
        dispatch(setTenantId(tenantId.trim()));
        setIsOverlayOpen(false);
      } else {
        alert("Kundnamnet är upptaget, var god prova ett annat.");
      }
    } catch (error) {
      console.error("Fel vid skapande av kundnamn", error);
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <MenuList items={menuList} />
      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Ange ditt kundnamn</h2>
            <p>(Detta används för att skapa din order)</p>
            <input
              type="text"
              value={tenantId}
              onChange={(e) => setTenantIdLocal(e.target.value)}
              placeholder="Ange valfritt namn"
            />
            <button onClick={handleCreateTenant}>Let's go!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
