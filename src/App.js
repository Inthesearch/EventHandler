import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./components/Root";
import HomePage from "./components/HomePage.js";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./components/EventDetailPage.js";
import EventsPage, { loader as eventLoader } from "./components/Events.js";
import NewEventPage from "./components/NewEventPage";
import EditEventPage from "./components/EditEventPage";
import ErrorPage from "./Pages/ErrorPage.js";
import EventRootLayout from "./Pages/EventRootLayout.js";
import { action as addEditAction } from "./components/EventForm.js";
import NewsletterPage, { action as signUpAction } from "./Pages/Newsletter.js";

// Challenge / Exercise

//

// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "events",
        element: <EventRootLayout />,
        children: [
          { index: true, element: <EventsPage />, loader: eventLoader },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: addEditAction,
              },
            ],
          },
          { path: "new", element: <NewEventPage />, action: addEditAction },
        ],
      },
      { path: "newsletter", element: <NewsletterPage />, action: signUpAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
