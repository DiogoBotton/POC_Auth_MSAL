import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import LoginAD from "./pages/login_ad/LoginAD";
import LoginB2C from "./pages/login_b2c/LoginB2C";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginAD />} />
      <Route path="/b2c" element={<LoginB2C />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
