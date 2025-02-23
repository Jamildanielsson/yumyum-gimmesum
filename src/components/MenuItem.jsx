import "./menuitem.css";

const MenuItem = () => {
  return (
    <ul>
      <li className="listitem">
        <div className="item-top">
          <h3>Karlstad</h3>
          <h3>9 SEK</h3>
        </div>
        <p className="ingredients">
          kantarell, schalottenlök, morot, bladpersilja
        </p>
      </li>
    </ul>
  );
};

export default MenuItem;
