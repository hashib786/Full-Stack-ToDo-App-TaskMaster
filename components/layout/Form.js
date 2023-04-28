import { signIn } from "next-auth/react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import Person from "../svg/Person";
import EmailSvg from "../svg/EmailSvg";
import Password from "../svg/Password";

const signUpHandler = async (name, email, password) => {
  const response = fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = (await response).json();
  return data;
};

const Form = ({ signup }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    let name;
    if (signup) name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (signup) {
      const toastId = toast.loading("Creating User...");
      const status = await signUpHandler(name, email, password);
      toast.dismiss(toastId);
      if (status.status === "success") {
        toast.success("Successfully created!");
        nameRef.current.value = "";
        emailRef.current.value = "";
        passRef.current.value = "";

        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      } else toast.error("This is an error!");
    } else {
      const toastId = toast.loading("Login User...");
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.dismiss(toastId);
      if (!result.error) {
        toast.success("Successfully Login!");
        setTimeout(() => {
          router.push("/tasks");
        }, 1000);
      } else toast.error(result.error);
    }
  };

  return (
    <>
      <form className={`form ${!signup && "signin"}`} onSubmit={submitHandler}>
        {signup && (
          <div className="input__label">
            <label className="form__label" htmlFor="name">
              <Person />
            </label>
            <input
              ref={nameRef}
              minLength={5}
              required
              className="form__input"
              type="text"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
        )}

        <div className="input__label">
          <label className="form__label" htmlFor="email">
            <EmailSvg />
          </label>
          <input
            ref={emailRef}
            required
            className="form__input"
            type="email"
            id="email"
            placeholder="Enter Your Email"
          />
        </div>

        <div className="input__label">
          <label className="form__label" htmlFor="password">
            <Password />
          </label>
          <input
            ref={passRef}
            minLength={8}
            required
            className="form__input"
            type="password"
            id="password"
            placeholder="Enter Your Password"
          />
        </div>

        <button className="form__submit--btn">
          {signup ? "Sign Up" : "Sign In"}
        </button>
      </form>
    </>
  );
};

export default Form;
