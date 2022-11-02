import React, { useState, useRef } from "react";
import Dropzone from "react-dropzone";
// import Cropper from "react-easy-crop";

export default function FormPhotoPage({
  upperLevelDataContainer,
  handleUpperLevelComponentData,
}) {
  const [selectedImage, setselectedImage] = useState("");
  const [image, setimage] = useState(null);
  const [selectedImageError, setselectedImageError] = useState(false);
  const currentInput = useRef("");

  const handleImageSending = () => {
    if (image) {
      const fd = new FormData();
      console.log(image);
      fd.append("profilePic", image, image.name);
      fetch("http://localhost:3030/api/formInformation/profilePicture", {
        method: "POST",
        body: fd,
      })
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw Error("unable to receive data");
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleNewImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const acceptedFilesExtArray = ["image/png", "image/jpg", "image/jpeg"];
      if (!acceptedFilesExtArray.includes(e.target.files[0].type)) {
        setselectedImageError(true);
        return;
      } else if (e.target.files[0].size >= 5000000) {
        setselectedImageError(true);
        return;
      }

      setselectedImageError(false);

      setimage(e.target.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);

      fileReader.addEventListener("load", () => {
        setselectedImage(fileReader.result);
      });
    }
  };

  const handleOnDrop = (acceptedFiles) => {
    const acceptedFilesExtArray = ["image/png", "image/jpg", "image/jpeg"];
    if (acceptedFiles && acceptedFiles.length > 0) {
      if (!acceptedFilesExtArray.includes(acceptedFiles[0].type)) {
        setselectedImageError(true);
        return;
      } else if (acceptedFiles[0].size >= 5000000) {
        setselectedImageError(true);
        return;
      }

      setselectedImageError(false);

      setimage(acceptedFiles[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(acceptedFiles[0]);

      fileReader.addEventListener("load", () => {
        setselectedImage(fileReader.result);
      });
    }
  };

  return (
    <article className="formPhotoPage">
      <h2>Photo</h2>
      <div>
        <div className="photoArea">
          <h3>Make a great first Impression</h3>
          <p>Tutors who look friendly and professional get the most students</p>
          <div className="imageUploaderDiv">
            <input
              type="file"
              accept=".png,.jpeg,.jpg"
              id="randomId:de2589023"
              onChange={handleNewImage}
            />
            <label htmlFor="randomId:de2589023">Upload photo</label>

            <div className={selectedImageError ? "validationError" : null}>
              <p>JPG or PNG format</p>
              <p>Maximum 5 mb</p>
            </div>
          </div>
          <div className="mainDropdownZoneAndImageDislayer">
            <Dropzone
              onDrop={handleOnDrop}
              multiple={false}
              accept={{
                "image/png": [".png"],
                "image/jpg": [".jpg", ".jpeg"],
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    className="dragndropdiv"
                    {...getRootProps()}
                    ref={currentInput}
                  >
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="imageEditorDiv">
              <div className="ImageShowerDiv">
                <img src={selectedImage} alt="" />
              </div>
              <button
                onClick={() => {
                  setselectedImage("");
                  setimage("");
                  setselectedImageError(false);
                }}
              >
                remove
              </button>
            </div>
          </div>
        </div>
        <PhotoTipsComponent />
      </div>
      <button onClick={handleImageSending}>Next</button>
    </article>
  );
}

function PhotoTipsComponent() {
  return (
    <div className="photoTips">
      <h3>Tips for an amazing photo</h3>
      <div className="exampleImagesDiv"></div>
      <ul className="photoTipsList">
        <li>first li</li>
      </ul>
    </div>
  );
}
