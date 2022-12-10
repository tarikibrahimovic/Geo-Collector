import { useContext, useEffect, useState } from "react";
import { FunctionList } from "../../context/Context";
import classes from "./Profile.module.css";
import Landscape from "../../images/landscape.jpg";
import Avatar from "../../images/avatar.png";
import Modal from "react-modal";
import { NotificationManager } from "react-notifications";
import { Button } from "@mantine/core";
import AOS from "aos";
import "aos/dist/aos.css";
import { FileInput } from "@mantine/core";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#343338",
  },
};


export default function Profile() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newImage, setNewImage] = useState();
  
  const { imageUrl, id, username, email, verifiedAt, token, setImageUrl } =
  useContext(FunctionList);
  
  async function PostImage() {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("ProfilePicture", newImage);
      let res = await axios.put(
        "http://localhost:5000/user/profilepic",
        bodyFormData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      NotificationManager.success("", "Image Succesfully Added!");
      setImageUrl(res.data.pictureUrl);
    } catch (error) {
      NotificationManager.error("", `${error}`);
    }
  }
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    AOS.init();
    window.scrollTo({ top: 0 });
  }, []);

  function afterOpenModal() {}
  return (
    <div className={classes.main}>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <FileInput
          placeholder="Upload files"
          multiple
          className={classes.fileInput}
          onChange={e => {
            setNewImage(e.target.files[0])
          }}
        />
        <div className={classes.btnSelectModal}>
          <Button
            color="teal"
            onClick={(e) => {
              closeModal();
            }}
          >
            Close
          </Button>
          <Button
            color="teal"
            onClick={(e) => {
              closeModal();
              PostImage()
            }}
          >
            Upload
          </Button>
        </div>
      </Modal>
      <img src={Landscape} alt="" className={classes.imgPanel} />
      <div className={classes.info} data-aos="fade-left">
        <div className={classes.avatarCard}>
          <img
            src={imageUrl ? imageUrl : Avatar}
            alt=""
            className={classes.avatar}
            onClick={(e) => {
              openModal();
            }}
          />
          {/* <Avatar
            sx={{
              width: "100px",
              height: "100px",
              backgroundColor: stringToColor(username),
            }}
            alt={username}
            src={imageUrl}
          >
            {username.charAt(0)}
          </Avatar> */}
          {true && (
            <Button
              color="teal"
              className={classes.delImgBtn}
              onClick={(e) => {
                closeModal();
              }}
            >
              Delete Picture
            </Button>
          )}
        </div>

        <div className={classes.usernameContainer}>
          <h1 className={classes.name}>{username}</h1>
        </div>
        <div className={classes.userInfo}>
          <div className={classes.informations}>
            <div className="">
              <b>Username: </b>{" "}
            </div>
            <div className="">{username}</div>
          </div>
          <div className={classes.informations}>
            <div className="">
              <b>ID: </b>
            </div>
            <div className="">{id}</div>
          </div>
          <div className={classes.informations}>
            <div className="">
              <b>Email: </b>
            </div>
            <div className="">{email}</div>
          </div>
          <div className={classes.informations}>
            <div className="">
              <b>Verified At: </b>
            </div>
            <div className="">{verifiedAt?.slice(0, 10)}</div>
          </div>
          <div className={classes.informations}>
            <div className="">
              <b>Active: </b>
            </div>
            <div className="">True</div>
          </div>
        </div>
      </div>
    </div>
  );
}
