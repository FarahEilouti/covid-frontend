import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import AllCountries from './AllCountries';
import MyRecords from './MyRecords';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <Header />

      <nav id="main-nav">
        <ul id="nav-list">
          <li id="nav-item-1">
            <NavLink exact to="/" activeClassName="active" rel="home">
              Home
            </NavLink>
          </li>
          <li id="nav-item-2">
            <NavLink to="/all-countries" activeClassName="active" rel="All countries">
              All Countries
            </NavLink>
          </li>
          <li id="nav-item-3">
            <NavLink to="/my-records" activeClassName="active" rel="All Records">
              My Records
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-countries" element={<AllCountries />} />
        <Route path="/my-records" element={<MyRecords />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
