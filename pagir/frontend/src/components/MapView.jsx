import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix typical leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Guaranteed Network-Free SVG Icons
const createIcon = (color) => {
    const hexColor = color === 'green' ? '#10b981' : color === 'blue' ? '#3b82f6' : '#f97316';
    const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${hexColor}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3" fill="white"></circle>
    </svg>`;

    return L.divIcon({
        className: 'bg-transparent border-0',
        html: `<div style="width: 36px; height: 36px; filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.3)); transform: translate(-5px, -5px);">${svgIcon}</div>`,
        iconSize: [26, 36],
        iconAnchor: [13, 36],
        popupAnchor: [0, -36]
    });
};

const icons = {
    donor: createIcon('green'),
    ngo: createIcon('blue'),
    biogas: createIcon('orange'),
};

const MapController = ({ activeLocation }) => {
    const map = useMap();

    // Fix for React-Leaflet grey map bug inside CSS Grids
    useEffect(() => {
        const timeout = setTimeout(() => {
            map.invalidateSize();
        }, 100);
        return () => clearTimeout(timeout);
    }, [map]);

    useEffect(() => {
        if (activeLocation) {
            map.setView(activeLocation.pos, 14, {
                animate: true,
                duration: 0.8
            });
        }
    }, [activeLocation, map]);
    return null;
};

const MapView = ({ locations, activeLocation }) => {
    const defaultCenter = [13.0827, 80.2707]; // Chennai coordinates

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white"
        >
            <div className="h-[600px] w-full relative z-0">
                <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom={false} className="h-full w-full">
                    <MapController activeLocation={activeLocation} />
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />

                    {/* Hunger Heatmap Mock (Circles) */}
                    <CircleMarker center={[13.06, 80.24]} radius={40} pathOptions={{ color: 'transparent', fillColor: '#ef4444', fillOpacity: 0.3 }}>
                        <Popup>High Demand Area: T.Nagar</Popup>
                    </CircleMarker>
                    <CircleMarker center={[13.10, 80.28]} radius={30} pathOptions={{ color: 'transparent', fillColor: '#ef4444', fillOpacity: 0.25 }}>
                        <Popup>Moderate Demand Area</Popup>
                    </CircleMarker>

                    {locations.map((loc) => (
                        <Marker key={loc.id} position={loc.pos} icon={icons[loc.type]}>
                            <Popup>
                                <div className="text-center font-sans">
                                    <h4 className="font-bold text-gray-900">{loc.name}</h4>
                                    <p className="text-sm text-gray-600 mb-1">{loc.desc}</p>
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${loc.type === 'donor' ? 'bg-green-100 text-green-800' :
                                        loc.type === 'ngo' ? 'bg-blue-100 text-blue-800' :
                                            'bg-orange-100 text-orange-800'
                                        }`}>
                                        {loc.type.toUpperCase()}
                                    </span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </motion.div>
    );
};

export default MapView;
