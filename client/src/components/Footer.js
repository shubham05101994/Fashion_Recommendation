import React, { Component } from "react";
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <footer class="page-footer font-small blue" style={{backgroundColor:'#455a64',color:'white',width:'100%',position:'absolute',bottom:'0'}}>

        <div class="text-center" style={{paddingTop:'0.5%',paddingBottom:'0.5%'}}>© 2021 Copyright: Fashion Recommendation Project
          {/* <a href="https://crackillusion.com" style={{color:'white',textDecoration:'underline'}}> crackillusion.com</a> */}
        </div>
       
      
      </footer> );
    }
}
 
export default Footer;