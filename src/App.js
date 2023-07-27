import { useSelector } from "react-redux";
import Auth from "./components/Auth/Auth";
import Layout from "./components/Layout/Layout";

function App() {
  const token = useSelector((state) => state.auth.token);
  return <>{!!token ? <Layout /> : <Auth />}</>;
}

export default App;
