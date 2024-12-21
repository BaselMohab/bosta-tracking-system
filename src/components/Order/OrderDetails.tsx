import OrderDate from "./components/OrderDate";
import OrderTrackingDetails from "./components/OrderTrackingDetails";
import useGetShipmentDetails from "../../hooks/ShipmentDetails";
import { useParams } from "react-router";
import Loader from "../LoadingComponent/Loader";

export default function OrderDetails() {
  const {trackingNumber} = useParams()
  const {data, error, isLoading} = useGetShipmentDetails(Number(trackingNumber))

  if (error) throw error;
  if (isLoading) return <Loader />;

  if (!data) return <div><Loader /></div>;

  return (
    <div className="w-full flex flex-col gap-1 md:gap-10">
      <div>
        <OrderDate orderStatus={data} />
      </div>
      <div>
        <OrderTrackingDetails orderEvents={data?.TransitEvents ?? []} />
      </div>
    </div>
  )
}
