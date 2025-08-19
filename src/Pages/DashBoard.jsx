import Navbar from "../components/Common/Navbar";
import { useState } from "react";
import Sidebar from "../components/Common/Sidebar";
import { CardHeader, Col, Container, Row } from "react-bootstrap";
import "../Style/Dashboard.css";
import { Box, CardContent, Typography } from "@mui/material";
import Card from "../components/Common/Card";
import DashboardCard from "../components/Common/Card";
import WorkOrderImage from "../assets/work order.png";
import ServiceRequestImage from "../assets/pending request.jpg";
import CloseWorkOrderImage from "../assets/close workorder.png";
import CreateWorkOrder from "./../components/Common/CreateWorkOrder";
import ContactsCard from "../components/Common/ContactsCard";
import WorkOrderBarChart from './../components/Common/Chart/WorkOrderBarChart';

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
            <Box sx={{ my: 5 }}>
              <CreateWorkOrder />
            </Box>
<Row className="dashboard-row">
  {/* Work Order Chart Column */}
  <Col xs={12} md={7} className="dashboard-column">
    <div className='chart-main-card'>
        <Typography variant="h6" className="card-title">
          Work Order Status Overview
        </Typography>
          <WorkOrderBarChart />
    </div>



  </Col>

  {/* Contacts Card Column */}
  <Col xs={12} md={5} className="dashboard-column">
    <ContactsCard />
  </Col>
</Row>
          </main>
        </Box>
      </Container>
    </div>
  );
}
