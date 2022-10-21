import React from "react";

export default function UpperProgressCounter({
  formPageNumber,
  formPageName,
  mainProgressController,
  setmainProgressController,
}) {
  return (
    <div className="individualProgressCounterDiv">
      <span className={formPageNumber == 1 ? "noDisplay" : "arrowSpan"}>
        <span></span>
        <span></span>
      </span>
      <div
        className="progressNavbarContainer"
        onClick={() => setmainProgressController(formPageName)}
      >
        <span
          className={
            mainProgressController == formPageName
              ? "numberSpan activeProgressBarNumber"
              : "numberSpan"
          }
        >
          {formPageNumber}
        </span>
        <span
          className={
            mainProgressController == formPageName
              ? "progressBarPageName activeProgressBarpage"
              : "progressBarPageName"
          }
        >
          {formPageName}
        </span>
      </div>
    </div>
  );
}
