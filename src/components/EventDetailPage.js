import { redirect, useRouteLoaderData, Await } from "react-router-dom";
import EventItem from "./EventItem.js";
import { Suspense } from "react";
import EventsList from "./EventsList.js";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>{(event) => <EventItem event={event} />}</Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(events) => <EventsList events={events} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(eventId) {
  console.log(eventId);
  const response = await fetch("http://localhost:8080/events/" + eventId);
  console.log(response);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Error fetching events." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    console.log(resData.event);
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Error fetching events." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ params }) {
  const eventId = params.eventId;
  return {
    event: await loadEvent(eventId),
    events: loadEvents(),
  };
}

export async function action({ request, params }) {
  const eventId = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message:
          "Could not delete event at the moment. Kindly try again later.",
      }),
      {
        status: 500,
      }
    );
  } else {
    return redirect("/events");
  }
}
