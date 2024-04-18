import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { LesionImage } from "./LesionImage";

/**
 * 
 * @param {{
 * selectedPatientId: number;
 * toggleFilterVisibility(): void;
 * filterVisible: boolean;
 * }} props
 * @returns image view
 */
const ImageView = ({
  selectedPatientId,
  toggleFilterVisibility,
  filterVisible,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [images, setImages] = useState([]);
  // Get user info
  useEffect(() => {
    async function getUserInfo() {
      const response = await axios.get("http://localhost:4000/user", {
        withCredentials: true,
      });

      if (response.statusText != "OK") {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const retrievedUserInfo = response.data;
      setName(retrievedUserInfo.name);
    }

    getUserInfo();
  }, []);

  // Get images for selected patient
  useEffect(() => {
    async function getImages() {
      if (selectedPatientId) {
        try {
          const response = await axios.get(
            `http://localhost:4000/patient?id=${selectedPatientId}`,
            { withCredentials: true }
          );
          console.log(response.data);
          setPatientName(response.data.name);
          setImages(response.data.images);
        } catch (error) {
          console.error("Error getting image:", error);
          alert("Error getting image");
        }
      }
    }

    setSelectedLeftImage(null);
    setSelectedRightImage(null);
    getImages();
  }, [selectedPatientId]);

  const transformComponentLeft = useRef();
  const transformComponentRight = useRef();

  // Example data for demonstration
  const [zoomLevelLeft, setZoomLevelLeft] = useState(1);
  const [zoomLevelRight, setZoomLevelRight] = useState(1);
  const [syncImages, setSyncImages] = useState(false);
  // Flags to prevent infinite mutual updates
  const updatingLeft = useRef(false);
  const updatingRight = useRef(false);
  // Handle left image transformation
  const handleTransformLeft = (e) => {
    if (syncImages && !updatingRight.current) {
      updatingLeft.current = true;
      transformComponentRight.current.setTransform(
        e.instance.transformState.positionX,
        e.instance.transformState.positionY,
        e.instance.transformState.scale,
        0
      );
      updatingLeft.current = false;
    }
  };
  // Handle right image transformation
  const handleTransformRight = (e) => {
    if (syncImages && !updatingLeft.current) {
      updatingRight.current = true;
      transformComponentLeft.current.setTransform(
        e.instance.transformState.positionX,
        e.instance.transformState.positionY,
        e.instance.transformState.scale,
        0
      );
      updatingRight.current = false;
    }
  };
  // Toggle sync images
  const toggleSyncImages = () => {
    setSyncImages(!syncImages);
  };
  const [matchResult, setMatchResult] = useState(null);
  const [leftLesionCoordinates, setLeftLesionCoordinates] = useState(null);
  const [rightLesionCoordinates, setRightLesionCoordinates] = useState(null);
  const [hoverTarget, setHoverTarget] = useState(null);


  // Zoom in on lesion
  const zoom = () => {
    if (
      !matchResult ||
      hoverTarget === null ||
      !leftLesionCoordinates ||
      !rightLesionCoordinates
    )
      return;
    const match = matchResult.mappings[hoverTarget];
    const leftLesion = leftLesionCoordinates.lesions[match.a];
    const rightLesion = rightLesionCoordinates.lesions[match.b];
    console.log(leftLesion, rightLesion, match);

    transformComponentLeft.current.setTransform(
      leftLesion.x,
      leftLesion.y,
      1,
      0
    );

    transformComponentRight.current.setTransform(
      rightLesion.x,
      rightLesion.y,
      1,
      0
    );
  };
  const [highlightLesions, setHighlightLesions] = useState(false);

  // Get image match data, lesion data, and highlight lesions
  const checkMatch = async () => {
    if (!selectedLeftImage || !selectedRightImage) {
      alert("Both images must be selected to check for a match.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/match?a=${selectedLeftImage.id}&b=${selectedRightImage.id}`,
        { withCredentials: true }
      );
      setMatchResult(response.data);
      setHighlightLesions(!highlightLesions);
      console.log(matchResult, selectedLeftImage.id, selectedRightImage.id);
    } catch (error) {
      console.error("Failed to fetch match data:", error);
      alert("Failed to check images match");
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/lesion?id=${selectedLeftImage.id}`,
        { withCredentials: true }
      );
      setLeftLesionCoordinates(response.data);
      console.log(leftLesionCoordinates);
    } catch (error) {
      console.error("Failed to fetch lesion data:", error);
      alert("Failed to check images match");
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/lesion?id=${selectedRightImage.id}`,
        { withCredentials: true }
      );
      setRightLesionCoordinates(response.data);
      console.log(rightLesionCoordinates);
    } catch (error) {
      console.error("Failed to fetch lesion data:", error);
      alert("Failed to check images match");
    }
  };

  // Convert time to CDT
  const convertTimeZone = (time) => {
    const date = new Date(time);
    const cdtTime = date.toLocaleString("en-US", {
      timeZone: "America/Chicago",
    });
    return cdtTime;
  };

  const [selectedLeftImage, setSelectedLeftImage] = useState(null);
  const [selectedRightImage, setSelectedRightImage] = useState(null);

  const [lastClickedPosition, setLastClickedPosition] = useState("right");

  // Select left and right image from the image bar
  const handleImageClick = (image) => {
    const newPosition = lastClickedPosition === "left" ? "right" : "left";
    if (newPosition === "left") {
      setSelectedLeftImage(image);
    } else {
      setSelectedRightImage(image);
    }
    setLastClickedPosition(newPosition);
  };
  const imageBarRef = useRef(null);

  const scrollToStart = () => {
    if (imageBarRef.current) {
      imageBarRef.current.scrollLeft = 0;
    }
  };

  const navigateToUpload = () => {
    navigate("/uploading");
  };

  const navigateToLanding = () => {
    navigate("/");
  };


  const scrollToEnd = () => {
    if (imageBarRef.current) {
      imageBarRef.current.scrollLeft = imageBarRef.current.scrollWidth;
    }
  };
  return (
    <div className="image-view-wrapper">

      <div className="zoom-controls">
        <button
          className="toggle-filter-button"
          onClick={toggleFilterVisibility}
        >
          <FontAwesomeIcon icon={filterVisible ? faArrowLeft : faArrowRight} />
        </button>
        <button onClick={toggleSyncImages}>
          <FontAwesomeIcon icon={faSyncAlt} /> {syncImages ? "Unsync" : "Sync"}{" "}
          Images
        </button>
        <button onClick={checkMatch} className="match-check-button">
          {highlightLesions ? "Unmatch Lesions" : "Match Lesions"}
        </button>
        <div className="user-info">
  <div className="login-name">Logged in as {name}</div>
  <button className="logout-button" onClick={() => navigateToLanding("/")}>Logout</button>
</div>

        <button
          className="upload-button"
          onClick={() => navigateToUpload("/uploading")}
        >
          Upload Image
        </button>
      </div>
      <div className="image-container-wrapper">
        <div
          className="image-container"
          style={{ transform: `scale(${zoomLevelLeft})` }}
        >
          {selectedLeftImage !== null && (
            <div className="image-info">
              <h3>{patientName}</h3>

              <h3>ID: {selectedLeftImage.id}</h3>
              <h3>Time: {convertTimeZone(selectedLeftImage.timestamp)}</h3>
            </div>
          )}

          <TransformWrapper
            ref={transformComponentLeft}
            onTransformed={handleTransformLeft}
          >
            <TransformComponent>
              {selectedLeftImage !== null && (
                <LesionImage
                  imgSrc={selectedLeftImage.url}
                  isA={true}
                  lesions={leftLesionCoordinates?.lesions || []}
                  matchRes={matchResult?.mappings}
                  hoverTarget={hoverTarget}
                  setHoverTarget={setHoverTarget}
                  hoverTargetDate={convertTimeZone(selectedLeftImage.timestamp)}
                  hoverTargetTaker={getRandomNurseName(selectedLeftImage.id)}
                  onClick={zoom}
                  highlight={highlightLesions}
                />
              )}
              {selectedLeftImage === null && (
                <h4 className="select-image-text"> SELECT AN IMAGE BELOW </h4>
              )}
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div className="divider"></div>
        <div
          className="image-container"
          style={{ transform: `scale(${zoomLevelRight})` }}
        >
          {selectedRightImage !== null && (
            <div className="image-info">
              <h3>{patientName}</h3>
              <h3>ID: {selectedRightImage.id}</h3>
              <h3>Time: {convertTimeZone(selectedRightImage.timestamp)}</h3>
            </div>
          )}

          <TransformWrapper
            ref={transformComponentRight}
            onTransformed={handleTransformRight}
          >
            <TransformComponent>
              {selectedRightImage !== null && (
                <LesionImage
                  imgSrc={selectedRightImage.url}
                  isA={false}
                  matchRes={matchResult?.mappings}
                  lesions={rightLesionCoordinates?.lesions || []}
                  highlight={highlightLesions}
                  hoverTarget={hoverTarget}
                  setHoverTarget={setHoverTarget}
                  hoverTargetDate={convertTimeZone(selectedRightImage.timestamp)}
                  hoverTargetTaker={getRandomNurseName(selectedRightImage.id)}
                  onClick={zoom}
                />
              )}
              {selectedRightImage === null && (
                <h4 className="select-image-text"> SELECT AN IMAGE BELOW </h4>
              )}
            </TransformComponent>
          </TransformWrapper>
        </div>
      </div>
      <div className="image-note">
        Click two images to replace left and right images, scroll to view more
        past images
      </div>

      <div className="image-bar-container">
        <button className="scroll-button left" onClick={scrollToStart}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="image-bar" ref={imageBarRef}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt="Past image"
              className="past-image"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollToEnd}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

// get a random nurse name
const getRandomNurseName = (id) => {
    return nurseNames[id % nurseNames.length];
}

// list of nurse names
const nurseNames = ["Jennifer", "Sarah", "Jessica", "Daniel", "Nicole", "Nancy"];

export default ImageView;
