import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import { TransitEvent } from '../../../types/util';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';

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

const getLastEventIndex = (events: TransitEvent[]) => {
  let lastIndex = 0;
  let lastStatusIndex = 0;
  events.forEach((event, index) => {
    const statusIndex = getStatusIndex(event.code);
    if (statusIndex >= lastStatusIndex) {
      lastStatusIndex = statusIndex;
      lastIndex = index;
    }
  });
  return lastIndex;
};

export default function OrderTrackingDetails({
  orderEvents,
}: Readonly<{ orderEvents: TransitEvent[] }>) {

  const {t} = useTranslation()

  const [activeStep, setActiveStep] = useState(0);
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1200px)');

  useEffect(() => {
    if (orderEvents.length > 0) {
      const lastEventIndex = getLastEventIndex(orderEvents);
      setActiveStep(lastEventIndex);
    }
  }, [orderEvents]);

  console.log(orderEvents)

  return (
    <div>
       <h2 className={`text-3xl text-subText capitalize py-3 font-bold ${isTablet ? 'ml-32' : 'ml-0'}`}>{t('pages.shipments.details.title')}</h2>
       {orderEvents && orderEvents.length > 0 ? (
        <div>
          <Box sx={{ maxWidth: 500, marginLeft: isTablet ? 20 : 0 }}>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              sx={{
                '& .MuiStepIcon-root.Mui-active': { color: 'var(--focus)' },
                '& .MuiStepIcon-root.Mui-completed': { color: 'var(--focus)' },
              }}
            >
              {orderEvents.map((event) => (
                <Step key={event.timestamp}>
                  <StepLabel>
                    <div>
                      {event.state}
                      <div dir="ltr">{new Date(event.timestamp).toLocaleDateString()}</div>
                    </div>
                  </StepLabel>
                  <StepContent aria-expanded>
                    <Typography>{event.msg || event.state}</Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
       ) : (
        <div className={`text-2xl capitalize text-searchBtn font-bold ${isTablet ? 'ml-32' : 'ml-0'}`}>No tracking details available.</div>
       )}
    </div>
  );
}