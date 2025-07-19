import { useRef } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { fadeInLeft } from "@/components/shared/animations";
import { useCustomerDetailsAnimation } from "@/hooks/useCustomerDetailsAnimation";

interface Location {
  lat: number;
  lng: number;
}

interface CustomerMapProps {
  location: Location;
  name: string;
  address: string;
}

export function CustomerMap({ location, name, address }: CustomerMapProps) {
  const ref = useRef(null);
  const controls = useCustomerDetailsAnimation(ref);

  return (
    <motion.div
      ref={ref}
      variants={fadeInLeft}
      initial="hidden"
      animate={controls}
      className="h-64 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg overflow-hidden border border-pink-100"
    >
      <MapContainer
        bounds={[
          [location.lat - 0.01, location.lng - 0.01],
          [location.lat + 0.01, location.lng + 0.01],
        ]}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            <div className="text-center">
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-600">{address}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  );
}
