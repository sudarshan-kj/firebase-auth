import { useReducer } from "react";
import { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, error: "" };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "RESET":
      return {
        ...state,
        isLoading: false,
        error: "",
      };
    default:
      throw new Error("Unknown action type", action.type);
  }
};
const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login, signInWithGoogle, signInWithFacebook } =
    useAuth();
  const history = useHistory();
  const [loginData, dispatchLoginData] = useReducer(loginReducer, {
    error: "",
    isLoading: false,
  });

  async function handleEmailLogin(e) {
    e.preventDefault();
    try {
      dispatchLoginData({ type: "LOADING" });
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      console.error(`Email login error:`, e);
      dispatchLoginData({ type: "ERROR", payload: `Email login failed` });
    } finally {
      dispatchLoginData({ type: "RESET" });
    }
  }

  async function handleSocialLogin(callFunction, provider) {
    try {
      dispatchLoginData({ type: "LOADING" });
      await callFunction();
    } catch (e) {
      console.error(`${provider} login error:`, e);
      dispatchLoginData({ type: "ERROR", payload: `${provider} login failed` });
    } finally {
      dispatchLoginData({ type: "RESET" });
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {loginData.error && <Alert variant="danger">{loginData.error}</Alert>}
          <Form onSubmit={handleEmailLogin}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <div className="w-100 text-center mt-2">
              Forgot password? <Link to="/forgot-password">Reset</Link>
            </div>
            <Button
              className="w-100 mt-3"
              type="submit"
              disabled={loginData.loading}
            >
              Login
            </Button>
            <Button
              onClick={() => handleSocialLogin(signInWithGoogle, "Google")}
              className="w-100 mt-3"
              type="button"
              disabled={loginData.loading}
            >
              Login With Google
            </Button>
            <Button
              onClick={() => handleSocialLogin(signInWithFacebook, "Facebook")}
              className="w-100 mt-3"
              type="button"
              disabled={loginData.loading}
            >
              Login With Facebook
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </>
  );
};

export default Login;
