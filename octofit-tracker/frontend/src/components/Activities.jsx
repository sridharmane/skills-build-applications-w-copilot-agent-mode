import { useEffect, useState } from "react";
import { apiBaseUrl, fetchCollection } from "../api";

const activitiesEndpoint = `${apiBaseUrl}/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadActivities() {
      try {
        const data = await fetchCollection(activitiesEndpoint, "activities");
        if (!ignore) {
          setActivities(data);
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

    loadActivities();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p className="status-text">Loading activities...</p>;
  }

  if (error) {
    return <p className="status-text error">Unable to load activities: {error}</p>;
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Training log</p>
        <h1>Activities</h1>
      </div>
      <div className="data-list">
        {activities.map((activity) => (
          <article className="data-row" key={activity._id ?? activity.type}>
            <div>
              <h2>{activity.type}</h2>
              <p>{activity.user?.name ?? "Unknown user"}</p>
            </div>
            <dl>
              <div>
                <dt>Minutes</dt>
                <dd>{activity.durationMinutes}</dd>
              </div>
              <div>
                <dt>Calories</dt>
                <dd>{activity.caloriesBurned}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Activities;
