import { useState, useEffect } from "react";
import {
  Button,
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { FormInput } from "./FormInput";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "../../assets/styles/FormImage.scss";

export const FormImage = ({
  label,
  data,
  name,
  setData,
  error,
  setError,
  type,
  required,
  maxLength,
  placeholder,
}) => {
  const [imageType, setImageType] = useState("link");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (imageType === "link" && data[name]) {
      setSelectedImage(data[name]);
    }
  }, [imageType, data, name]);

  const handleImageTypeChange = (event) => {
    setImageType(event.target.value);
    setSelectedImage(null);
    if (event.target.value === "link") {
      setData({ ...data, [name]: "" });
    } else {
      setData({ ...data, [name]: selectedImage });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      setData({ ...data, [name]: file });
    }
  };

  return (
    <div className="formImage">
      <div className="formImageItem type">
        <RadioGroup row value={imageType} onChange={handleImageTypeChange}>
          <FormControlLabel value="link" control={<Radio />} label="Link" />
          <FormControlLabel value="upload" control={<Radio />} label="Upload" />
        </RadioGroup>
      </div>
      <div className="formImageItem option">
        {imageType === "link" ? (
          <Box sx={{ width: "100%" }}>
            <FormInput
              label={label}
              placeholder={placeholder}
              maxLength={maxLength}
              type={type}
              name={name}
              data={data}
              setData={setData}
              error={error}
              setError={setError}
              required={required}
            />
          </Box>
        ) : (
          <div className="formImageUpload">
            <Button variant="contained" component="label" color="info">
              <label htmlFor="Poster" className="text-justify big">
                Upload
              </label>
              <input
                hidden
                type="file"
                className="form-control"
                id="Poster"
                placeholder="Poster"
                onChange={handleImageUpload}
              />
            </Button>
            {selectedImage && (
              <div className="preview">
                <Zoom>
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    style={{ cursor: "pointer" }}
                  />
                </Zoom>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
