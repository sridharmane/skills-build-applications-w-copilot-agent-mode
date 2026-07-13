import { useEffect, useState } from "react";
import { apiBaseUrl, fetchCollection } from "../api";

const teamsEndpoint = `${apiBaseUrl}/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadTeams() {
      try {
        const data = await fetchCollection(teamsEndpoint, "teams");
        if (!ignore) {
          setTeams(data);
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

    loadTeams();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p className="status-text">Loading teams...</p>;
  }

  if (error) {
    return <p className="status-text error">Unable to load teams: {error}</p>;
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Groups</p>
        <h1>Teams</h1>
      </div>
      <div className="data-grid">
        {teams.map((team) => (
          <article className="data-card" key={team._id ?? team.name}>
            <h2>{team.name}</h2>
            <p>{team.city}</p>
            <dl>
              <div>
                <dt>Mascot</dt>
                <dd>{team.mascot}</dd>
              </div>
              <div>
                <dt>Members</dt>
                <dd>{team.members?.length ?? 0}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Teams;
