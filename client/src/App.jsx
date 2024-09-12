import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  About,
  Restaurants,
  Home,
  Login,
  Error,
  Account,
  AllUsers,
} from "./pages";
import ResetPassword from "./pages/ResetPassword";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import SingleUser from "./components/SingleUser";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route path="/" element={<Home />}>
              <Route path="restaurants" element={<Restaurants />} />
              <Route path="account" element={<Account />} />
              <Route path="users">
                <Route index element={<AllUsers />} />
                <Route path=":id" element={<SingleUser />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
