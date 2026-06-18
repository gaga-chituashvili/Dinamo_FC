"use client";

import { useEffect, useRef } from "react";
import { Wrapper } from "@/src/components/shared/wrapper";

const STADIUM_LAT = 41.723000888462074;
const STADIUM_LNG = 44.7897691;

export function StadiumMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<unknown>(null);

  useEffect(() => {
    if (mapInstance.current || !mapRef.current) return;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
        ._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [STADIUM_LAT, STADIUM_LNG],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const customIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            background:#a5b4fc;border-radius:50%;width:44px;height:44px;
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 4px 16px rgba(0,0,0,0.5);
            border:2px solid #0a0e1f;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0e1f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="12" cy="10" rx="9" ry="5"/>
              <path d="M3 10v4c0 2.76 4.03 5 9 5s9-2.24 9-5v-4"/>
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>`,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
      });

      L.marker([STADIUM_LAT, STADIUM_LNG], { icon: customIcon })
        .addTo(map)
        .bindPopup("<b>ბორის პაიჭაძის დინამოს არენა</b><br/>FC Dinamo Tbilisi")
        .openPopup();

      mapInstance.current = map;
    })();
  }, []);

  return (
    <section className="py-12">
      <Wrapper>
        <div
          ref={mapRef}
          className="h-72 w-full overflow-hidden rounded-xl border border-white/6 md:h-96"
        />
      </Wrapper>
    </section>
  );
}
