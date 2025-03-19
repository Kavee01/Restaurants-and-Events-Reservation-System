import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Paper,
  Grid,
  Avatar
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PrintIcon from '@mui/icons-material/Print';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { QRCodeSVG } from 'qrcode.react';

const ReservationReceipt = ({ open, onClose, reservation }) => {
  const handlePrint = () => {
    const printContent = document.getElementById('receipt-content');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  if (!reservation) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        background: 'linear-gradient(135deg, #FF5722 0%, #FF9800 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        py: 3
      }}>
        <ReceiptIcon />
        Reservation Receipt
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Box id="receipt-content" sx={{ position: 'relative' }}>
          {/* Background Pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              opacity: 0.1,
              background: 'linear-gradient(135deg, #FF5722 0%, #FF9800 100%)',
              borderRadius: '0 0 0 100%',
              zIndex: 0
            }}
          />

          <Paper elevation={0} sx={{ p: 4, position: 'relative' }}>
            {/* Header */}
            <Box sx={{ 
              textAlign: 'center', 
              mb: 4,
              position: 'relative'
            }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: '0 auto',
                  mb: 2,
                  background: 'linear-gradient(135deg, #FF5722 0%, #FF9800 100%)'
                }}
              >
                <Typography variant="h4" sx={{ color: 'white' }}>
                  {reservation.restaurant.name.charAt(0)}
                </Typography>
              </Avatar>
              <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #FF5722 0%, #FF9800 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {reservation.restaurant.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
                Reservation Confirmation
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 1,
                mb: 2
              }}>
                <Box sx={{ 
                  px: 2, 
                  py: 0.5, 
                  bgcolor: '#4CAF50',
                  color: 'white',
                  borderRadius: 1,
                  fontSize: '0.875rem',
                  fontWeight: 'medium'
                }}>
                  {reservation.status.toUpperCase()}
                </Box>
              </Box>
            </Box>

            <Divider sx={{ 
              my: 3,
              '&::before, &::after': {
                borderColor: '#FF5722',
              }
            }}>
              <Typography variant="body2" sx={{ color: '#FF5722', px: 2 }}>
                Reservation Details
              </Typography>
            </Divider>

            {/* Main Details */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <AccessTimeIcon sx={{ color: '#FF5722' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Date & Time
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {new Date(reservation.date).toLocaleDateString()} at {reservation.time}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PeopleIcon sx={{ color: '#FF5722' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Party Size
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {reservation.numberOfGuests} people
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Restaurant Info */}
            <Box sx={{ bgcolor: 'rgba(255, 87, 34, 0.05)', p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="subtitle2" sx={{ color: '#FF5722', mb: 2, fontWeight: 'bold' }}>
                Restaurant Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'start', gap: 1, mb: 2 }}>
                <LocationOnIcon sx={{ color: '#FF5722' }} />
                <Typography variant="body2">
                  {reservation.restaurant.address}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: '#FF5722' }} />
                <Typography variant="body2">
                  {reservation.restaurant.phone || 'Not provided'}
                </Typography>
              </Box>
            </Box>

            {/* Special Requests */}
            {reservation.specialRequests && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ color: '#FF5722', mb: 1, fontWeight: 'bold' }}>
                  Special Requests
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, borderColor: 'rgba(255, 87, 34, 0.2)' }}>
                  <Typography variant="body2">
                    {reservation.specialRequests}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* QR Code */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <QRCodeSVG 
                value={`${reservation._id}`}
                size={100}
                level="H"
                includeMargin={true}
                fgColor="#FF5722"
              />
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                Reservation ID: {reservation._id}
              </Typography>
            </Box>

            {/* Footer */}
            <Box sx={{ 
              textAlign: 'center',
              mt: 4,
              pt: 3,
              borderTop: '1px dashed rgba(0, 0, 0, 0.12)'
            }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                Please present this receipt upon arrival
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                Generated on {new Date().toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, bgcolor: 'grey.50' }}>
        <Button 
          onClick={onClose}
          sx={{
            color: '#FF5722',
            '&:hover': {
              bgcolor: 'rgba(255, 87, 34, 0.04)'
            }
          }}
        >
          Close
        </Button>
        <Button 
          onClick={handlePrint}
          startIcon={<PrintIcon />}
          variant="contained"
          sx={{
            background: 'linear-gradient(90deg, #FF5722 0%, #FF9800 100%)',
            '&:hover': {
              background: 'linear-gradient(90deg, #E64A19 0%, #F57C00 100%)',
            }
          }}
        >
          Print Receipt
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationReceipt; 