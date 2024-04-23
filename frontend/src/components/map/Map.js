import React, { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./Map.css";
import Input from "../input/Input";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
const home = { lat: -16.503826320481192, lng: -68.13119052849437 };
const lib = ["places"];
const PlacesAutoComplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete();
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    console.log({ lat, lng });
  };
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        input="Dirección"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
const Map = () => {
  const [selected, setSelected] = useState(null);
  const [place, setPlace] = useState();
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: lib,
  });
  const options = {
    streetViewControl: false,
    mapTypeControl: false,
  };
  console.log(place);
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="map-container">
      <PlacesAutoComplete setSelected={setSelected} />
      <div className="input-wrapper">
        <Autocomplete>
          <Input
            id="nombre"
            name="nombre"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Escriba dirección"
          />
        </Autocomplete>
      </div>
      <GoogleMap
        center={home}
        zoom={15}
        mapContainerStyle={{ height: "300px" }}
        options={options}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
