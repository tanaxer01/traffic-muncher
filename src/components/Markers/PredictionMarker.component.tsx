import { Prediction } from "@/domain/appred";
import { Circle } from "react-leaflet";

type predictionProps = {
	prediction: Prediction;
};

export default function PredictionMarker({ prediction }: predictionProps) {
	return (
		<Circle
			center={[prediction.latitude, prediction.longitude]}
			radius={5}
			color="#ff0000"
		/>
	);
}
