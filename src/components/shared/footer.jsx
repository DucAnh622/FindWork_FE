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
                <Typography variant="h6">
                  Công ty Cổ phần ItWork Việt Nam
                </Typography>
                <Typography variant="body2">
                  Mã số ĐKDN: 0107307178
                  <br />
                  Đăng ký kinh doanh số: 47 Nguyễn Tuân, P. Thanh Xuân Trung, Q.
                  Thanh Xuân, Hà Nội
                  <br />
                  Chi nhánh HCM: Tòa nhà Dali, 24C Phan Đăng Lưu, P.7, Q. Bình
                  Thạnh, TP. HCM
                </Typography>
              </div>
            </div>
          </Grid>

          {/* About TopCV Section */}
          <Grid item xs={12} md={3} className="footer-item">
            <Typography variant="h6" className="footer-title">
              Về ItWork
            </Typography>
            <ul>
              <li>
                <MuiLink component={Link} to="#">
                  Giới thiệu
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Góc báo chí
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Tuyển dụng
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Liên hệ
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Hỏi đáp
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Chính sách bảo mật
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Điều khoản dịch vụ
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Quy chế hoạt động
                </MuiLink>
              </li>
            </ul>
            <Typography variant="h6" className="footer-title">
              Đối tác
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
                  ViecNgay
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
              Hỗ trợ và CV
            </Typography>
            <ul>
              <li>
                <MuiLink component={Link} to="#">
                  Quản lý CV cá nhân
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  TopCV Profile
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Hướng dẫn viết CV
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Thư viện CV theo ngành nghề
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Review CV
                </MuiLink>
              </li>
            </ul>
            <Typography variant="h6" className="footer-title">
              Khám phá
            </Typography>
            <ul>
              <li>
                <MuiLink component={Link} to="#">
                  Ứng dụng di động TopCV
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Tình lương Gross - Net
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Tính lãi suất kép
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Lập kế hoạch tiết kiệm
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Tình bảo hiểm xã hội một lần
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Trắc nghiệm MBTI
                </MuiLink>
              </li>
            </ul>
          </Grid>

          {/* Career Building Section */}
          <Grid item xs={12} md={3} className="footer-item">
            <Typography variant="h6" className="footer-title">
              Xây dựng sự nghiệp
            </Typography>
            <ul>
              <li>
                <MuiLink component={Link} to="#">
                  Việc làm tốt nhất
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Việc làm lương cao
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Việc làm IT
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Việc làm Senior
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="#">
                  Việc làm bán thời gian
                </MuiLink>
              </li>
            </ul>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box className="footer-bottom">
          <Typography variant="body2">
            © 2020-2025 ItWork Vietnam JSC. All rights reserved.
          </Typography>
        </Box>
      </div>
    </div>
  );
};
