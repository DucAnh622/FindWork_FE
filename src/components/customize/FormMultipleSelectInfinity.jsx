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

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const result = await getList(page, limit);
      const list = result?.payload?.list || [];
      const formattedList = list.map((item) => ({
        value: item.id,
        label: item.name,
      }));

      const mergedList = mergeSelectedAndFetched(
        selected.length > 0 ? selected : [],
        formattedList
      );

      const uniqueList = Array.from(
        new Map(mergedList.map((item) => [item.value, item])).values()
      );

      setInternalOptions((prev) => {
        const map = new Map(prev.map((item) => [item.value, item]));
        uniqueList.forEach((item) => map.set(item.value, item));
        return Array.from(map.values());
      });

      if (list.length < limit) setHasMore(false);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage.current);
  }, [getList, selected && selected.length > 0 && selected]);

  const handleScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isBottom && !loading && hasMore) {
      currentPage.current += 1;
      await fetchData(currentPage.current);
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
          <MenuItem
            key={`${option.value}-${option.label}`}
            value={option.value}
          >
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
