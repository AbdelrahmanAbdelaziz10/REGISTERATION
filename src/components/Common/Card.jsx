import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import WorkIcon from '@mui/icons-material/Work';
const DashboardCard = ({ title, value }) => {
  return (
    <Card
      sx={{
        textAlign: "center",
        borderRadius: "16px",
        boxShadow: 3,
        backgroundColor: "#f9f9f9",
        height: "100%", // Ensure equal height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <CardContent sx={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
        <div className="">
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom:'1rem' }}>
          {value}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">

          {title}
        </Typography>
        </div>

      </CardContent>
    </Card>
  );
};


export default DashboardCard;
