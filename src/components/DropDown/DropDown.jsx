import { forwardRef, useContext } from "react";
import { IconChevronRight } from "@tabler/icons";
import {
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  Button,
} from "@mantine/core";
import { FunctionList } from "../../context/Context";
import { useNavigate } from "react-router";
import classes from "./DropDown.module.css";
import { IconExternalLink } from "@tabler/icons";

const UserButton = forwardRef(
  ({ image, name, email, icon, ...others }, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
);

export default function DropDown() {
  const { isAuth, username, email, imageUrl, Logout } = useContext(FunctionList);
  const navigate = useNavigate();
  return (
    <>
      {isAuth ? (
        <Group position="center">
          <Menu withArrow>
            <Menu.Target>
              <UserButton
                image={imageUrl ? imageUrl : ""}
                name={username}
                email={email}
              />
            </Menu.Target>
            {/* ...Menu.Items */}
            <Menu.Dropdown>
              <Menu.Item component="a" href="/profile">
                Profile
              </Menu.Item>

              <Menu.Item
                icon={<IconExternalLink size={14} />}
                component="a"
                onClick={(e) => {
                    Logout();
                    navigate("/login", {})
                }}
              >
                Log Out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      ) : (
        <div className={`${classes.btnContainer}`}>
          <Button
            variant="outline"
            color="cyan"
            className={`${classes.btn}`}
            onClick={(e) => {
              navigate("/login", {});
            }}
          >
            Log in
          </Button>
          <Button
            color="teal"
            onClick={(e) => {
              navigate("/login", {
                state: {
                  type: "register",
                },
              });
            }}
          >
            Sign In
          </Button>
        </div>
      )}
    </>
  );
}
