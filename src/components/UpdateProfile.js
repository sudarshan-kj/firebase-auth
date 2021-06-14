import { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const UpdateProfile = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const profilePhotoRef = useRef();

  const { currentUser, updateEmail, updatePassword, updatePhotoUrl } =
    useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Current user is", currentUser.providerData);
    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError("Passwords do not match");

    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    try {
      setError("");
      setLoading(true);
      promises.push(updatePhotoUrl());

      await Promise.all(promises);
      history.push("/");
    } catch {
      setError("Could not update account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave this blank to keep the password same"
              />
            </Form.Group>
            <Form.Group id="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave this blank to keep the password same"
              />
            </Form.Group>
            <Form.Group id="profilePhoto">
              <Form.Label>Profile Photo</Form.Label>
              <Form.Control type="file" ref={profilePhotoRef} />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit" disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
