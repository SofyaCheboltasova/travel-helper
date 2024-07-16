import MapComponent from "./components/Map/Map";
import Nav from "./components/Nav/Nav";

import style from "./App.module.scss";

function App() {
  return (
    <section className={style.app}>
      <Nav />
      <MapComponent />
    </section>
  );
}

export default App;

