import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Burger,
  useMantineTheme,
} from "@mantine/core";

import classes from "./Landing.module.css";
import Home from "../Home Page/Home";
import Logo from "../../images/logo.png"
import { useScroll } from "../../hooks/useScroll";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/NavBar/Navbar.jsx"
import DropDown from "../../components/DropDown/DropDown";
import { Outlet } from "react-router";

export default function Landing() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(true);
  const [collapse, setCollapse] = useState(true);
  const scrollposition = useScroll();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          paddingRight: "calc(var(--mantine-aside-width, 0px) + 0.1px)",
          paddingTop: "calc(var(--mantine-header-height, 0px) + 0.1px)",
          paddingLeft: "calc(var(--mantine-navbar-width, 0px) + 0.1px)",
          paddingBottom:
            "calc(var(--mantine-footer-height, 0px) + 1px) !important",
          "@media (max-width: 766px)": {
            paddingRight: "0px",
          },
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          className={`${collapse ? classes.active : classes.deactive} ${
            classes.navbar
          }`}
        >
          <Nav/>
        </Navbar>
      }
    >
      <Header height={{ base: 50, md: 70 }} p="md" className={`${classes.nav} ${(scrollposition < 20 || !collapse) ? classes.start : classes.end}`}>
        <div
          style={{ display: "flex", alignItems: "center", height: "100%" }}
          className={`${classes.header}`}
        >
          <div className={`${classes.headFirst}`}>
            <Burger
              opened={!collapse}
              onClick={() => setCollapse((o) => !o)}
              size="sm"
              color={theme.colors.green[9]}
              mr="xl"
            />
            <img src={Logo} alt='logo' className={classes.logo}/>
            <h2>Geo Collector</h2>
          </div>
          <DropDown/>
        </div>
      </Header>
      <Outlet/>
      <Footer/>
    </AppShell>
  );
}
