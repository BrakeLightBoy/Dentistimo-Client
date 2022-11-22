import { createContext, useState } from "react";

export const LoginContext = createContext({});

export function LoginProvider({ children}) {
    const [userNum, setUserNum] = useState([]);

    const userLogin = (personalNum) => {
        setUserNum(personalNum);
    };

    return (
        <LoginContext.Provider value={{userNum, userLogin}}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginContext;

