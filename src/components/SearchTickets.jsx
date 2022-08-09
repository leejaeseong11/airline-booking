import React, { useState } from "react";
import axios from "axios";
import FilterTickets from "./FilterTickets";
import MakeOptionList from "./MakeOptionList";

export default function SearchTickets() {
  const [tickets, setTickets] = useState([]);
  const [departures, setDepartures] = useState("ICN");
  const [arrivals, setArrivals] = useState("ICN");
  const [date, setDate] = useState("");

  const destination = {
    ICN: "인천",
    CJU: "제주",
    HKG: "홍콩",
    HAN: "하노이",
    KIX: "오사카",
    NRT: "도쿄",
    SHA: "상하이",
    CDG: "파리",
    LHR: "런던",
    SPN: "사이판",
  };

  const destinatnioList = MakeOptionList(destination);

  async function fetchData() {
    // const response = await axios.get(
    //   `https://airline-ticekt-booking.herokuapp.com/tickets?departures=${destination[departures]}&arrivals=${destination[arrivals]}`
    // );
    // let recivedData = response.data;
    let recivedData;
    fetch(
      `https://airline-ticekt-booking.herokuapp.com/tickets?departures=${destination[departures]}&arrivals=${destination[arrivals]}`
    )
      .then((response) => response.json())
      .then((response) => {
        recivedData = response;

        let returnData = [];

        for (let i = 0; i < recivedData.length; i++) {
          recivedData[i].date = recivedData[i].date.replace("Z", "");
          let dateForm = recivedData[i].date.split("T")[0];
          if (dateForm < date) {
            continue;
          }

          let timeForm = recivedData[i].date.split("T")[1];
          timeForm = timeForm.split(":");
          dateForm = dateForm.split("-");
          recivedData[
            i
          ].formedDate = `${dateForm[0]}년 ${dateForm[1]}월 ${dateForm[2]}일 ${timeForm[0]}시 ${timeForm[1]}분`;
          returnData.push(recivedData[i]);
        }

        setTickets(returnData);
        document.write("testtest");
      });
  }

  function handleDeparturesChange(e) {
    setDepartures(e.target.value);
  }

  function handleArrivalsChange(e) {
    setArrivals(e.target.value);
  }

  function handleDateChange(e) {
    setDate(e.target.value);
  }

  return (
    <div>
      <h1>항공권 예매하기 (2022년 4분기)</h1>
      <select data-testid="departures" onChange={handleDeparturesChange}>
        {destinatnioList}
      </select>
      <select data-testid="arrivals" onChange={handleArrivalsChange}>
        {destinatnioList}
      </select>
      <input data-testid="date" type="date" onChange={handleDateChange} />
      <button data-testid="search" onClick={fetchData}>
        검색
      </button>
      <FilterTickets tickets={tickets} setTickets={setTickets} />
    </div>
  );
}
