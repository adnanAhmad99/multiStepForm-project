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
    certificateImageData: "",
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
  const handleImageFileUploadData = (e, indexposition, imageData) => {
    console.log(e.target);
    console.log(indexposition);
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
      const fd = new FormData();

      if (!teachingCertificateStatus) {
        fd.append("noEducationCertificate", true);
      } else {
        fd.append("educationCertificateData", teachingCertificatesArray);
        fd.append("noEducationCertificate", false);
      }

      // fetch("http://localhost:3030/", {
      //   method: "POST",
      //   body: fd,
      // })
      //   .then((data) => {
      //     if (data.ok) {
      //       return data.json();
      //     }
      //     throw new Error("unable to receive data");
      //   })
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
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
            handleImageData={handleImageFileUploadData}
            index={index}
            handleCertificationDeleltion={handleCertificationDeleltion}
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
  handleImageData,
  handleCertificationDeleltion,
  index,
}) {
  // setting for study year end
  const dateArray = ["2000", "2001", "2002", "2003"];
  const [studyYearEndArray, setstudyYearEndArray] = useState(dateArray);

  const handleStudyYearStartData = (e) => {
    const newData = [...dateArray];

    const dataIndex = newData.indexOf(e.target.value);
    // console.log(newData.splice(dataIndex));
    setstudyYearEndArray(newData.splice(dataIndex));
    handleParentData(e, index);
  };

  // handling image data
  const {imageData,setimageData} = useState("")

  const handleCertificateImageData = (e) => {
    const { files } = e.target;
    console.log(files);
    // if()
  };

  return (
    <div className="teachingCertificateIndividualDiv">
      <button onClick={() => handleCertificationDeleltion(index)}>
        Delete
      </button>
      <div>
        <div className="flexDiv">
          <label htmlFor="randomId:subjecttaught5293000">Subject</label>
          <select
            name="subjectName"
            value={parentData.subjectName}
            onChange={(e) => handleParentData(e, index)}
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
            onChange={(e) => handleParentData(e, index)}
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
            onChange={(e) => handleParentData(e, index)}
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
            onChange={(e) => handleParentData(e, index)}
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
              onChange={(e) => handleParentData(e, index)}
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
                <label htmlFor="randomId:fityu419278">Upload</label>
                <input
                  type="file"
                  id="randomId:fityu419278"
                  className="noDisplay"
                  onChange={handleCertificateImageData}
                  accept=".png,.jpg"
                />
              </div>
              <span>JPG or PNG format. maximum size of 20MB</span>
            </div>
            <div className="certificateImageDiv">
              <img src="" alt="image go here" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
