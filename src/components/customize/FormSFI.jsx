import React, { useState, useEffect, useRef } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  FormControl,
  FormHelperText,
  Popper,
} from "@mui/material";
import { formatList, filterOutSelected } from "../../utils/utils";
import { TextClamp } from "../customize/TextClamp";
import { debounce } from "lodash";

export const FormSFI = ({
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
  const [keyword, setKeyword] = useState("");
  const currentPage = useRef(1);
  const totalRecords = useRef(0);

  const mergeUnique = (prev, next) => {
    const existingIds = new Set(prev.map((item) => item.value));
    const filtered = next.filter((item) => !existingIds.has(item.value));
    return [...prev, ...filtered];
  };

  const debouncedSearch = useRef(
    debounce(async (newKeyword) => {
      currentPage.current = 1;
      setHasMore(true);
      setKeyword(newKeyword);
    }, 300)
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getList(currentPage.current, limit, keyword);
        const list = result?.payload?.list || [];
        const formattedList = formatList(list);

        const selectedId = data[name];
        const exists = formattedList.some((item) => item.value === selectedId);

        const filteredList = filterOutSelected(formattedList, selected);

        setInternalOptions([
          ...(selected?.value ? [selected] : []),
          ...filteredList,
        ]);

        if (filteredList.length < limit) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        if (selectedId && !exists && selected?.value !== selectedId) {
          const extraResult = await getList(null, null, selectedId);
          const extraList = extraResult?.payload?.list || [];
          const formattedExtra = formatList(extraList);

          if (formattedExtra.length > 0) {
            setInternalOptions((prev) => mergeUnique(prev, formattedExtra));
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, getList, data[name], selected]);

  const handleScroll = async (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    const isBottom = scrollHeight - scrollTop - clientHeight < 10;

    if (isBottom && !loading && hasMore) {
      setLoading(true);
      try {
        currentPage.current += 1;

        const result = await getList(currentPage.current, limit, keyword);
        const moreList = result?.payload?.list || [];
        const formatted = formatList(moreList);

        if (formatted.length > 0) {
          const filtered = filterOutSelected(formatted, selected);
          setInternalOptions((prev) => mergeUnique(prev, filtered));

          if (formatted.length < limit) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Error loading more data:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (event, value) => {
    const selectedValue = value ? value.value : "";
    setData((prev) => ({ ...prev, [name]: selectedValue }));
    if (required === true) setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = () => {
    if (required === true && !data[name]) {
      setError((prev) => ({ ...prev, [name]: "This field is required" }));
    }
  };

  const handleInputChange = (event, newInputValue) => {
    debouncedSearch.current(newInputValue);
  };

  // Custom Popper to attach scroll event
  const CustomPopper = (props) => {
    const { children, ...other } = props;
    return (
      <Popper {...other}>
        <div
          onScroll={handleScroll}
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {children}
        </div>
      </Popper>
    );
  };

  return (
    <FormControl fullWidth error={required === true && !!error[name]}>
      <Autocomplete
        value={
          internalOptions.find((option) => option.value === data[name]) || null
        }
        onChange={handleChange}
        onBlur={handleBlur}
        options={internalOptions}
        getOptionLabel={(option) => option.label || ""}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        loading={loading}
        onInputChange={handleInputChange}
        disableClearable
        getOptionDisabled={(option) => !option.value}
        PopperComponent={CustomPopper}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.value}>
            <TextClamp title={option.label}>{option.label}</TextClamp>
          </li>
        )}
      />
      {required === true && error[name] && (
        <FormHelperText>{error[name]}</FormHelperText>
      )}
    </FormControl>
  );
};

