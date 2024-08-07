import { useAuthStore } from "../../store/AuthUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const Homepage = () => {
  const { user } = useAuthStore();
  return (
    <div className=" h-screen">{user ? <HomeScreen /> : <AuthScreen />}</div>
  );
};

export default Homepage;
