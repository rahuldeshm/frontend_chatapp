import { useSelector } from "react-redux";
import Auth from "./components/Auth/Auth";

function App() {
  const token = useSelector((state) => state.auth.token);
  return <>{!!token ? <h1>logged in</h1> : <Auth />}</>;
}

export default App;
