import React, { useContext, createContext, useState } from "react";

const UserContext = createContext({});

export function useUserAuth() {
    return useContext(UserContext);
}

export function UserProvider ({children}){
    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}


export function useUserContext(){
    const user = useContext(UserContext);
    if (user === null) {
        throw new Error("useUserContext must be used within a InterviewContextProvider");
    }
    return user;
}