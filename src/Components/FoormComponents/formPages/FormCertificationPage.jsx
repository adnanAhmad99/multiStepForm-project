import React, { useState } from "react";

export default function FormCertificationPage() {
  const [teachingCertificatesArray, setteachingCertificatesArray] = useState({
    subjectName: "",
    subjectNameError: "",
    certificateName: "",
    certificateNameError: "",
    descriptionName: "",
    descriptionNameError: "",
    issuedBy: "",
    issuedByError: "",
    startStudyYear: "",
    endStudyYear: "",
    studyYearError: "",
  });

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
        <TeachingCertificateDivs />
        {/* {teachingCertificatesArray.map((element,index)=>(

        ))} */}
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

function TeachingCertificateDivs() {
  return (
    <div className="teachingCertificateIndividualDiv">
      <div className="flexDiv">
        <label htmlFor="randomId:subjecttaught5293000">Subject</label>
        <select
          name="subjectTaught"
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
        <input type="text" />
        <p className="validationError">Error</p>
      </div>
      <div className="flexDiv">
        <label htmlFor="radnomId:opi395478">Description</label>
        <input type="text" />
        <p className="validationError">Error</p>
      </div>
      <div className="flexDiv">
        <label htmlFor="radnomId:opi395478">Issued by</label>
        <input type="text" />
        <p className="validationError">Error</p>
      </div>
      <div className="selectDivEducationPage">
        <label>Years of study</label>
        <div>
          <select placeholder="Select">
            <option value="2000">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
          </select>
          <span className="dashAdderSpan"></span>
          <select>
            <option value="2000">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
          </select>
        </div>
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
              <span>
                <span>JPG or PNG format.</span>
                <span>maximum size of 20MB</span>
              </span>
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
