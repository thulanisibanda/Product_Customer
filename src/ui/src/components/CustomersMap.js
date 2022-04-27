import React, { useState, useContext, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import "../App.css";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { CustomerContext } from "../Context/CustomerContext";

const CustomersMap = () => {
  const { customer } = useContext(CustomerContext);
  const [filter, setFilter] = useState("");
  const [range, setRange] = useState(10);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // declare the data fetching function

    const populateMarkers = () => {
      let newMarkers = [];
      for (let i = 0; i < customer.length; i++) {
        newMarkers = newMarkers.concat([
          {
            markerOffset: -30,
            name: customer[i].name,
            coordinates: [customer[i].lon, customer[i].lat],
            id: customer[i].id,
          },
        ]);
      }
      setMarkers(newMarkers);
    };

    // call the function
    populateMarkers();
    console.log("re-rendered");
  }, [customer]);

  const calcDistance = (lat1, lon1, lat2, lon2, name) => {
    var p = 0.017453292519943295; // math.PI / 180
    var c = math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    console.log();
    var x = 12742 * math.asin(math.sqrt(a)); // 2 * R; R = 6371 km
    console.log(name, lat1, lon1, lat2, lon2, x.toFixed(0));

    return x.toFixed(0);
  };

  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const handleFilter = async () => {
    const response = await fetch(
      "https://api.postcodes.io/postcodes/" + filter
    );
    const body = await response.json();
    if (response.status != 200) {
      alert("Error with postcode");
    } else {
      let lon = body.result.longitude;
      let lat = body.result.latitude;
      let filterMarkers = [];

      for (let i = 0; i < markers.length; i++) {
        if (
          calcDistance(
            lat,
            lon,
            markers[i].coordinates[1],
            markers[i].coordinates[0],
            markers[i].name
          ) <= range
        ) {
          filterMarkers = filterMarkers.concat(markers[i]);
        }
      }
      setMarkers(filterMarkers);
    }
  };

  return (
    <div>
      <FormGroup>
        <Label for="filter">Filter</Label>
        <Input
          type="text"
          name="filter"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          autoComplete="filter"
          placeholder="Enter Postcode"
        />
        <Label for="range">Distance (km)</Label>
        <Input
          name="range"
          type="range"
          id="range"
          min="0"
          value={range}
          max="300"
          step="10"
          onChange={(e) => setRange(e.target.value)}
        />
        <div>{range} km</div>
        <Button color="success" onClick={handleFilter}>
          Filter
        </Button>
      </FormGroup>
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [2, -53, 0],
          scale: 3000,
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset, id }) => (
            <Marker key={id} coordinates={coordinates}>
              <circle r="3" fill="#F00" stroke="fff" strokeWidth={2} />
              <text
                textAnchor="middle"
                y={-10}
                style={{
                  fontFamily: "system-ui",
                  fill: "#5D5A6D",
                  fontSize: 10,
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};
export default CustomersMap;
