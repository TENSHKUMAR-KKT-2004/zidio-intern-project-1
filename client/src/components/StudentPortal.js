import React, { useState } from 'react';
import { Button, Container, Typography, Box, TextField, Paper } from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';

function StudentPortal() {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/certificate/${certificateId}`);
      setCertificate(res.data);
    } catch (err) {
      console.error(err);
      alert('Certificate not found');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Certificate ID: ${certificate.certificateId}`, 10, 10);
    doc.text(`Student Name: ${certificate.studentName}`, 10, 20);
    doc.text(`Internship Domain: ${certificate.internshipDomain}`, 10, 30);
    doc.text(`Start Date: ${new Date(certificate.startDate).toLocaleDateString()}`, 10, 40);
    doc.text(`End Date: ${new Date(certificate.endDate).toLocaleDateString()}`, 10, 50);
    doc.save('certificate.pdf');
  };

  return (
    <Container maxWidth="sm">
      <Box my={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Certificate Search
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Enter Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        {certificate && (
          <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
            <Typography variant="h6">Certificate Details</Typography>
            <Typography variant="body1">Student Name: {certificate.studentName}</Typography>
            <Typography variant="body1">Internship Domain: {certificate.internshipDomain}</Typography>
            <Typography variant="body1">Start Date: {new Date(certificate.startDate).toLocaleDateString()}</Typography>
            <Typography variant="body1">End Date: {new Date(certificate.endDate).toLocaleDateString()}</Typography>
            <Button variant="contained" color="secondary" onClick={generatePDF} sx={{ mt: 2 }}>
              Download PDF
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default StudentPortal;
