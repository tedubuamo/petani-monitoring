"use client";

import MyNavbar from "@/components/navbar/MyNavbar";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { poppins } from "./fonsts";
import { useEffect, useState } from "react";
import { redirect, useRouter } from 'next/navigation'
import Image from "next/image";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  const [data, setData] = useState([]);
  const [temp, setTemp] = useState(0);
  const [soil, setSoil] = useState(0);
  const [humid, setHumid] = useState(0);
  const [lumen, setLumen] = useState(0);
  const [pumpOn, setPumpOn] = useState(false);

  
  const fetchData = async () => {
    const { user } = JSON.parse(localStorage.getItem("user")) ;
    const { id_gh } = user[0];

    try {
      const response = await axios.get(`${apiUrl}/monitoring/node${id_gh}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setData(response.data.data);
      setTemp(response.data.temp);
      setSoil(response.data.soil);
      setHumid(response.data.humid);
      setLumen(response.data.lumen);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  
  const handlePumpToggle = () => {
    const newState = !pumpOn
    setPumpOn(newState);

    axios.post(`${apiUrl}/api/pump`, {state: newState},{
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
  

  useEffect(() => {
    if (localStorage.getItem("user") === null) { 
      redirect('/login')
    } else {
      fetchData();
    }
  }, []); 

  return (
    <>
      <MyNavbar activeIndex={0}/>
      <div className="main-content">
        <div className={"container mx-auto mt-6"}>
          <p className={`text-[25px] text-center ${poppins.className}`}>
            Monitoring
          </p>
          {/* <div className="pump">
              onClick={handlePumpToggle}
            <button
              className={`mt-6 ml-12 text-center grow text-[20px] ${poppins.className} ${pumpOn ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-2 rounded`}>
              {pumpOn ? 'Turn Off' : 'Turn On'}
            </button>
            <span className={`ml-3 text-[20px] ${poppins.className}`}>
              {pumpOn ? 'Pompa Menyala' : 'Pompa Mati'}
            </span>
          </div> */}
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
                  {temp}°C
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
                  Kelembapan (RH)
                </p>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-wrap flex-row justify-center gap-x-5 py-4 px-10">
                <span
                  className={`text-center grow text-[55px] ${poppins.className}`}
                >
                  {soil}%
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
                  Kelembaban (RH)
                </p>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-wrap flex-row justify-center gap-x-5 py-4 px-10">
                <span
                  className={`text-center grow text-[55px] ${poppins.className}`}
                >
                  {humid}%
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
                  Lux (lux)
                </p>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-wrap flex-row justify-center gap-x-5 py-4 px-10">
                <span
                  className={`text-center grow text-[55px] ${poppins.className}`}
                >
                  {lumen} lux
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
