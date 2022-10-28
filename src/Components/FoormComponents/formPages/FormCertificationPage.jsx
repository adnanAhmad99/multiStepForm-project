import React, { useState } from "react";

export default function FormCertificationPage() {
  const initialData = {
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
  };
  const [teachingCertificatesArray, setteachingCertificatesArray] = useState([
    initialData,
  ]);
  const [teachingCertificateStatus, setTeachingCertificateStatus] =
    useState(false);

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

  const handleDataSending = () => {
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
          errorStatus = false;
        }
        if (!data.certificateName) {
          internalDataObject.certificateNameError = "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.certificateNameError = "";
          errorStatus = false;
        }
        if (!data.certificateDescription) {
          internalDataObject.certificateDescriptionError =
            "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.certificateDescriptionError = "";
          errorStatus = false;
        }
        if (!data.certificateIssuer) {
          internalDataObject.certificateIssuerError = "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.certificateIssuerError = "";
          errorStatus = false;
        }
        if (!data.startStudyYear || !data.endStudyYear) {
          internalDataObject.studyYearError = "This field is required";
          errorStatus = true;
        } else {
          internalDataObject.studyYearError = "";
          errorStatus = false;
        }

        internalErrorArray.push({ ...data, ...internalDataObject });
      }

      // console.log(internalErrorArray);
      setteachingCertificatesArray(internalErrorArray);
    }

    if (!errorStatus) {
      console.log("validation passed");

      if (teachingCertificateStatus) {
        const fd = new FormData();
        fd.append("noEducationCertificate", true);

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
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        for (let [
          indexPosition,
          dataToSend,
        ] of teachingCertificatesArray.entries()) {
          const fd = new FormData();

          const certificateImageData = dataToSend.certificateImageData;

          delete dataToSend.certificateImageData;

          // console.log(dataToSend);
          // console.log(certificateImageData);

          fd.append("educationCertificateData", JSON.stringify(dataToSend));
          fd.append("noEducationCertificate", false);
          fd.append("elementIndexPosition", indexPosition);

          // console.log(Object.keys(certificateImageData).length);
          // console.log(!certificateImageData.name);
          // console.log(typeof certificateImageData);
          // console.log(certificateImageData);

          if (certificateImageData.name) {
            console.log("sending certificate");
            fd.append(
              "certificateImage",
              certificateImageData,
              certificateImageData.name
            );
          }

          fetch(
            "http://localhost:3030/api/formInformation/teachingCertificate",
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
              if (newData.message == "validation error") {
                const newDataArray = [...teachingCertificatesArray];
                const newDataErrorObject = newData.validationData;
                newDataArray[newData.elementIndexPosition] = newDataErrorObject;
                setteachingCertificatesArray(newDataArray);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  };

  return (
    <article className="formCertificationPage">
      <h2>Teaching certification</h2>
      <p>
        Do you have teaching certificate? if so, describe them so enhance your
        profile credibility and get more students
      </p>
      <div>
        {teachingCertificatesArray.map((data, index) => (
          <TeachingCertificateDivs
            key={`certificateIndexKey${index}`}
            parentData={data}
            handleParentData={handleNewDataChanges}
            handleImageParentData={handleImageFileUploadData}
            parentIndex={index}
            handleCertificationDeleltion={handleCertificationDeleltion}
            handleCertificateImageError={handleCertificateImageError}
          />
        ))}
      </div>
      <div>
        <button
          onClick={() =>
            setteachingCertificatesArray((prevState) => [
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
      <div>
        <button onClick={handleDataSending}>next</button>
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
    handleImageParentData(parentIndex, currentImage);
  };

  return (
    <div className="teachingCertificateIndividualDiv">
      <button onClick={() => handleCertificationDeleltion(parentIndex)}>
        Delete
      </button>
      <div>
        <div className="flexDiv">
          <label htmlFor="randomId:subjecttaught5293000">Subject</label>
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
          <label htmlFor="radnomId:opi395478">Certificate</label>
          <input
            type="text"
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
          />
          {parentData.certificateDescriptionError && (
            <p className="validationError">
              {parentData.certificateDescriptionError}
            </p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="radnomId:opi395478">Issued by</label>
          <input
            type="text"
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
                  style={{ border: "1px solid black ", cursor: "pointer" }}
                  htmlFor="randomId:fityu419278"
                >
                  Upload
                </label>
                <input
                  type="file"
                  id="randomId:fityu419278"
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
                <img src={imageData} alt="image go here" />
                <button
                  onClick={() => {
                    setimageData("");
                    handleCertificateImageError(parentIndex, false);
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
    </div>
  );
}
