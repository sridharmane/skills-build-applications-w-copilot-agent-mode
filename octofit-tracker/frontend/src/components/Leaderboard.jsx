import { useEffect, useState } from "react";
import { apiBaseUrl, fetchCollection } from "../api";

const leaderboardEndpoint = `${apiBaseUrl}/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadLeaderboard() {
      try {
        const data = await fetchCollection(leaderboardEndpoint, "leaderboard");
        if (!ignore) {
          setLeaderboard(data);
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p className="status-text">Loading leaderboard...</p>;
  }

  if (error) {
    return <p className="status-text error">Unable to load leaderboard: {error}</p>;
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Rankings</p>
        <h1>Leaderboard</h1>
      </div>
      <div className="leaderboard-list">
        {leaderboard.map((entry) => (
          <article className="leaderboard-row" key={entry._id ?? entry.rank}>
            <strong>#{entry.rank}</strong>
            <div>
              <h2>{entry.user?.name ?? "Unknown user"}</h2>
              <p>{entry.team?.name ?? "No team"}</p>
            </div>
            <span>{entry.points} pts</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
