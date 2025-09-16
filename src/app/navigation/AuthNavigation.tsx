import LoginView from "@/features/auth/LoginView";
import { Route, Routes } from "react-router";

export const AuthNavigation = () => {
   return (
    <Routes>
        <Route path="/" element={<LoginView/>} />

    </Routes>
   )
}


