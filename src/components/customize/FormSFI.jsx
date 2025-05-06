import React, { useState, useEffect, useRef } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { formatList, filterOutSelected } from "../../utils/utils";
import { TextClamp } from "../customize/TextClamp";
import { debounce } from "lodash";

const CustomListboxComponent = React.forwardRef(function CustomListboxComponent(
  props,
  ref
) {
  const { children, onScroll, ...other } = props;

  return (
    <ul
      {...other}
      ref={ref}
      onScroll={(event) => {
        if (onScroll) onScroll(event);
      }}
      style={{ maxHeight: 300, overflowY: "auto" }}
    >
      {children}
    </ul>
  );
});

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
  const [internalOptions, setInternalOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState("");
  const currentPage = useRef(1);

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

        let updatedOptions = formattedList;
        const selectedId = data[name];

        // Fetch the selected item if it exists and isn't in the current list
        if (
          selectedId &&
          !formattedList.some((item) => item.value === selectedId)
        ) {
          const extraResult = await getList(null, null, selectedId);
          const extraList = extraResult?.payload?.list || [];
          const formattedExtra = formatList(extraList);
          if (formattedExtra.length > 0) {
            updatedOptions = mergeUnique(formattedList, formattedExtra);
          }
        }

        // Set options, ensuring no duplicates
        setInternalOptions(updatedOptions);
        setHasMore(list.length >= limit);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, getList]);

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
          setInternalOptions((prev) => mergeUnique(prev, formatted));
          setHasMore(formatted.length >= limit);
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
    if (required) setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = () => {
    if (required && !data[name]) {
      setError((prev) => ({ ...prev, [name]: "This field is required" }));
    }
  };

  const handleInputChange = (event, newInputValue) => {
    debouncedSearch.current(newInputValue);
  };

  return (
    <FormControl fullWidth error={required && !!error[name]}>
      <Autocomplete
        value={
          internalOptions.find((option) => option.value === data[name]) || null
        }
        onChange={handleChange}
        onBlur={handleBlur}
        options={internalOptions}
        getOptionLabel={(option) => option.label || ""}
        isOptionEqualToValue={(option, value) => option.value === value?.value}
        loading={loading}
        onInputChange={handleInputChange}
        disableClearable
        openOnFocus
        getOptionDisabled={(option) => !option.value}
        ListboxComponent={(listboxProps) => (
          <CustomListboxComponent {...listboxProps} onScroll={handleScroll} />
        )}
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
      {required && error[name] && (
        <FormHelperText>{error[name]}</FormHelperText>
      )}
    </FormControl>
  );
};

// import React, { useState, useEffect } from "react";
// import {
//   Autocomplete,
//   TextField,
//   CircularProgress,
//   FormControl,
//   FormHelperText,
// } from "@mui/material";
// import { formatList } from "../../utils/utils";
// import { TextClamp } from "../customize/TextClamp";

// export const FormSFI = ({
//   label,
//   data,
//   name,
//   setData,
//   error,
//   required,
//   setError,
//   selected,
//   getList,
// }) => {
//   const [loading, setLoading] = useState(true);
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const result = await getList(1, 9999, "");
//       if (result?.payload?.list) {
//         setList(result.payload.list);
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [getList]);

//   const handleAutocompleteChange = (event, newValue) => {
//     setData((prevData) => ({
//       ...prevData,
//       [name]: newValue,
//     }));

//     if (required === true && !newValue) {
//       setError((prevError) => ({
//         ...prevError,
//         [name]: `${label} is required.`,
//       }));
//     } else {
//       setError((prevError) => {
//         const { [name]: removedError, ...rest } = prevError;
//         return rest;
//       });
//     }
//   };

//   return (
//     <FormControl fullWidth error={required === true && !!error[name]}>
//       <Autocomplete
//         options={formatList(list || [])}
//         loading={loading}
//         value={data[name] || selected}
//         onChange={handleAutocompleteChange}
//         renderInput={(params) => (
//           <>
//             <TextField
//               {...params}
//               label={`${label} *`}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: required === true && error[name] ? "red" : "",
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: required === true && error[name] ? "red" : "",
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: required === true && error[name] ? "red" : "",
//                   },
//                 },
//                 "& .MuiInputLabel-root": {
//                   color: required === true && error[name] ? "red" : "",
//                 },
//                 "& .MuiInputLabel-root.Mui-focused": {
//                   color: required === true && error[name] ? "red" : "",
//                 },
//               }}
//             />
//             {loading && <CircularProgress size={24} />}
//           </>
//         )}
//       />
//       {required === true && error[name] && (
//         <FormHelperText>{error[name]}</FormHelperText>
//       )}
//     </FormControl>
//   );
// };
