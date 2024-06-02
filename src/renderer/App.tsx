import { HashRouter, Route, Routes } from "react-router-dom";

import {
    FluentProvider,

    type Theme,
} from "@fluentui/react-components";

import {
    lightTheme,
    darkTheme
} from "./theme/theme";

import {Body} from "./BodyPage";
import {Login} from "./LoginPage";

import { useEffect, useState } from "react";

const shouldUseDarkColors = (): boolean =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const getTheme = () => (shouldUseDarkColors() ? darkTheme : lightTheme);

export const App = () => {
    
    const [theme, setTheme] = useState<Theme>(getTheme());
    const [, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        window.ContextBridge.onNativeThemeChanged(() => setTheme(getTheme()));
    }, []);

    return (

            <FluentProvider theme={theme} style={{ height: "100vh", background: "transparent" }}>
                        <HashRouter>
                            <Routes>
                                <Route path="/" element={<Login/>} />
                                <Route path="/home" element={<Body/>} />    
                            </Routes>
                        </HashRouter>
            </FluentProvider>

    );
};
