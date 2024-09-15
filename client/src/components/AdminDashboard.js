import React, { useState } from 'react';
import { Button, Container, Typography, Box, Input } from '@mui/material';
import axios from 'axios';

function AdminDashboard() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to upload file');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Input type="file" onChange={handleFileUpload} />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Upload Excel File
        </Button>
      </Box>
    </Container>
  );
}

export default AdminDashboard;
