import React from 'react';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { ShipmentResponse } from '../../../types/shipment';
import { useMediaQuery } from '@mui/material';
import './OrderStatus.css';

const steps = [
  'pages.shipments.timeline.stages.created',
  'pages.shipments.timeline.stages.picked',
  'pages.shipments.timeline.stages.inTransit',
  'pages.shipments.timeline.stages.forDelivery',
  'pages.shipments.timeline.stages.delivered'
];

const getStatusIndex = (code: number | undefined) => {
  switch (code) {
    case 24:
      return 2; // Processing
    case 41:
      return 3; // Out for Delivery
    case 45:
      return 4; // Delivered
    case 46:
      return 4; // Returned (considered as Delivered for stepper)
    default:
      return 1; // Picked Up (Shipment Created has no code)
  }
};

export default function OrderStatus({
  orderTimeline,
}: {
  orderTimeline?: ShipmentResponse;
}) {
  const { t, i18n } = useTranslation();
  const activeStep = getStatusIndex(orderTimeline?.CurrentStatus?.code);
  const currentStatusDate = orderTimeline?.CurrentStatus?.timestamp;
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const isMobile = useMediaQuery('(max-width:560px)');

  return (
    <Box sx={{ width: '100%', direction }}>
      <div className={`stepper ${isMobile ? 'vertical' : 'horizontal'}`}>
        {steps.map((label, index) => (
          <div key={label} className={`step ${index <= activeStep ? 'active' : ''}`}>
            <div className="step-circle">
              {index <= activeStep && <span className="check-icon">✔</span>}
            </div>
            <div className="step-content">
              <div className="step-label">{t(label)}</div>
              <div className="step-date">
                {index === activeStep && currentStatusDate && (
                  <div>{new Date(currentStatusDate).toLocaleDateString()}</div>
                )}
              </div>
            </div>
            {index < steps.length - 1 && <div className="step-line"></div>}
          </div>
        ))}
      </div>
    </Box>
  );
}