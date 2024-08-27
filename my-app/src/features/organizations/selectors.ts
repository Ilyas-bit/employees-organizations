import { RootState } from "../../store/store";

export const selectOrganizations = (state: RootState) =>
  state.organizationsAndEmployees.organizations;

export const selectEmployeesByOrganizationId =
  (organizationId: string) => (state: RootState) =>
    state.organizationsAndEmployees.organizations.find(
      (org) => org.id === organizationId
    )?.employees || [];
