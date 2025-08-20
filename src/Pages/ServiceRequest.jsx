import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import DashboardCard from "../components/Common/Card";
import TableData from "../components/Common/TableData";
import { useAuth } from "../components/Auth/AuthContext";
import { useSidebar } from "../components/Context/SidebarContext"; // import context
import AddIcon from "@mui/icons-material/Add";
import '../Style/ServiceRequest.css'

const ServiceRequest = () => {
  const [srData, setSrData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const { sidebarOpen } = useSidebar(); // get from context
  const sidebarWidth = sidebarOpen ? 220 : 65;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.180:9090/api/sr/all", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setSrData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app-container">
      <Navbar />
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
          <main
            className="content-area"
            style={{ marginLeft: `${sidebarWidth}px` }}
          >
            <Row className="my-5 justify-content-between">
              <Col xs={8} md={9} sm={8}>
                {" "}
                <h3 className="service-title">
                  {" "}
                  {/* <CreateIcon className="title-icon" /> */} Service Request
                  👋{" "}
                </h3>{" "}
              </Col>{" "}
              <Col xs={4} md={3} sm={4} className="d-flex justify-content-end">
                {" "}
                <Link className="create-service ">
                  {" "}
                  <AddIcon className="create-icon" />{" "}
                  <span>Create Service Request</span>{" "}
                </Link>{" "}
              </Col>
            </Row>
            <Row className="stats-section justify-content-center mb-5">
              <Col xs={12} md={3}>
                <DashboardCard
                  title="Service Request"
                  value="550"
                  change="20%"
                  footerText="20 Today"
                  positiveChange={false}
                />
              </Col>
              <Col xs={12} md={3}>
                <DashboardCard
                  title="All Work Order"
                  value="1050"
                  change="30%"
                  footerText="600 Today"
                  positiveChange
                />
              </Col>
              <Col xs={12} md={3}>
                <DashboardCard
                  title="Pending Work Order"
                  value="150"
                  change="10%"
                  footerText="20 Today"
                  positiveChange={false}
                />
              </Col>
              <Col xs={12} md={3}>
                <DashboardCard
                  title="Close Work Order"
                  value="900"
                  change="30%"
                  footerText="300 Today"
                  positiveChange
                />
              </Col>
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
