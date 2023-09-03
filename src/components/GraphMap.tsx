//map page using react leaflet

import "../css/graphmap.css";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { useCountrySpecificQuery } from "../services/data.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const GraphMap = () => {
  const navigate = useNavigate();

  const countrySpecificResponse = useCountrySpecificQuery();

  return (
    <>
      <div className="main-container container-fluid d-flex align-items-center justify-content-center">
        <div className="contact">
          <div className="heading d-flex align-items-center justify-content-center">
            Contact Page
          </div>
          <div className="body d-flex">
            <div className="sidebar d-flex flex-column">
              <div className="sidebar1 h-25 d-flex justify-content-center align-items-center">
                <button onClick={() => navigate("/")}>Contacts</button>
              </div>
              <div className="sidebar2 h-25 d-flex justify-content-center align-items-center">
                <button onClick={() => navigate("/graphmap")}>Maps</button>
              </div>
              <div className="sidebar2 h-25 d-flex justify-content-center align-items-center">
                <button onClick={() => navigate("/charts")}>Charts</button>
              </div>
            </div>

            <div className="main-page">
              <MapContainer
                style={{ width: "100%", height: "80vh" }}
                zoom={4}
                center={[19.4319102, 72.8177933]}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
                />
                {countrySpecificResponse.isSuccess &&
                  countrySpecificResponse.data.map((item: any) => {
                    return (
                      <Marker
                        key={item.country}
                        position={[item.countryInfo.lat, item.countryInfo.long]}
                      >
                        <Popup>
                          <div className="popup">
                            <h5>{item.country}</h5>
                            <p>{item.cases}</p>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphMap;
