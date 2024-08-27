import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export const selectOrganizations = (state: RootState) =>
  state.organizationsAndEmployees.organizations;

export const selectEmployeesByOrganizationId =
  (organizationId: string) => (state: RootState) =>
    state.organizationsAndEmployees.organizations.find(
      (org) => org.id === organizationId
    )?.employees || [];

export const selectOrganizationById = (organizationId: string) =>
  createSelector([selectOrganizations], (organizations) =>
    organizations.find((org) => org.id === organizationId)
  );
