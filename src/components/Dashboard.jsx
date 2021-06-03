import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  console.log("PROPS DASHBOARD", props);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    await logout();
    props.history.push("/login");
    //setError("");
    // try {
    //   await logout();
    // } catch {
    //   setError("Failed to logout");
    // }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
