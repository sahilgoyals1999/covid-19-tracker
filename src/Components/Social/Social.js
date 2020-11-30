import React from 'react'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import {
	Paper,
  Typography
} from "@material-ui/core";

const Social = () => {
	return (
		<Paper className="social_main">
		<center>
		 <Typography variant="h4">Contact Me</Typography>
		</center>
		<div className="social">
			<a
			 style={{ color: '#0e76a8'}} 
			 href="https://www.linkedin.com/in/sahil-goyal-138b96175/">
			 <LinkedInIcon colorAction fontSize='large'/>
			</a>
			<a
			 style={{ margin: '0 8px', color: '#333'}} 
			 href="https://github.com/sahilgoyals1999">
			 <GitHubIcon fontSize='large'/>
			</a>
			<a
			 style={{ margin: '0 8px', color: '#E1306C'}} 
			 href="https://www.instagram.com/sahil.goyal25/">
			 <InstagramIcon fontSize='large'/>
			</a>
			<a
			 style={{ margin: '0 8px', color: '#3b5998'}} 
			 href="https://m.facebook.com/sahil.goyal.35762">
			 <FacebookIcon fontSize='large'/>
			</a>
			</div>
			<center>
			&copy; Copyright 2020
			</center>
		</Paper>
	)
}

export default Social;