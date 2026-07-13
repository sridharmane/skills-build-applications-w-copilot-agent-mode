import { useEffect, useState } from "react";
import { fetchCollection } from "../api";

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : "http://localhost:8000/api/users/";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadUsers() {
      try {
        const data = await fetchCollection(usersEndpoint, "users");
        if (!ignore) {
          setUsers(data);
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

    loadUsers();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p className="status-text">Loading users...</p>;
  }

  if (error) {
    return <p className="status-text error">Unable to load users: {error}</p>;
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Members</p>
        <h1>Users</h1>
      </div>
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.email}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{user.role}</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>{user.team?.name ?? "Unassigned"}</dd>
              </div>
              <div>
                <dt>Age</dt>
                <dd>{user.age}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Users;
