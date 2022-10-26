import { useEffect, useState } from "react";
import FormAboutPage from "./formPages/FormAboutPage";
import FormAvailabilityPage from "./formPages/FormAvailabilityPage";
import FormCertificationPage from "./formPages/FormCertificationPage";
import FormDescriptionPage from "./formPages/FormDescriptionPage";
import FormDiscountPage from "./formPages/FormDiscountPage";
import FormEducationPage from "./formPages/FormEducationPage";
import FormPhotoPage from "./formPages/FormPhotoPage";
import FormPricingPage from "./formPages/FormPricingPage";
import FormVideoPage from "./formPages/FormVideoPAge";
import "./formStyle.css";
import UpperProgressCounter from "./UpperProgressCounter";

export default function MainFormComponent() {
  //count the progress of form
  const pagesArray = [
    "About",
    "Photo",
    "Certification",
    "Education",
    "Description",
    "Video",
    "Availability",
  ];
  const [mainProgressController, setmainProgressController] = useState("About");
  const [upperLevelDataContainer, setupperLevelDataContainer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    subjectTaught: "",
    teachingExperience: "",
    currentSituation: "",
    ageConfirmtionError: false,
  });

  const handleUpperLevelComponentData = (
    progressLevel,
    upperLevelData = {}
  ) => {
    setmainProgressController(progressLevel);
    if (!upperLevelData) return;
    setupperLevelDataContainer((prevData) => ({
      ...prevData,
      ...upperLevelData,
    }));
  };

  // useEffect(() => {
  //   console.log(upperLevelDataContainer);
  // }, [upperLevelDataContainer]);

  return (
    <article className="mainFormArticle">
      <div className="mainProgressCountersDivs">
        {pagesArray.map((element, index) => (
          <UpperProgressCounter
            formPageNumber={index + 1}
            formPageName={element}
            key={`formProgressNumber${index}`}
            mainProgressController={mainProgressController}
            setmainProgressController={setmainProgressController}
          />
        ))}
      </div>
      <div className="mainFormBody">
        {mainProgressController == "About" ? (
          <FormAboutPage
            upperLevelDataContainer={upperLevelDataContainer}
            handleUpperLevelComponentData={handleUpperLevelComponentData}
          />
        ) : null}
        {mainProgressController == "Photo" ? (
          <FormPhotoPage
            upperLevelDataContainer={upperLevelDataContainer}
            handleUpperLevelComponentData={handleUpperLevelComponentData}
          />
        ) : null}
        {mainProgressController == "Certification" ? (
          <FormCertificationPage
            upperLevelDataContainer={upperLevelDataContainer}
            handleUpperLevelComponentData={handleUpperLevelComponentData}
          />
        ) : null}
        {mainProgressController == "Education" ? (
          <FormEducationPage
            upperLevelDataContainer={upperLevelDataContainer}
            handleUpperLevelComponentData={handleUpperLevelComponentData}
          />
        ) : null}
        {mainProgressController == "Description" ? (
          <FormDescriptionPage
            upperLevelDataContainer={upperLevelDataContainer}
            handleUpperLevelComponentData={handleUpperLevelComponentData}
          />
        ) : null}
        {mainProgressController == "Video" ? (
          <FormVideoPage
            upperLevelDataContainer={upperLevelDataContainer}
            handleUpperLevelComponentData={handleUpperLevelComponentData}
          />
        ) : null}
        {mainProgressController == "Availability" ? (
          <FormAvailabilityPage
            upperLevelDataContainer={upperLevelDataContainer}
            handleUpperLevelComponentData={handleUpperLevelComponentData}
          />
        ) : null}
      </div>
    </article>
  );
}
