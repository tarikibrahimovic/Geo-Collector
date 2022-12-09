import "./App.css"
import { useState, useRef, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useMapEvents } from "react-leaflet"
import ReactLeafletGoogleLayer from "react-leaflet-google-layer"
import { AiOutlineCloseCircle } from "react-icons/ai"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

function MyComponent({ onSetMarker }) {
  const map = useMapEvents({
    click: (e) => {
      onSetMarker(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

function App() {
  const [markers, setMarkers] = useState([{ id: 1, lat: 51, lng: 20 }])
  const [newMarker, setNewMarker] = useState()
  const [formVisible, setFormVisible] = useState(false)

  const [image, setImage] = useState()

  const mapRef = useRef(null)
  const markerRef = useRef(null)

  const setMarkerHandler = (lat, lng) => {
    if (formVisible) return
    setNewMarker({ lat, lng })
    setFormVisible(true)
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault()
    const response = await fetch(
      "https://customvisionapihakaton-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/7cbbe8e3-461b-490a-8968-b2caedc15115/classify/iterations/Iteration3/image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Prediction-Key": "187bb31a1691400f81d36d2df6512fa8",
        },
        body: image,
      }
    )

    const data = await response.json()
    console.log(data)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      // setImage(reader.result)

      // take reader.result and make it a byte array
      const byteCharacters = atob(reader.result.split(",")[1])
      // const byteCharacters = new Buffer.from(
      //   reader.result.split(",")[1],
      //   "base64"
      // )
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      setImage(byteArray)
    }
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
              <h3>Add new marker</h3>
              <AiOutlineCloseCircle
                onClick={() => {
                  setFormVisible(false)
                }}
              />
            </div>

            <div className="formBody">
              <form onSubmit={formSubmitHandler}>
                <label>Image</label>

                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageUpload}
                />

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}
      </MapContainer>
    </div>
  )
}

export default App
