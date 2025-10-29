import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import CompressPDF from "./pages/tools/CompressPDF";
import Login from "./pages/auth/Login";
import EditPDF from "./pages/tools/EditPDF";

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
    path: "/edit",
    element: <EditPDF />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
