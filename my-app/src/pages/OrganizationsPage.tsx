import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Organization,
  deleteOrganization,
} from "../features/organizations/organizationsSlice";
import { selectOrganizations } from "../features/organizations/selectors";
import AddEditModal from "../components/AddEditModal";
import Header from "../components/Header";
import { message } from "antd";
import OrganizationList from "../components/OrganizationsList";

const OrganizationsPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<
    "addOrganization" | "editOrganization" | "addEmployee"
  >("addOrganization");
  const [editingOrganization, setEditingOrganization] =
    useState<Organization | null>(null);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<
    string | null
  >(null);
  const organizations = useSelector(selectOrganizations);
  const dispatch = useDispatch();

  const showAddOrganizationModal = () => {
    setMode("addOrganization");
    setEditingOrganization(null);
    setSelectedOrganizationId(null);
    setIsModalVisible(true);
  };

  const showEditOrganizationModal = (organization: Organization) => {
    setMode("editOrganization");
    setEditingOrganization(organization);
    setIsModalVisible(true);
  };

  const showAddEmployeeModal = (organizationId: string) => {
    setMode("addEmployee");
    setSelectedOrganizationId(organizationId);
    setIsModalVisible(true);
  };

  const handleDeleteOrganization = (organizationId: string) => {
    dispatch(deleteOrganization(organizationId));
    message.success("Organization deleted successfully");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingOrganization(null);
    setSelectedOrganizationId(null);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Header onAddOrganization={showAddOrganizationModal} />
      <OrganizationList
        organizations={organizations}
        onEdit={showEditOrganizationModal}
        onAddEmployee={showAddEmployeeModal}
        onDelete={handleDeleteOrganization}
      />
      <AddEditModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        mode={mode}
        existingOrganization={editingOrganization || undefined}
        organizationId={selectedOrganizationId || undefined}
      />
    </div>
  );
};

export default OrganizationsPage;
