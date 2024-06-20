/* eslint-disable react-hooks/exhaustive-deps */
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { useEffect, useState } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ setAddress, setZipCode }) => {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            getGeocode(e.latlng);
        },
    });

    useEffect(() => {
        map.locate().on('locationfound', function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            getGeocode(e.latlng);
        });
    }, [map]);

    const getGeocode = async (latlng) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&addressdetails=1`
            );
            const result = response.data;
            const address = result.display_name;
            setAddress(address);
            const postalCode = result.address.postcode;
            if (postalCode) {
                setZipCode(postalCode);
            }
        } catch (error) {
            console.error('Error fetching geocode: ', error);
        }
    };

    return position === null ? null : <Marker position={position}></Marker>;
};

const MapComponent = ({ setAddress, setZipCode }) => {
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: '300px', width: '100%', borderRadius: '15px' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker setAddress={setAddress} setZipCode={setZipCode} />
        </MapContainer>
    );
};

export default MapComponent;
