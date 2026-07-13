import { useEffect, useState } from "react";
import { fetchCollection } from "../api";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadWorkouts() {
      try {
        const data = await fetchCollection("workouts", "workouts");
        if (!ignore) {
          setWorkouts(data);
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

    loadWorkouts();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p className="status-text">Loading workouts...</p>;
  }

  if (error) {
    return <p className="status-text error">Unable to load workouts: {error}</p>;
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Plans</p>
        <h1>Workouts</h1>
      </div>
      <div className="data-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.title}>
            <h2>{workout.title}</h2>
            <p>{workout.focusArea}</p>
            <dl>
              <div>
                <dt>Level</dt>
                <dd>{workout.difficulty}</dd>
              </div>
              <div>
                <dt>Minutes</dt>
                <dd>{workout.durationMinutes}</dd>
              </div>
            </dl>
            <ul className="exercise-list">
              {(workout.exercises ?? []).map((exercise) => (
                <li key={exercise}>{exercise}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
