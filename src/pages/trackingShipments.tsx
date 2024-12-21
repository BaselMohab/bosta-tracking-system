import { useSearchParams } from "react-router-dom";
import Search from "../components/Search/Search";
import OrderDate from "../components/Order/components/OrderDate";
import OrderTrackingDetails from "../components/Order/components/OrderTrackingDetails";
import useGetShipmentDetails from "../hooks/ShipmentDetails";
import Loader from "../components/LoadingComponent/Loader";
import { useMediaQuery } from "@mui/material";

export default function TrackingShipments() {
  const [searchParams] = useSearchParams();
  const trackingNumber = searchParams.get("trackingNumber");
  const { data, isLoading } = useGetShipmentDetails(Number(trackingNumber));
  const isMobile = useMediaQuery('(max-width:560px)');


  return (
    <div className="flex flex-col items-center gap-10 mb-10">
      <Search />
      {trackingNumber && (
        <div className="w-[967px] flex flex-col gap-10">
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