import Landscape from "../../images/landscape.jpg";
import classes from "./Home.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Layerstack from "../../images/layerstack.png";
import Overview from "../../images/overview.png";
import { Button } from "@mantine/core";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

export default function Home() {

  useEffect(() => {
    AOS.init();
    window.scrollTo({ top: 0});
  }, []);

  const navigate = useNavigate()


  return (
    <>
      <div className={`${classes.panelContainer}`}>
        <div className={`${classes.imgPanel}`}>
          <img src={Landscape} alt="" className={`${classes.panel}`} />
        </div>
        <div className={`${classes.panelTitleContainer}`}>
          <div className={`${classes.cont}`}>
            <h1 className={`${classes.panelTitle}`} data-aos="fade-right">
              WELCOME TO GEO COLLECTOR
            </h1>
            <Button
              variant="outline"
              color="teal"
              size="lg"
              data-aos="fade-left"
              className={`${classes.btn}`}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 730, behavior: "smooth" });
              }}
            >
              See More
            </Button>
          </div>
        </div>
      </div>

      <div className={`${classes.info1}`}>
        <div className={`${classes.infoHalf}`} data-aos="fade-right">
          <img src={Layerstack} alt="nesto" className={classes.imgInfo} />
        </div>
        <div className={`${classes.infoHalf1}`} data-aos="fade-left">
          <h1>What are we All About!</h1>
          <p className={classes.infoPar}>
            We are all about showing relevant informations about places where
            our beloved users are our engine. We provide opportunity for our
            users to update, set and browse through our base of interesting and
            rare plants, buildings important for history and culture.
          </p>
        </div>
      </div>
      <div className={`${classes.info2}`}>
        <div className={`${classes.infoHalf1}`} data-aos="fade-right">
          <h1>Maps</h1>
          <p className={classes.infoPar}>
            Maps are the geographic container for the data layers and analytics
            you want to work with. GIS maps are easily shared and embedded in
            apps, and accessible by virtually everyone, everywhere.
          </p>
        </div>
        <div className={classes.infoHalf} data-aos="fade-left">
          <img src={Overview} alt="" className={classes.imgInfo1} />
        </div>
      </div>
      <div className={classes.info3}>
            <h1 className={classes.final} data-aos="fade-left">See What We Have Done!</h1>
            <Button color="teal" data-aos="fade-right" onClick={() => {
              navigate('/map')
            }}>Go to Maps!</Button>  
      </div>
    </>
  );
}
