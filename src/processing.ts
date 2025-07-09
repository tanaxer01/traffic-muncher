import { latLngToCell } from 'h3-js';
import type { Alert } from './waze';

// 1. ID Dedup
function group_by_id(alerts: Alert[]) {
	return alerts.reduce((acc: Record<string, Alert[]>, alert) => {
		if (!acc[alert.id]) {
			acc[alert.id] = [];
		}
		acc[alert.id].push(alert);
		return acc;
	}, {});
}

// 2. Spacial Dedup
export function group_by_cell(alerts: Alert[], cellSize: number) {
	const a = alerts.reduce((acc: Record<string, any>, alert) => {
		const idx = latLngToCell(alert.location.x, alert.location.y, cellSize) + '-' + alert.type;
		if (!acc[idx]) {
			acc[idx] = [];
		}
		//acc[idx].push(alert);
		acc[idx].push({ type: alert.type, location: alert.location, street: alert.street, wazeData: alert.wazeData });
		return acc;
	}, {});

	return a;
}
