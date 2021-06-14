import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  console.log("PROPS DASHBOARD", props);
  const [error, setError] = useState("");
  const { currentUser, logout, handleProfileDelete } = useAuth();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      props.history.push("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.displayName}
          <img
            src={currentUser.photoURL}
            style={{ height: "150px", width: "150px", objectFit: "cover" }}
          />
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <Button
            className="btn btn-primary w-100 mt-3"
            onClick={async () => await handleProfileDelete()}
          >
            Delete Profile
          </Button>
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
