import React from "react";
import { Button, Typography } from "antd";

const { Title } = Typography;

interface HeaderProps {
  onAddOrganization: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddOrganization }) => (
  <div style={{ marginBottom: "24px" }}>
    <Title level={2} style={{ marginBottom: "24px" }}>
      Organizations
    </Title>
    <Button type="primary" onClick={onAddOrganization}>
      Add Organization
    </Button>
  </div>
);

export default Header;
