import { Link } from "react-router";

const EVENTS = [
  { id: "e1", title: "Event 1" },
  { id: "e2", title: "Event 2" },
  { id: "e3", title: "Event 3" },
];

export default function EventsPage() {
  return (
    <>
      <h1>Events Page..</h1>
      <ul>
        {EVENTS.map((events) => (
          <li key={events.id}>
            <Link to={`/events/${events.id}`}>{events.id}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
