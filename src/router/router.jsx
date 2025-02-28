import { createBrowserRouter } from "react-router-dom";
import Menu from "../views/Menu/Menu";
import Eta from "../views/Eta/Eta";
import Order from "../views/Order/Order";
import Receit from "../views/Receit/Receit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
  },
  {
    path: "/eta",
    element: <Eta />,
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
