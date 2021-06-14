export function captureUserMedia(callback) {
  
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: {
        ideal: 800
      },
      height: {
        ideal: 600
      },
      frameRate: {
        ideal: 30
      },
      facingMode: 'environment'
    }
  }).then(stream => {
    callback(stream)
  }).catch(err => console.log(err))
}
