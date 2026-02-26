import { Link } from "react-router";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Link to="/map" className="app-link">
        Go to Map Editor
      </Link>
    </div>
  );
};

export default App;
