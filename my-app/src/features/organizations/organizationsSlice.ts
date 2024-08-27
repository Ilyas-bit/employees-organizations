import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export interface Employee {
  id: string;
  name: string;
}

export interface Organization {
  id: string;
  name: string;
  employees: Employee[];
}

interface OrganizationsAndEmployeesState {
  organizations: Organization[];
}

const initialState: OrganizationsAndEmployeesState = {
  organizations: [
    {
      id: "organization-a",
      name: "Organization A",
      employees: [
        { id: "1", name: "Employee A1" },
        { id: "2", name: "Employee A2" },
      ],
    },
    {
      id: "organization-b",
      name: "Organization B",
      employees: [{ id: "3", name: "Employee B1" }],
    },
  ],
};

const organizationsAndEmployeesSlice = createSlice({
  name: "organizationsAndEmployees",
  initialState,
  reducers: {
    addOrganization: (state, action: PayloadAction<{ name: string }>) => {
      state.organizations.push({
        id: nanoid(),
        name: action.payload.name,
        employees: [],
      });
    },
    editOrganization: (state, action: PayloadAction<Organization>) => {
      const index = state.organizations.findIndex(
        (org) => org.id === action.payload.id
      );
      if (index !== -1) {
        state.organizations[index] = action.payload;
      }
    },
    deleteOrganization: (state, action: PayloadAction<string>) => {
      state.organizations = state.organizations.filter(
        (org) => org.id !== action.payload
      );
    },
    addEmployee: (
      state,
      action: PayloadAction<{ organizationId: string; employee: Employee }>
    ) => {
      const org = state.organizations.find(
        (org) => org.id === action.payload.organizationId
      );
      if (org) {
        org.employees.push({ ...action.payload.employee, id: nanoid() });
      }
    },
    editEmployee: (
      state,
      action: PayloadAction<{ organizationId: string; employee: Employee }>
    ) => {
      const { organizationId, employee } = action.payload;
      const org = state.organizations.find((org) => org.id === organizationId);
      if (org) {
        const index = org.employees.findIndex((emp) => emp.id === employee.id);
        if (index !== -1) {
          org.employees[index] = employee;
        }
      }
    },
    deleteEmployee: (
      state,
      action: PayloadAction<{ organizationId: string; employeeId: string }>
    ) => {
      const { organizationId, employeeId } = action.payload;
      const org = state.organizations.find((org) => org.id === organizationId);
      if (org) {
        org.employees = org.employees.filter((emp) => emp.id !== employeeId);
      }
    },
  },
});

export const {
  addOrganization,
  editOrganization,
  deleteOrganization,
  addEmployee,
  editEmployee,
  deleteEmployee,
} = organizationsAndEmployeesSlice.actions;

export default organizationsAndEmployeesSlice.reducer;
