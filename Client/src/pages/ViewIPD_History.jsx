import React from "react";
import Navbar from "../components/Navbar.jsx";
import IPDHistoryCard from "../components/IPDHistoryCard.jsx";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../axios.js";
import { Cloudinary } from "@cloudinary/url-gen";

const cid = new Cloudinary({
  cloud: {
    cloudName: "df7zyzkbe",
  },
});

const ViewIPD_History = () => {
  const location = useLocation();
  const data = location.state;
  const { id } = useParams();
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/uploads/patient-ipd-image/${id}`);

        if (response.data.status == "success") {
          setImage(response.data.patient.UploadIpd);
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
  // console.log(image);
  console.log(data);
  
  console.log(image.admissionDate);


  return (
    <>
      <Navbar />
      {image.map((item) => {
        return (
          <IPDHistoryCard
            key={item._id}
            image={cid.image(item.image).toURL()}
            patientName={data.name}
            bedNumber={data.Ipd.currentBed}
            wardName={data.Ipd.currentWard}
            admissionDate={data.Ipd.admissionDate}
            status={data.Ipd.status}
            registrationId={data.Ipd.registrationId}
          />
        );
      })}
    </>
  );
};

export default ViewIPD_History;
