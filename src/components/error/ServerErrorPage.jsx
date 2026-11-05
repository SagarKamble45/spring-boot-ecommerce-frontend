    
import ErrorPage from "../shared/ErrorPage";

const ServerErrorPage = () => {
  return (
    <ErrorPage
      statusCode="500"
      title="Internal Server Error"
      errorMessage="Something unexpected happened on our server. Please try again later."
      showHomeButton
    />
  );
};

export default ServerErrorPage;
