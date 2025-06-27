import { Navigate } from 'react-router-dom';

export default function RequireRole({ allowedRoles, children }) {
  const userRaw = localStorage.getItem("user");
  console.log("REQUIREROLE | userRaw:", userRaw);
  if (!userRaw) return <Navigate to="/login" replace />;

  const user = JSON.parse(userRaw);
  const role = user.customRole || user.user_metadata?.role || user.role;
  console.log("REQUIREROLE | role:", role, "| autorisé :", allowedRoles);

  if (!role || !allowedRoles.includes(role)) {
    console.log("REQUIREROLE | REFUSE ACCES, renvoie sur /login");
    return <Navigate to="/login" replace />;
  }
  return children;
}