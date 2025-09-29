import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Country, getCountryByCode } from '../data/countries';

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Solicitar permisos de ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permisos de ubicación denegados');
        setLoading(false);
        return;
      }

      // Obtener ubicación actual
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation(location);

      // Obtener información del país usando geocodificación inversa
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const countryCode = reverseGeocode[0].isoCountryCode;
        if (countryCode) {
          const countryData = getCountryByCode(countryCode);
          if (countryData) {
            setCountry(countryData);
          }
        }
      }
    } catch (err) {
      console.error('Error getting location:', err);
      setError('Error al obtener la ubicación');
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    country,
    loading,
    error,
    refetch: getCurrentLocation,
  };
}
