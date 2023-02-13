import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import regions from "./Lviv_regions.svg";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import ChemStat from "./components/chem-statistic.component";
import WaterStat from "./components/water-statistic.component";
import AdminPage from "./components/admin-page.component";
import Homepage from "./components/homepage.component";
import Helpful from "./components/helpful.component";
import News from "./components/news.component";
import LoginUser from "./components/login-user.component";
import NewsPage from "./components/news-page.component";
import BMap from "./components/bmap.component";
import AirStat from "./components/air-statistic.component";

function App() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [userName, setUserName] = useState(user?.name);
  console.log("username", userName);

  console.log("user", user);

  const onLogout = () => {
    localStorage.removeItem("user");
  };

  return (
    <div className="App">
      <Router>
        <header>
          <Navbar bg="dark" className="navmenu-new" variant="dark">
            <Container>
              <Navbar.Brand>
                <NavLink to={"/"} className="nav-link">
                  Головна
                </NavLink>
              </Navbar.Brand>
              <Navbar.Brand>
                <NavLink
                  to={"/news"}
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                >
                  Новини станції
                </NavLink>
              </Navbar.Brand>
              <Navbar.Brand>
                <NavLink to={"/bmap"} className="nav-link">
                  Карта регіону
                </NavLink>
              </Navbar.Brand>
              <Navbar.Brand>
                <NavLink to={"/air-statistic"} className="nav-link">
                  Забруднення повітря
                </NavLink>
              </Navbar.Brand>
              <Navbar.Brand>
                <NavLink to={"/water-statistic"} className="nav-link">
                  Забруднення водойм
                </NavLink>
              </Navbar.Brand>
              <Navbar.Brand>
                <NavLink to={"/chem-statistic"} className="nav-link">
                  Хімічне забруднення
                </NavLink>
              </Navbar.Brand>
              <Navbar.Brand>
                <NavLink to={"/helpful"} className="nav-link">
                  Інформація про Бурштинську ТЕС
                </NavLink>
              </Navbar.Brand>
              <Nav className="justify-content-end" />
              <Nav className="justify-content-end" />
              <Nav>
                <Nav>
                  {userName ? (
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title={userName}
                      menuVariant="dark"
                    >
                      <NavDropdown.Item href="/admin-page">
                        Адмін панель
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/" onClick={() => onLogout()}>
                        Вийти
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <Link to={"/login-user"} className="nav-link">
                      Бурштинська ТЕС
                    </Link>
                  )}
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route path="/" element={<Homepage authed={true} />} />

                  <Route path="/news" element={<News authed={true} />} />

                  <Route
                    path="/news-page"
                    element={<NewsPage authed={true} />}
                  />

                  <Route path="/helpful" element={<Helpful authed={true} />} />

                  <Route
                    path="/air-statistic"
                    element={<AirStat authed={true} />}
                  />

                  <Route
                    path="/chem-statistic"
                    element={<ChemStat authed={true} />}
                  />
                  <Route
                    path="/login-user"
                    element={<LoginUser authed={true} onLogin={setUserName} />}
                  />

                  <Route
                    path="/water-statistic"
                    element={<WaterStat authed={true} />}
                  />

                  <Route path="/bmap" element={<BMap authed={true} />} />

                  <Route
                    path="/admin-page"
                    element={userName ? <AdminPage authed={true} /> : null}
                  />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
