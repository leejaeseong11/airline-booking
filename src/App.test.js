import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import * as axios from "axios";

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

const airline = {
  KOREANAIR: "대한항공",
  ASIANA: "아시아나항공",
  TEEWAY: "티웨이항공",
  JINAIR: "진에어",
  AIRSEOUL: "에어서울",
  JEJUAIR: "제주항공",
  EASTAR: "이스타항공",
};

const data = require("./db.json");
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  })
);

describe("React test", () => {
  let searchButton;
  let departuresSelect;
  let arrivalsSelect;
  let dateInput;

  beforeEach(() => {
    render(<App />);

    searchButton = screen.getByTestId("search");
    departuresSelect = screen.getByTestId("departures");
    arrivalsSelect = screen.getByTestId("arrivals");
    dateInput = screen.getByTestId("date");

    jest.mock("axios");

    // const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  });

  // it("지시사항 1번을 만족하는가?", () => {
  //   searchButton.click();

  //   try {
  //     expect(axios.get).toHaveBeenCalledWith(
  //       expect.stringMatching("airline-ticekt-booking")
  //     );
  //   } catch {
  //     expect(fetchMock).toHaveBeenCalledWith(
  //       expect.stringMatching("airline-ticekt-booking")
  //     );
  //   }
  // });

  // it("지시사항 2번을 만족하는가?", () => {
  //   let departuresList = {};
  //   let arrivalsList = {};

  //   for (let i = 0; i < departuresSelect.options.length; i++) {
  //     departuresList[departuresSelect.options[i].value] =
  //       departuresSelect.options[i].text;
  //   }
  //   for (let i = 0; i < arrivalsSelect.options.length; i++) {
  //     arrivalsList[arrivalsSelect.options[i].value] =
  //       arrivalsSelect.options[i].text;
  //   }

  //   expect(departuresList).toEqual(destination);
  //   expect(arrivalsList).toEqual(destination);
  //   expect(dateInput.type).toEqual("date");
  // });

  it("지시사항 3번을 만족하는가?", async () => {
    departuresSelect.value = "ICN";
    arrivalsSelect.value = "CJU";
    await waitFor(() => fireEvent.click(searchButton));

    // await wait(1000);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(await screen.findByText("testtest"));
    // await waitFor(() =>
    //   expect(screen.getByText("testtest")).toBeInTheDocument()
    // );
    // await waitFor(() => expect(screen.getByText("860289")).toBeInTheDocument());

    //   try {
    //     expect(axios.get).toHaveBeenCalledWith(
    //       expect.stringMatching("airline-ticekt-booking")
    //     );
    //   } catch {
    //     expect(fetch).toHaveBeenCalledWith(
    //       expect.stringMatching("airline-ticekt-booking")
    //     );
    //   }

    //   departuresSelect.value = "NRT";
    //   arrivalsSelect.value = "LHR";
    //   searchButton.click();
    //   await wait(100);
    //   expect(screen.getByText("제주항공")).toBeInTheDocument();
    //   expect(screen.getByText("831436")).toBeInTheDocument();
  });
});
