import React, { useState } from "react";
import MakeOptionList from "./MakeOptionList";

export default function FilterTickets({ tickets }) {
  const [airlineFilter, setAirlineFilter] = useState("no-airline");
  const [dateSort, setDateSort] = useState("date-no");
  const [priceSort, setPriceSort] = useState("price-no");

  const printTickets = () => {
    if (priceSort === "price-no") {
    } else if (priceSort === "price-cheap") {
      tickets.sort((a, b) => a.price - b.price);
    } else {
      tickets.sort((a, b) => b.price - a.price);
    }

    if (dateSort === "date-no") {
    } else if (dateSort === "date-fast") {
      tickets.sort((a, b) => {
        if (a.date > b.date) return 1;
        else if (b.date > a.date) return -1;
        else return 0;
      });
    } else {
      tickets.sort((a, b) => {
        if (a.date > b.date) return -1;
        else if (b.date > a.date) return 1;
        else return 0;
      });
    }

    if (airlineFilter !== "no-airline")
      tickets = tickets.filter((e) => e.airline === airline[airlineFilter]);

    return tickets.length !== 0
      ? tickets.map((ticket) => (
          <li key={ticket.id}>
            {ticket.airline} / {ticket.formedDate} / {ticket.price}원
          </li>
        ))
      : "검색 결과가 존재하지 않습니다.";
  };

  function handleFilterAirlineChange(e) {
    setAirlineFilter(e.target.value);
  }
  function handleSortDateChange(e) {
    setDateSort(e.target.value);
  }
  function handleSortPriceChange(e) {
    setPriceSort(e.target.value);
  }

  const airline = {
    KOREANAIR: "대한항공",
    ASIANA: "아시아나항공",
    TEEWAY: "티웨이항공",
    JINAIR: "진에어",
    AIRSEOUL: "에어서울",
    JEJUAIR: "제주항공",
    EASTAR: "이스타항공",
  };

  const airlineList = MakeOptionList(airline);

  return (
    <div>
      <h2>검색 결과</h2>
      <div>항공사 필터 / 시간순 정렬 / 가격순 정렬</div>
      <select data-testidid="filter-airline" onChange={handleFilterAirlineChange}>
        <option key="no-airline" value="no-airline">
          항공사 필터 없음
        </option>
        {airlineList}
      </select>
      <select data-testid="sort-date" onChange={handleSortDateChange}>
        <option key="date-no" value="date-no">
          시간 정렬 없음
        </option>
        <option key="date-fast" value="date-fast">
          출발 일시 빠른순
        </option>
        <option key="date-slow" value="date-slow">
          출발 일시 늦은순
        </option>
      </select>
      <select data-testid="sort-price" onChange={handleSortPriceChange}>
        <option key="price-no" value="price-no">
          가격 정렬 없음
        </option>
        <option key="price-cheap" value="price-cheap">
          가격 낮은순
        </option>
        <option key="price-expensive" value="price-expensive">
          가격 높은순
        </option>
      </select>
      <br />
      <br />
      {printTickets()}
    </div>
  );
}
