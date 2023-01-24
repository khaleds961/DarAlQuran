import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import SessionContext from "../session/SessionContext";

const RequireAuth = ({ allowedRoles }) => {

    const { session } = useContext(SessionContext);
    const location = useLocation();

    return (
        session?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : session?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;