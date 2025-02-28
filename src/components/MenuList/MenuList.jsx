import MenuItem from "../MenuItem/MenuItem";
import "./menulist.css";

const MenuList = ({ items = [] }) => {

const handleClick = () => {
  console.log('Skickar beställning')
}

  return (
    <div className="menulist-wrapper">
      <div className="menulist-container">
        <h1 className="menu-heading">MENY</h1>

        {items.length > 0 ? (
          items.map((item) => <MenuItem key={item.id} item={item} onClick={() => handleClick}/>)
        ) : (
          <p className="loading">Laddar meny...</p>
        )}
      </div>
    </div>
  );
};

export default MenuList;
