import { createBrowserRouter } from "react-router-dom";
import Menu from "../views/Menu";
import Cart from "../views/Cart";
import Order from "../views/Order";
import Receit from "../views/Receit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/receit",
    element: <Receit />,
  },
]);
export default router;