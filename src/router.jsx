import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ index: true, element: <Index /> }],
  },
]);

export default router;
