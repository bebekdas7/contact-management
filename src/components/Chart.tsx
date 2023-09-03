//chart component rendered in /charts path

import { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { useGraptDataQuery } from "../services/data";

const ChartComponent: FC = () => {
  const navigate = useNavigate();
  const response = useGraptDataQuery();
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (response.isSuccess && chartRef.current) {
      const cases = response.data.cases;
      const deaths = response.data.deaths;
      const recovered = response.data.recovered;

      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: Object.keys(cases),
            datasets: [
              {
                label: "Cases",
                data: Object.values(cases),
                borderColor: "red",
              },
              {
                label: "Deaths",
                data: Object.values(deaths),
                borderColor: "white",
              },
              {
                label: "Recovered",
                data: Object.values(recovered),
                borderColor: "green",
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "COVID-19 Cases, Deaths, and Recovered",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number",
                },
              },
            },
          },
        });
      }
    }
  }, [response]);

  return (
    <div className="main-container container-fluid d-flex align-items-center justify-content-center">
      <div className="contact">
        <div className="heading d-flex align-items-center justify-content-center">
          Contact Page
        </div>

        <div className="body d-flex">
          <div className="sidebar d-flex flex-column">
            <div className="sidebar1 h-25 d-flex justify-content-center align-items-center">
              <button key="contacts" onClick={() => navigate("/")}>
                Contacts
              </button>
            </div>
            <div className="sidebar2 h-25 d-flex justify-content-center align-items-center">
              <button key="maps" onClick={() => navigate("/graphmap")}>
                Maps
              </button>
            </div>
            <div className="sidebar2 h-25 d-flex justify-content-center align-items-center">
              <button key="charts" onClick={() => navigate("/charts")}>
                Charts
              </button>
            </div>
          </div>

          <div className="main-page">
            <canvas
              id="lineChart"
              width={1000}
              height={600}
              ref={chartRef}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
