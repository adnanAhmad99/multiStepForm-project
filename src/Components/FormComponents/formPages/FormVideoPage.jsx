import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useReactMediaRecorder } from "react-media-recorder";
import { useRef } from "react";

export default function FormVideoPage({
  upperLevelDataContainer,
  handleUpperLevelComponentData,
  seterrorModel,
}) {
  const [cameraTest, setcameraTest] = useState(false);
  const [videoError, setvideoError] = useState(false);
  const [videoTimer, setvideoTimer] = useState(0);
  const [startVideoTimer, setstartVideoTimer] = useState(false);
  const [loading, setloading] = useState(false);
  const timer = useRef(null);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });
  // funcitons

  const handleVideoStart = (e) => {
    setvideoError(false);
    setstartVideoTimer(true);
    setcameraTest(false);
    startRecording(e);
  };

  const handleVideoStop = (e) => {
    setstartVideoTimer(false);
    setcameraTest(false);
    stopRecording(e);
  };

  const handleVideoSending = async () => {
    console.log(mediaBlobUrl);
    // validation
    if (!mediaBlobUrl) {
      setvideoError(true);
      return;
    }
    setvideoError(false);

    // data sending
    setloading(true);
    const video = await fetch(mediaBlobUrl).then((data) => data.blob());
    console.log(video);
    // const fd = new FormData();
    // fd.append("video", video, "introvideo.mp4");

    // fetch("http://localhost:3030/api/formInformation/video", {
    //   method: "POST",
    //   body: fd,
    // })
    //   .then((data) => {
    //     console.log(data);
    //     if (data.ok) {
    //       return data.json();
    //     }
    //     throw new Error("unable to receive data");
    //   })
    //   .then((data) => {
    //     // const newData =
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setloading(false);
  };

  useEffect(() => {
    if (startVideoTimer) {
      timer.current = setInterval(() => {
        setvideoTimer((prevState) => prevState + 1);
      }, 1000);
    }
    if (!startVideoTimer) {
      clearInterval(timer.current);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [startVideoTimer]);

  useEffect(() => {
    if (videoTimer >= 60 * 3) {
      clearInterval(timer.current);
      stopRecording();
    }
  }, [videoTimer]);

  return (
    <article className="videoPageArticle">
      <h2>Video Introduction</h2>
      <h3>Record your video</h3>
      <p>
        Now introduce yourself to students. You can watch and re-record your
        intro before you submit it.
      </p>
      <div>
        <div className="videoMainDiv">
          {cameraTest || status == "recording" ? <Webcam /> : null}
          {status == "stopped" && <video src={mediaBlobUrl} controls />}
        </div>
        {status == "recording" ? (
          <div>
            <span>time: </span>
            <span>
              {" "}
              0{Math.floor(videoTimer / 60)}:
              {videoTimer % 60 < 10 ? `0${videoTimer % 60}` : videoTimer % 60}
            </span>
          </div>
        ) : null}
        <div className="videoPageBtnsDiv">
          {status == "idle" && (
            <button
              className="buttonStyling"
              onClick={() => setcameraTest(!cameraTest)}
            >
              {!cameraTest ? "Test Camera" : "stop test"}
            </button>
          )}
          {status == "idle" || status == "stopped" ? (
            <button className="btnStart" onClick={handleVideoStart}>
              {status != "stopped" ? "Start Recording" : "Re-record"}
            </button>
          ) : null}
          {status == "recording" && (
            <button className="btnStop" onClick={handleVideoStop}>
              Stop Recording
            </button>
          )}
        </div>
      </div>
      {videoError && <p className="validationError">Please record video</p>}
      {loading && <p>sending video please wait...</p>}
      <div disable={`${loading}`} className="navigationButtonDiv">
        <button
          onClick={() => handleUpperLevelComponentData("Description", {})}
        >
          Back
        </button>
        <button onClick={handleVideoSending}>Next</button>
      </div>
    </article>
  );
}
