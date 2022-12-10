import { useState, useRef, useEffect, useCallback } from "react"
import { MapContainer, Marker, Popup } from "react-leaflet"
import { useMapEvents } from "react-leaflet"
import ReactLeafletGoogleLayer from "react-leaflet-google-layer"
import { AiOutlineCloseCircle } from "react-icons/ai"
import CloudinaryUploadWidget from "../helpers/CloudinaryUploadWidget"
import "react-image-crop/dist/ReactCrop.css"
import "./Map.css"

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
  const [markers, setMarkers] = useState([])
  const [newMarker, setNewMarker] = useState()
  const [formVisible, setFormVisible] = useState(false)
  const [uploadStep, setUploadStep] = useState(true)

  const [image, setImage] = useState(null)
  const [imageCategory, setImageCategory] = useState(null)

  const [description, setDescription] = useState("")
  const [name, setName] = useState("")

  const mapRef = useRef(null)
  const markerRef = useRef(null)

  const setMarkerHandler = (lat, lng) => {
    if (formVisible) return
    setNewMarker({ lat, lng })
    setFormVisible(true)
  }

  useEffect(() => {
    ;(async () => {
      const response = await fetch("http://localhost:5000/markers")
      const data = await response.json()
      console.log(data)
      setMarkers(data.markers)
    })()
  }, [])

  const formSubmitHandler = async (e) => {
    e.preventDefault()
    const jwt = localStorage.getItem("token")
    const response = await fetch("http://localhost:5000/markers/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({
        latitude: newMarker.lat,
        longitude: newMarker.lng,
        description,
        image,
        category: imageCategory,
        name,
      }),
    })

    const data = await response.json()
    setMarkers([...markers, data])
    setImage(null)
    setUploadStep(true)
    setFormVisible(false)
    setNewMarker(null)
    setDescription("")
    setName("")
  }

  const recognizeImage = useCallback(async (imageUrl) => {
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
    setImage(imageUrl)
    recognizeImage(imageUrl)
    setUploadStep(false)
  }

  return (
    <div className="App">
      <MapContainer
        zoom={13}
        center={[43.140968115348436, 20.51682776212692]}
        whenCreated={(map) => {
          mapRef.current = map
        }}
      >
        <ReactLeafletGoogleLayer apiKey={googleMapsApiKey} />
        {markers.map((marker) => (
          <Marker
            key={marker._id}
            position={[marker.latitude, marker.longitude]}
          >
            <Popup>{marker.description}</Popup>
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
                  setUploadStep(true)
                }}
              />
            </div>

            <div className="formBody">
              {uploadStep && (
                <CloudinaryUploadWidget onImageUpload={imageUploadHandler} />
              )}
              {!uploadStep && (
                <form onSubmit={formSubmitHandler} className="mapForm">
                  <img src={image} alt="slika" />
                  <p>Category: {imageCategory}</p>
                  <div>
                    <label>Name</label> <br />
                    <textarea
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Description</label> <br />
                    <textarea
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      cols={15}
                      rows={5}
                    />
                  </div>
                  <button type="submit">Add Marker</button>
                </form>
              )}
            </div>
          </div>
        )}
      </MapContainer>
    </div>
  )
}

export default Map
