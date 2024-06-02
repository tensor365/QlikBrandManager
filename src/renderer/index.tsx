import { createRoot } from "react-dom/client";



import { App } from "./App";

document.addEventListener("DOMContentLoaded", () => {
    createRoot(document.getElementById("react-app") as HTMLDivElement).render(
        

                <App />

    );
});
