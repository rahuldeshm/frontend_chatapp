import { useSelector } from "react-redux";
import Auth from "./components/Auth/Auth";
import Chat from "./components/Chat/Chat";

function App() {
  const token = useSelector((state) => state.auth.token);
  return <>{!!token ? <Chat /> : <Auth />}</>;
}

export default App;
