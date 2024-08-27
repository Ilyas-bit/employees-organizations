import { Routes, Route } from "react-router-dom";
import OrganizationsPage from "../pages/OrganizationsPage";
import EmployeesPage from "../pages/EmployeesPage";

const AppRouter = () => (
  <Routes>
    <Route path="/organizations" element={<OrganizationsPage />} />
    <Route
      path="/organizations/:organizationId/employees"
      element={<EmployeesPage />}
    />
    <Route path="*" element={<OrganizationsPage />} />
  </Routes>
);

export default AppRouter;
