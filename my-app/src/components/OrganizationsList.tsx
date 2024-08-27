import React from "react";
import { List } from "antd";
import { Organization } from "../features/organizations/organizationsSlice";
import OrganizationCard from "./OrganizationCard";

interface OrganizationListProps {
  organizations: Organization[];
  onEdit: (organization: Organization) => void;
  onAddEmployee: (organizationId: string) => void;
  onDelete: (organizationId: string) => void;
}

const OrganizationList: React.FC<OrganizationListProps> = ({
  organizations,
  onEdit,
  onAddEmployee,
  onDelete,
}) => (
  <List
    grid={{ gutter: 16, column: 3 }}
    dataSource={organizations}
    renderItem={(organization) => (
      <List.Item>
        <OrganizationCard
          organization={organization}
          onEdit={onEdit}
          onAddEmployee={onAddEmployee}
          onDelete={onDelete}
        />
      </List.Item>
    )}
  />
);

export default OrganizationList;
