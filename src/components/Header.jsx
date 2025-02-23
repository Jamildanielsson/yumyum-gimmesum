import { HiOutlineShoppingBag } from "react-icons/hi2";
import './header.css'

const Header = () => {
  return (
    <div className="menu-header">
        <div className='cart'>
        <div className="counter">0</div>
            <div className="cartbox">
            <HiOutlineShoppingBag className="icon"/>
            </div>
        </div>
    </div>
  )
}

export default Header