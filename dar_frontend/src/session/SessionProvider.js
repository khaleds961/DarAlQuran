import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Api from "../Api";
import SessionContext from "./SessionContext";


export default function SessionProvider({ children }) {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [session, SetSession] = useState({token:localStorage.getItem('token')});
    const [loading, setLoading] = useState(false)
    
    const getUserData = async () => {
        setLoading(true)
        try {
            let response = await Api.get('/getUserbyToken')
            let user = response.data.user
            updateSession({ user, roles: [user.role_id] });
            navigate(location.state?.from?.pathname, { replace: true });
            setLoading(false)
        } catch (e) {
            Swal.fire({
                title: 'Error!',
                text: e,
                icon: 'error',
                confirmButtonText: 'حسنا'
            })
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserData()
        }
    }, []);

    function updateSession(nextSession) {
        SetSession(prevSession => ({
            ...prevSession, ...nextSession
        }))
    }

    const login = (username, password) => {
        if (username && password) {
            Api.post("/login", {
                username: username,
                password: password,
            })
                .then((response) => {
                    let token = response?.data?.data?.token;
                    let user = { ...response.data.data.user, token }
                    updateSession({ user, roles: [user.role_id] });
                    navigate(from, { replace: true });
                    localStorage.setItem('token', token);
                })
                .catch(function (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: error.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'حسنا'
                    })
                });
        }
    }
    function logout() {
        localStorage.removeItem("token")
        updateSession({user:null,roles:null})
    }
    const context = {
        session,
        loading,
        actions: {
            login,
            logout
        }
    }
    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    );
}