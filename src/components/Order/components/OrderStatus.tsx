import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useTranslation } from 'react-i18next';
import { ShipmentResponse } from '../../../types/shipment';
import { useMediaQuery } from '@mui/material';

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
    !isMobile ? (
      <Box sx={{ width: '100%', direction }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            direction,
            '& .MuiStepIcon-root.Mui-active': { color: 'var(--focus)' },
            '& .MuiStepIcon-root.Mui-completed': { color: 'var(--focus)' },
          }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>
                <div className='text-mainText'>
                  {t(label)}
                  {index === activeStep && currentStatusDate && (
                    <div>{new Date(currentStatusDate).toLocaleDateString()}</div>
                  )}
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    ) : (
      <Box sx={{ maxWidth: 500}}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            '& .MuiStepIcon-root.Mui-active': { color: 'var(--focus)' },
            '& .MuiStepIcon-root.Mui-completed': { color: 'var(--focus)' },
          }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>
                <div className='text-mainText'>
                  {t(label)}
                  {index === activeStep && currentStatusDate && (
                    <div>{new Date(currentStatusDate).toLocaleDateString()}</div>
                  )}
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    )
  );
}