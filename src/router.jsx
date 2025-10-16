import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import CompressPDF from "./pages/tools/CompressPDF";
import Login from "./pages/auth/Login";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ index: true, element: <Index /> }],
  },
  {
    path: "/compress",
    element: <CompressPDF />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
