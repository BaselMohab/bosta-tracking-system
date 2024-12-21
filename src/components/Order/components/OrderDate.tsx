import { useTranslation } from "react-i18next";
import { ShipmentResponse } from "../../../types/shipment"
import OrderStatus from "./OrderStatus"
import moment from 'moment';
import { useMediaQuery } from '@mui/material';

export default function OrderDate({
  orderStatus
}: { orderStatus: ShipmentResponse }) {

  const {t} = useTranslation()
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1200px)');
  const isMobile = useMediaQuery('(max-width:560px)');

  const formattedDate = moment(orderStatus.PromisedDate).format('ddd MMM. D');

  const getStatusMessage = (code: number | undefined) => {
    switch (code) {
      case 45:
        return <p className="text-subText text-sm capitalize"><span>{t('pages.shipments.timeline.stages.delivered')}</span></p>;
      case 46:
        return <p className="text-subText text-sm capitalize"><span>{t('pages.shipments.timeline.stages.returned')}</span></p>;
      default:
        return <p className="text-subText text-sm capitalize">{t('pages.shipments.timeline.excpected')} <span>{t('pages.shipments.timeline.days')}</span></p>;
    }
  };

  return (
    <div className="flex flex-col shadow-xl p-3 gap-10 border border-border rounded-md">
      <div className={`${isTablet ? 'px-32' : isMobile ? 'px-[18rem]' : 'px-5'}`}>
        <p className="uppercase text-subText text-sm">{t('pages.shipments.timeline.order')} #{orderStatus.TrackingNumber}</p>
        <h2 className="capitalize text-xl md:text-3xl text-mainText font-bold">{t('pages.shipments.timeline.arriving')} <span className="capitalize text-focus">{formattedDate}</span></h2>
        {getStatusMessage(orderStatus.CurrentStatus.code)}
      </div>
      <hr className="border-t-2 border-border my-4" />
      <div className={isTablet ? "px-32" : "px-10"}>
        <OrderStatus orderTimeline={orderStatus} />
      </div>
    </div>
  );
}
