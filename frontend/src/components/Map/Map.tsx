import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api';
import { DetailsPlace } from '@/types/types';
import Image from 'next/image';
import styles from './Map.module.scss';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const Map = ({ place }: { place: DetailsPlace }) => {
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);

  const options = {
    mapId: process.env.NEXT_PUBLIC_API_MAP_ID || '',
    mapTypeControl: false,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_MAP_KEY || '',
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            place.address
          )}&key=${process.env.NEXT_PUBLIC_API_MAP_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setCenter({ lat: location.lat, lng: location.lng });
        } else {
          console.error('No results found for the given address');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, [place]);

  return isLoaded && center ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={options}
      center={center}
      zoom={16}
      onClick={() => setIsInfoWindowOpen(false)}
    >
      <MarkerF
        position={center}
        onClick={() => {
          setIsInfoWindowOpen(true);
        }}
      >
        {isInfoWindowOpen && (
          <InfoWindowF position={center}>
            <div className={styles.map}>
              <div className={styles.map__image}>
                <Image
                  src={place.main_photo}
                  className={styles['map__image--pic']}
                  fill
                  alt='main place image for map'
                  style={{ objectFit: 'cover', borderRadius: '30px' }}
                />
              </div>
              <div className={styles.map__content}>
                <h3 className={styles.map__title}>{place.name}</h3>
                <p className={styles.map__address}>{place.address}</p>
                <p className={styles.map__description}>
                  {place.description.slice(0, 150)}
                </p>
              </div>
            </div>
          </InfoWindowF>
        )}
      </MarkerF>
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default Map;
