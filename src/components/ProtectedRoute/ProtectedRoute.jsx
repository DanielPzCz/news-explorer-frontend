import { useEffect } from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute(props) {
  const { loggedIn, onUnauthorized, children } = props;

  useEffect(() => {
    if (!loggedIn) {
      onUnauthorized();
    }
  }, [loggedIn, onUnauthorized]);

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
