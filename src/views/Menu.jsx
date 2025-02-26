import { useEffect, useState } from "react";
import Header from "../components/Header";
import MenuList from "../components/MenuList";
import "./css/menu.css";

const Menu = () => {
  const API_KEY = "yum-7BTxHCyHhzI";
  const [menuList, setMenuList] = useState([]);
  const [tenantId, setTenantId] = useState('');

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

  return (
    <div className="wrapper">
      <Header />
      <MenuList items={menuList} />
    </div>
  );
};

export default Menu;
