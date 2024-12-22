import { useState, useEffect } from 'react';
import { TransitEvent } from '../../../types/util';
import { useTranslation } from 'react-i18next';
import "./OrderTracking.css"

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
  const {t, i18n} = useTranslation();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (orderEvents.length > 0) {
      const lastEventIndex = getLastEventIndex(orderEvents);
      setActiveStep(lastEventIndex);
    }
  }, [orderEvents]);

  return (
    <div>
      <h2 className={`text-3xl text-subText capitalize py-3 font-bold`}>
        {t('pages.shipments.details.title')}
      </h2>
      {orderEvents && orderEvents.length > 0 ? (
        <div className="tracking-wrapper" style={{ direction }}>
          <div className="tracking-timeline">
            {orderEvents.map((event, index) => (
              <div 
                key={event.timestamp} 
                className={`timeline-item ${index <= activeStep ? 'completed' : ''}`}
              >
                <div className="timeline-marker">
                  {index <= activeStep && <span className="marker-icon">✔</span>}
                </div>
                <div className="timeline-content">
                  <div className="content-header">
                    <div className="content-title">{event.state}</div>
                    <div className="content-date">
                      {new Date(event.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="content-description">
                    {event.msg || event.state}
                  </div>
                </div>
                {index < orderEvents.length - 1 && <div className="timeline-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`text-2xl capitalize text-searchBtn font-bold`}>
          No tracking details available.
        </div>
      )}
    </div>
  );
}