import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef,
} from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import MainContext from "../../context";
import FormPart from "../UI/Inputs/FormPart";

const enterMailReducer = (state, action) => {
  if (action.type === "E_MAIL") {
    return {
      value: action.payload,
      invalid: action.payload.includes("@"),
    };
  }
  if (action.type === "BLURED") {
    return {
      value: state.value,
      invalid: state.value.includes("@"),
    };
  }

  return { value: "", invalid: state.value.includes("@") };
};

const enterPasswordReducer = (state, action) => {
  if (action.type === "PASSWORD") {
    return {
      value: action.payload,
      invalid: action.payload.trim().length > 6,
    };
  }
  if (action.type === "BLURED_PAS") {
    return {
      value: state.value,
      invalid: state.value.trim().length > 6,
    };
  }

  return { value: "", invalid: state.value.trim().length > 6 };
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [enterMail, dispatchenterMail] = useReducer(enterMailReducer, {
    value: "",
    invalid: undefined,
  });

  const [enterPassword, dispatchenterPassword] = useReducer(
    enterPasswordReducer,
    {
      value: "",
      invalid: undefined,
    }
  );
  const { invalid: invalidMail } = enterMail;
  const { invalid: invalidPass } = enterPassword;

  useEffect(() => {
    const interval = setTimeout(() => {
      setFormIsValid(invalidMail && invalidPass);
    }, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [invalidPass, invalidMail]);

  const ctx = useContext(MainContext);
  const emailChangeHandler = (event) => {
    dispatchenterMail({ type: "E_MAIL", payload: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchenterPassword({ type: "PASSWORD", payload: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchenterMail({ type: "BLURED" });
  };

  const validatePasswordHandler = () => {
    dispatchenterPassword({ type: "BLURED_PAS" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(enterMail.value, enterPassword.value);
    } else if (!invalidMail) {
      emailRef.current.focus();
    } else {
      passRef.current.focus();
    }
  };

  const emailRef = useRef();
  const passRef = useRef();

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <FormPart
          ref={emailRef}
          isValid={invalidMail}
          htmlFor="Email"
          type="Email"
          id="Email"
          content="Email"
          value={enterMail.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <FormPart
          ref={passRef}
          isValid={invalidPass}
          content="Password"
          htmlFor="Password"
          type="Password"
          id="Password"
          value={enterPassword.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
