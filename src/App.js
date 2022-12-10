import { Route, Routes } from "react-router"
import "./App.css"
import Landing from "./pages/Landing Page/Landing"
import Login from "./pages/Login/Login.jsx"
import "react-notifications/lib/notifications.css"
import { NotificationContainer } from "react-notifications"
import { useContext, useEffect } from "react"
import { FunctionList } from "./context/Context"
import Profile from "./pages/Profile Page/Profile"
import Home from "./pages/Home Page/Home"
import Modal from "react-modal"
import MapPage from "./pages/Map Page/MapPage"

Modal.setAppElement("#root")

function App() {
  const {
    setId,
    setIsAuth,
    setVerifiedAt,
    setEmail,
    setUsername,
    setToken,
    token,
  } = useContext(FunctionList)
  useEffect(() => {
    if (token === undefined && localStorage.getItem("token")?.length > 8) {
      let requestOptions = {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }

      fetch("http://localhost:5000/user/verify", requestOptions)
        .then((e) => {
          console.log(e)
          return e.json()
        })
        .then((e) => {
          console.log(e)
          setEmail(e.user.email)
          setId(e.user._id)
          setIsAuth(true)
          setVerifiedAt(e.user.createdAt)
          setUsername(e.user.name)
          setToken(e.token)
          console.log(e.user.createdAt)
          localStorage.setItem("name", e.user.name)
          localStorage.setItem("varifiedAt", e.user.createdAt)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route path="" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/map" element={<MapPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <NotificationContainer />
    </>
  )
}

export default App
