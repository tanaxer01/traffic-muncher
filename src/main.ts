import './style.css';
// Import Leaflet
import L, { type LatLngTuple } from 'leaflet';
// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';
import { fetch_waze, type Alert } from './waze';
import { cellToBoundary, latLngToCell } from 'h3-js';
import { group_by_cell } from './processing';

// Create our app container with the map container
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <div id="map" />
  </div>
`;

const santiago = [-33.445707376311226, -70.65308338572883] as LatLngTuple;

// Initialize the map after the HTML has been set
const mapContainer = document.getElementById('map') as HTMLElement;
const map = L.map(mapContainer).setView(santiago, 10); // London coordinates as default

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);


const bound = map.getBounds();
async function main(map: L.Map) {
	const wazeData = await fetch_waze({
		top: bound.getNorth(),
		bottom: bound.getSouth(),
		left: bound.getWest(),
		right: bound.getEast(),
		env: 'row',
		types: ['alerts'],
	})

	var dotGroup = L.layerGroup(wazeData.alerts.map(({ location }) => L.marker([location.y, location.x])));
	dotGroup.addTo(map);

	const hexGroup = L.layerGroup(wazeData.alerts.map(({ location }) => L.polygon(cellToBoundary(latLngToCell(location.y, location.x, 10)))));
	hexGroup.addTo(map);


	const groups = group_by_cell(wazeData.alerts, 10);
	console.log(groups)

	// map.on('click', async (e) => {
	// 	dotGroup.clearLayers()
	//
	// 	const bound = map.getBounds();
	// 	const wazeData = await fetch_waze({
	// 		top: bound.getNorth(),
	// 		bottom: bound.getSouth(),
	// 		left: bound.getWest(),
	// 		right: bound.getEast(),
	// 		env: 'row',
	// 		types: ['alerts'],
	// 	})
	//
	// 	dotGroup = L.layerGroup(wazeData.alerts.map(({ location }) => L.marker([location.y, location.x])));
	// 	dotGroup.addTo(map);
	//
	//
	//
	//
	// });


}

main(map)
