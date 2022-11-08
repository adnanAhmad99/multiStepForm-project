import React, { useState } from "react";

export default function FormDescriptionPage({
  upperLevelDataContainer,
  handleUpperLevelComponentData,
  seterrorModel,
}) {
  // states
  const [mainInternalDataObject, setmainInternalDataObject] = useState({
    profileHeadline: upperLevelDataContainer.profileHeadline,
    profileDescription: upperLevelDataContainer.profileDescription,
    profileExperienceDescription:
      upperLevelDataContainer.profileExperienceDescription,
    motivationDescripition: upperLevelDataContainer.motivationDescripition,
  });
  const [validationError, setvalidationError] = useState({
    profileHeadlineError: "",
    profileDescriptionError: "",
    profileExperienceDescriptionError: "",
    motivationDescripitionError: "",
  });

  const [characterCounter, setcharacterCounter] = useState(0);

  // functions

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    const newInternalDataObject = { ...mainInternalDataObject, [name]: value };

    const wordCounter =
      newInternalDataObject.motivationDescripition.length +
      newInternalDataObject.profileDescription.length +
      newInternalDataObject.profileExperienceDescription.length;

    setmainInternalDataObject(newInternalDataObject);
    setcharacterCounter(wordCounter);
  };

  const handleDataSending = () => {
    // validationChecking
    const internalErrorObject = {};
    if (!mainInternalDataObject.profileHeadline) {
      internalErrorObject.profileHeadlineError = "This field is required";
    }
    if (!mainInternalDataObject.profileDescription) {
      internalErrorObject.profileDescriptionError = "This field is required";
    }
    if (!mainInternalDataObject.profileExperienceDescription) {
      internalErrorObject.profileExperienceDescriptionError =
        "This field is required";
    }
    if (!mainInternalDataObject.motivationDescripition) {
      internalErrorObject.motivationDescripitionError =
        "This field is required";
    }
    if (characterCounter < 400) {
      internalErrorObject.couterError = true;
    } else if (characterCounter >= 400 && internalErrorObject.couterError) {
      internalErrorObject.couterError = false;
    }

    console.log(internalErrorObject);
    setvalidationError(internalErrorObject);

    if (!Object.keys(internalErrorObject).length) {
      console.log("validation passed");

      const fd = new FormData();

      for (let [key, value] of Object.entries(mainInternalDataObject)) {
        fd.append(key, value);
      }

      fetch("http://localhost:3030/api/formInformation/discription", {
        method: "POST",
        body: fd,
      })
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("unable to receive data");
        })
        .then((data) => {
          const newData = JSON.parse(data);
          console.log(newData);
          if (newData.message == "validation error") {
            setvalidationError(newData.validationError);
          }
          if (newData.message == "data received") {
            // console.log("passed");
            handleUpperLevelComponentData("Video", mainInternalDataObject);
          }
        })
        .catch((err) => {
          console.log(err);
          seterrorModel(true);
        });
    }
  };

  return (
    <article className="descriptonFormPageArticle">
      <h2>Profile Description</h2>
      <p>Create a profile headline and description</p>
      <h3>Description for English-speaking students</h3>
      <div className="descriptionPageProfileInfoDiv">
        <div className="profileImageDiv">
          <img
            // src={`http://localhost:3030${upperLevelDataContainer.profileImage}`}
            src={`http://localhost:3030/profilePictures/profile-1667396730143-2img.jpg`}
            alt=""
          />
        </div>
        <div className="profileInfo">
          <h4>
            {/* {upperLevelDataContainer.firstName}{" "}
            {upperLevelDataContainer.lastName} */}
            adsfd asdfadf
          </h4>
          <input
            type="text"
            name="profileHeadline"
            placeholder="here write your profile headline"
            value={mainInternalDataObject.profileHeadline}
            onChange={handleValueChange}
          />
          <p>For example "Certificate tutors with 5 years of experience"</p>
          {validationError.profileHeadlineError && (
            <p className="validationError">
              {validationError.profileHeadlineError}
            </p>
          )}
        </div>
      </div>

      <div className="flexDiv descriptionDivs">
        <label htmlFor="randomId:4892787hae">
          Introduce yourself and share briefly about your interests:
        </label>
        <textarea
          name="profileDescription"
          value={mainInternalDataObject.profileDescription}
          id="randomId:4892787hae"
          cols="30"
          rows="10"
          placeholder="Hello, my name is ... and i'm form ..."
          onChange={handleValueChange}
        ></textarea>
        {validationError.profileDescriptionError && (
          <p className="validationError">
            {validationError.profileDescriptionError}
          </p>
        )}
      </div>
      <div className="flexDiv descriptionDivs">
        <label htmlFor="randomID:ts3623st5">
          Describe your teaching ,experience , cerification and methodology:
        </label>
        <textarea
          name="profileExperienceDescription"
          value={mainInternalDataObject.profileExperienceDescription}
          id="randomID:ts3623st5"
          cols="30"
          rows="10"
          placeholder="I have 5 years of teaching experience. I'm TEFL certified and my classes are ..."
          onChange={handleValueChange}
        ></textarea>
        {validationError.profileExperienceDescriptionError && (
          <p className="validationError">
            {validationError.profileExperienceDescriptionError}
          </p>
        )}
      </div>
      <div className="flexDiv descriptionDivs">
        <label htmlFor="randomID:ts36238275">
          Motivate students to book a trail lesson with you:
        </label>
        <textarea
          name="motivationDescripition"
          value={mainInternalDataObject.motivationDescripition}
          id="randomID:ts36238275"
          cols="30"
          rows="10"
          placeholder="Book a trial lesson with me so we can discuss your goals and how i can help you reach them."
          onChange={handleValueChange}
        ></textarea>
        {validationError.motivationDescripitionError && (
          <p className="validationError">
            {validationError.motivationDescripitionError}
          </p>
        )}
      </div>
      <div className="counterMainDiv">
        <p className={validationError.couterError ? "validationError" : null}>
          Minimum 400 characters
        </p>
        <p>
          Current input Characters:
          <span className="makeBold">{characterCounter}</span>
        </p>
      </div>
      <div className="navigationButtonDiv">
        <button onClick={() => handleUpperLevelComponentData("Education")}>
          Back
        </button>
        <button onClick={handleDataSending}>Next</button>
      </div>
    </article>
  );
}
