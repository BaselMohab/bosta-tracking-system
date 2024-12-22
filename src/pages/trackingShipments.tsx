import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Search from "../components/Search/Search";
import OrderDate from "../components/Order/components/OrderDate";
import OrderTrackingDetails from "../components/Order/components/OrderTrackingDetails";
import useGetShipmentDetails from "../hooks/ShipmentDetails";
import Loader from "../components/LoadingComponent/Loader";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";

export default function TrackingShipments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const trackingNumber = searchParams.get("trackingNumber");
  const { data, isLoading } = useGetShipmentDetails(Number(trackingNumber));
  const isMobile = useMediaQuery('(max-width:560px)');

  // Preserve tracking number when language changes
  useEffect(() => {
    if (trackingNumber) {
      setSearchParams(
        prev => {
          const newParams = new URLSearchParams(prev);
          newParams.set("trackingNumber", trackingNumber);
          newParams.set("lang", i18n.language);
          return newParams;
        },
        { replace: true }
      );
    }
  }, [i18n.language, trackingNumber, setSearchParams]);

  return (
    <div className="flex flex-col items-center gap-10 mb-10">
      <Search />
      {trackingNumber && (
        <div className="w-full md:w-[730px] lg:w-[967px] flex flex-col gap-10">
          {isLoading && <Loader />}
          {data && (
            <>
              <OrderDate orderStatus={data} />
              {!isMobile && (
                <OrderTrackingDetails orderEvents={data?.TransitEvents ?? []} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}