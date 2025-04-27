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
import { formatList, filterOutSelected } from "../../utils/utils";
import { TextClamp } from "../customize/TextClamp";

export const FormSelectInfinity = ({
  label,
  data,
  name,
  setData,
  error,
  required,
  setError,
  selected,
  getList,
}) => {
  const limit = 10;
  const [internalOptions, setInternalOptions] = useState(
    selected && selected.value ? [selected] : []
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const currentPage = useRef(1);
  const listRef = useRef(null);

  const mergeUnique = (prev, next) => {
    const existingIds = new Set(prev.map((item) => item.value));
    const filtered = next.filter((item) => !existingIds.has(item.value));
    return [...prev, ...filtered];
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getList(currentPage.current, limit);
        const list = result?.payload?.list || [];
        const formattedList = formatList(list);

        const selectedId = data[name];
        const exists = formattedList.some((item) => item.value === selectedId);

        const filteredList = filterOutSelected(formattedList, selected);

        setInternalOptions([
          ...(selected?.value ? [selected] : []),
          ...filteredList,
        ]);

        if (filteredList.length < limit) setHasMore(false);

        if (selectedId && !exists && selected?.value !== selectedId) {
          const extraResult = await getList(null, null, selectedId);
          const extraList = extraResult?.payload?.list || [];
          const formattedExtra = formatList(extraList);

          if (formattedExtra.length > 0) {
            setInternalOptions((prev) => mergeUnique(prev, formattedExtra));
          }
        }
      } catch (err) {
        console.error("Error fetching initial data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getList, data[name]]);

  const handleScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isBottom && !loading && hasMore) {
      setLoading(true);
      try {
        const result = await getList(currentPage.current + 1, limit);
        const moreList = result?.payload?.list || [];
        const formatted = formatList(moreList);

        const filtered = filterOutSelected(formatted, selected);

        setInternalOptions((prev) => mergeUnique(prev, filtered));
        currentPage.current += 1;
        if (filtered.length < limit) setHasMore(false);
      } catch (err) {
        console.error("Error loading more data:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (required === true) setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = () => {
    if (required === true && !data[name]) {
      setError((prev) => ({ ...prev, [name]: "This field is required" }));
    }
  };

  return (
    <FormControl fullWidth error={required === true && !!error[name]}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        value={data[name] ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        label={label}
        required={required}
        sx={{ height: 56 }}
        MenuProps={{
          PaperProps: {
            ref: listRef,
            onScroll: handleScroll,
            style: { maxHeight: 300 },
          },
        }}
      >
        {internalOptions.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            <TextClamp title={item.label}>{item.label}</TextClamp>
          </MenuItem>
        ))}

        {loading && (
          <MenuItem disabled>
            <CircularProgress size={20} sx={{ marginRight: 1 }} />
            Loading...
          </MenuItem>
        )}

        {!loading && !hasMore && internalOptions.length === 0 && (
          <MenuItem disabled>
            <Typography>No data available.</Typography>
          </MenuItem>
        )}
      </Select>
      {required === true && error[name] && (
        <FormHelperText>{error[name]}</FormHelperText>
      )}
    </FormControl>
  );
};
