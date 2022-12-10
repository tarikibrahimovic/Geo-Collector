import { useContext, useState } from "react";
import { FunctionList } from "../../context/Context";
import classes from "./Profile.module.css";
import Landscape from "../../images/landscape.jpg";
import Avatar from "../../images/avatar.png";
import Modal from "react-modal";
import { NotificationManager } from "react-notifications";
import { Button } from "@mantine/core";

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

  const { imageUrl, id, username, email, verifiedAt } =
    useContext(FunctionList);
  //   let verifiedAt = localStorage.getItem('verifiedAt')

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
        <label for="file_input">Upload file</label>
        <input
          id="file_input"
          type="file"
          onChange={(e) => {
            if (e.target.files[0]) setNewImage(e.target.files[0]);
            else {
              NotificationManager.error("", "Uploud something!");
            }
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
            }}
          >
            Upload
          </Button>
        </div>
      </Modal>
      <img src={Landscape} alt="" className={classes.imgPanel} />
      <div className={classes.info}>
        <img
          src={imageUrl ? imageUrl : Avatar}
          alt=""
          className={classes.avatar}
          onClick={(e) => {
            openModal();
          }}
        />
        {true && (<Button
            color="teal"
            className={classes.delImgBtn}
            onClick={(e) => {
              closeModal();
            }}
          >
            Delete Picture
          </Button>)}
        <div className={classes.usernameContainer}>
          <h3 className={classes.username}>{username}</h3>
        </div>
        <div className={classes.userInfo}>
          <div className={classes.left}>
            <div className={classes.informations}>
              <div className=""><b>Username: </b> </div>
              <div className="">{username}</div>
            </div>
            <div className={classes.informations}>
              <div className=""><b>ID: </b></div>
              <div className="">{id}</div>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.informations}>
              <div className=""><b>Email: </b></div>
              <div className="">{email}</div>
            </div>
            <div className={classes.informations}>
              <div className=""><b>Verified At: </b></div>
              <div className="">{verifiedAt}</div>
            </div>
            <div className={classes.informations}>
              <div className=""><b>Active: </b></div>
              <div className="">True</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
