import { createContext, useState } from "react";

const FunctionList = createContext();

function ContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  const [id, setId] = useState();
  const [admin, setAdmin] = useState("");
  const [email, setEmail] = useState("");
  const [verifiedAt, setVerifiedAt] = useState();
  const [imageUrl, setImageUrl] = useState();

  function Logout(){
    setIsAuth(false);
    setToken()
    setUsername()
    setId()
    setAdmin()
    setEmail()
    setVerifiedAt()
    setImageUrl()
  }

  const values = {
    isAuth,
    setIsAuth,
    token,
    setToken,
    id,
    setId,
    username,
    setUsername,
    admin,
    setAdmin,
    email, 
    setEmail,
    verifiedAt,
    setVerifiedAt,
    imageUrl,
    setImageUrl,
    Logout
  };

  return (
    <FunctionList.Provider value={values}>{children}</FunctionList.Provider>
  );
}

export { ContextProvider, FunctionList };
