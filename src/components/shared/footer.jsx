import { Grid, Typography, Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import "../../assets/styles/Footer.scss";
import logo from "../../assets/images/Logo1.jpg";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <Grid container className="footer-list" spacing={3}>
          {/* Company Info Section */}
          <Grid item xs={12} md={3} className="footer-item">
            <div className="footer-info">
              <div className="footer-info-img">
                <img src={logo} alt="TopCV Logo" />
              </div>
              <div className="footer-info-text">
                <Typography variant="h6">Itwork Company</Typography>
                <Typography variant="body2">
                  Business registration code: 0107307178
                  <br />
                  Adddress: @Homes Tower, 69 Tam Trinh, Hoang Mai District, Ha
                  Noi
                  <br />
                  Agency : Dali Tower, 24C Phan Dang Luu, Binh Thanh District,
                  Ho Chi Minh
                </Typography>
              </div>
            </div>
          </Grid>

          {/* About TopCV Section */}
          <Grid item xs={12} md={3} className="footer-item">
            <Typography variant="h6" className="footer-title">
              About us
            </Typography>
            <ul>
              <li>
                <MuiLink component={Link} to="#">
                  Introduce
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  News corner
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Hiring
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Contact
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Q&A
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Privacy policy
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Terms of service
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Operational regulations
                </MuiLink>
              </li>
            </ul>
            <Typography variant="h6" className="footer-title">
              Partner
            </Typography>
            <ul>
              <li>
                <MuiLink component={Link} to="#">
                  TestCenter
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  TopHR
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Jobday
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Happy Time
                </MuiLink>
              </li>
            </ul>
          </Grid>

          {/* CV Guide Section */}
          <Grid item xs={12} md={3} className="footer-item">
            <Typography variant="h6" className="footer-title">
              Support and CV
            </Typography>
            <ul>
              <li>
                <MuiLink component={Link} to="#">
                  Personal CV Management
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Itwork CV Profile
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Instructions for writing a CV
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  CV Template
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Review CV
                </MuiLink>
              </li>
            </ul>
            <Typography variant="h6" className="footer-title">
              Discover
            </Typography>
            <ul>
              <li>
                <MuiLink component={Link} to="#">
                  Itwork App Mobile
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Gross - Net Salary
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Calculate compound interest
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Savings planning
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  One-time social insurance
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  MBTI Test
                </MuiLink>
              </li>
            </ul>
          </Grid>

          {/* Career Building Section */}
          <Grid item xs={12} md={3} className="footer-item">
            <Typography variant="h6" className="footer-title">
              Build a career
            </Typography>
            <ul>
              <li>
                <MuiLink component={Link} to="#">
                  Best job
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  High paying job
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  IT job
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Senior job
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Partime job
                </MuiLink>
              </li>
            </ul>
            <Typography variant="h6" className="footer-title" mt={1}>
              Download App
            </Typography>
            <ul>
              <li>
                <MuiLink component={Link} to="#">
                  <img src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/welcome/download/app_store.png" />
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  <img src="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/welcome/download/chplay.png" />
                </MuiLink>
              </li>
            </ul>
          </Grid>
        </Grid>
      </div>
      <Box className="footer-bottom">
        <Typography variant="body2">
          © 2020-2025 ItWork Vietnam JSC. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};
