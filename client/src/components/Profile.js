import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import {
  passFeatures,
  passInstagramFetaures,
  styleIndexImages,
} from "./UserFunctions";
import "./sh.css";

let file = "";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileDetails: null,
      imageFlag: false,
      featureDetails: [],
      confidence: [],
      blurFlag: false,
      recommendationImages: [],
      instagramImages: [],
      styleIndexImages: [],
      styleIndex: "high",
      nameStyleIndex: "Select",
      rImageFlag: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      fileDetails: event.target.files[0],
      imageFlag: true,
      featureDetails: [],
    });
  };

  handleSelectChange = (e) => {
    debugger;
    let check = e.value;
    console.log(e.value);
    const high = "blue or green or red or fuchsia or purple";
    const mid = "yellow or aqua or teal or olive or lime";
    const low = "grey or white or silver";
    let passString = "";
    if (check === "high") {
      passString = high;
      this.setState({ nameStyleIndex: e.label });
    } else if (check === "medium") {
      passString = mid;
      this.setState({ nameStyleIndex: e.label });
    } else {
      passString = low;
      this.setState({ nameStyleIndex: e.label });
    }
    styleIndexImages(this.state.featureDetails, passString)
      .then((res) => {
        this.setState({ styleIndexImages: res.data });
      })
      .catch((err) => {
        console.log("Some thing went wrong", err);
      });
  };
  imageUpload = () => {
    const formData = new FormData();
    this.setState({ blurFlag: true });
    this.setState({ featureDetails: [], styleIndexImages:[] });
    console.log(this.state.fileDetails);
    const l1 = this.state.fileDetails;

    formData.append("image", l1);
    console.log(formData);
    axios
      .post(
        "http://ec2-34-237-52-87.compute-1.amazonaws.com:5000/detect",
        formData,
        {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": "multipart/form-data",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Allow-Credentials": "*",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data && Object.keys(response.data).length === 0) {
          alert("Please upload new photo");
          this.setState({ file: null, fileDetails: null, blurFlag: false });
          return null;
        } else {
          this.setState({
            featureDetails: response.data,
            blurFlag: false,
          });
          //Normal recommendation
          passFeatures(this.state.featureDetails)
            .then((res) => {
              this.setState({
                recommendationImages: res.data,
                rImageFlag: true,
              });
            })
            .catch((err) => {
              console.log("Some thing went wrong", err);
            });
          //Instagram Fetched
          passInstagramFetaures(this.state.featureDetails)
            .then((res) => {
              this.setState({ instagramImages: res.data });
            })
            .catch((err) => {
              console.log("Some thing went wrong", err);
            });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    const {
      featureDetails,
      blurFlag,
      recommendationImages,
      instagramImages,
      styleIndexImages,
      rImageFlag,
    } = this.state;
    console.log(featureDetails);
    const options = [
      { value: "high", label: "Party" },
      { value: "medium", label: "Moderate" },
      { value: "low", label: "Casual" },
    ];
    return (
      <div>
        <div className="container">
          {blurFlag && (
            <div className="">
              <div class="justify-content-center spinnerLoading">
                <div
                  class="spinner-border text-success"
                  style={{ display: "block" }}
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
                <span
                  style={{
                    fontSize: "larger",
                    fontWeight: 600,
                    marginLeft: "-30%",
                    color: "#34eb34",
                  }}
                >
                  Feature Extracting....
                </span>
              </div>
            </div>
          )}
          <div className={blurFlag ? "blurDiv" : ""}>
            <div
              className="container text-center"
              style={{ marginTop: 15, marginBottom: "1%" }}
            >
              Welcome to Fashion recommendation system
            </div>
            {/* <input type="file" onChange={this.handleChange} /> */}
            <div style={{ display: "flex", maxHeight: "500px" }}>
              <div class="card col-md-6" style={{ width: "18rem" }}>
                <div class="card-body">
                  <input
                    id="file"
                    type="file"
                    name="file"
                    accept="image/png, image/jpeg"
                    onChange={this.handleChange}
                    ref={(input) => {
                      file = input;
                    }}
                    multiple
                  />
                  {this.state.imageFlag && (
                    <div className="text-center" style={{ marginTop: "20%" }}>
                      <button
                        type="button"
                        class="btn btn-success"
                        style={{ cursor: "pointer" }}
                        onClick={this.imageUpload}
                      >
                        Upload Photo
                      </button>
                    </div>
                  )}

                  {this.state.fileDetails && (
                    <div className="detailsAlign">
                      <p>
                        <b>Filename:</b> {this.state.fileDetails.name}
                      </p>
                      <p>
                        <b>File type:</b> {this.state.fileDetails.type}
                      </p>
                      <p>
                        <b>File size:</b> {this.state.fileDetails.size} bytes
                      </p>
                      <p>
                        <b>File type:</b> {this.state.fileDetails.type}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div class="col-md-6">
                <img className="img_preview" src={this.state.file} />
              </div>
              {/* <div class="card col-md-4 height_adjust">
              <div class="card-body">
                <div class="card-text">
                  {featureDetails && (
                    <pre>{JSON.stringify(featureDetails, null, 2)}</pre>
                  )}
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
        <div>
          {rImageFlag && (
            <h2
              className="col-md-12"
              style={{ textAlign: "center", padding: "5%" }}
            >
              Images for recommendation
            </h2>
          )}
          <div
            className="col-md-12"
            style={{ display: "flex", overflowX: "auto", width: "98%" }}
          >
            {recommendationImages &&
              recommendationImages.map((res) => {
                return (
                  // className="col-md-3"
                  <div>
                    <img src={res} style={{ height: "500px" }} />
                  </div>
                );
              })}
          </div>
        </div>

        <div>
          {rImageFlag && (
            <h2
              className="col-md-12"
              style={{ textAlign: "center", padding: "5%" }}
            >
              Instagram Trending Image
            </h2>
          )}
          <div
            className="col-md-12"
            style={{ display: "flex", overflowX: "auto", width: "98%" }}
          >
            {instagramImages &&
              instagramImages.map((res) => {
                return (
                  <div>
                    <img src={res} style={{ height: "500px" }} />
                  </div>
                );
              })}
          </div>
        </div>

        {rImageFlag && (
          <div style={{ padding: "5%" }}>
            <div style={{ display: "flex", marginLeft: "31%" }}>
              <h2
                style={{
                  textAlign: "center",
                  paddingRight: "5%",
                  paddingBottom: "5%",
                }}
              >
                {this.state.nameStyleIndex} Recommendation
              </h2>

              <Select
                style={{ width: "10%" }}
                options={options}
                onChange={this.handleSelectChange}
              />
            </div>

            <div
              className="col-md-12"
              style={{ display: "flex", overflowX: "auto", width: "98%" }}
            >
              {styleIndexImages &&
                styleIndexImages.map((res) => {
                  return (
                    <div>
                      <img src={res} style={{ height: "500px" }} />
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
