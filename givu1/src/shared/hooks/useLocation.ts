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
        console.log('Location permission denied, using default country');
        setError('Permisos de ubicación denegados');
        setLoading(false);
        return;
      }

      // Obtener ubicación actual con timeout
      const location = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Location timeout')), 10000)
        )
      ]) as Location.LocationObject;

      setLocation(location);

      // Intentar geocodificación inversa con manejo de errores
      try {
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
              console.log('Country detected:', countryData.name);
            }
          }
        }
      } catch (geocodeError) {
        console.warn('Geocoding failed (possibly due to VPN):', geocodeError);
        // No establecer error aquí, solo continuar sin detección de país
        setError('No se pudo detectar el país (VPN activo)');
      }
    } catch (err) {
      console.error('Error getting location:', err);
      // No establecer error crítico, solo continuar sin detección
      setError('Ubicación no disponible');
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
