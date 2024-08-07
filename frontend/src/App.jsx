import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Loginpage from "./pages/Loginpage";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/AuthUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage/WatchPage";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
  const { user, isCheckingAuth, authcheck } = useAuthStore();
  console.log(user);

  useEffect(() => {
    authcheck();
  }, [authcheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={!user ? <Loginpage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/history"
          element={user ? <HistoryPage /> : <Navigate to={"/login"} />}
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
