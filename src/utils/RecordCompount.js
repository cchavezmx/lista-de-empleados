import React from 'react';
import { captureUserMedia } from './RecordUtils'
import RecordRTC from 'recordrtc'


const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia || navigator.msGetUserMedia);

class RecordCompount extends React.Component{
  constructor(props){
    super(props)
    this.videoElement = React.createRef()

    this.state = {
      recordVideo: null, 
      src: null,
      uploadSucess: null,
      uploading: false,
      img: null 
    }

    this.requestUserMedia = this.requestUserMedia.bind(this)
    this.startRecord = this.startRecord.bind(this)
    this.stopRecord = this.stopRecord.bind(this)
    this.saveFile = this.saveFile.bind(this)

  }

  
  componentDidMount() {

    if(!hasGetUserMedia) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }
    this.requestUserMedia();
  }

  
  requestUserMedia() {
    captureUserMedia((stream) => {
      this.videoElement.current.srcObject = stream
    });

  }
  
  startRecord(){
    
    captureUserMedia((stream) => {  
      const video = RecordRTC(stream, { type: 'video' })
      
      this.setState({ recordVideo: video })
      this.state.recordVideo.startRecording()
      this.videoElement.current.play()

      setTimeout(() => {
        this.stopRecord()
      },100)
      
    })
  }

  saveFile(blob, fileName){

    const reader = new FileReader()
    reader.onload = (event) => {
      localStorage.setItem(fileName, event.target.result )
    }
    reader.readAsDataURL(blob)


    if(this.state.uploading === true ){
      this.props.setNewElement(true)
      this.props.handleClose()
      this.setState({ uploading: false })
    }
    

  }
  

  stopRecord(){
    this.state.recordVideo && this.state.recordVideo.stopRecording(() => {
      let params = {
        type: 'image/jpg',
        data: this.state.recordVideo.blob
      }
      
      this.setState({ uploading: true })
      this.saveFile(params.data, this.props.employeeName )

    })
  }

  render(){
    return(
      <div className="video--container">
        <span></span>
        <video 
          playsInline
          muted
          autoPlay
          ref={this.videoElement}
          style={{ width: '400px'}}
        />

        <button onClick={() => this.startRecord()}>Tomar Foto</button>
      </div>
    )
  }


}



export default RecordCompount