import React, { useState, useRef, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Typography,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { mergeSelectedAndFetched } from "../../utils/utils";

export const FormMultipleSelectInfinity = ({
  label,
  data,
  name,
  setData,
  error,
  required,
  setError,
  selected = [],
  getList,
}) => {
  const limit = 10;
  const [internalOptions, setInternalOptions] = useState(
    selected.length > 0 ? [...selected] : []
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const currentPage = useRef(1);
  const listRef = useRef(null);

  const selectedValues = data[name] || [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getList(currentPage.current, limit);
        const list = result?.payload?.list || [];
        const formattedList = list.map((item) => ({
          value: item.id,
          label: item.name,
        }));

        const mergedList = mergeSelectedAndFetched(
          selected.length > 0 ? selected : [],
          formattedList
        );

        setInternalOptions(mergedList);

        if (formattedList.length < limit) setHasMore(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getList]);

  const handleScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isBottom && !loading && hasMore) {
      setLoading(true);
      try {
        const result = await getList(currentPage.current + 1, limit);
        const moreList = result?.payload?.list || [];
        const formatted = moreList.map((item) => ({
          value: item.id,
          label: item.name,
        }));

        // Dùng hàm mergeSelectedAndFetched để gộp selected và dữ liệu mới
        const mergedList = mergeSelectedAndFetched(
          selected.length > 0 ? selected : [],
          formatted
        );
        // Cập nhật lại danh sách internalOptions
        setInternalOptions((prev) => [
          ...prev,
          ...mergedList.slice(prev.length),
        ]); // Thêm phần tử mới vào cuối mảng
        currentPage.current += 1;
        if (formatted.length < limit) setHasMore(false);
      } catch (err) {
        console.error("Error loading more data:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (event) => {
    const values = event.target.value;
    setData((prev) => ({ ...prev, [name]: values }));
    if (required) setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = () => {
    if (required && (!data[name] || data[name].length === 0)) {
      setError((prev) => ({ ...prev, [name]: "This field is required" }));
    }
  };

  return (
    <FormControl fullWidth error={required && !!error[name]}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        multiple
        value={selectedValues}
        onChange={handleChange}
        onBlur={handleBlur}
        label={label}
        MenuProps={{
          PaperProps: {
            ref: listRef,
            onScroll: handleScroll,
            style: { maxHeight: 300 },
          },
        }}
        renderValue={(selected) => {
          const selectedLabels = internalOptions
            .filter((opt) => selected.includes(opt.value))
            .map((opt) => opt.label);
          return selectedLabels.join(", ");
        }}
      >
        {internalOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={selectedValues.includes(option.value)} />
            <Typography>{option.label}</Typography>
          </MenuItem>
        ))}

        {loading && (
          <MenuItem disabled>
            <CircularProgress size={20} sx={{ marginRight: 1 }} />
            Loading...
          </MenuItem>
        )}
      </Select>
      {required && error[name] && (
        <FormHelperText>{error[name]}</FormHelperText>
      )}
    </FormControl>
  );
};
