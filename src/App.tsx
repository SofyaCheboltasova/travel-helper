import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import style from "./App.module.scss";
import { pages } from "./assets/consts/pages";
import Nav from "./components/Elements/Nav/Nav";
import Main from "./components/Elements/Main/Main";
import MapComponent from "./components/Pages/MapPage/MapPage";
import ResourcesPage from "./components/Pages/ResourcesPage/ResourcesPage";
import WelcomePage from "./components/Pages/WelcomePage/WelcomePage";
import { Provider } from "react-redux";
import store from "./redux/store";
import SightsPage from "./components/Pages/SightsPage/SightsPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className={style.app}>
          <Nav />
          <Routes>
            <Route
              path={pages.home.path}
              element={<Main children={<WelcomePage />} />}
            />
            <Route
              path={pages.newRoute.path}
              element={<Main children={<MapComponent />} />}
            />
            <Route
              path={pages.savedRoutes.path}
              element={<Main children={<SightsPage />} />}
            />
            <Route
              path={pages.tickets.path}
              element={<Main children={<ResourcesPage />} />}
            />
          </Routes>
        </section>
      </Router>
    </Provider>
  );
}

export default App;

