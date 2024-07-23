import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import style from "./App.module.scss";

import { pages } from "./assets/consts/consts";
import Nav from "./components/Elements/Nav/Nav";
import Main from "./components/Elements/Main/Main";
import { MapProvider } from "./context/MapContext";
import WikiFrame from "./components/Pages/WikiFrame/WikiFrame";
import MapComponent from "./components/Pages/MapPage/MapPage";
import WelcomePage from "./components/Pages/WelcomePage/WelcomePage";
import ResourcesPage from "./components/Pages/ResourcesPage/ResourcesPage";

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
              element={
                <MapProvider>
                  <Main children={<MapComponent />} />
                </MapProvider>
              }
            />
            <Route
              path={pages.savedRoutes.path}
              element={<Main children={<WikiFrame />} />}
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

