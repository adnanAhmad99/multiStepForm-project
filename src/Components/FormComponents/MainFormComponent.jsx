import { useEffect, useState } from "react";
import FormAboutPage from "./formPages/FormAboutPage";
import FormAvailabilityPage from "./formPages/FormAvailabilityPage";
import FormCertificationPage from "./formPages/FormCertificationPage";
import FormDescriptionPage from "./formPages/FormDescriptionPage";
import FormEducationPage from "./formPages/FormEducationPage";
import FormPhotoPage from "./formPages/FormPhotoPage";
import FormSubmitedPage from "./formPages/FormSubmitedPage";
import FormVideoPage from "./formPages/FormVideoPage";
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
  const [upperLevelDataContainer, setupperLevelDataContainer] = useState({});
  const [errorModel, seterrorModel] = useState(false);
  const [loading, setloading] = useState(false);

  // useEffect(() => {
  //   console.log("upperLevelDataContainer", upperLevelDataContainer);
  // }, [upperLevelDataContainer]);

  useEffect(() => {
    setloading(true);
    fetch("/api/formInformation")
      .then((data) => {
        // console.log(data);
        if (data.ok) {
          return data.json();
        }
        throw new Error("unable to receive data");
      })
      .then((data) => {
        // console.log(data);
        if (data.message == "data avalible") {
          setupperLevelDataContainer(data.customerData);
        } else {
          setupperLevelDataContainer({
            firstName: "",
            lastName: "",
            email: "",
            country: "",
            subjectTaught: "",
            teachingExperience: "",
            currentSituation: "",
            languagesData: [
              {
                languageValue: "EN",
                languageValueError: "",
                languageLevel: "choseLevel",
                languageLevelError: "",
              },
            ],
            phone: "",
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
            noTeachingCertificateStatus: false,
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
            educationCertificateInitialData: {
              universityName: "",
              universityNameError: "",
              degreeName: "",
              degreeNameError: "",
              degreeType: "",
              degreeTypeError: "",
              specialization: "",
              specializationError: "",
              startStudyYear: "",
              endStudyYear: "",
              studyYearError: "",
              degreeImageData: {},
              degreeimageError: false,
              generalErrors: "",
              educationCetificateImage: "",
            },
            noEducationCertificateStatus: false,
            educationCertificateArray: [
              {
                universityName: "",
                universityNameError: "",
                degreeName: "",
                degreeNameError: "",
                degreeType: "",
                degreeTypeError: "",
                specialization: "",
                specializationError: "",
                startStudyYear: "",
                endStudyYear: "",
                studyYearError: "",
                degreeImageData: {},
                degreeimageError: false,
                generalErrors: "",
                educationCetificateImage: "",
              },
            ],
            introductionVideo: "",
            formStepLevel: 1,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        seterrorModel(true);
      });
    setloading(false);
  }, []);

  // for testing purpose
  // useEffect(() => {
  //   setupperLevelDataContainer({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     country: "",
  //     subjectTaught: "",
  //     teachingExperience: "",
  //     currentSituation: "",
  //     languagesData: [
  //       {
  //         languageValue: "EN",
  //         languageValueError: "",
  //         languageLevel: "choseLevel",
  //         languageLevelError: "",
  //       },
  //     ],
  //     phone: "",
  //     ageConfirmtionError: false,
  //     profileImage: "",
  //     profileHeadline: "",
  //     profileDescription: "",
  //     profileExperienceDescription: "",
  //     motivationDescripition: "",
  //     certificateInitialData: {
  //       subjectName: "",
  //       subjectNameError: "",
  //       certificateName: "",
  //       certificateNameError: "",
  //       certificateDescription: "",
  //       certificateDescriptionError: "",
  //       certificateIssuer: "",
  //       certificateIssuerError: "",
  //       startStudyYear: "",
  //       endStudyYear: "",
  //       studyYearError: "",
  //       certificateImageData: {},
  //       certificateimageError: false,
  //       generalErrors: "",
  //       certificateImage: "",
  //     },
  //     noTeachingCertificateStatus: false,
  //     teachingCertificateDataArray: [
  //       {
  //         subjectName: "",
  //         subjectNameError: "",
  //         certificateName: "",
  //         certificateNameError: "",
  //         certificateDescription: "",
  //         certificateDescriptionError: "",
  //         certificateIssuer: "",
  //         certificateIssuerError: "",
  //         startStudyYear: "",
  //         endStudyYear: "",
  //         studyYearError: "",
  //         certificateImageData: {},
  //         certificateimageError: false,
  //         generalErrors: "",
  //         certificateImage: "",
  //       },
  //     ],
  //     timezone: "",
  //     avalibilityTimings: [
  //       {
  //         dayName: "Monday",
  //         activeDay: true,
  //         timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
  //       },
  //       {
  //         dayName: "Tuesday",
  //         activeDay: false,
  //         timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
  //       },
  //       {
  //         dayName: "Wednesday",
  //         activeDay: false,
  //         timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
  //       },
  //       {
  //         dayName: "Thursday",
  //         activeDay: false,
  //         timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
  //       },
  //       {
  //         dayName: "Friday",
  //         activeDay: false,
  //         timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
  //       },
  //       {
  //         dayName: "Saturday",
  //         activeDay: false,
  //         timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
  //       },
  //       {
  //         dayName: "Sunday",
  //         activeDay: false,
  //         timings: [{ timeStart: "09:00", timeEnd: "18:00" }],
  //       },
  //     ],
  //     educationCertificateInitialData: {
  //       universityName: "",
  //       universityNameError: "",
  //       degreeName: "",
  //       degreeNameError: "",
  //       degreeType: "",
  //       degreeTypeError: "",
  //       specialization: "",
  //       specializationError: "",
  //       startStudyYear: "",
  //       endStudyYear: "",
  //       studyYearError: "",
  //       degreeImageData: {},
  //       degreeimageError: false,
  //       generalErrors: "",
  //       educationCetificateImage: "",
  //     },
  //     noEducationCertificateStatus: false,
  //     educationCertificateArray: [
  //       {
  //         universityName: "",
  //         universityNameError: "",
  //         degreeName: "",
  //         degreeNameError: "",
  //         degreeType: "",
  //         degreeTypeError: "",
  //         specialization: "",
  //         specializationError: "",
  //         startStudyYear: "",
  //         endStudyYear: "",
  //         studyYearError: "",
  //         degreeImageData: {},
  //         degreeimageError: false,
  //         generalErrors: "",
  //         educationCetificateImage: "",
  //       },
  //     ],
  //     introductionVideo: "",
  //     formStepLevel: 7,
  //   });
  // }, []);

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

  return (
    <article className="mainFormArticle">
      {errorModel && (
        <div className="errorModelContainer">
          <div className="errorModel">
            <p>Something went wrong </p>
            <p>please try later...</p>
            <button
              className="buttonStyling"
              onClick={() => seterrorModel(false)}
            >
              Ok
            </button>
          </div>
        </div>
      )}
      {Object.keys(upperLevelDataContainer).length && (
        <>
          <div className="mainProgressCountersDivs">
            {pagesArray.map((element, index) => (
              <UpperProgressCounter
                formPageNumber={index + 1}
                currentSteplevel={upperLevelDataContainer.formStepLevel}
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
                seterrorModel={seterrorModel}
                upperLevelDataContainer={upperLevelDataContainer}
                handleUpperLevelComponentData={handleUpperLevelComponentData}
              />
            ) : null}
            {mainProgressController == "Photo" ? (
              <FormPhotoPage
                seterrorModel={seterrorModel}
                upperLevelDataContainer={upperLevelDataContainer}
                handleUpperLevelComponentData={handleUpperLevelComponentData}
              />
            ) : null}
            {mainProgressController == "Certification" ? (
              <FormCertificationPage
                seterrorModel={seterrorModel}
                upperLevelDataContainer={upperLevelDataContainer}
                handleUpperLevelComponentData={handleUpperLevelComponentData}
              />
            ) : null}
            {mainProgressController == "Education" ? (
              <FormEducationPage
                seterrorModel={seterrorModel}
                upperLevelDataContainer={upperLevelDataContainer}
                handleUpperLevelComponentData={handleUpperLevelComponentData}
              />
            ) : null}
            {mainProgressController == "Description" ? (
              <FormDescriptionPage
                seterrorModel={seterrorModel}
                upperLevelDataContainer={upperLevelDataContainer}
                handleUpperLevelComponentData={handleUpperLevelComponentData}
              />
            ) : null}
            {mainProgressController == "Video" ? (
              <FormVideoPage
                seterrorModel={seterrorModel}
                upperLevelDataContainer={upperLevelDataContainer}
                handleUpperLevelComponentData={handleUpperLevelComponentData}
              />
            ) : null}
            {mainProgressController == "Availability" ? (
              <FormAvailabilityPage
                seterrorModel={seterrorModel}
                upperLevelDataContainer={upperLevelDataContainer}
                handleUpperLevelComponentData={handleUpperLevelComponentData}
              />
            ) : null}
            {mainProgressController == "Submitted" ? (
              <FormSubmitedPage />
            ) : null}
          </div>
        </>
      )}
      {loading && <p>Please wait. Data loading... </p>}
    </article>
  );
}
