//page where patient will able to see all the past opds with the newest ones

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import OPDHistoryCard from "../components/OPDHistoryCard.jsx";
import axios from "../axios.js";
import { useLocation, useParams } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";

const cid = new Cloudinary({
  cloud: {
    cloudName: "df7zyzkbe",
  },
});

const ViewOPD_History = () => {
  const location = useLocation();
  const data = location.state;
  const { id } = useParams();
  const [image, setimage] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/uploads/patient-opd-image/${id}`);

        if (response.data.status == "success") {
          setimage(response.data.patient.UploadOpd);
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

  return (
    <>
      <Navbar />
      {image.map((item) => {
        return (
          <OPDHistoryCard
            key={item._id}
            // image={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.image}`}
            image={cid.image(item.image).toURL()}
            patientName={data.name}
            date={data.createdAt}
          />
        );
      })}
    </>
  );
};

export default ViewOPD_History;
