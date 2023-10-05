import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";

const UserContext = createContext<any>(null);

const UserContextProvider = ({children}: PropsWithChildren) => {
    const {user: authUser, isLoaded: isAuthLoaded} = useUser();
    const [password, setPassword] = useState("");
    const [dbUser, setDbUser] = useState(null);

    const getDBUser = async() => {
        if(!authUser){return}
        const email = authUser?.primaryEmailAddress?.emailAddress
        // console.log("Email: ", email)
        try {
            const response = await fetch(`https://realhive.vercel.app/api/users/${email}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              },
              );
              const userData = await response.json();
              setDbUser(userData)
        } catch (error) {
            
        }
    }
    useEffect(() => {
     getDBUser()
    }, [authUser])
    // const loading = isDbLoading || !isAuthLoaded;
    
    return(
        <UserContext.Provider value={{ authUser, password, setPassword, dbUser, setDbUser }} >
          {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);