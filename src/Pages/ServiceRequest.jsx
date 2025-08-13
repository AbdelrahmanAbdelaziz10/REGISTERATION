import React, { useState, useEffect } from "react";
import TableData from "../components/Common/TableData";
import { Container } from "react-bootstrap";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../Style/ServiceRequest.css";
import { Link } from "react-router-dom";

const ServiceRequest = () => {
  const [srData, setSrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJNQVhBRE1JTiIsImlhdCI6MTc1NTA4NTIxMywiZXhwIjoxNzU1MTcxNjEzfQ.G-Tk8RjXIO45RROR3-gYU1QNvvIjMllQzKZXcsB0bsX1bQcv3QuIs8iyMl_zL2fQ7mXNQ4ExJYscIpb0tqopog";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://192.168.0.180:9090/api/sr/all", {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
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
    <div className="service-request mb-5 mx-5">
        <div className="d-flex justify-content-between mt-4 sr-header">
          <h4 className="title">Welcome To Service Request.</h4>
          <div>
            <Link className="d-flex">
              <AddCircleIcon className="service-icon" />
              <p>Service Request</p>
            </Link>
          </div>
        </div>
        <div className="mt-2 table-data">
          <TableData srData={srData} />
        </div>
    </div>
  );
};

export default ServiceRequest;