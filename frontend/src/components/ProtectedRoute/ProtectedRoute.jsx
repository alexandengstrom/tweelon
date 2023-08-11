import { Outlet, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../validation/jwt";
import { useEffect } from "react";

function ProtectedRoute() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        }
    }, [navigate]);

    return <Outlet />;
}

export default ProtectedRoute;
