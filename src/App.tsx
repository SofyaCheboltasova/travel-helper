import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import style from "./App.module.scss";
import { pages } from "./assets/consts/pages";
import Nav from "./components/Nav/Nav";
import Main from "./components/Main/Main";
import MapComponent from "./components/MapComponent/MapComponent";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  return (
    <Router>
      <section className={style.app}>
        <Nav />
        <Routes>
          <Route path={pages.home.path} element={<Main />} />
          <Route
            path={pages.newRoute.path}
            element={<Main children={<MapComponent />} />}
          />
          <Route
            path={pages.savedRoutes.path}
            element={<Main children={<MapComponent />} />}
          />
          <Route
            path={pages.tickets.path}
            element={<Main children={<SearchBar />} />}
          />
        </Routes>
      </section>
    </Router>
  );
}

export default App;

