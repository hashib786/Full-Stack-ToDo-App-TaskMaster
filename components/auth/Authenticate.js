import React from "react";
import Form from "../layout/Form";
import Link from "next/link";

const Authenticate = (props) => {
  const { signup } = props;
  return (
    <div className="container">
      <div className="auth__header">
        <div className="auth__header--container">
          <div className="auth__btn--container">
            <div className="change__auth">
              <Link
                className={`auth__change--btn ${signup ? "active" : ""}`}
                href="/auth/signup"
              >
                Sign Up
              </Link>
              <Link
                className={`auth__change--btn ${!signup ? "active" : ""}`}
                href="/auth/login"
              >
                Sign In
              </Link>
            </div>
          </div>
          <Form signup={signup} />
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
