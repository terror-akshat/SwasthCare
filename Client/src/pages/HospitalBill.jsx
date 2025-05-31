import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "../axios.js";

const HospitalBill = () => {
  const [billData, setBillData] = useState(null);
  const [rows, setRows] = useState([]);
  const [patient, setPatient] = useState(null);

  const location = useLocation();
  const id = location.state;

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      width: "800px",
      margin: "auto",
      padding: "20px",
      border: "1px solid #000",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    section: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      border: "1px solid #000",
      padding: "8px",
      textAlign: "center",
      fontWeight: "bold",
    },
    td: {
      border: "1px solid #000",
      padding: "8px",
      textAlign: "center",
    },
    total: {
      textAlign: "right",
      marginTop: "20px",
      fontWeight: "bold",
    },
    printButtonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "30px",
    },
    printButton: {
      backgroundColor: "#4CAF50",
      border: "none",
      color: "white",
      padding: "10px 20px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "16px",
      margin: "4px 2px",
      cursor: "pointer",
      borderRadius: "4px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      transition: "background-color 0.3s",
    },
    "@media print": {
      printButtonContainer: {
        display: "none",
      },
    },
  };

  const fetchBillDetails = async () => {
    try {
      const response = await axios.get(`/bill/${id}`);
      if (response.data.status === "failure") {
        toast.error(response.data.message || "Something is wrong!");
        return;
      }
      setPatient(response.data.patient);
      setBillData(response.data.patient.bill);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchBillDetails();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (billData && billData.charges) {
      setRows(
        billData.charges.map((charge, idx) => ({
          sno: idx + 1,
          desc: charge.description,
          units: charge.units,
          rate: charge.rate,
          amount: charge.amount,
        }))
      );
    }
  }, [billData]);

  const handlePrint = () => {
    window.print();
  };

  // Helper to format date as dd/mm/yyyy
  const formatDate = (dateStr) => {
    if (!dateStr) return "---";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return billData && patient ? (
    <>
      <Toaster position="top-right" />
      <div>
        {/* Print button container - will be hidden when printing */}
        <div style={styles.printButtonContainer} className="no-print">
          <button
            style={styles.printButton}
            onClick={handlePrint}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Print Bill
          </button>
        </div>

        {/* Bill content */}
        <div style={styles.container}>
          <div style={styles.header}>
            <h2>SM HOSPITAL</h2>
            <p>GRANGANJ(DISTT. JAIL CHAURAHA) KANPUR ROAD, FATEHGARH</p>
          </div>

          <div style={styles.section}>
            <div>Patient Name: {patient.name}</div>
            <div>Bill Date: {formatDate(new Date())}</div>
          </div>

          <div style={styles.section}>
            <div>
              Age/Sex: {patient.age} YRS / {patient.gender}
            </div>
            <div>IPD No: {patient.Ipd?.registrationId || "NA"}</div>
          </div>

          <div style={styles.section}>
            <div>W/O | S/O | D/O: {patient.fatherName}</div>
            <div>Room Category: {patient.Ipd?.currentWard || "NA"} WARD</div>
          </div>

          <div style={styles.section}>
            <div>Address: {patient.bill?.address}</div>
            <div>
              Admit Date: {formatDate(patient.Ipd?.admissionDate || "NA")}
            </div>
          </div>

          <div style={styles.section}>
            <div>Consultant: {patient.bill?.consultant || "NA"}</div>
            <div>
              Discharge Date: {formatDate(patient.dischargeDate)}
            </div>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S.No</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Unit</th>
                <th style={styles.th}>Rate</th>
                <th style={styles.th}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td style={styles.td}>{row.sno}</td>
                  <td style={styles.td}>{row.desc}</td>
                  <td style={styles.td}>{row.units}</td>
                  <td style={styles.td}>{row.rate}</td>
                  <td style={styles.td}>{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.total}>Amount: ₹{billData.total_amount || 0}</div>
          <div style={styles.total}>
            Discount: ₹{patient.bill?.discount || 0}
          </div>
          <div style={styles.total}>
            Total Amount: ₹
            {patient.bill?.total_amount && patient.bill?.discount
              ? (patient.bill?.total_amount - Number(patient.bill?.discount)).toFixed(2)
              : patient.bill?.total_amount || 0}
          </div>
        </div>

        {/* Add print-specific CSS */}
        <style>
          {`
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              margin: 0;
              padding: 0;
            }
            @page {
              size: auto;
              margin: 10mm;
            }
          }
        `}
        </style>
      </div>
    </>
  ) : (
    <h1>Loading</h1>
  );
};

export default HospitalBill;