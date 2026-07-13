import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import logo from "../../../docs/octofitapp-small.png";
import { apiBaseUrl } from "./api";
import "./App.css";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";

function App() {
  const links = [
    { to: "/users", label: "Users" },
    { to: "/teams", label: "Teams" },
    { to: "/activities", label: "Activities" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/workouts", label: "Workouts" },
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img src={logo} alt="OctoFit Tracker" />
          <div>
            <p>OctoFit</p>
            <strong>Tracker</strong>
          </div>
        </div>

        <nav className="nav-list" aria-label="OctoFit sections">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="api-panel">
          <span>API</span>
          <code>{apiBaseUrl}</code>
        </div>
      </aside>

      <main className="content-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
