import { CreateWorkOrder } from "../components/Common/CreateWorkOrder";
import Navbar from "../components/Common/Navbar";
import { useState } from "react";
import Sidebar from "../components/Common/Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import "../Style/Dashboard.css";
import { Box } from "@mui/material";
import Card from "../components/Common/Card";
import DashboardCard from "../components/Common/Card";
export function DashBoard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarWidth = sidebarOpen ? 220 : 65;

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
            <Row className="my-4">
              <h3>Welcome back 👋</h3>
            </Row>
            <Row className="stats-section justify-content-center">
              <Col xs={12} md={3} className="px-2">
                <DashboardCard title={"Open Work Order"} value={"21"} />
              </Col>
              <Col xs={12} md={3} className="px-2">
                <DashboardCard title={"Pending Requests"} value={"5"} />
              </Col>
              <Col xs={12} md={3} className="px-2">
                <DashboardCard title={"Completed Today"} value={"12"} />
              </Col>
              <Col xs={12} md={3} className="px-2">
                <DashboardCard title={"Overdue Tasks"} value={"3"} />
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
            <Row className="">
              <CreateWorkOrder />
            </Row>

            <div className="recent-requests">
              <h3>Recent Requests</h3>
              <table>
                <thead>
                  <tr>
                    <th>Request</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Request 1</td>
                    <td>MM/DD/YYYY</td>
                  </tr>
                  <tr>
                    <td>Request 2</td>
                    <td>MM/DD/YYYY</td>
                  </tr>
                  <tr>
                    <td>Request 3</td>
                    <td>MM/DD/YYYY</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </Box>
      </Container>
    </div>
  );
}
