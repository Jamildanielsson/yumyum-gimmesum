import MenuItem from './MenuItem'
import './menulist.css'

const MenuList = () => {
  return (
    <div className='menulist-wrapper'>
        <div className='menulist-container'>
            <h1 className='menu-heading'>MENY</h1>
            <MenuItem />
        </div>
    </div>
  )
}

export default MenuList