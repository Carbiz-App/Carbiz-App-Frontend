import { createBrowserRouter } from "react-router";

import Homepage from "../pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Homepage,
  },
]);

export default router;
