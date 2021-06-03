import { Container } from "react-bootstrap";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <BrowserRouter>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/logout" component={Signup} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
