import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import "./Map.css";
import "@reach/combobox/styles.css";
const initial = {
  lat: -16.50105332416238,
  lng: -68.13315313309978,
};
const lib = ["places"];
const options = {
  streetViewControl: false,
  mapTypeControl: false,
};
const Map = (props) => {
  const { setExtLocation, setExtAddress, initialLocation, isDisabled } = props;
  const [selectedLocation, setSelectedLocation] = useState();
  const [geocoder, setGeocoder] = useState(null);
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: lib,
  });
  useEffect(() => {
    const googleMaps = window.google.maps;
    if (isLoaded) {
      const newGeocoder = new googleMaps.Geocoder();
      setGeocoder(newGeocoder);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (geocoder) {
      setSelectedLocation(initial);
      if (setExtLocation) {
        setExtLocation(initial);
      }
    }
  }, [geocoder, setExtLocation]);

  const handleMapClick = (e) => {
    if (geocoder && !isDisabled) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const newLoc = { lat, lng };
      setSelectedLocation(newLoc);
      setExtLocation(newLoc);
      geocoder.geocode({ location: newLoc }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            console.log(results[0]);
            setExtAddress(results[0].formatted_address);
          } else {
            setExtAddress("Direccion no encontrada");
          }
        } else {
          setExtAddress("No se pudo obtener la dirección");
        }
      });
      map.panTo(newLoc);
    }
  };
  const onLoad = (map) => {
    setMap(map);
  };
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="map-container">
      <GoogleMap
        center={initialLocation ? initialLocation : initial}
        zoom={15}
        mapContainerStyle={{ height: "300px" }}
        options={options}
        onClick={(e) => handleMapClick(e)}
        onLoad={onLoad}
      >
        {geocoder && (
          <Marker
            position={initialLocation ? initialLocation : selectedLocation}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
