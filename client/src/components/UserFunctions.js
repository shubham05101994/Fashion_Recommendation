
import axios from "axios";
import jwt_decode from "jwt-decode";
export const register = async newUser => {
  try {
     
  const response = await axios
    .post("users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      gender: newUser.gender,
      address:newUser.address,
      email: newUser.email,
      password: newUser.password
    });
    console.log("Registered");
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
};

export const login = async user => {
  try {
    const response = await axios
      .post("users/login", {
        email: user.email,
        password: user.password
      });
  
    const decoded = jwt_decode(response.data);
    localStorage.setItem("usertoken", response.data);
    localStorage.setItem("email", user.email);
    localStorage.setItem("gender", decoded.gender);
   
    return response.data;
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
};

export const passFeatures= async featureData =>{
  const gender = localStorage.getItem("gender");
  try {
    const response = await axios
      .post("featureData/fetchedData", {
        
          extractedData:featureData,
          gender:gender
      })
    
    return response;
  }
  catch (err) {
    console.log("error in fetching data in user function",err);
    alert(err);
  }
};

export const passInstagramFetaures= async featureData =>{
  const gender = localStorage.getItem("gender");
  try {
    const response = await axios
      .post("featureData/instagramFetched", {
        
          extractedData:featureData,
          gender:gender

      })
    
    return response;
  }
  catch (err) {
    console.log("error in fetching data in user function",err);
    alert(err);
  }
};

export const styleIndexImages= async (featureData,styleIndex) =>{
  const gender = localStorage.getItem("gender");
  try {
    const response = await axios
      .post("featureData/styleIndex", {
        
          extractedData:featureData,
          styleIndex:styleIndex,
          gender:gender
        
      })
    
    return response;
  }
  catch (err) {
    console.log("error in fetching data in user function",err);
    alert(err);
  }
};
