import { renderHook } from '@testing-library/react-hooks';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import useGetShipmentDetails from '../hooks/ShipmentDetails';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../services/shipment', () => ({
  getShipment: jest.fn(),
}));

describe('useGetShipmentDetails', () => {
  const trackingNumber = 12345;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return data when query is successful', async () => {
    const mockData = { id: trackingNumber, status: 'delivered' };
    (useTranslation as jest.Mock).mockReturnValue({ i18n: { language: 'en' } });
    (useQuery as jest.Mock).mockReturnValue({ data: mockData, error: null, isLoading: false });

    const { result, waitForNextUpdate } = renderHook(() => useGetShipmentDetails(trackingNumber));

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

});