import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CuAsssigned } from "./cuAssigned";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRoleRedux } from "../../../redux/slices/roleSlice";
import { CircularWithValueLabel } from "../../../components/customize/loading";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Assigned = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const list = useSelector((state) => state.role?.arrRole);
  const isLoading = useSelector((state) => state.role?.isLoading);

  const getList = async () => {
    dispatch(await getAllRoleRedux());
  };

  useEffect(() => {
    getList();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading === true ? (
        <CircularWithValueLabel />
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {list &&
                list.length > 0 &&
                list.map((item, index) => {
                  return (
                    <Tab label={item.name} {...a11yProps(index)} key={index} />
                  );
                })}
            </Tabs>
          </Box>
          {list &&
            list.length > 0 &&
            list.map((item, index) => {
              return (
                <CustomTabPanel value={value} index={index} key={index}>
                  <CuAsssigned id={item.id} />
                </CustomTabPanel>
              );
            })}
        </>
      )}
    </Box>
  );
};
