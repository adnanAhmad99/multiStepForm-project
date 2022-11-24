import React from "react";

export default function UpperProgressCounter({
  formPageNumber,
  currentSteplevel,
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
        className={`progressNavbarContainer ${
          currentSteplevel < formPageNumber ? "noPointer" : ""
        }`}
        onClick={() => {
          if (currentSteplevel < formPageNumber) return;
          setmainProgressController(formPageName);
        }}
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
