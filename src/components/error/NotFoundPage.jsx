
import ErrorPage from "../shared/ErrorPage";

const NotFoundPage = () => {
  return (
    <ErrorPage
      statusCode="404"
      title="Page Not Found"
      errorMessage="Sorry, the page you're looking for doesn't exist or may have been moved."
      showHomeButton
    />
  );
};

export default NotFoundPage;
    