import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CustomCard from "../../theme-styles/customCard";
import { useSelector } from 'react-redux';


const BreadCrumb = ({pageName}) => {
    var {userAuth} = useSelector((state) => state?.authentication);
    var userName = userAuth?.userName;
  return (
    <Container maxWidth="lg">
      <CustomCard sx={{ backgroundColor: '#ff6b81', color: 'white', padding: 5 }}>
        <Typography variant="subtitle2" sx={{ margin: 0 }}>
          Hello,
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', margin: 0 }}>
            Welcome! {userName ? `${userName}` : 'Valued User'}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', margin: 0 }}>
            Delivering Excellence in Every Step
        </Typography>
        <Box
          sx={{
            width: 100,
            borderRadius: '50px',
            marginTop: 2,
            background: '#333',
            padding: '4px 16px',
            paddingBottom: '6px',
            textAlign: 'center',
          }}
        >
          {pageName}
        </Box>
      </CustomCard>
    </Container>
  );
};

export default BreadCrumb;
