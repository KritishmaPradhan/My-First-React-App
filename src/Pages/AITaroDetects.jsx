import { useState, useEffect, useRef } from 'react';
import './AITaroDetects.css';

export default function AITaroDetects() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detectedFaces, setDetectedFaces] = useState(0);
  const [error, setError] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);
  const animationRef = useRef(null);
  const classifierRef = useRef(null);

  useEffect(() => {
    const setupFaceDetection = async () => {
      try {
        // Check if OpenCV is already loaded
        if (window.cv && window.cv.Mat) {
          console.log('✅ OpenCV already loaded');
          startDetection();
          return;
        }

        // Load OpenCV.js only if not already loaded
        const script = document.createElement('script');
        script.src = 'https://docs.opencv.org/4.5.2/opencv.js';
        script.async = true;
        
        script.onload = () => {
          console.log('✅ OpenCV.js loaded');
          
          // Wait a bit for OpenCV to fully initialize
          setTimeout(() => {
            if (window.cv && window.cv.Mat) {
              console.log('✅ OpenCV ready');
              startDetection();
            }
          }, 500);
        };
        
        script.onerror = () => {
          console.error('Failed to load OpenCV.js');
          setError('Failed to load OpenCV.js library');
        };
        
        // Check if script already exists to prevent duplicates
        if (!document.querySelector(`script[src="${script.src}"]`)) {
          document.head.appendChild(script);
        }
      } catch (err) {
        console.error('Setup error:', err);
        setError(err.message || 'Failed to initialize face detection');
      }
    };

    const startDetection = async () => {
      try {
        // Get camera access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false
        });
        
        const video = videoRef.current;
        video.srcObject = stream;
        
        video.onloadedmetadata = () => {
          video.play();
          
          const canvas = canvasRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          console.log('✅ Camera ready, starting detection...');
          setIsLoading(false);
          detectFaces();
        };
      } catch (cameraErr) {
        console.error('Camera error:', cameraErr);
        setError('Failed to access camera. Please check permissions.');
      }
    };

    setupFaceDetection();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleCamera = () => {
    if (cameraActive) {
      // Turn off camera
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      setDetectedFaces(0);
      setCameraActive(false);
      console.log('📷 Camera turned OFF');
    } else {
      // Turn on camera
      setCameraActive(true);
      setIsLoading(true);
      const video = videoRef.current;
      
      navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false
      })
      .then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          const canvas = canvasRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          setIsLoading(false);
          console.log('✅ Camera turned ON');
          
          if (classifierRef.current) {
            detectFaces();
          }
        };
      })
      .catch(err => {
        console.error('Failed to access camera:', err);
        setError('Failed to access camera. Please check permissions.');
        setCameraActive(false);
      });
    }
  };

  const detectFaces = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cv = window.cv;

    // Create matrices
    const src = new cv.Mat(canvas.height, canvas.width, cv.CV_8UC4);
    const gray = new cv.Mat();
    const faces = new cv.RectVector();
    
    // Load Haar Cascade classifier
    const classifier = new cv.CascadeClassifier();
    classifierRef.current = classifier;
    
    const cascadeUrl = 'https://raw.githubusercontent.com/opencv/opencv/master/data/haarcascades/haarcascade_frontalface_default.xml';
    
    // Fetch cascade data as text
    fetch(cascadeUrl)
      .then(response => response.text())
      .then(cascadeXml => {
        try {
          // Write to OpenCV's virtual filesystem
          const fs = cv.FS;
          fs.writeFile('/cascade.xml', cascadeXml);
          
          // Load from virtual filesystem
          classifier.load('/cascade.xml');
          console.log('✅ Cascade classifier loaded');
          
          // Start detection after cascade is loaded
          const detect = () => {
            // Stop if camera is turned off
            if (!cameraActive) {
              return;
            }

            try {
              // Check if video has data
              if (video.readyState !== video.HAVE_ENOUGH_DATA) {
                animationRef.current = requestAnimationFrame(detect);
                return;
              }

              // Draw video frame to canvas
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

              // Get image data from canvas
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              
              // Convert to OpenCV Mat
              src.data.set(imageData.data);
              
              // Convert to grayscale
              cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
              
              // Detect faces
              classifier.detectMultiScale(gray, faces, 1.1, 3, 0);

              // Draw detected faces
              const faceCount = faces.size();
              setDetectedFaces(faceCount);

              for (let i = 0; i < faceCount; i++) {
                const face = faces.get(i);

                // Draw yellow rectangle
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 4;
                ctx.strokeRect(face.x, face.y, face.width, face.height);

                // Draw label background
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(face.x, face.y - 30, 120, 25);

                // Draw label text
                ctx.fillStyle = '#000000';
                ctx.font = 'bold 16px Arial';
                ctx.fillText('Face Detected', face.x + 10, face.y - 10);
              }

              animationRef.current = requestAnimationFrame(detect);
            } catch (err) {
              console.error('Detection error:', err);
            }
          };

          detect();
        } catch (loadErr) {
          console.error('Cascade load error:', loadErr);
          setError('Failed to initialize cascade classifier');
        }
      })
      .catch(err => {
        console.error('Failed to fetch cascade:', err);
        setError('Failed to download face cascade classifier');
      });
  };

  if (error) {
    return (
      <div className="ai-taro-detects-container">
        <div className="ai-taro-detects-wrapper">
          <div className="ai-taro-header">
            <h1>❌ Error</h1>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-taro-detects-container">
      <div className="ai-taro-detects-wrapper">
        {/* Header */}
        <div className="ai-taro-header">
          <h1>AI Taro Face Detection</h1>
          <p>Real-time face detection using OpenCV.js</p>
        </div>

        {/* Video Container */}
        <div className="video-container">
          {/* Hidden video element */}
          <video
            ref={videoRef}
            className="video-element"
            width="640"
            height="480"
            style={{ display: 'none' }}
          />

          {/* Canvas for drawing detection results */}
          <canvas
            ref={canvasRef}
            className="detection-canvas"
          />

          {/* Loading indicator */}
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <p>Loading OpenCV and face detection model...</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="stats-container">
          <div className="stat">
            <span className="stat-label">Faces Detected:</span>
            <span className="stat-value">{detectedFaces}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Status:</span>
            <span className="stat-value">
              {isLoading ? 'Initializing' : cameraActive ? '🟢 Active' : '⛔ Off'}
            </span>
          </div>
        </div>

        {/* Camera Toggle Button */}
        <div className="camera-controls">
          <button 
            onClick={toggleCamera}
            className={`camera-toggle-btn ${cameraActive ? 'active' : 'inactive'}`}
          >
            {cameraActive ? '📷 Turn OFF Camera' : '📷 Turn ON Camera'}
          </button>
        </div>
      </div>
    </div>
  );
}
