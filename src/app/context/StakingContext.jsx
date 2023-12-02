"use client";
import { createContext, useState } from "react";

const StakingContext = createContext();

export const StakingProvider = ({children}) => {
    const [isReloaded, setIsReloaded] = useState(false);

    return (
        <StakingContext.Provider value={{isReloaded, setIsReloaded}}>
            {children}
        </StakingContext.Provider>
    )

}

export default StakingContext;