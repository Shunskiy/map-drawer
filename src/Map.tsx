import ControlPanel from "./components/ControlPanel";
import Grid from "./components/Grid";
import "./MapPage.css";

const Map = () => {
  return (
    <div className="map-page">
      <h1>Map Editor</h1>
      <ControlPanel />
      <Grid />
    </div>
  );
};

export default Map;
