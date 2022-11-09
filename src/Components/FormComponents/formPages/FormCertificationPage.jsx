import React, { useState } from "react";
import { useEffect } from "react";

export default function FormCertificationPage({
  upperLevelDataContainer,
  handleUpperLevelComponentData,
  seterrorModel,
}) {
  const [teachingCertificatesArray, setteachingCertificatesArray] = useState(
    upperLevelDataContainer.teachingCertificateDataArray
  );

  // useEffect(() => {
  //   console.log("teachingCertificatesArray", teachingCertificatesArray);
  // }, [teachingCertificatesArray]);

  const [teachingCertificateStatus, setTeachingCertificateStatus] = useState(
    upperLevelDataContainer.teachingCertificateStatus
  );

  const [formUploadingStatus, setformUploadingStatus] = useState("");

  // functions
  const handleNewDataChanges = (e, indexposition) => {
    const { name, value } = e.target;

    const newDataArray = [...teachingCertificatesArray];
    const newDataEntered = { ...newDataArray[indexposition], [name]: value };

    newDataArray[indexposition] = newDataEntered;

    setteachingCertificatesArray(newDataArray);
  };

  const handleImageFileUploadData = (indexposition, imageData) => {
    console.log(imageData);
    console.log(indexposition);
    const newDataArray = [...teachingCertificatesArray];
    const newDataEntered = {
      ...newDataArray[indexposition],
      certificateImageData: imageData,
    };

    newDataArray[indexposition] = newDataEntered;

    setteachingCertificatesArray(newDataArray);
  };

  const handleCertificateImageError = (indexPosition, dataStatus) => {
    const newDataArray = [...teachingCertificatesArray];
    newDataArray[indexPosition].certificateimageError = dataStatus;

    setteachingCertificatesArray(newDataArray);
  };

  const handleCertificationDeleltion = (indexPosition) => {
    // console.log(indexPosition);
    const newDataArray = teachingCertificatesArray.filter(
      (element, index) => index != indexPosition
    );
    setteachingCertificatesArray(newDataArray);
  };

  const handleYearEndDataUpdation = (startValue, endValue, indexposition) => {
    const newDataArray = [...teachingCertificatesArray];
    const newDataEntered = {
      ...newDataArray[indexposition],
      ["startStudyYear"]: startValue,
      ["endStudyYear"]: endValue,
    };

    newDataArray[indexposition] = newDataEntered;

    setteachingCertificatesArray(newDataArray);
  };

  const handleDataSending = async () => {
    // checking validations
    const internalErrorArray = [];
    let errorStatus = false;

    if (!teachingCertificateStatus) {
      for (let data of teachingCertificatesArray) {
        const internalDataObject = {};

        if (!data.subjectName) {
          internalDataObject.subjectNameError = "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.subjectNameError = "";
        }
        if (!data.certificateName) {
          internalDataObject.certificateNameError = "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.certificateNameError = "";
        }
        if (!data.certificateDescription) {
          internalDataObject.certificateDescriptionError =
            "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.certificateDescriptionError = "";
        }
        if (!data.certificateIssuer) {
          internalDataObject.certificateIssuerError = "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.certificateIssuerError = "";
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
      setteachingCertificatesArray(internalErrorArray);
    }

    if (!errorStatus) {
      console.log("validation passed");
      setformUploadingStatus("loading...");

      if (teachingCertificateStatus) {
        const fd = new FormData();
        fd.append("noTeachingCertificate", true);

        fetch("http://localhost:3030/api/formInformation/teachingCertificate", {
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
            console.log(data);
            const newData = JSON.parse(data);
            if (newData.message == "data received no teaching certificate") {
              console.log("running");
              handleUpperLevelComponentData("Education", {
                teachingCertificateStatus: true,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            seterrorModel(true);
          });
      } else {
        let passStatus = true;
        for (let [
          indexPosition,
          dataToSend,
        ] of teachingCertificatesArray.entries()) {
          const fd = new FormData();

          const certificateImageData = dataToSend.certificateImageData || {};

          delete dataToSend.certificateImageData;

          // console.log(dataToSend);
          // console.log(certificateImageData);

          fd.append("teachingCertificateData", JSON.stringify(dataToSend));
          fd.append("noTeachingCertificate", false);
          fd.append("elementIndexPosition", indexPosition);

          if (indexPosition == 0) {
            fd.append("firstCertificate", true);
          }

          if (certificateImageData.name) {
            console.log("sending certificate");
            fd.append(
              "certificateImage",
              certificateImageData,
              certificateImageData.name
            );
          }

          // new method
          try {
            const data = await fetch(
              "http://localhost:3030/api/formInformation/teachingCertificate",
              {
                method: "POST",
                body: fd,
              }
            );

            console.log(data);
            if (data.ok) {
              const dataReceived = await data.json();

              const newData = JSON.parse(dataReceived);
              console.log(newData);
              if (
                newData.message == "validation error" ||
                newData.message == "general error"
              ) {
                passStatus = false;
                const newDataArray = [...teachingCertificatesArray];
                const newDataErrorObject = {
                  ...newData.validationData,
                  certificateImageData: certificateImageData,
                };
                newDataArray[newData.elementIndexPosition] = newDataErrorObject;
                setteachingCertificatesArray(newDataArray);
              }
              if (newData.message == "data received") {
                const newDataArray = [...teachingCertificatesArray];
                const newDataObject = {
                  ...newDataArray[newData.elementIndexPosition],
                  certificateImage: newData.certificateImage,
                };
                newDataArray[newData.elementIndexPosition] = newDataObject;
                setteachingCertificatesArray(newDataArray);

                if (
                  passStatus &&
                  indexPosition + 1 == teachingCertificatesArray.length
                ) {
                  handleUpperLevelComponentData("Education", {
                    teachingCertificateDataArray: newDataArray,
                    teachingCertificateStatus: false,
                  });
                }
              }
            } else if (!data.ok) {
              throw new Error("unable to receive data");
            }
          } catch (err) {
            console.log(err);
            passStatus = false;
            seterrorModel(true);
          }

          // old method

          // fetch(
          //   "http://localhost:3030/api/formInformation/teachingCertificate",
          //   {
          //     method: "POST",
          //     body: fd,
          //   }
          // )
          //   .then((data) => {
          //     console.log(data);
          //     if (data.ok) {
          //       return data.json();
          //     }
          //     throw new Error("unable to receive data");
          //   })
          //   .then((data) => {
          //     console.log(data);
          //     const newData = JSON.parse(data);
          //     if (
          //       newData.message == "validation error" ||
          //       newData.message == "general error"
          //     ) {
          //       passStatus = false;
          //       const newDataArray = [...teachingCertificatesArray];
          //       const newDataErrorObject = {
          //         ...newData.validationData,
          //         certificateImageData: certificateImageData,
          //       };
          //       newDataArray[newData.elementIndexPosition] = newDataErrorObject;
          //       setteachingCertificatesArray(newDataArray);
          //     }
          //     if (newData.message == "data received") {
          //       const newDataArray = [...teachingCertificatesArray];
          //       const newDataObject = {
          //         ...newDataArray[newData.elementIndexPosition],
          //         certificateImage: newData.certificateImage,
          //       };
          //       newDataArray[newData.elementIndexPosition] = newDataObject;
          //       setteachingCertificatesArray(newDataArray);

          //       if (
          //         passStatus &&
          //         indexPosition + 1 == teachingCertificatesArray.length
          //       ) {
          //         handleUpperLevelComponentData("Education", {
          //           teachingCertificateDataArray: newDataArray,
          //           teachingCertificateStatus: false,
          //         });
          //       }
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //     passStatus = false;
          //     seterrorModel(true);
          //   });
        }
      }
    }
    setformUploadingStatus("");
  };

  return (
    <article className="formCertificationPage">
      <div className="formCertificationDiv">
        <h2>Teaching certification</h2>
        <p>
          Do you have teaching certificate? if so, describe them so enhance your
          profile credibility and get more students
        </p>
        <div>
          {teachingCertificatesArray.map((data, index) => (
            <TeachingCertificateDivs
              key={`certificateIndexKeys${index}`}
              parentData={data}
              handleParentData={handleNewDataChanges}
              handleImageParentData={handleImageFileUploadData}
              parentIndex={index}
              handleCertificationDeleltion={handleCertificationDeleltion}
              handleCertificateImageError={handleCertificateImageError}
              handleYearEndDataUpdation={handleYearEndDataUpdation}
            />
          ))}
        </div>
        <div>
          <button
            className="additionButton"
            onClick={() =>
              setteachingCertificatesArray((prevState) => [
                ...prevState,
                upperLevelDataContainer.certificateInitialData,
              ])
            }
          >
            Add another certificate
          </button>
        </div>
        <div className="flexDivRow">
          <span
            className={`ageConfirmationSvgSpan ${
              teachingCertificateStatus ? "acitveAgeCheckbox" : ""
            }`}
            onClick={() =>
              setTeachingCertificateStatus(!teachingCertificateStatus)
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
              setTeachingCertificateStatus(!teachingCertificateStatus)
            }
          >
            I don't have any teaching certificate yet
          </span>
        </div>
        <div className="navigationButtonDiv">
          <button onClick={() => handleUpperLevelComponentData("Photo")}>
            Back
          </button>
          <button onClick={handleDataSending}>next</button>
        </div>
        {formUploadingStatus && <p>{formUploadingStatus}</p>}
      </div>
    </article>
  );
}

function TeachingCertificateDivs({
  parentData,
  handleParentData,
  handleImageParentData,
  handleCertificationDeleltion,
  handleCertificateImageError,
  handleYearEndDataUpdation,
  parentIndex,
}) {
  // setting for study year end
  const dateArray = ["", "2000", "2001", "2002", "2003"];
  const [studyYearEndArray, setstudyYearEndArray] = useState(dateArray);

  const handleStudyYearStartData = (e) => {
    const newData = [...dateArray];

    const dataIndex = newData.indexOf(e.target.value);
    // console.log(newData.splice(dataIndex));
    const listToUpdate = newData.splice(dataIndex);
    setstudyYearEndArray(listToUpdate);
    handleYearEndDataUpdation(e.target.value, listToUpdate[0], parentIndex);
  };

  // handling image data
  const [imageData, setimageData] = useState(
    parentData.certificateImage
      ? `http://localhost:3030${parentData.certificateImage}`
      : ""
  );

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
      handleCertificateImageError(parentIndex, true);

      return;
    } else if (currentImage.size >= 20000000) {
      console.log("size checking");
      handleCertificateImageError(parentIndex, true);
      return;
    }

    handleCertificateImageError(parentIndex, false);

    const imageUrl = URL.createObjectURL(currentImage);
    // console.log(imageUrl);
    setimageData(imageUrl);

    // console.log(currentImage);
    console.log(parentIndex);
    handleImageParentData(parentIndex, currentImage);
  };

  return (
    <div className="teachingCertificateIndividualDiv">
      <div>
        <div className="flexDiv">
          <div className="flexDivRowSpaceBetween">
            <label htmlFor="randomId:subjecttaught5293000">Subject</label>
            <button
              className="certificatePageDeleteButton"
              onClick={() => handleCertificationDeleltion(parentIndex)}
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
          </div>
          <select
            name="subjectName"
            value={parentData.subjectName}
            onChange={(e) => handleParentData(e, parentIndex)}
            id="randomId:subjecttaught5293000"
          >
            <option value=""></option>
            <option value="python">Python</option>
            <option value="scala">Scala</option>
            <option value="java">Java</option>
            <option value="javascript">Javascript</option>
          </select>
          {parentData.subjectNameError && (
            <p className="validationError">{parentData.subjectNameError}</p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="radnomId:certopi395478">Certificate</label>
          <input
            type="text"
            id="radnomId:certopi395478"
            value={parentData.certificateName}
            name="certificateName"
            onChange={(e) => handleParentData(e, parentIndex)}
          />
          {parentData.certificateNameError && (
            <p className="validationError">{parentData.certificateNameError}</p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="radnomId:opi395478">Description</label>
          <input
            type="text"
            value={parentData.certificateDescription}
            name="certificateDescription"
            onChange={(e) => handleParentData(e, parentIndex)}
            id="radnomId:opi395478"
          />
          {parentData.certificateDescriptionError && (
            <p className="validationError">
              {parentData.certificateDescriptionError}
            </p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="radnomId:isued395478">Issued by</label>
          <input
            type="text"
            id="radnomId:isued395478"
            name="certificateIssuer"
            value={parentData.certificateIssuer}
            onChange={(e) => handleParentData(e, parentIndex)}
          />
          {parentData.certificateIssuerError && (
            <p className="validationError">
              {parentData.certificateIssuerError}
            </p>
          )}
        </div>
        <div className="selectDivEducationPage">
          <label>Years of study</label>
          <div className="slectSpanDivSeprator">
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
              disabled={parentData.startStudyYear == "" ? true : false}
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
            <div>
              <p className="bold">Get a "Certificate Verified" badge</p>
              <p>
                upload your certificate to increase the credibility of your
                profile
              </p>
            </div>
          </div>
          <div className="certificateUploadDiv">
            <div>
              <div>
                <label
                  className="fileUploadLabel"
                  htmlFor={`randomId:fityu419278pindex${parentIndex}`}
                >
                  Upload
                </label>
                <input
                  type="file"
                  id={`randomId:fityu419278pindex${parentIndex}`}
                  className="noDisplay"
                  onChange={handleCertificateImageData}
                  accept=".png,.jpg"
                />
              </div>
              <span
                className={
                  parentData.certificateimageError ? "validationError" : null
                }
              >
                JPG or PNG format. maximum size of 20MB
              </span>
            </div>
            {imageData && (
              <div className="certificateImageDiv">
                <div className="individualImageDiv">
                  <img src={imageData} alt="" />
                </div>
                <div>
                  <button
                    className="buttonStyling"
                    onClick={() => {
                      setimageData("");
                      handleCertificateImageError(parentIndex, false);
                      handleImageParentData(parentIndex, {});
                    }}
                  >
                    Clear Image
                  </button>
                </div>
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
