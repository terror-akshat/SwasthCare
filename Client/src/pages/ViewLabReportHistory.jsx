import React from 'react'
import LAB_Reports_Card from '../components/LAB_Reports_Card.jsx'

const ViewLabReportHistory = () => {
  return (
    <>
      <LAB_Reports_Card
         patientName="John Doe"
         testName="Blood Test"
         testDate="2025-04-06"
         doctor="Dr. Smith"
         status="Completed"
         reportLink="https://example.com/lab-report.pdf"
       />
    </>
  )
}

export default ViewLabReportHistory
