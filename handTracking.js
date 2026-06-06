// Hand tracking state
let detector = null;
let video = null;
let isDetecting = false;
let sendHandsCallback = null;

async function setupHandTracking(videoElement, sendHands) {
  video = videoElement;
  sendHandsCallback = sendHands;

  try {
    // ── FIX: Use ideal constraints so mobile cameras aren't rejected ──
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: "user",   // front camera on mobile
      },
    });

    video.srcObject = stream;
    await video.play();

    const model = window.handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: "mediapipe",
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915",
      maxHands: 2,
      modelType: "full",
    };

    detector = await window.handPoseDetection.createDetector(model, detectorConfig);

    console.log("Hand tracking initialized successfully");
    return true;
  } catch (error) {
    console.error("Error setting up hand tracking:", error);
    return false;
  }
}

function startDetection() {
  if (!detector || !video) {
    console.error("Hand tracking not initialized");
    return;
  }
  isDetecting = true;
  detectHands();
}

function stopDetection() {
  isDetecting = false;
}

async function detectHands() {
  if (!isDetecting) return;

  try {
    const hands = await detector.estimateHands(video);

    // ── FIX: Use actual video dimensions for coordinate mapping ──
    // video.videoWidth/Height reflects the real camera resolution,
    // which may differ from our requested 640x480 on some devices.
    const videoW = video.videoWidth || 640;

    const handPositions = hands.map((hand) => {
      const palmBase = [0, 5, 9, 13, 17].map((i) => hand.keypoints[i]);
      const avgX = palmBase.reduce((sum, kp) => sum + kp.x, 0) / palmBase.length;
      const avgY = palmBase.reduce((sum, kp) => sum + kp.y, 0) / palmBase.length;

      return {
        x: videoW - avgX,   // mirror using actual video width
        y: avgY,
      };
    });

    if (sendHandsCallback) {
      sendHandsCallback(handPositions);
    }
  } catch (error) {
    console.error("Error detecting hands:", error);
  }

  setTimeout(() => detectHands(), 33);
}

window.handTracking = {
  setupHandTracking,
  startDetection,
  stopDetection,
};
