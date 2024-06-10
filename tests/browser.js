/**
 * @typedef {import('leaflet-search-types')}
 * @typedef {import('leaflet')}
 */

"use strict";

const map = L.map("map").setView([51.505, -0.09], 13);

const search = L.control.search({
  url: "",
  jsonpParam: "json_callback",
  propertyName: "display_name",
  container: "findbox",
});

search.on("search:locationfound", function (e) {
  if (e.layer._popup) {
    e.layer.openPopup();
  }
});

search.addTo(map);
