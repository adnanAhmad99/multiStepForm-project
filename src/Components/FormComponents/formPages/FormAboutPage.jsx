import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function FormAboutPage({
  upperLevelDataContainer,
  handleUpperLevelComponentData,
}) {
  //states for components
  const [mainDataContainer, setmainDataContainer] = useState(
    upperLevelDataContainer
  );
  const [mainValidationError, setmainValidationError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    subjectTaught: "",
    teachingExperience: "",
    currentSituation: "",
    ageConfirmtionError: false,
  });

  // state for phone number
  const [phoneNumber, setphoneNumber] = useState();

  // state for age confirmation
  const [ageConfirmation, setageConfirmation] = useState(false);

  // state for languages
  const [languagesArray, setlanguagesArray] = useState([
    {
      languageValue: "EN",
      languageValueError: "",
      languageLevel: "choseLevel",
      languageLevelError: "",
    },
  ]);

  // state for form status
  const [formStatus, setformStatus] = useState("");

  // functions
  const handleLanguageAddition = () => {
    setlanguagesArray((prevState) => [
      ...prevState,
      {
        languageValue: "selectLanguages",
        languageValueError: "",
        languageLevel: "choseLevel",
        languageLevelError: "",
      },
    ]);
  };

  const handleLanguageDeletion = (e, index) => {
    const newArray = [];

    for (let data in languagesArray) {
      if (data != index) {
        newArray.push(languagesArray[data]);
      }
    }
    // console.log(newArray);
    setlanguagesArray(newArray);
  };

  const handleLanguageValueChange = (e, index) => {
    let newArray = [...languagesArray];
    newArray[index].languageValue = e.target.value;
    setlanguagesArray(newArray);
  };
  const handleLanguageLevelChange = (e, index) => {
    let newArray = [...languagesArray];
    newArray[index].languageLevel = e.target.value;
    setlanguagesArray(newArray);
  };

  const handleInputValueChange = (e) => {
    const { name, value } = e.target;

    setmainDataContainer({ ...mainDataContainer, [name]: value });
  };
  // form submitting
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("form submited");

    // formValidationChecking
    const internalErrorDataObj = {};

    if (!mainDataContainer.firstName) {
      internalErrorDataObj.firstName = "This field is required";
    }
    if (!mainDataContainer.lastName) {
      internalErrorDataObj.lastName = "This field is required";
    }
    if (!mainDataContainer.email) {
      internalErrorDataObj.email = "This field is required";
    }
    if (!mainDataContainer.subjectTaught) {
      internalErrorDataObj.subjectTaught = "This field is required";
    }
    if (!mainDataContainer.teachingExperience) {
      internalErrorDataObj.teachingExperience = "This field is required";
    }
    if (!mainDataContainer.currentSituation) {
      internalErrorDataObj.currentSituation = "This field is required";
    }
    if (!ageConfirmation) {
      internalErrorDataObj.ageConfirmtionError = "This field is required";
    }

    //language validation checking
    let languageValidationState = false;
    let internalLanguageErrorArray = languagesArray.map((data) => {
      if (data.languageLevel == "choseLevel") {
        languageValidationState = true;
        data.languageLevelError = "this field is required";
      } else {
        data.languageLevelError = "";
      }
      if (data.languageValue == "selectLanguages") {
        languageValidationState = true;
        data.languageValueError = "this field is required";
      } else {
        data.languageValueError = "";
      }
      return data;
    });

    setmainValidationError(internalErrorDataObj);

    if (languageValidationState) {
      setlanguagesArray(internalLanguageErrorArray);
    }

    if (
      Object.keys(internalErrorDataObj).length > 0 ||
      languageValidationState
    ) {
      console.log("validation failed");
      return;
    }
    console.log("validation passed");

    const fd = new FormData(e.target);

    fd.append("phone", phoneNumber);
    fd.append("ageConfirmation", ageConfirmation);
    fd.append("languagesData", JSON.stringify(languagesArray));

    // for (let data of fd.keys()) {
    //   console.log(data, fd.get(data));
    // }

    fetch("http://localhost:3030/api/formInformation/about", {
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
        if (newData.message == "Error in validation") {
          if (newData.errorObject.formErrorMessage == "form error present") {
            setmainValidationError(newData.errorObject.formErrorObj);
          }
          if (
            newData.errorObject.languagesErrorMessage ==
            "language error present"
          ) {
            setlanguagesArray(newData.errorObject.languagesErrorArr);
          }

          return;
        }
        if (newData.message == "data received") {
          console.log("success");
          setformStatus("data updated successfull");

          setTimeout(() => {
            console.log("set timeout called");
            handleUpperLevelComponentData("Photo", {
              ...mainDataContainer,
              customerID: newData.customerID,
            });
          }, 1500);
        }
        if (newData.message == "Error updating Data") {
          console.log("error updating database");
          setformStatus("error updating data");
          setTimeout(() => {
            setformStatus("");
          }, 1500);
        }
      })
      .catch((err) => {
        console.error(err.message);
        setformStatus("error updating data");
        setTimeout(() => {
          setformStatus("");
        }, 1500);
      });
  };

  // checking value status
  // useEffect(() => {
  //   console.log(mainDataContainer);
  // }, [mainDataContainer]);

  return (
    <article className="aboutFormPage">
      <h2>About</h2>
      <form onSubmit={handleFormSubmit} className="aboutFormPageForm">
        <div className="flexDiv">
          <label htmlFor="randomid:firstName123415">First Name</label>
          <input
            type="text"
            name="firstName"
            value={mainDataContainer.firstName}
            onChange={handleInputValueChange}
            id="randomid:firstName123415"
          />
          {mainValidationError.firstName && (
            <p className="validationError">{mainValidationError.firstName}</p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="randomid:lastName836492">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={mainDataContainer.lastName}
            onChange={handleInputValueChange}
            id="randomid:lastName836492"
          />
          {mainValidationError.lastName && (
            <p className="validationError">{mainValidationError.lastName}</p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="randomid:emailField6234">Email</label>
          <input
            type="text"
            name="email"
            value={mainDataContainer.email}
            onChange={handleInputValueChange}
            id="randomid:emailField6234"
          />
          {mainValidationError.email && (
            <p className="validationError">{mainValidationError.email}</p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="randomid:originCountry53256">Country of origin</label>
          <select
            name="country"
            value={mainDataContainer.country}
            onChange={handleInputValueChange}
            id="randomid:originCountry53256"
          >
            <option value="Afghanistan">Afghanistan</option>
            <option value="Åland Islands">Åland Islands</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegovina">
              Bosnia and Herzegovina
            </option>
            <option value="Botswana">Botswana</option>
            <option value="Bouvet Island">Bouvet Island</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Territory">
              British Indian Ocean Territory
            </option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">
              Central African Republic
            </option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos (Keeling) Islands">
              Cocos (Keeling) Islands
            </option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Congo, The Democratic Republic of The">
              Congo, The Democratic Republic of The
            </option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote D'ivoire">Cote D'ivoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands (Malvinas)">
              Falkland Islands (Malvinas)
            </option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Territories">
              French Southern Territories
            </option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guernsey">Guernsey</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-bissau">Guinea-bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Heard Island and Mcdonald Islands">
              Heard Island and Mcdonald Islands
            </option>
            <option value="Holy See (Vatican City State)">
              Holy See (Vatican City State)
            </option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran, Islamic Republic of">
              Iran, Islamic Republic of
            </option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jersey">Jersey</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea, Democratic People's Republic of">
              Korea, Democratic People's Republic of
            </option>
            <option value="Korea, Republic of">Korea, Republic of</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Lao People's Democratic Republic">
              Lao People's Democratic Republic
            </option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libyan Arab Jamahiriya">
              Libyan Arab Jamahiriya
            </option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macao">Macao</option>
            <option value="Macedonia, The Former Yugoslav Republic of">
              Macedonia, The Former Yugoslav Republic of
            </option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Micronesia, Federated States of">
              Micronesia, Federated States of
            </option>
            <option value="Moldova, Republic of">Moldova, Republic of</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Netherlands Antilles">Netherlands Antilles</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Northern Mariana Islands">
              Northern Mariana Islands
            </option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Palestinian Territory, Occupied">
              Palestinian Territory, Occupied
            </option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Pitcairn">Pitcairn</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russian Federation">Russian Federation</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Saint Helena">Saint Helena</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
            <option value="Saint Lucia">Saint Lucia</option>
            <option value="Saint Pierre and Miquelon">
              Saint Pierre and Miquelon
            </option>
            <option value="Saint Vincent and The Grenadines">
              Saint Vincent and The Grenadines
            </option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Serbia">Serbia</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Georgia and The South Sandwich Islands">
              South Georgia and The South Sandwich Islands
            </option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Svalbard and Jan Mayen">
              Svalbard and Jan Mayen
            </option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania, United Republic of">
              Tanzania, United Republic of
            </option>
            <option value="Thailand">Thailand</option>
            <option value="Timor-leste">Timor-leste</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks and Caicos Islands">
              Turks and Caicos Islands
            </option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="United States Minor Outlying Islands">
              United States Minor Outlying Islands
            </option>
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Viet Nam">Viet Nam</option>
            <option value="Virgin Islands, British">
              Virgin Islands, British
            </option>
            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
            <option value="Wallis and Futuna">Wallis and Futuna</option>
            <option value="Western Sahara">Western Sahara</option>
            <option value="Yemen">Yemen</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>

          {mainValidationError.country && (
            <p className="validationError">{mainValidationError.country}</p>
          )}
        </div>
        <div className="languageDivContainer">
          <div className="languagesUpperHeaddings">
            <p>Languages spoken</p>
            <p>Level</p>
          </div>
          {/* make following map */}
          {languagesArray.map((element, index) => (
            <div
              key={`indexOfLanguagesArray${index}`}
              className="languageUpperLevelDiv"
            >
              <div className="languageLowerLevelDiv flexDiv">
                <select
                  onChange={(e) => handleLanguageValueChange(e, index)}
                  disabled={element.languageValue == "EN" ? true : false}
                  value={element.languageValue}
                >
                  <option value="selectLanguages">Select language</option>
                  <option value="AF">Afrikaans</option>
                  <option value="SQ">Albanian</option>
                  <option value="AR">Arabic</option>
                  <option value="HY">Armenian</option>
                  <option value="EU">Basque</option>
                  <option value="BN">Bengali</option>
                  <option value="BG">Bulgarian</option>
                  <option value="CA">Catalan</option>
                  <option value="KM">Cambodian</option>
                  <option value="ZH">Chinese (Mandarin)</option>
                  <option value="HR">Croatian</option>
                  <option value="CS">Czech</option>
                  <option value="DA">Danish</option>
                  <option value="NL">Dutch</option>
                  <option value="EN">English</option>
                  <option value="ET">Estonian</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finnish</option>
                  <option value="FR">French</option>
                  <option value="KA">Georgian</option>
                  <option value="DE">German</option>
                  <option value="EL">Greek</option>
                  <option value="GU">Gujarati</option>
                  <option value="HE">Hebrew</option>
                  <option value="HI">Hindi</option>
                  <option value="HU">Hungarian</option>
                  <option value="IS">Icelandic</option>
                  <option value="ID">Indonesian</option>
                  <option value="GA">Irish</option>
                  <option value="IT">Italian</option>
                  <option value="JA">Japanese</option>
                  <option value="JW">Javanese</option>
                  <option value="KO">Korean</option>
                  <option value="LA">Latin</option>
                  <option value="LV">Latvian</option>
                  <option value="LT">Lithuanian</option>
                  <option value="MK">Macedonian</option>
                  <option value="MS">Malay</option>
                  <option value="ML">Malayalam</option>
                  <option value="MT">Maltese</option>
                  <option value="MI">Maori</option>
                  <option value="MR">Marathi</option>
                  <option value="MN">Mongolian</option>
                  <option value="NE">Nepali</option>
                  <option value="NO">Norwegian</option>
                  <option value="FA">Persian</option>
                  <option value="PL">Polish</option>
                  <option value="PT">Portuguese</option>
                  <option value="PA">Punjabi</option>
                  <option value="QU">Quechua</option>
                  <option value="RO">Romanian</option>
                  <option value="RU">Russian</option>
                  <option value="SM">Samoan</option>
                  <option value="SR">Serbian</option>
                  <option value="SK">Slovak</option>
                  <option value="SL">Slovenian</option>
                  <option value="ES">Spanish</option>
                  <option value="SW">Swahili</option>
                  <option value="SV">Swedish </option>
                  <option value="TA">Tamil</option>
                  <option value="TT">Tatar</option>
                  <option value="TE">Telugu</option>
                  <option value="TH">Thai</option>
                  <option value="BO">Tibetan</option>
                  <option value="TO">Tonga</option>
                  <option value="TR">Turkish</option>
                  <option value="UK">Ukrainian</option>
                  <option value="UR">Urdu</option>
                  <option value="UZ">Uzbek</option>
                  <option value="VI">Vietnamese</option>
                  <option value="CY">Welsh</option>
                  <option value="XH">Xhosa</option>
                </select>
                {element.languageValueError && (
                  <p className="validationError">
                    {element.languageValueError}
                  </p>
                )}
              </div>
              <div className="languageLowerLevelDiv flexDiv">
                <select
                  onChange={(e) => handleLanguageLevelChange(e, index)}
                  value={element.languageLevel}
                >
                  <option value="choseLevel">Choose Level...</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                  <option value="Native">Native</option>
                </select>
                {element.languageLevelError && (
                  <p className="validationError">
                    {element.languageLevelError}
                  </p>
                )}
              </div>
              {element.languageValue == "EN" ? null : (
                <div
                  onClick={(e) => handleLanguageDeletion(e, index)}
                  className="deleteLanguageDiv"
                >
                  <svg
                    height="15"
                    viewBox="0 0 12 15"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 15a3 3 0 0 1-3-3V5h10v7a3 3 0 0 1-3 3zM3 7v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7zm9-6v2H0V1h3l.707-.707A1 1 0 0 1 4.414 0h3.172a1 1 0 0 1 .707.293L9 1z"></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
          {/* make above map */}

          <div
            className="languagesAdditionDiv"
            onClick={handleLanguageAddition}
          >
            Add another language
          </div>
        </div>
        <div className="flexDiv">
          <label htmlFor="randomId:subjecttaught52930">Subject taught</label>
          <select
            name="subjectTaught"
            value={mainDataContainer.subjectTaught}
            onChange={handleInputValueChange}
            id="randomId:subjecttaught52930"
          >
            <option value=""></option>
            <option value="python">Python</option>
            <option value="scala">Scala</option>
            <option value="java">Java</option>
            <option value="javascript">Javascript</option>
          </select>
          {mainValidationError.subjectTaught && (
            <p className="validationError">
              {mainValidationError.subjectTaught}
            </p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="randomId:purspe23059">
            Describe your teaching experience
          </label>
          <select
            name="teachingExperience"
            value={mainDataContainer.teachingExperience}
            onChange={handleInputValueChange}
            id="randomId:purspe23059"
          >
            <option value=""></option>
            <option value="FORMAL_TEACHING_EXP">
              I have formal teaching experience
            </option>
            <option value="INFORMAL_SETTING">
              I have taught in an informal setting
            </option>
            <option value="NONE">None of the above</option>
          </select>
          {mainValidationError.teachingExperience && (
            <p className="validationError">
              {mainValidationError.teachingExperience}
            </p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="randomId:currentSituation56927u3">
            Describe your current situation
          </label>
          <select
            name="currentSituation"
            value={mainDataContainer.currentSituation}
            onChange={handleInputValueChange}
            id="randomId:currentSituation56927u3"
          >
            <option value=""></option>
            <option value="ANOTHER_TEACHING_JOB">
              I have another teaching job
            </option>
            <option value="ANOTHER_NON_TEACHING_JOB">
              I have another non-teaching job
            </option>
            <option value="STUDENT">I am a student</option>
            <option value="OTHER_COMMITMENTS">I have other commitments</option>
            <option value="NONE">I have no other commitments</option>
          </select>
          {mainValidationError.currentSituation && (
            <p className="validationError">
              {mainValidationError.currentSituation}
            </p>
          )}
        </div>
        <div className="flexDiv">
          <label htmlFor="randomid:phone8340">
            Phone Number <span className="lightColorElement">(optional)</span>{" "}
          </label>
          <div className="phoneNumberFormDiv">
            <PhoneInput
              international
              defaultCountry="PK"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={setphoneNumber}
            />
          </div>

          <p className="lightColorElement">
            Receive SMS-notifications about new messages from students
          </p>
        </div>
        <div>
          <div>Age</div>
          <div className="flexDiv ">
            <div
              className="flexDivRow ageConfirmationDiv"
              onClick={() => setageConfirmation(!ageConfirmation)}
            >
              <span
                className={`ageConfirmationSvgSpan ${
                  ageConfirmation ? "acitveAgeCheckbox" : ""
                }`}
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
              <span>I confirm I'm over 18</span>
            </div>
            {mainValidationError.ageConfirmtionError && (
              <p className="validationError">This field is required</p>
            )}
          </div>
        </div>
        <div>
          <button type="submit">Next</button>
        </div>
      </form>
      {formStatus && <p>{formStatus}</p>}
    </article>
  );
}
