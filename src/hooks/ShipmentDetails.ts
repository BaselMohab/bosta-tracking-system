import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getShipment } from "../services/shipment";

export default function useGetShipmentDetails(trackingNumber: number) {
  const { i18n } = useTranslation();

  const language = i18n.language === 'ar' ? 'ar' : 'en';

  const { data, error, isLoading } = useQuery({
    queryKey: ['shipment', trackingNumber, i18n.language],
    queryFn: ({ signal }) =>
      getShipment(trackingNumber, language, signal).then((res) => res.data),
    refetchOnWindowFocus: false,
    enabled: !!trackingNumber,
    retry: 3,
    retryDelay: 3000,
    staleTime: 1000 * 60 * 10,
  });
  return { data, error, isLoading };
}