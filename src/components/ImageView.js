import React, { useState, useRef }  from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight, faSearchPlus, faSearchMinus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const ImageView = ({ leftImage, rightImage, toggleFilterVisibility, filterVisible }) => {

    const transformComponentLeft = useRef();
    const transformComponentRight = useRef();

  // Example data for demonstration
  const [zoomLevelLeft, setZoomLevelLeft] = useState(1);
  const [zoomLevelRight, setZoomLevelRight] = useState(1);
  const [syncZoom, setSyncZoom] = useState(false);
    // Flags to prevent infinite mutual updates
    const updatingLeft = useRef(false);
    const updatingRight = useRef(false);

    const handleTransformLeft = (e) => {
        if (!updatingRight.current) {
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
        if (!updatingLeft.current) {
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
  leftImage = {
    url: '/images/image.png',
    patientName: 'Jane Doe',
    photoId: '13',
    timestamp: '2024-03-20 10:00',
  };

  rightImage = {
    url: '/images/image.png',
    patientName: 'John Smith',
    photoId: '14',
    timestamp: '2024-03-21 11:00',
  };
  
   // Placeholder past images data
   const pastImages = [
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '1', timestamp: '2024-03-18 09:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '2', timestamp: '2024-03-17 08:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '3', timestamp: '2024-03-16 07:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '4', timestamp: '2024-03-15 06:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '5', timestamp: '2024-03-14 10:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '6', timestamp: '2024-03-13 11:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '7', timestamp: '2024-03-12 12:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '8', timestamp: '2024-03-11 13:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '9', timestamp: '2024-03-10 14:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '10', timestamp: '2024-03-09 15:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '11', timestamp: '2024-03-08 16:00' },
    { url: '/images/image.png', patientName: 'Jane Doe', photoId: '12', timestamp: '2024-03-07 17:00' }
  ];
  

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
        {/* <button onClick={toggleSyncZoom}>
          <FontAwesomeIcon icon={faSyncAlt} /> {s=yncZoom ? 'Unsync' : 'Sync'} Zoom
        </button> */}
      </div>
    <div className="image-container-wrapper">
    <div className="image-container" style={{ transform: `scale(${zoomLevelLeft})` }}>
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
          {pastImages.map((image, index) => (
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