import React from "react";

export default function FormPhotoPage({
  upperLevelDataContainer,
  handleUpperLevelComponentData,
}) {
  return (
    <article className="formPhotoPage">
      <h2>Photo</h2>
      <div>
        <div className="photoArea">
          <h3>Make a great first Impression</h3>
          <p>Tutors who look friendly and professional get the most students</p>
          <div className="imageUploaderDiv">
            <button>Upload photo</button>
            <div>
              <p>JPG or PNG format</p>
              <p>Maximum 5 mb</p>
            </div>
          </div>
          <div className="mainDropdownZoneAndImageDislayer">
            {/* drop zone goes here */}
            <div className="dragndropdiv">
              <p>Drag and drop your photo here</p>
            </div>
            {/* image Displayer goes here */}
            <div className="imageEditorDiv">
              <div className="ImageShowerDiv">
                <img src="" alt="" />
              </div>
              <p>
                Drag the handles to crop your photo. Use zoom and rotation to
                position.
              </p>
              <div className="imageEditTooldiv">
                <div>
                  <p className="makebold"></p>
                  <input type="range" name="" id="" />
                </div>
                <div>
                  <p className="makebold"></p>
                  <div>
                    <button>previous</button>
                    <button>next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PhotoTipsComponent />
      </div>
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
