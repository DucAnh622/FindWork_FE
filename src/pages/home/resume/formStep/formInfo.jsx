import { Grid, Box, Typography, InputLabel } from "@mui/material";
import { FormInput } from "../../../../components/customize/FormInput";
import { FormImage } from "../../../../components/customize/FormImage";
import { FormEditor } from "../../../../components/customize/FormEditor";
import { useState } from "react";

const FormInfo = ({ formData, setFormData }) => {
  const errorDefault = {
    fullname: "",
    email: "",
    phone: "",
    address: "",
    github: "",
    target: "",
    skill: "",
    description: "",
  };

  const [error, setError] = useState(errorDefault);

  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            Infomation
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <FormInput
            label="Fullname"
            placeholder="Fullname..."
            maxLength={100}
            type="text"
            name="fullname"
            data={formData}
            setData={(newData) =>
              setFormData({ ...formData, fullname: newData.fullname})
            }
            error={error}
            setError={setError}
            required
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <FormInput
            label="Email"
            placeholder="Email..."
            maxLength={100}
            type="email"
            name="email"
            data={formData}
            setData={(newData) =>
              setFormData({ ...formData, email: newData.email})
            }
            error={error}
            setError={setError}
            required
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <FormInput
            label="Address"
            placeholder="Address..."
            maxLength={100}
            type="text"
            name="address"
            data={formData}
            setData={(newData) =>
              setFormData({ ...formData, address: newData.address })
            }
            error={error}
            setError={setError}
            required
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            label="Phone"
            placeholder="Phone..."
            maxLength={10}
            type="number"
            name="phone"
            data={formData}
            setData={(newData) =>
              setFormData({ ...formData, phone: newData.phone })
            }
            error={error}
            setError={setError}
            required
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <FormImage
            label="Avatar"
            data={formData}
            setData={(newData) =>
              setFormData({ ...formData, image: newData.image })
            }
            error={error}
            setError={setError}
            type="text"
            required={false}
            maxLength={500}
            name="image"
            placeholder="image..."
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            label="Github"
            data={formData}
            setData={(newData) =>
              setFormData({ ...formData, github: newData.github })
            }
            error={error}
            setError={setError}
            type="text"
            required
            maxLength={500}
            name="github"
            placeholder="Github..."
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <FormInput
            label="Target"
            data={formData}
            setData={(newData) =>
              setFormData({ ...formData, target: newData.target })
            }
            error={error}
            setError={setError}
            type="text"
            required
            maxLength={500}
            name="target"
            placeholder="Target..."
          />
        </Grid>

        <Grid item xs={12}>
          <InputLabel sx={{ mb: 2, textAlign: "left" }}>
            <strong>Skill</strong>
          </InputLabel>
          <FormEditor
            name="skill"
            data={formData}
            setData={(newData) =>
              setFormData({ ...formData, skill: newData.skill })
            }
            error={error}
            setError={setError}
          />
        </Grid>

        <Grid item xs={12}>
          <InputLabel sx={{ mb: 2, textAlign: "left" }}>
            <strong>Description</strong>
          </InputLabel>
          <FormEditor
            name="description"
            data={formData}
            setData={(newData) =>
              setFormData({ ...formData, description: newData.description })
            }
            error={error}
            setError={setError}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormInfo;
