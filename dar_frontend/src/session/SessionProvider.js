import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Api from "../Api";
import SessionContext from "./SessionContext";


export default function SessionProvider({ children }) {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [session, SetSession] = useState({ token: localStorage.getItem('token') });
    const [loading, setLoading] = useState(false)

    const getUserData = async () => {
        // console.log(localStorage.getItem('token'));return;
        setLoading(true)
        try {
            Api.get('/getUserbyToken', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then((response) => {
                if (response.data.success) {
                    let user = response.data.user
                    updateSession({ user, roles: [user.role_id] });
                    navigate(location.state?.from?.pathname, { replace: true });
                    setLoading(false)
                }
            })
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
                    console.log({ response });
                    console.log({ response });
                    let token = response?.data?.data?.token;
                    console.log(token, 'token login');
                    let user = { ...response.data?.data?.user }
                    updateSession({ user, roles: [user.role_id], token });
                    navigate(from, { replace: true });
                    localStorage.setItem('token', token);
                })
                .catch(function (error) {
                    console.log(error)
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
        Api.post(`logout`, null, {
            headers: { Authorization: `Bearer ${session.token}` }
        })
            .then((res) => {
                console.log({ res });
                if (res.data.success) {
                    localStorage.removeItem("token")
                    updateSession({ user: null, roles: null })
                }
            })
            .catch(function (err) {
                console.log(err);
            });
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