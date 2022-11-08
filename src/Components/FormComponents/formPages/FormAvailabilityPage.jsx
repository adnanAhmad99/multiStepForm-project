import React from "react";
import { useState } from "react";

export default function FormAvailabilityPage({
  upperLevelDataContainer,
  handleUpperLevelComponentData,
  seterrorModel,
}) {
  // console.log(upperLevelDataContainer.avalibilityTimings);

  const [timezone, settimezone] = useState(upperLevelDataContainer.timezone);
  const [timezoneError, settimezoneError] = useState(false);
  const [avalibilityTimings, setavalibilityTimings] = useState(
    upperLevelDataContainer.avalibilityTimings
  );

  // functions

  const handleMiniTimeAddition = (parentIndex) => {
    // console.log(avalibilityTimings[parentIndex]);
    const newData = [...avalibilityTimings];
    newData[parentIndex].timings = [
      ...newData[parentIndex].timings,
      { timeStart: "09:00", timeEnd: "18:00" },
    ];
    // console.log(newData[parentIndex].timings);

    // console.log(newData);
    setavalibilityTimings(newData);
  };

  const handleMiniTimeDeletion = (parentIndex, childernIndex) => {
    // console.log(parentIndex, childernIndex);
    const newData = [...avalibilityTimings];
    newData[parentIndex]["timings"] = newData[parentIndex]["timings"].filter(
      (element, elementIndex) => elementIndex != childernIndex
    );
    // console.log(newData[parentIndex]["timings"]);
    setavalibilityTimings(newData);
  };

  const handleMiniTimeChange = (
    timingValue,
    value,
    parentIndex,
    childernIndex
  ) => {
    // console.log(timingValue, value, parentIndex, childernIndex);
    const newData = [...avalibilityTimings];

    newData[parentIndex]["timings"][childernIndex][timingValue] = value;

    setavalibilityTimings(newData);
  };

  const handleDayAvalibility = (value, parentIndex) => {
    // console.log(value, parentIndex);
    // console.log(typeof value);
    const newData = [...avalibilityTimings];

    newData[parentIndex].activeDay = value;

    setavalibilityTimings(newData);
  };

  const handleDataSending = () => {
    if (!timezone) {
      settimezoneError(true);
      return;
    }
    settimezoneError(false);

    const fd = new FormData();
    fd.append("timezone", timezone);
    fd.append("avalibilityTiming", JSON.stringify(avalibilityTimings));

    fetch("http://localhost:3030/api/formInformation/avalibility", {
      method: "POST",
      body: fd,
    })
      .then((data) => {
        console.log(data);
        if (data.ok) {
          return data.json();
        }
        throw new Error("unable to receive data");
      })
      .then((data) => {
        const newData = JSON.parse(data);
        if (newData.message == "timezone not selected") {
          settimezoneError(true);
        }
        if (newData.message == "data received") {
          handleUpperLevelComponentData("Video", {
            timezone,
            avalibilityTimings,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        seterrorModel(true);
      });
  };

  return (
    <article className="avalibilityFormPageArticle">
      <h2>Availibilty</h2>
      <h3>Set your timezone </h3>
      <p>
        A correct timezone is essential to coordinate lessons with international
        students
      </p>
      <h4>Choose your timezone</h4>
      <select
        className="avalibilityPageSelectController"
        value={timezone}
        onChange={(e) => settimezone(e.target.value)}
      >
        <option value=""></option>
        <option value="-12:00">(GMT -12:00) Eniwetok, Kwajalein</option>
        <option value="-11:00">(GMT -11:00) Midway Island, Samoa</option>
        <option value="-10:00">(GMT -10:00) Hawaii</option>
        <option value="-09:50">(GMT -9:30) Taiohae</option>
        <option value="-09:00">(GMT -9:00) Alaska</option>
        <option value="-08:00">
          (GMT -8:00) Pacific Time (US &amp; Canada)
        </option>
        <option value="-07:00">
          (GMT -7:00) Mountain Time (US &amp; Canada)
        </option>
        <option value="-06:00">
          (GMT -6:00) Central Time (US &amp; Canada), Mexico City
        </option>
        <option value="-05:00">
          (GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima
        </option>
        <option value="-04:50">(GMT -4:30) Caracas</option>
        <option value="-04:00">
          (GMT -4:00) Atlantic Time (Canada), Caracas, La Paz
        </option>
        <option value="-03:50">(GMT -3:30) Newfoundland</option>
        <option value="-03:00">
          (GMT -3:00) Brazil, Buenos Aires, Georgetown
        </option>
        <option value="-02:00">(GMT -2:00) Mid-Atlantic</option>
        <option value="-01:00">(GMT -1:00) Azores, Cape Verde Islands</option>
        <option value="+00:00">
          (GMT) Western Europe Time, London, Lisbon, Casablanca
        </option>
        <option value="+01:00">
          (GMT +1:00) Brussels, Copenhagen, Madrid, Paris
        </option>
        <option value="+02:00">(GMT +2:00) Kaliningrad, South Africa</option>
        <option value="+03:00">
          (GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg
        </option>
        <option value="+03:50">(GMT +3:30) Tehran</option>
        <option value="+04:00">
          (GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi
        </option>
        <option value="+04:50">(GMT +4:30) Kabul</option>
        <option value="+05:00">
          (GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent
        </option>
        <option value="+05:50">
          (GMT +5:30) Bombay, Calcutta, Madras, New Delhi
        </option>
        <option value="+05:75">(GMT +5:45) Kathmandu, Pokhara</option>
        <option value="+06:00">(GMT +6:00) Almaty, Dhaka, Colombo</option>
        <option value="+06:50">(GMT +6:30) Yangon, Mandalay</option>
        <option value="+07:00">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
        <option value="+08:00">
          (GMT +8:00) Beijing, Perth, Singapore, Hong Kong
        </option>
        <option value="+08:75">(GMT +8:45) Eucla</option>
        <option value="+09:00">
          (GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk
        </option>
        <option value="+09:50">(GMT +9:30) Adelaide, Darwin</option>
        <option value="+10:00">
          (GMT +10:00) Eastern Australia, Guam, Vladivostok
        </option>
        <option value="+10:50">(GMT +10:30) Lord Howe Island</option>
        <option value="+11:00">
          (GMT +11:00) Magadan, Solomon Islands, New Caledonia
        </option>
        <option value="+11:50">(GMT +11:30) Norfolk Island</option>
        <option value="+12:00">
          (GMT +12:00) Auckland, Wellington, Fiji, Kamchatka
        </option>
        <option value="+12:75">(GMT +12:45) Chatham Islands</option>
        <option value="+13:00">(GMT +13:00) Apia, Nukualofa</option>
        <option value="+14:00">(GMT +14:00) Line Islands, Tokelau</option>
      </select>
      {timezoneError && (
        <p className="validationError">This filed is required</p>
      )}
      <h3>Set your Avalibility</h3>
      <div className="avalibilityTimmingsDiv">
        {/* make it list */}
        {avalibilityTimings.map((element, index) => (
          <DaysAvalibilityDiv
            key={`daysIndex${index}`}
            parentIndex={index}
            daysData={element}
            handleMiniTimeAddition={handleMiniTimeAddition}
            handleMiniTimeDeletion={handleMiniTimeDeletion}
            handleMiniTimeChange={handleMiniTimeChange}
            handleDayAvalibility={handleDayAvalibility}
          />
        ))}
        {/* make it list */}
      </div>

      <div className="navigationButtonDiv">
        <button onClick={() => handleUpperLevelComponentData("Video", {})}>
          Back
        </button>
        <button onClick={handleDataSending}>Fininsh</button>
      </div>
    </article>
  );
}

function DaysAvalibilityDiv({
  daysData,
  parentIndex,
  handleMiniTimeAddition,
  handleMiniTimeDeletion,
  handleMiniTimeChange,
  handleDayAvalibility,
}) {
  // console.log(parentIndex);
  // console.log(daysData);

  return (
    <div className="inidividualTimingList">
      <div className="timingCheckBoxDiv">
        <span
          className={`checkboxConfirmationSvgSpan ${
            daysData.activeDay ? "acitveCheckbox" : ""
          }`}
          onClick={() => handleDayAvalibility(!daysData.activeDay, parentIndex)}
        >
          <svg
            height="9"
            viewBox="0 0 11 9"
            width="11"
            className="ageConfirmationSvg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 5.586L9.293.293l1.414 1.414L4 8.414.293 4.707l1.414-1.414z"></path>
          </svg>
        </span>
        <span>{daysData.dayName}</span>
      </div>
      <div>
        {daysData.activeDay &&
          daysData.timings.map((element, childernIndex) => (
            <div
              key={`${parentIndex}childernIndex${childernIndex}${
                parentIndex + childernIndex + Math.random()
              }`}
              className="individualTimingDaystime"
            >
              <select
                onChange={(e) =>
                  handleMiniTimeChange(
                    "timeStart",
                    e.target.value,
                    parentIndex,
                    childernIndex
                  )
                }
                value={element.timeStart}
              >
                <option value="00:00">00:00</option>
                <option value="00:30">00:30</option>
                <option value="01:00">01:00</option>
                <option value="01:30">01:30</option>
                <option value="02:00">02:00</option>
                <option value="02:30">02:30</option>
                <option value="03:00">03:00</option>
                <option value="03:30">03:30</option>
                <option value="04:00">04:00</option>
                <option value="04:30">04:30</option>
                <option value="05:00">05:00</option>
                <option value="05:30">05:30</option>
                <option value="06:00">06:00</option>
                <option value="06:30">06:30</option>
                <option value="07:00">07:00</option>
                <option value="07:30">07:30</option>
                <option value="08:00">08:00</option>
                <option value="08:30">08:30</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
                <option value="22:30">22:30</option>
                <option value="23:00">23:00</option>
                <option value="23:30">23:30</option>
                <option value="24:00">24:00</option>
                <option value="24:30">24:30</option>
              </select>
              <span>to</span>
              <select
                onChange={(e) =>
                  handleMiniTimeChange(
                    "timeEnd",
                    e.target.value,
                    parentIndex,
                    childernIndex
                  )
                }
                value={element.timeEnd}
              >
                <option value="00:00">00:00</option>
                <option value="00:30">00:30</option>
                <option value="01:00">01:00</option>
                <option value="01:30">01:30</option>
                <option value="02:00">02:00</option>
                <option value="02:30">02:30</option>
                <option value="03:00">03:00</option>
                <option value="03:30">03:30</option>
                <option value="04:00">04:00</option>
                <option value="04:30">04:30</option>
                <option value="05:00">05:00</option>
                <option value="05:30">05:30</option>
                <option value="06:00">06:00</option>
                <option value="06:30">06:30</option>
                <option value="07:00">07:00</option>
                <option value="07:30">07:30</option>
                <option value="08:00">08:00</option>
                <option value="08:30">08:30</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
                <option value="22:30">22:30</option>
                <option value="23:00">23:00</option>
                <option value="23:30">23:30</option>
                <option value="24:00">24:00</option>
                <option value="24:30">24:30</option>
              </select>
              {childernIndex > 0 ? (
                <button
                  className="timingsDeleteButton"
                  onClick={() =>
                    handleMiniTimeDeletion(parentIndex, childernIndex)
                  }
                >
                  <svg
                    height="15"
                    viewBox="0 0 12 15"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 15a3 3 0 0 1-3-3V5h10v7a3 3 0 0 1-3 3zM3 7v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7zm9-6v2H0V1h3l.707-.707A1 1 0 0 1 4.414 0h3.172a1 1 0 0 1 .707.293L9 1z"></path>
                  </svg>
                </button>
              ) : null}
            </div>
          ))}
        {daysData.activeDay && (
          <button
            className="additionButton"
            onClick={() => handleMiniTimeAddition(parentIndex)}
          >
            Add another time field
          </button>
        )}
      </div>
    </div>
  );
}
