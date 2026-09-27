import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { addUser } from "../../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  const [isAuthChecking, setIsAuthChecking] = useState(!userData);

  const fetchUser = async () => {
    // Redux optimization: If user is ALREADY present in Redux store, do NOT make the API call again!
    if (userData) {
      setIsAuthChecking(false);
      return;
    }

    try {
      const res = await api.get("/profile/view");
      if (res.data?.data) {
        dispatch(addUser(res.data.data));
      }
    } catch (err) {
      // If user is not logged in and attempts to access protected routes, redirect to /login
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    } finally {
      setIsAuthChecking(false);
    }
  };

  useEffect(() => {
    // If not in Redux store, fetch once
    if (!userData) {
      fetchUser();
    } else {
      setIsAuthChecking(false);
      // If already logged in and user hits /login, keep them logged in and send to feed /
      if (location.pathname === "/login") {
        navigate("/");
      }
    }
  }, [userData, location.pathname]);

  // While checking auth on initial launch/refresh, show a minimal smooth spinner for protected routes
  if (isAuthChecking && location.pathname !== "/login") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#070913] text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
          <span className="text-xs font-mono text-slate-400">Restoring session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#070913] text-slate-100 relative overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* Ambient background glow effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed top-1/2 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <main className="flex-1 flex flex-col relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Body;