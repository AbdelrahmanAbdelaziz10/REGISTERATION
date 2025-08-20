import React, { useState, useEffect } from "react";
import TableData from "../components/Common/TableData";
import { Col, Container, Row } from "react-bootstrap";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../Style/ServiceRequest.css";
import { Link } from "react-router-dom";
import { useAuth } from "../components/Auth/AuthContext";
import Navbar from "../components/Common/Navbar";
import { Box } from "@mui/material";
import Sidebar from "../components/Common/Sidebar";
import DashboardCard from "../components/Common/Card";
import { Create as CreateIcon } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const ServiceRequest = () => {
  const [srData, setSrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarWidth = sidebarOpen ? 220 : 65;

  const { token, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.180:9090/api/sr/all", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSrData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app-container">
      {/* Full-width Navbar at top */}
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      {/* Main content area below navbar */}
      <Container fluid>
        <Box
          component="main"
          sx={{
            margin: {
              xs: "5rem 1rem 0", // mobile: 5rem top, 1rem sides
              md: "6rem 2rem 0", // desktop: 5rem top, 2rem sides
            },
            minHeight: "calc(100vh - 5rem)", // Full height minus navbar
            transition: "margin 0.3s ease", // Smooth transitions
          }}
        >
          {" "}
          <Sidebar isOpen={sidebarOpen} width={sidebarWidth} />
          <main
            className="content-area"
            style={{ marginLeft: `${sidebarWidth}px` }}
          >
            <Row className="my-5 justify-content-between">
              <Col xs={8} md={9} sm={8}>
                <h3 className="service-title">
                  {/* <CreateIcon className="title-icon" /> */}
                  Service Request 👋
                </h3>
              </Col>
              <Col xs={4} md={3} sm={4} className="d-flex justify-content-end">
                <Link className="create-service ">
                  <AddIcon className="create-icon" />
                  <span>Create Service Request</span>
                </Link>
              </Col>
            </Row>
            <Row className="stats-section justify-content-center mb-5">
              <Col xs={12} md={3} className="px-2">
                <DashboardCard
                  title="Service Request"
                  value="550"
                  change="20%"
                  footerText="20 Service Request Today"
                  positiveChange="none"
                />
              </Col>
              <Col xs={12} md={3} className="px-2">
                <DashboardCard
                  title="All Work Order"
                  value="1050"
                  change="30%"
                  footerText="600 Total Work Order Today"
                  positiveChange="none"
                />
              </Col>
              <Col xs={12} md={3} className="px-2">
                <DashboardCard
                  title="Pending Work Order "
                  value="150"
                  change="10%"
                  footerText="20 Pending Work Order Today"
                  positiveChange={false}
                />{" "}
              </Col>
              <Col xs={12} md={3} className="px-2">
                <DashboardCard
                  title="Close Work Order"
                  value="900"
                  change="30%"
                  footerText="300 Closed Work Order Today"
                  positiveChange={true}
                />{" "}
              </Col>
              {/* <StatsCard
                title="12 Open Work Orders"
                subtitle="Pending Requests"
                value="5"
              />
                            <StatsCard
                title="12 Open Work Orders"
                subtitle="Pending Requests"
                value="5"
              />
                            <StatsCard
                title="12 Open Work Orders"
                subtitle="Pending Requests"
                value="5"
              /> */}
            </Row>
            <div className="mb-5">
              <TableData srData={srData} />
            </div>
          </main>
        </Box>
      </Container>
    </div>
  );
};

export default ServiceRequest;
