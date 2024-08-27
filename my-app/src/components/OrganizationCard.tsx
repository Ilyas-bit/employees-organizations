import React from "react";
import { Button, Card, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { Organization } from "../features/organizations/organizationsSlice";

interface OrganizationCardProps {
  organization: Organization;
  onEdit: (organization: Organization) => void;
  onAddEmployee: (organizationId: string) => void;
  onDelete: (organizationId: string) => void;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
  onEdit,
  onAddEmployee,
  onDelete,
}) => (
  <Card
    title={organization.name}
    extra={
      <>
        <Button type="link" onClick={() => onEdit(organization)}>
          Edit
        </Button>
        <Button type="link" onClick={() => onAddEmployee(organization.id)}>
          Add Employee
        </Button>
        <Popconfirm
          title="Are you sure you want to delete this organization?"
          onConfirm={() => onDelete(organization.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      </>
    }
  >
    <Link to={`/organizations/${organization.id}/employees`}>
      View Employees
    </Link>
  </Card>
);

export default OrganizationCard;
