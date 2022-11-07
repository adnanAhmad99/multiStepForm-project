import { useEffect, useState } from "react";
import FormAboutPage from "./formPages/FormAboutPage";
import FormAvailabilityPage from "./formPages/FormAvailabilityPage";
import FormCertificationPage from "./formPages/FormCertificationPage";
import FormDescriptionPage from "./formPages/FormDescriptionPage";
import FormEducationPage from "./formPages/FormEducationPage";
import FormPhotoPage from "./formPages/FormPhotoPage";
import FormSubmitedPage from "./formPages/FormSubmitedPage";
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
    profileImage: "",
    profileHeadline: "",
    profileDescription: "",
    profileExperienceDescription: "",
    motivationDescripition: "",
    certificateInitialData: {
      subjectName: "",
      subjectNameError: "",
      certificateName: "",
      certificateNameError: "",
      certificateDescription: "",
      certificateDescriptionError: "",
      certificateIssuer: "",
      certificateIssuerError: "",
      startStudyYear: "",
      endStudyYear: "",
      studyYearError: "",
      certificateImageData: {},
      certificateimageError: false,
      generalErrors: "",
      certificateImage: "",
    },
    teachingCertificateStatus: false,
    teachingCertificateDataArray: [
      {
        subjectName: "",
        subjectNameError: "",
        certificateName: "",
        certificateNameError: "",
        certificateDescription: "",
        certificateDescriptionError: "",
        certificateIssuer: "",
        certificateIssuerError: "",
        startStudyYear: "",
        endStudyYear: "",
        studyYearError: "",
        certificateImageData: {},
        certificateimageError: false,
        generalErrors: "",
        certificateImage: "",
      },
    ],
    timezone: "",
    avalibilityTimings: [
      {
        dayName: "Monday",
        activeDay: true,
        timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
      },
      {
        dayName: "Tuesday",
        activeDay: false,
        timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
      },
      {
        dayName: "Wednesday",
        activeDay: false,
        timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
      },
      {
        dayName: "Thursday",
        activeDay: false,
        timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
      },
      {
        dayName: "Friday",
        activeDay: false,
        timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
      },
      {
        dayName: "Saturday",
        activeDay: false,
        timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
      },
      {
        dayName: "Sunday",
        activeDay: false,
        timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
      },
    ],
  });

  useEffect(() => {
    console.log("upperLevelDataContainer", upperLevelDataContainer);
  }, [upperLevelDataContainer]);

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
        {mainProgressController == "Submitted" ? <FormSubmitedPage /> : null}
      </div>
    </article>
  );
}
