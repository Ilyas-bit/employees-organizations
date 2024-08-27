import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Popconfirm, message, List, Card, Typography } from "antd";
import AddEditModal from "../components/AddEditModal";
import { selectEmployeesByOrganizationId } from "../features/organizations/selectors";
import {
  Employee,
  deleteEmployee,
} from "../features/organizations/organizationsSlice";
import { selectOrganizationById } from "../features/organizations/selectors";

const { Title } = Typography;

const EmployeesPage: React.FC = () => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const employees = useSelector(
    selectEmployeesByOrganizationId(organizationId!)
  );

  const organization = useSelector(selectOrganizationById(organizationId!));

  const dispatch = useDispatch();

  const showAddModal = () => {
    setEditingEmployee(null);
    setIsModalVisible(true);
  };

  const showEditModal = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalVisible(true);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    dispatch(deleteEmployee({ organizationId: organizationId!, employeeId }));
    message.success("Employee deleted successfully");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Employees of Organization {organization?.name || "Loading..."}
      </Title>
      <Button
        type="primary"
        onClick={showAddModal}
        style={{ marginBottom: "24px" }}
      >
        Add Employee
      </Button>
      <Link
        to="/organizations"
        style={{ marginBottom: "24px", display: "block" }}
      >
        <Button type="primary">Back to Organizations</Button>
      </Link>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={employees}
        renderItem={(employee) => (
          <List.Item>
            <Card
              title={employee.name}
              extra={
                <>
                  <Button type="link" onClick={() => showEditModal(employee)}>
                    Edit
                  </Button>
                  <Popconfirm
                    title="Are you sure you want to delete this employee?"
                    onConfirm={() => handleDeleteEmployee(employee.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="link" danger>
                      Delete
                    </Button>
                  </Popconfirm>
                </>
              }
            ></Card>
          </List.Item>
        )}
      />
      <AddEditModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        organizationId={organizationId!}
        existingEmployee={editingEmployee || undefined}
        mode={editingEmployee ? "editEmployee" : "addEmployee"}
      />
    </div>
  );
};

export default EmployeesPage;
