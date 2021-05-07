import React, { Component } from "react";
import Footer from "./Footer";
class Landing extends Component {
  render() {
    return (
      <div className="">
        <div className="jumbotron color_back mt-4">
          <div className="col-sm-8 mx-auto">
            <h4 className="text-center">WELCOME TO</h4>
            <div>
            <h1 className="text-center name_app"><img src="flash.png" alt="Smiley face" height="42" width="42"></img>Fashion Recommendation Application</h1>
            </div>
          </div>
        </div>
        <div className="jumbotron mt-4" style={{marginLeft:'16%',marginRight:'16%'}}>
          <div className="col-sm-8 mx-auto">
            <p>**NOTE: Short Feature List:</p>
            <p className="">1. Application provides an Feature Extraction of user uploaded images</p>
            <p className="">2. User can see which features have been fetched.</p>
            <p className="">3. User authentication is required</p>
            <p className="">4. User Registration/Login</p>
            <p className="">5. User upload photos</p>
            <p className="">6. Elastic search implementation</p>
            <p className="">7. Flask and Node as backend</p>
            <p className="">8. React and reducx as frontend and middleware</p>
            <p className="">9. Instagram trending recommendation </p>
            <p className="">10. Style Index based recommendation</p>
            {/* <p className="">11. </p>
            <p className="">12. </p> */}
            {/* <p className="">13. </p>
            <p className="">14. </p>
            <p className="">15. </p>
            <p className="">16. </p>
            <p className="">17. </p>
            <p className="">18. </p> */}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Landing;
