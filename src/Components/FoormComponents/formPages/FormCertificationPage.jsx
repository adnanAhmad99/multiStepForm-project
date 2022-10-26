import React, { useState } from "react";

export default function FormCertificationPage() {
  const [teachingCertificatesArray, setteachingCertificatesArray] = useState([
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
    },
  ]);

  // functions
  const handleNewDataChanges = (e, indexposition) => {
    console.log(e.target);
    console.log(indexposition);
  };
  const handleImageFileUploadData = (e, indexposition) => {
    console.log(e.target);
    console.log(indexposition);
  };

  const handleTestData = () => {
    const fd = new FormData();
    for (let i = 0; i < 4; i++) {
      fd.append("products", i);
    }

    fetch("http://localhost:3030/", {
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
            parantData={data}
            handleParentData={handleNewDataChanges}
            handleImageData={handleImageFileUploadData}
            index={index}
          />
        ))}
      </div>
      <div>
        <button>Add another certificate</button>{" "}
      </div>
      <div>
        <p>I don't have any teaching certificate yet</p>
      </div>
      <div>
        <button onClick={handleTestData}>next</button>
      </div>
    </article>
  );
}

function TeachingCertificateDivs({
  parantData,
  handleParentData,
  handleImageData,
  index,
}) {
  return (
    <div className="teachingCertificateIndividualDiv">
      <div className="flexDiv">
        <label htmlFor="randomId:subjecttaught5293000">Subject</label>
        <select
          name="subjectName"
          // value={mainDataContainer.subjectTaught}
          // onChange={handleInputValueChange}
          id="randomId:subjecttaught5293000"
        >
          <option value=""></option>
          <option value="python">Python</option>
          <option value="scala">Scala</option>
          <option value="java">Java</option>
          <option value="javascript">Javascript</option>
        </select>
        {
          <p className="validationError">
            {/* {mainValidationError.subjectTaught} */}
          </p>
        }
      </div>
      <div className="flexDiv">
        <label htmlFor="radnomId:opi395478">Certificate</label>
        <input type="text" name="certificateName" />
        <p className="validationError">Error</p>
      </div>
      <div className="flexDiv">
        <label htmlFor="radnomId:opi395478" name="certificateDescription">
          Description
        </label>
        <input type="text" />
        <p className="validationError">Error</p>
      </div>
      <div className="flexDiv">
        <label htmlFor="radnomId:opi395478" name="certificateIssuer">
          Issued by
        </label>
        <input type="text" />
        <p className="validationError">Error</p>
      </div>
      <div className="selectDivEducationPage">
        <label>Years of study</label>
        <div>
          <select placeholder="Select" name="startStudyYear">
            <option value="2000">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
          </select>
          <span className="dashAdderSpan"></span>
          <select name="endStudyYear">
            <option value="2000">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
          </select>
        </div>
        <p className="validationError">Error</p>
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
  );
}
