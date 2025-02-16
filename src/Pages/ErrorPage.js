import { useRouteError } from "react-router";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Error on this page!!!";
  let message = "Error due to unidentified reason.";
  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }
  if (error.status === 404) {
    title = "Error 404.";
    message = "Message not found.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
