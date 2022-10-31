import React, { useState } from "react";

export default function FormEducationPage() {
  const initialData = {
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
  };
  const [educationCertificatesArray, seteducationCertificatesArray] = useState([
    initialData,
  ]);
  const [educationCertificateStatus, setEducationCertificateStatus] =
    useState(false);

  const [formUploadingStatus, setformUploadingStatus] = useState("");

  // functions
  const handleNewDataChanges = (e, indexposition) => {
    const { name, value } = e.target;

    const newDataArray = [...educationCertificatesArray];
    const newDataEntered = { ...newDataArray[indexposition], [name]: value };

    newDataArray[indexposition] = newDataEntered;

    seteducationCertificatesArray(newDataArray);
  };

  const handleImageFileUploadData = (indexposition, imageData) => {
    console.log(imageData);
    const newDataArray = [...educationCertificatesArray];
    const newDataEntered = {
      ...newDataArray[indexposition],
      degreeImageData: imageData,
    };

    newDataArray[indexposition] = newDataEntered;

    seteducationCertificatesArray(newDataArray);
  };

  const handleEducationImageError = (indexPosition, dataStatus) => {
    const newDataArray = [...educationCertificatesArray];
    newDataArray[indexPosition].degreeimageError = dataStatus;

    seteducationCertificatesArray(newDataArray);
  };

  const handleEducationCertificateDeleltion = (indexPosition) => {
    // console.log(indexPosition);
    const newDataArray = educationCertificatesArray.filter(
      (element, index) => index != indexPosition
    );
    seteducationCertificatesArray(newDataArray);
  };

  const handleDataSending = () => {
    // checking validations
    const internalErrorArray = [];
    let errorStatus = false;

    if (!educationCertificateStatus) {
      for (let data of educationCertificatesArray) {
        const internalDataObject = {};

        if (!data.universityName) {
          internalDataObject.universityNameError = "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.universityNameError = "";
        }
        if (!data.degreeName) {
          internalDataObject.degreeNameError = "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.degreeNameError = "";
        }
        if (!data.degreeType) {
          internalDataObject.degreeTypeError = "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.degreeTypeError = "";
        }
        if (!data.specialization) {
          internalDataObject.specializationError = "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.specializationError = "";
        }
        if (!data.startStudyYear || !data.endStudyYear) {
          internalDataObject.studyYearError = "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.studyYearError = "";
        }

        internalErrorArray.push({ ...data, ...internalDataObject });
      }

      // console.log(internalErrorArray);
      seteducationCertificatesArray(internalErrorArray);
    }

    if (!errorStatus) {
      console.log("validation passed");
      setformUploadingStatus("loading...");

      if (educationCertificateStatus) {
        const fd = new FormData();
        fd.append("noEducationCertificate", true);

        fetch(
          "http://localhost:3030/api/formInformation/educationCertificate",
          {
            method: "POST",
            body: fd,
          }
        )
          .then((data) => {
            if (data.ok) {
              return data.json();
            }
            throw new Error("unable to receive data");
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        for (let [
          indexPosition,
          dataToSend,
        ] of educationCertificatesArray.entries()) {
          const fd = new FormData();

          const degreeImageData = dataToSend.degreeImageData;

          delete dataToSend.degreeImageData;

          // console.log(dataToSend);
          // console.log(degreeImageData);

          fd.append("educationCertificateData", JSON.stringify(dataToSend));
          fd.append("noEducationCertificate", false);
          fd.append("elementIndexPosition", indexPosition);

          if (indexPosition == 0) {
            fd.append("firstCertificate", true);
          }

          // console.log(Object.keys(degreeImageData).length);
          // console.log(!degreeImageData.name);
          // console.log(typeof degreeImageData);
          // console.log(degreeImageData);
          console.log(degreeImageData);
          if (degreeImageData.name) {
            console.log("sending certificate");
            fd.append(
              "certificateImage",
              degreeImageData,
              degreeImageData.name
            );
          }

          fetch(
            "http://localhost:3030/api/formInformation/educationCertificate",
            {
              method: "POST",
              body: fd,
            }
          )
            .then((data) => {
              if (data.ok) {
                return data.json();
              }
              throw new Error("unable to receive data");
            })
            .then((data) => {
              console.log(data);
              const newData = JSON.parse(data);
              if (
                newData.message == "validation error" ||
                newData.message == "general error"
              ) {
                const newDataArray = [...educationCertificatesArray];
                const newDataErrorObject = {
                  ...newData.validationData,
                  degreeImageData: degreeImageData,
                };
                newDataArray[newData.elementIndexPosition] = newDataErrorObject;
                seteducationCertificatesArray(newDataArray);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
    setformUploadingStatus("");
  };

  return (
    <article className="formCertificationPage">
      <h2>Education </h2>
      <p>
        Tell the students more about the higher education that you've completed
        or are working on
      </p>
      <div>
        {educationCertificatesArray.map((data, index) => (
          <EducationCertificateDivs
            key={`certificateIndexKey${index}`}
            parentData={data}
            handleParentData={handleNewDataChanges}
            handleImageParentData={handleImageFileUploadData}
            parentIndex={index}
            handleEducationCertificateDeleltion={
              handleEducationCertificateDeleltion
            }
            handleEducationImageError={handleEducationImageError}
          />
        ))}
      </div>
      <div>
        <button
          onClick={() =>
            seteducationCertificatesArray((prevState) => [
              ...prevState,
              initialData,
            ])
          }
        >
          Add another certificate
        </button>
      </div>
      <div className="flexDivRow">
        <span
          className={`ageConfirmationSvgSpan ${
            educationCertificateStatus ? "acitveAgeCheckbox" : ""
          }`}
          onClick={() =>
            setEducationCertificateStatus(!educationCertificateStatus)
          }
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
        <span
          onClick={() =>
            setEducationCertificateStatus(!educationCertificateStatus)
          }
        >
          I don't have any teaching certificate yet
        </span>
      </div>
      <div>
        <button onClick={handleDataSending}>next</button>
      </div>
      {formUploadingStatus && <p>{formUploadingStatus}</p>}
    </article>
  );
}

function EducationCertificateDivs({
  parentData,
  handleParentData,
  handleImageParentData,
  handleEducationCertificateDeleltion,
  handleEducationImageError,
  parentIndex,
}) {
  // setting for study year end
  const dateArray = ["2000", "2001", "2002", "2003"];
  const [studyYearEndArray, setstudyYearEndArray] = useState(dateArray);

  const handleStudyYearStartData = (e) => {
    const newData = [...dateArray];

    const dataIndex = newData.indexOf(e.target.value);
    // console.log(newData.splice(dataIndex));
    setstudyYearEndArray(newData.splice(dataIndex));
    handleParentData(e, parentIndex);
  };

  // handling image data
  const [imageData, setimageData] = useState("");

  const handleCertificateImageData = (e) => {
    const { files } = e.target;
    if (files && !files.length) {
      return;
    }

    const currentImage = files[0];
    const acceptedExt = ["image/png", "image/jpeg", "image/jpg"];

    // image validation checking
    if (!acceptedExt.includes(currentImage.type)) {
      console.log("type checking");
      handleEducationImageError(parentIndex, true);

      return;
    } else if (currentImage.size >= 20000000) {
      console.log("size checking");
      handleEducationImageError(parentIndex, true);
      return;
    }

    handleEducationImageError(parentIndex, false);

    const imageUrl = URL.createObjectURL(currentImage);
    // console.log(imageUrl);
    setimageData(imageUrl);

    // console.log(currentImage);
    handleImageParentData(parentIndex, currentImage);
  };

  return (
    <div className="teachingCertificateIndividualDiv">
      <button onClick={() => handleEducationCertificateDeleltion(parentIndex)}>
        Delete
      </button>
      <div>
        <div className="flexDiv">
          <label htmlFor="radnomId:opi395478ef">University</label>
          <input
            type="text"
            id="radnomId:opi395478ef"
            value={parentData.universityName}
            name="universityName"
            onChange={(e) => handleParentData(e, parentIndex)}
          />
          {parentData.universityNameError && (
            <p className="validationError">{parentData.universityNameError}</p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="radnomId:opi3478ef">Degree</label>
          <input
            type="text"
            id="radnomId:opi3478ef"
            value={parentData.degreeName}
            name="degreeName"
            onChange={(e) => handleParentData(e, parentIndex)}
          />
          {parentData.degreeNameError && (
            <p className="validationError">{parentData.degreeNameError}</p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="randomId:degreeT5293000">Degree Type</label>
          <select
            name="degreeType"
            value={parentData.degreeType}
            onChange={(e) => handleParentData(e, parentIndex)}
            id="randomId:degreeT5293000"
          >
            <option value=""></option>
            <option value="TPOL">TPOL</option>
            <option value="TPL">TPL</option>
          </select>
          {parentData.degreeTypeError && (
            <p className="validationError">{parentData.degreeTypeError}</p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="radnomId:spopi395478">Specialization</label>
          <input
            type="text"
            id="radnomId:spopi395478"
            name="specialization"
            value={parentData.specialization}
            onChange={(e) => handleParentData(e, parentIndex)}
          />
          {parentData.specializationError && (
            <p className="validationError">{parentData.specializationError}</p>
          )}
        </div>
        <div className="selectDivEducationPage">
          <label>Years of study</label>
          <div>
            <select
              placeholder="Select"
              name="startStudyYear"
              value={parentData.startStudyYear}
              onChange={handleStudyYearStartData}
            >
              {dateArray.map((element, index) => (
                <option key={`yearStartArrayIndex${index}`} value={element}>
                  {element}
                </option>
              ))}
            </select>
            <span className="dashAdderSpan"></span>
            <select
              name="endStudyYear"
              value={parentData.endStudyYear}
              onChange={(e) => handleParentData(e, parentIndex)}
              disabled={parentData.startStudyYear ? false : true}
            >
              {studyYearEndArray.map((element, index) => (
                <option key={`yearEndArrayIndex${index}`} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
          {parentData.studyYearError && (
            <p className="validationError">{parentData.studyYearError}</p>
          )}
        </div>
        <div className="certificateImageAdditionDiv">
          <div className="certificateInfoDiv">
            <div className="certificateInfoImageSvgDiv">image</div>
            <div>
              <p className="bold">Get a "Diploma Verified" badge</p>
              <p>
                upload your diploma to boost your credibility. Our team will
                review it and add the badge to your profile. Once reviewed your
                files will be deleted
              </p>
            </div>
          </div>
          <div className="certificateUploadDiv">
            <div>
              <div>
                <label
                  style={{ border: "1px solid black ", cursor: "pointer" }}
                  htmlFor="randomId:fityu419278fs"
                >
                  Upload
                </label>
                <input
                  type="file"
                  id="randomId:fityu419278fs"
                  className="noDisplay"
                  onChange={handleCertificateImageData}
                  accept=".png,.jpg"
                />
              </div>
              <span
                className={
                  parentData.degreeimageError ? "validationError" : null
                }
              >
                JPG or PNG format. maximum size of 20MB
              </span>
            </div>
            {imageData && (
              <div className="certificateImageDiv">
                <img src={imageData} alt="image go here" />
                <button
                  onClick={() => {
                    setimageData("");
                    handleEducationImageError(parentIndex, false);
                    handleImageParentData(parentIndex, {});
                  }}
                >
                  clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {parentData.generalErrors && (
        <p className="validationError">{parentData.generalErrors}</p>
      )}
    </div>
  );
}
