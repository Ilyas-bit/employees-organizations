import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addOrganization,
  addEmployee,
  editOrganization,
  editEmployee,
  Employee,
  Organization,
} from "../features/organizations/organizationsSlice";

interface AddEditModalProps {
  isVisible: boolean;
  onClose: () => void;
  mode: "addOrganization" | "editOrganization" | "addEmployee" | "editEmployee";
  existingOrganization?: Organization;
  existingEmployee?: Employee;
  organizationId?: string;
}

const AddEditModal: React.FC<AddEditModalProps> = ({
  isVisible,
  onClose,
  mode,
  existingOrganization,
  existingEmployee,
  organizationId,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Organization | Employee>({
    defaultValues:
      mode === "editOrganization" && existingOrganization
        ? existingOrganization
        : mode === "editEmployee" && existingEmployee
        ? existingEmployee
        : { id: "", name: "" },
  });

  const dispatch = useDispatch();

  const onSubmit = (data: Organization | Employee) => {
    if (mode === "addOrganization") {
      dispatch(addOrganization({ name: (data as Organization).name }));
    } else if (mode === "editOrganization" && existingOrganization) {
      dispatch(
        editOrganization({
          ...existingOrganization,
          name: (data as Organization).name,
        })
      );
    } else if (mode === "addEmployee" && organizationId) {
      dispatch(
        addEmployee({
          organizationId,
          employee: { name: (data as Employee).name, id: "" },
        })
      );
    } else if (mode === "editEmployee" && existingEmployee && organizationId) {
      dispatch(
        editEmployee({
          organizationId,
          employee: { ...existingEmployee, name: (data as Employee).name },
        })
      );
    }
    onClose();
    reset();
  };

  useEffect(() => {
    if (mode === "editOrganization" && existingOrganization) {
      reset(existingOrganization);
    } else if (mode === "editEmployee" && existingEmployee) {
      reset(existingEmployee);
    } else {
      reset({ id: "", name: "" });
    }
  }, [mode, existingOrganization, existingEmployee, reset]);

  return (
    <Modal
      title={mode.includes("edit") ? "Edit" : "Add"}
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label={
            mode.includes("Organization")
              ? "Organization Name"
              : "Employee Name"
          }
          validateStatus={errors.name ? "error" : ""}
          help={errors.name ? errors.name.message : ""}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {mode.includes("edit") ? "Save Changes" : "Submit"}
        </Button>
      </Form>
    </Modal>
  );
};

export default AddEditModal;
