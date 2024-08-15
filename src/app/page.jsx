"use client";

import MyNavbar from "@/components/navbar/MyNavbar";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { poppins } from "./fonsts";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function Home() {
  const apiUrl = process.env.BACKEND_API_URL;

  const [data, setData] = useState([]);
  const [temp, setTemp] = useState(0);
  const [soil, setSoil] = useState(0);
  const [moist, setMoist] = useState(0);
  const [lumen, setLumen] = useState(0);
  const [pumpOn, setPumpOn] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}/monitoring/node1`)
      .then((response) => {
        setData(response.data.data);
        setTemp(response.data.temp);
        setSoil(response.data.soil);
        setMoist(response.data.moist);
        setLumen(response.data.lumen);
    })
      .catch(error =>{
        console.error("There was an error fetching the data!", error);
      })
    }, []);

  const handlePumpToggle = () => {
    const newState = !pumpOn
    setPumpOn(newState);

    axios.post('http://127.0.0.1:5000/api/pump', {state: newState},{
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) =>{
        console.log("Pump state updated!", response.data);
      })
      .catch(error => {
        console.error("There was an error updating the pump state!", error);
      });
  };
  
  return (
    <>
      <MyNavbar activeIndex={0}/>
      <div className="main-content">
        <div className={"container mx-auto mt-6"}>
          <p className={`text-[25px] text-center ${poppins.className}`}>
            Monitoring
          </p>
          <div className="pump">
            <button
              onClick={handlePumpToggle}
              className={`mt-6 ml-12 text-center grow text-[20px] ${poppins.className} ${pumpOn ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-2 rounded`}>
              {pumpOn ? 'Turn Off' : 'Turn On'}
            </button>
            <span className={`ml-3 text-[20px] ${poppins.className}`}>
              {pumpOn ? 'Pompa Menyala' : 'Pompa Mati'}
            </span>
          </div>
          <div className="container mx-auto justify-center mt-5">
            <Card className="mx-auto w-[78%]">
              <CardHeader className="block" style={{ backgroundColor: '#336600' }}>
                <p className={`text-white text-center text-[15px] ${poppins.className}`}>
                  SUHU
                </p>
                <p className={`text-white text-center text-[15px] ${poppins.className}`}>
                  Celcius (°C)
                </p>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-wrap flex-row justify-center gap-x-5 py-4 px-10">
                <span
                  className={`text-center grow text-[55px] ${poppins.className}`}
                >
                  {temp}
                </span>
                <div className="flex-none flex">
                  <Image
                    src="/assets/icons/home-celcius.png"
                    alt="Thermometer"
                    height={50}
                    width={50}
                    className="my-auto"
                    style={{height:"auto"}}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="container mx-auto justify-center mt-5">
            <Card className="mx-auto w-[78%]">
              <CardHeader className="block" style={{ backgroundColor: '#336600' }}>
                <p className={`text-center text-white text-[15px] ${poppins.className}`}>
                  KELEMBABAN TANAH
                </p>
                <p className={`text-center text-white text-[15px] ${poppins.className}`}>
                  Kelembaban Relative (RH)
                </p>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-wrap flex-row justify-center gap-x-5 py-4 px-10">
                <span
                  className={`text-center grow text-[55px] ${poppins.className}`}
                >
                  {soil}
                </span>
                <div className="flex-none flex">
                  <Image
                    src="/assets/icons/icon-tint.png"
                    alt="Thermometer"
                    height={40}
                    width={40}
                    className="my-auto"
                    style={{height:"auto"}}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="container mx-auto justify-center mt-5">
            <Card className="mx-auto w-[78%]">
              <CardHeader className="block" style={{ backgroundColor: '#336600' }}>
                <p className={`text-center text-white text-[15px] ${poppins.className}`}>
                  KELEMBAPAN UDARA
                </p>
                <p className={`text-center text-white text-[15px] ${poppins.className}`}>
                  Kelembapan Relative (RH)
                </p>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-wrap flex-row justify-center gap-x-5 py-4 px-10">
                <span
                  className={`text-center grow text-[55px] ${poppins.className}`}
                >
                  {moist}
                </span>
                <div className="flex-none flex">
                  <Image
                    src="/assets/icons/icon-water.png"
                    alt="Thermometer"
                    height={50}
                    width={50}
                    className="my-auto"
                    style={{height:"auto"}}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="container mx-auto justify-center mt-5">
            <Card className="mx-auto w-[78%]">
              <CardHeader className="block" style={{ backgroundColor: '#336600' }}>
                <p className={`text-center text-white text-[15px] ${poppins.className}`}>
                  INTENSITAS CAHAYA
                </p>
                <p className={`text-center text-white text-[15px] ${poppins.className}`}>
                  Candela (Cd)
                </p>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-wrap flex-row justify-center gap-x-5 py-4 px-10">
                <span
                  className={`text-center grow text-[55px] ${poppins.className}`}
                >
                  {lumen}
                </span>
                <div className="flex-none flex">
                  <Image
                    src="/assets/icons/menu-navigation.png"
                    alt="Thermometer"
                    height={50}
                    width={50}
                    className="my-auto"
                    style={{height:"auto"}}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
