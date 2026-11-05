
import ErrorPage from "../shared/ErrorPage";

const ForbiddenPage = () => {
  return (
    <ErrorPage
      statusCode="403"
      title="Access Denied"
      errorMessage="You don't have permission to access this page. Please contact your administrator if you believe this is a mistake."
      showHomeButton
    />
  );
};

export default ForbiddenPage;
