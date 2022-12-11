import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Anchor,
  Stack,
} from "@mantine/core";
import BackPic from "../../images/backPic.jpg";
import classes from "./Login.module.css";
import { useContext, useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useLocation, useNavigate } from "react-router";
import { FunctionList } from "../../context/Context";

export default function Login() {
  const [type, toggle] = useToggle(["login", "register"]);
  const { setId, setIsAuth, setVerifiedAt, setEmail, setUsername, setToken, setImageUrl } =
    useContext(FunctionList);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      toggle();
    }
  }, []);
  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });


  function Login(values) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    };
    fetch("http://localhost:5000/user/login", requestOptions)
      .then((e) => {
        console.log(e);
        return e.json();
      })
      .then((e) => {
        console.log(e);
        NotificationManager.success("", "Succesfully Loged In!");
        setEmail(e.result.email);
        setId(e.result.id);
        setIsAuth(true);
        setVerifiedAt(e.result.createdAt);
        setUsername(e.result.name);
        setToken(e.token)
        setImageUrl(e.user?.profilePicture);
        localStorage.setItem("token", e.token);
        localStorage.setItem("name", e.name);
        navigate("/", {});
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function Register(values) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }),
    };
    fetch("http://localhost:5000/user/register", requestOptions)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        console.log(e);
        NotificationManager.success("", "Succesfully registered!");
        setEmail(e.result.email);
        setId(e.result.id);
        setIsAuth(true);
        setVerifiedAt(e.result.createdAt);
        setUsername(e.result.name);
        setToken(e.token)
        localStorage.setItem("token", e.token);
        localStorage.setItem("name", e.name);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className={classes.main}>
      <img src={BackPic} alt="" className={classes.poster} />
      <div className={classes.inp}>
        <form
          onSubmit={form.onSubmit((values) => {
            if (type === "register") {
              if (values.confirmPassword !== values.password) {
                NotificationManager.error("", "Something is not right!");
              } else {
                Register(values);
              }
            } else {
              Login(values);
            }
          })}
          className={classes.form}
        >
          <h1 className={classes.title}>{!(type === 'register') ? "Log In" : "Register"}</h1>
          <Stack>
            {type === "register" && (
              <TextInput
                label="First Name"
                placeholder="Your name"
                value={form.values.firstName}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
              />
            )}

            {type === "register" && (
              <TextInput
                label="Last Name"
                placeholder="Your last name"
                value={form.values.lastName}
                onChange={(event) =>
                  form.setFieldValue("lastName", event.currentTarget.value)
                }
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
            />
            {type === "register" && (
              <PasswordInput
                required
                label="Confirm Password"
                placeholder="Confirm Your password"
                value={form.values.confirmPassword}
                onChange={(event) =>
                  form.setFieldValue(
                    "confirmPassword",
                    event.currentTarget.value
                  )
                }
                error={
                  form.errors.password &&
                  "Password should include at least 6 characters"
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" className={classes.btn}>
              {upperFirst(type)}
            </Button>
          </Group>
          {type !== "register" && (<><hr/>
          <Button type="submit" className={classes.btn1} onClick={e =>{
            navigate('/');
          }}>
              log In Like a Guest
            </Button>
          </>)}
        </form>
      </div>
    </div>
  );
}
