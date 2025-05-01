import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { TextField, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import useDebounce from "./Debounce"; 

export default function FormFilterInfinity({
  data,
  setData,
  name,
  label,
  getList,
  selected,
  error,
  required,
  setError,
}) {
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const listRef = useRef(null);

  const fetchData = async (reset = false, pageParam = 1, search = "") => {
    setLoading(true);
    const res = await getList(pageParam, 10, search);
    const items = res?.data || [];
    setOptions((prev) => (reset ? items : [...prev, ...items]));
    setHasMore(items.length > 0);
    setLoading(false);
  };

  useDebounce(() => {
    setPage(1);
    fetchData(true, 1, inputValue);
  }, [inputValue]);

  const handleScroll = (event) => {
    const listboxNode = event.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = listboxNode;

    if (scrollHeight - scrollTop <= clientHeight + 100 && hasMore && !loading) {
      const nextPage = page + 1;
      fetchData(false, nextPage, inputValue);
      setPage(nextPage);
    }
  };

  const handleChange = (event, newValue) => {
    if (newValue) {
      setData((prev) => ({
        ...prev,
        [name]: newValue.id,
        [`${name.replace("Id", "")}`]: newValue.name,
      }));
      if (setError) setError((prev) => ({ ...prev, [name]: false }));
    }
  };

  return (
    <Autocomplete
      value={selected || null}
      onChange={handleChange}
      onInputChange={(e, value) => {
        setInputValue(value);
      }}
      loading={loading}
      options={options}
      getOptionLabel={(option) => option.name || ""}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          error={!!error?.[name]}
          helperText={error?.[name]}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      ListboxProps={{
        onScroll: handleScroll,
        ref: listRef,
        style: { maxHeight: 300, overflow: "auto" },
      }}
    />
  );
}

FormFilterInfinity.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  getList: PropTypes.func.isRequired,
  selected: PropTypes.object,
  error: PropTypes.object,
  required: PropTypes.bool,
  setError: PropTypes.func,
};
