import React, { useState, useContext } from 'react';


const ThemeContext = React.createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
}
export default function ThemeProvider(children) {
    const [lightTheme, setLightTheme] = useState(true);
    const toggleTheme = () => {
        setLightTheme(!lightTheme);
    }
    let value = {
        lightTheme,
        toggleTheme
    }
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
