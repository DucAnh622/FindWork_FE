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

export const FormSelectInfinity = ({
  label,
  options,
  setOptions,
  data,
  name,
  setData,
  error,
  required,
  setError,
  getList,
}) => {
  const limit = 10; // Giới hạn số lượng items mỗi lần tải
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Kiểm tra có còn dữ liệu để tải
  const currentPage = useRef(1); // Lưu trang hiện tại
  const listRef = useRef(null);

  // Lần đầu tiên tải dữ liệu (Page 1)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getList(currentPage.current, limit); // Lấy dữ liệu page 1
        if (data.length > 0) {
          setOptions(data); // Cập nhật options với dữ liệu nhận được
          if (data.length < limit) {
            setHasMore(false); // Nếu dữ liệu ít hơn limit, thì không còn dữ liệu
          }
          currentPage.current = 2; // Cập nhật page sau khi tải thành công page 1
        } else {
          setHasMore(false); // Không có dữ liệu ban đầu
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Gọi hàm tải dữ liệu ban đầu
  }, []); // Chỉ chạy một lần khi component mount

  // Hàm xử lý khi cuộn tới cuối danh sách
  const handleScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10; // Kiểm tra người dùng cuộn tới cuối

    if (isBottom && !loading && hasMore) {
      setLoading(true);
      try {
        const data = await getList(currentPage.current, limit); // Gọi API lấy dữ liệu trang tiếp theo

        // Kiểm tra nếu dữ liệu là một mảng và có dữ liệu hợp lệ
        if (Array.isArray(data) && data.length > 0) {
          setOptions((prev) => [...prev, ...data]); // Nối thêm dữ liệu vào options
          currentPage.current += 1; // Cập nhật trang
          if (data.length < limit) {
            setHasMore(false); // Nếu dữ liệu ít hơn limit, không tải thêm nữa
          }
        } else {
          setHasMore(false); // Nếu không còn dữ liệu
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu thêm:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Hàm xử lý khi thay đổi giá trị
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (required) setError((prev) => ({ ...prev, [name]: "" }));
  };

  // Hàm kiểm tra khi blur (mất focus)
  const handleBlur = () => {
    if (required && !data[name]) {
      setError((prev) => ({ ...prev, [name]: "This field is required" }));
    }
  };

  // Đảm bảo giá trị chọn hợp lệ khi options thay đổi
  useEffect(() => {
    const selected = options.find((option) => option.value === data[name]);
    if (!selected && options.length > 0) {
      setData((prev) => ({
        ...prev,
        [name]: options[0].value, // Nếu không có giá trị đã chọn, chọn giá trị đầu tiên
      }));
    }
  }, [options, data[name], name, setData]);

  return (
    <FormControl fullWidth error={required && !!error[name]}>
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
        {options.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            <Typography>{item.label}</Typography>
          </MenuItem>
        ))}
        {loading && (
          <MenuItem disabled>
            <CircularProgress size={20} sx={{ marginRight: 1 }} />
            Đang tải thêm...
          </MenuItem>
        )}
        {!hasMore && options.length > 0 && (
          <MenuItem disabled>
            <Typography>Không còn dữ liệu để tải.</Typography>
          </MenuItem>
        )}
      </Select>
      {required && error[name] && (
        <FormHelperText>{error[name]}</FormHelperText>
      )}
    </FormControl>
  );
};
