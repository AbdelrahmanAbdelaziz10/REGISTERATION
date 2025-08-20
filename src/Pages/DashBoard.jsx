import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import { useSidebar } from "../components/Context/SidebarContext"; // import context
import { Col, Container, Row } from "react-bootstrap";
import { Box, Typography } from "@mui/material";
import DashboardCard from "../components/Common/Card";
import ContactsCard from "../components/Common/ContactsCard";
import WorkOrderBarChart from './../components/Common/Chart/WorkOrderBarChart';
import '../Style/Dashboard.css'
export function DashBoard() {
  const { sidebarOpen } = useSidebar();  // get from context
  const sidebarWidth = sidebarOpen ? 220 : 65;

  return (
    <div className="app-container">
      <Navbar /> {/* Navbar will handle toggle */}
      <Container fluid>
        <Box
          component="main"
          sx={{
            margin: { xs: "5rem 1rem 0", md: "6rem 2rem 0" },
            minHeight: "calc(100vh - 5rem)",
            transition: "margin 0.3s ease",
          }}
        >
          <Sidebar isOpen={sidebarOpen} width={sidebarWidth} />
          <main className="content-area" style={{ marginLeft: `${sidebarWidth}px` }}>
            <Row className="my-4">
              <h3>Welcome back 👋</h3>
            </Row>

            {/* Your existing content */}
            <Row className="stats-section justify-content-center">
              <Col xs={12} md={3} className="px-2">
                <DashboardCard title="Service Request" value="550" change="20%" footerText="20 Service Request Today" positiveChange={true} />
              </Col>
              <Col xs={12} md={3} className="px-2">
                <DashboardCard title="All Work Order" value="1050" change="30%" footerText="600 Total Work Order Today" positiveChange={false} />
              </Col>
              <Col xs={12} md={3} className="px-2">
                <DashboardCard title="Pending Work Order" value="150" change="10%" footerText="20 Pending Work Order Today" positiveChange={false} />
              </Col>
              <Col xs={12} md={3} className="px-2">
                <DashboardCard title="Close Work Order" value="900" change="30%" footerText="300 Closed Work Order Today" positiveChange="true" />
              </Col>
            </Row>

            <Row className="dashboard-row">
              <Col xs={12} md={7} className="dashboard-column">
                <div className="chart-main-card">
                  <Typography variant="h6" className="card-title">Work Order Status Overview</Typography>
                  <WorkOrderBarChart />
                </div>
              </Col>
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
