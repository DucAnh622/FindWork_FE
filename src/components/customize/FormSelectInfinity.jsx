import React, { useState, useRef, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getLevelStyles } from "../../utils/utils";

export const FormSelectInfinity = ({
  label,
  options,
  data,
  name,
  setData,
  error,
  required,
  setError,
  getList,
  total,
}) => {
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef(null);

  const currentPage = useRef(1);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      await getList({ page: currentPage.current, limit });
      currentPage.current = 2;
      setLoading(false);
    };
    fetchInitialData();
  }, [getList]);

  useEffect(() => {
    if (options.length < total) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    const selectedItem = options.find((option) => option.value === data[name]);
    if (!selectedItem) {
      setData((prev) => ({
        ...prev,
        [name]: options.length > 0 ? options[0].value : "",
      }));
    }
  }, [options, total, data[name], setData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (required) setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = () => {
    if (required && !data[name]) {
      setError((prev) => ({ ...prev, [name]: "This field is required" }));
    }
  };

  const handleScroll = async (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 20;

    if (isBottom && hasMore && !loading && !isLoadingRef.current) {
      isLoadingRef.current = true;
      setLoading(true);
      await getList({ page: currentPage.current, limit });
      currentPage.current += 1;
      setLoading(false);
      isLoadingRef.current = false;
    }
  };

  return (
    <FormControl fullWidth error={required && !!error[name]}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        label={label}
        value={data[name] ?? ""}
        name={name}
        required={required}
        sx={{ height: 56 }}
        onChange={handleChange}
        onBlur={handleBlur}
        MenuProps={{
          PaperProps: {
            ref: listRef,
            onScroll: handleScroll,
            style: { maxHeight: 300 },
          },
        }}
      >
        {options.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            <Typography
              sx={{
                display: "inline-block",
                padding: "4px 12px",
                fontSize: "16px",
                minWidth: "80px",
                textAlign: "center",
                borderRadius: 2,
                ...getLevelStyles(item.label),
              }}
            >
              {item.label}
            </Typography>
          </MenuItem>
        ))}
        {loading && (
          <MenuItem disabled>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Đang tải thêm...
          </MenuItem>
        )}
        {!hasMore && options.length > 0 && (
          <MenuItem disabled>
            <Typography
              sx={{ fontSize: 12, textAlign: "center", padding: "8px 0" }}
            >
              Không còn dữ liệu để tải.
            </Typography>
          </MenuItem>
        )}
      </Select>
      {required && error[name] && (
        <FormHelperText>{error[name]}</FormHelperText>
      )}
    </FormControl>
  );
};
