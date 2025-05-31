import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useTheme } from "@mui/material/styles";
import axios from "../axios.js";
import { Cloudinary } from "@cloudinary/url-gen";

const cid = new Cloudinary({
  cloud: {
    cloudName: "df7zyzkbe",
  },
});

const LabReportPage = () => {
  const { id } = useParams();
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/uploads/get-lab_report/${id}`);

        if (response.data.status == "success") {
          setImage(response.data.patient.UploadLabReport);
        }
        if (response.data.status == "failure") {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [id]);
  const theme = useTheme();

  return (
    <>
      <Navbar />
      {image.map((item) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#f5f5f5",
              paddingTop: "20px",
            }}
          >
            <Card
              sx={{
                width: 500,
                height: 700,
                paddingTop: "20px", // Add top padding
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: theme.palette.primary.main }}
                >
                  Lab Report
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={item.image}
                  download={item.image}
                  sx={{ marginBottom: "20px", width: "100%" }}
                >
                  Download
                </Button>
              </CardContent>
              <CardMedia
                component="img"
                alt="Lab Report"
                image={cid.image(item.image).toURL()}
                title="Lab Report"
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              />
            </Card>
          </Box>
        );
      })}
    </>
  );
};

export default LabReportPage;
