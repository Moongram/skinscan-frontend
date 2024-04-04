import React, { useState, useRef, useEffect }  from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ImageView = ({ selectedPatientId, leftImage, rightImage, toggleFilterVisibility, filterVisible }) => {

  const [name, setName] = useState('');
  const [patientName, setPatientName] = useState('')
  // Placeholder past images data
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getUserInfo() {
      const response = await axios.get('http://localhost:5000/user', { withCredentials: true });

      if (response.statusText != 'OK') {
        const message = `An error occurred: ${response.statusText}`;    
        window.alert(message);
        return;
      }

      const retrievedUserInfo = response.data;
    //   console.log(retrievedUseInfo)
    setName(retrievedUserInfo.name)
    }

    getUserInfo()
  }, [])

  useEffect(() => {
    async function getImages() {
        if (selectedPatientId) {
            try {
                const response = await axios.get(`http://localhost:5000/patient?id=${selectedPatientId}`, 
                    {withCredentials: true}
                );
               
                console.log(response.data);
                setPatientName(response.data.name)
                setImages(response.data.images)
            } catch (error) {
                console.error('Error getting image:', error);
                alert('Error getting image');
            }
        }
    }

    getImages()
  }, [selectedPatientId])

  const transformComponentLeft = useRef();
  const transformComponentRight = useRef();
  
  // Example data for demonstration
  const [zoomLevelLeft, setZoomLevelLeft] = useState(1);
  const [zoomLevelRight, setZoomLevelRight] = useState(1);
  const [syncImages, setSyncImages] = useState(false);
    // Flags to prevent infinite mutual updates
    const updatingLeft = useRef(false);
    const updatingRight = useRef(false);

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
  const toggleSyncImages = () => {
    setSyncImages(!syncImages);
};

    // const handleTransformLeft = (e) => {
    //     if (!updatingRight.current) {
    //         updatingLeft.current = true;
    //         transformComponentRight.current.setTransform(
    //             e.instance.transformState.positionX,
    //             e.instance.transformState.positionY,
    //             e.instance.transformState.scale,
    //             0
    //         );
    //         updatingLeft.current = false;
    //     }
    // };

    // const handleTransformRight = (e) => {
    //     if (!updatingLeft.current) {
    //         updatingRight.current = true;
    //         transformComponentLeft.current.setTransform(
    //             e.instance.transformState.positionX,
    //             e.instance.transformState.positionY,
    //             e.instance.transformState.scale,
    //             0
    //         );
    //         updatingRight.current = false;
    //     }
    // };
  leftImage = {
    url: '/images/lesion1.jpg',
    name: 'Jane Doe',
    photoId: '13',
    timestamp: '2024-03-20 10:00',
  };

  rightImage = {
    url: '/images/lesion2.jpg',
    name: 'John Smith',
    photoId: '14',
    timestamp: '2024-03-21 11:00',
  };
  
  const convertTimeZone = (time) => {
    const date = new Date(time);
    const cdtTime = date.toLocaleString('en-US', { timeZone: 'America/Chicago' });
    return cdtTime
  }
  
  const [selectedLeftImage, setSelectedLeftImage] = useState(leftImage);
  const [selectedRightImage, setSelectedRightImage] = useState(rightImage);

  const [lastClickedPosition, setLastClickedPosition] = useState('right');

  const handleImageClick = (image) => {
    const newPosition = lastClickedPosition === 'left' ? 'right' : 'left';
    if (newPosition === 'left') {
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

  const scrollToEnd = () => {
    if (imageBarRef.current) {
      imageBarRef.current.scrollLeft = imageBarRef.current.scrollWidth;
    }
  };
  return (
    <div className="image-view-wrapper">
    
      <div className="zoom-controls">
      <button className="toggle-filter-button" onClick={toggleFilterVisibility}>
                <FontAwesomeIcon icon={filterVisible ? faArrowLeft : faArrowRight} />
        </button>
        <button onClick={toggleSyncImages}>
          <FontAwesomeIcon icon={faSyncAlt} /> {syncImages ? 'Unsync' : 'Sync'} Images
        </button>
        <div className="user-info">
          Logged in as {name}
        </div>
      </div>
    <div className="image-container-wrapper">
    <div className="image-container" style={{ transform: `scale(${zoomLevelLeft})` }}>
    <div className="image-info">
          <h3>{patientName}</h3>
          <h3>ID: {selectedLeftImage.id}</h3>
          <h3>Time: {convertTimeZone(selectedLeftImage.timestamp)}</h3>
        </div>
        <TransformWrapper
        ref={transformComponentLeft}
        onTransformed={handleTransformLeft}>
            <TransformComponent>
                <img src={selectedLeftImage.url} alt="test" />
            </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="divider"></div>
      <div className="image-container" style={{ transform: `scale(${zoomLevelRight})` }}>
      <div className="image-info">
          <h3>{patientName}</h3>
          <h3>ID: {selectedRightImage.id}</h3>
          <h3>Time: {convertTimeZone(selectedRightImage.timestamp)}</h3>
        </div>
        <TransformWrapper
        ref={transformComponentRight}
        onTransformed={handleTransformRight}>
            <TransformComponent>
                <img src={selectedRightImage.url} alt="test" />
            </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
    <div className="image-note">
      Click two images to replace left and right images, scroll to view more past images
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
export default ImageView;