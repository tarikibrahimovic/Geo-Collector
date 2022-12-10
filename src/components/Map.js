import { useState, useRef, useEffect, useCallback } from "react"
import { MapContainer, Marker, Popup } from "react-leaflet"
import { useMapEvents } from "react-leaflet"
import ReactLeafletGoogleLayer from "react-leaflet-google-layer"
import { AiOutlineCloseCircle } from "react-icons/ai"
import CloudinaryUploadWidget from "../helpers/CloudinaryUploadWidget"
import "react-image-crop/dist/ReactCrop.css"

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const predictionKey = process.env.REACT_APP_PREDICTION_KEY

function MyComponent({ onSetMarker }) {
  const map = useMapEvents({
    click: (e) => {
      onSetMarker(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

const Map = () => {
  const [markers, setMarkers] = useState([{ id: 1, lat: 51, lng: 20 }])
  const [newMarker, setNewMarker] = useState()
  const [formVisible, setFormVisible] = useState(false)
  const [uploadStep, setUploadStep] = useState(true)

  const [image, setImage] = useState(null)
  const [imageCategory, setImageCategory] = useState(null)

  const mapRef = useRef(null)
  const markerRef = useRef(null)

  const setMarkerHandler = (lat, lng) => {
    if (formVisible) return
    setNewMarker({ lat, lng })
    setFormVisible(true)
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault()
  }

  // const recognizeImage = useCallback(() => {
  //   const file = image
  //   const reader = new FileReader()
  //   reader.readAsDataURL(file)
  //   reader.onloadend = async () => {
  //     const byteCharacters = atob(reader.result.split(",")[1])
  //     const byteNumbers = new Array(byteCharacters.length)
  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i)
  //     }
  //     const byteArray = new Uint8Array(byteNumbers)
  //     const response = await fetch(
  //       "https://customvisionapihakaton-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/7cbbe8e3-461b-490a-8968-b2caedc15115/classify/iterations/Iteration3/image",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/octet-stream",
  //           "Prediction-Key": predictionKey,
  //         },
  //         body: byteArray,
  //       }
  //     )

  //     const data = await response.json()
  //     setImageCategory(data.predictions[0].tagName)
  //   }
  // }, [image])

  const recognizeImage = useCallback(async (imageUrl) => {
    console.log(imageUrl)
    const response = await fetch(
      "https://customvisionapihakaton-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/7cbbe8e3-461b-490a-8968-b2caedc15115/classify/iterations/Iteration3/url",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Prediction-Key": predictionKey,
        },
        body: JSON.stringify({ Url: imageUrl }),
      }
    )

    const data = await response.json()
    console.log(data)
    setImageCategory(data.predictions[0].tagName)
  }, [])

  const imageUploadHandler = (imageUrl) => {
    recognizeImage(imageUrl)
    setUploadStep(false)
  }

  return (
    <div className="App">
      <MapContainer
        zoom={13}
        center={[51.505, -0.09]}
        whenCreated={(map) => {
          mapRef.current = map
        }}
      >
        <ReactLeafletGoogleLayer apiKey={googleMapsApiKey} />
        {markers.map((marker) => (
          <Marker key={marker.id} position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        {newMarker && (
          <Marker
            ref={markerRef}
            position={[newMarker.lat, newMarker.lng]}
          ></Marker>
        )}
        <MyComponent onSetMarker={setMarkerHandler} />
        {formVisible && (
          <div className="form">
            <div className="formHeader">
              <h3>Add new point</h3>
              <AiOutlineCloseCircle
                onClick={() => {
                  setFormVisible(false)
                  setImage(null)
                }}
              />
            </div>

            <div className="formBody">
              {/* {uploadStep && ( */}
              <CloudinaryUploadWidget onImageUpload={imageUploadHandler} />
              {/* )} */}
            </div>
          </div>
        )}
      </MapContainer>
    </div>
  )
}

export default Map
