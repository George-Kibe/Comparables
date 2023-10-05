import { PropsWithChildren, createContext, useContext } from "react";
import { useUser } from "@clerk/clerk-expo";

const UserContext = createContext<any>(null);

const UserContextProvider = ({children}: PropsWithChildren) => {
    const {user: authUser, isLoaded: isAuthLoaded} = useUser();

    // const dbUser = data?.profileUsingprofile_authid_key;

    // const loading = isDbLoading || !isAuthLoaded;
    
    return(
        <UserContext.Provider value={{ authUser }} >
          {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);