import React, { Component } from "react"

let a = 0

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    a++
    // console.log(a)
    const cloudName = "dxqmgmmlx" // replace with your own cloud name
    const uploadPreset = "uobzglyj" // replace with your own upload preset

    // Remove the comments from the code below to add
    // additional functionality.
    // Note that these are only a few examples, to see
    // the full list of possible parameters that you
    // can add see:
    //   https://cloudinary.com/documentation/upload_widget_reference

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: false, //restrict upload to a single file
        // folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        clientAllowedFormats: ["jpg", "png", "jpeg"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          myWidget.close()
          myWidget.minimize()
          myWidget.isMinimized = false

          myWidget.hide()
          this.props.onImageUpload(result.info.secure_url, myWidget)
        }
      }
    )
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open()
      },
      false
    )
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    )
  }
}

export default CloudinaryUploadWidget
