export const getRolesStyles = (status) => {
  switch (status) {
    case "Admin":
      return {
        backgroundColor: "#FF3B30",
        color: "#FFFFFF",
      };
    case "Hr":
      return {
        backgroundColor: "#FF9500",
        color: "#FFFFFF",
      };
    case "User":
      return {
        backgroundColor: "#34C759",
        color: "#FFFFFF",
      };
    default:
      break;
  }
};

export const getLevelStyles = (level) => {
  switch (level) {
    case "intern":
      return {
        backgroundColor: "#34C759",
        color: "#FFFFFF",
      };
    case "fresher":
      return {
        backgroundColor: "#007AFF",
        color: "#FFFFFF",
      };
    case "junior":
      return {
        backgroundColor: "#5856D6",
        color: "#FFFFFF",
      };
    case "middle":
      return {
        backgroundColor: "#FFCC00",
        color: "#FFFFFF",
      };
    case "senior":
      return {
        backgroundColor: "#FF9500",
        color: "#FFFFFF",
      };
    case "leader":
      return {
        backgroundColor: "#FF3B30",
        color: "#FFFFFF",
      };
    case "project manager":
      return {
        backgroundColor: "#8E8E93",
        color: "#FFFFFF",
      };
    default:
      break;
  }
};

export const formatSort = (sort) => {
  switch (sort) {
    case "asc":
      return "ASC";
    case "desc":
      return "DESC";
    default:
      return sort;
  }
};

export const formatListData = (list) => {
  return list.map((item) => {
    return {
      id: item.id,
    };
  });
};

export const formatList = (list) => {
  return list.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
};

export const formatListLabel = (list) => {
  return list.map((item) => {
    return {
      value: item.value,
      name: item.label,
    };
  });
};

export const formatDate = (dateString) => {
  return dateString.split("T")[0];
};

export const formatWorkDay = (minDay, maxDay) => {
  const dayLabels = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Morning Saturday",
    7: "Working alternate Saturdays",
    8: "Saturday",
    9: "Sunday",
  };

  const minLabel = dayLabels[minDay];
  const maxLabel = dayLabels[maxDay];

  let workDay = `${minLabel} - ${maxLabel}`;

  if (minDay <= 5 && maxDay >= 6) {
    if (maxDay === "6") {
      workDay += " (Morning Saturday)";
    } else if (maxDay === "7") {
      workDay += " (Working alternate Saturdays)";
    }
  }

  return workDay;
};

export const getMethodStyles = (method) => {
  switch (method) {
    case "delete":
      return {
        backgroundColor: "#FF3B30",
        color: "#FFFFFF",
      };
    case "post":
      return {
        backgroundColor: "#FF9500",
        color: "#FFFFFF",
      };
    case "get":
      return {
        backgroundColor: "#34C759",
        color: "#FFFFFF",
      };
    case "put":
      return {
        backgroundColor: "#007AFF",
        color: "#FFFFFF",
      };
    default:
      break;
  }
};

export const getStatusStyles = (status) => {
  switch (status) {
    case "rejected":
      return {
        backgroundColor: "#FF3B30",
        color: "#FFFFFF",
      };
    case "new":
      return {
        backgroundColor: "#FF9500",
        color: "#FFFFFF",
      };
    case "approved":
      return {
        backgroundColor: "#34C759",
        color: "#FFFFFF",
      };
    case "pending":
      return {
        backgroundColor: "#007AFF",
        color: "#FFFFFF",
      };
    default:
      break;
  }
};

export const concatString = (str1, str2) => {
  return str1 + " - " + str2;
};

export const divideString = (str) => {
  let arr = str.split(" - ");
  return {
    timeWorkStart: arr[0],
    timeWorkEnd: arr[1],
  };
};

export const divideWorkDay = (workDay) => {
  const dayLabels = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Morning Saturday",
    7: "Working alternate Saturdays",
    8: "Saturday",
    9: "Sunday",
  };

  const regex = /([a-zA-Z\s]+) - ([a-zA-Z\s]+)(?: \((.*?)\))?/;

  const match = workDay.match(regex);

  if (match) {
    const minLabel = match[1].trim();
    const maxLabel = match[2].trim();

    const dayWorkStart = Object.keys(dayLabels).find(
      (key) => dayLabels[key] === minLabel
    );

    const dayWorkEnd = Object.keys(dayLabels).find(
      (key) => dayLabels[key] === maxLabel
    );

    if (dayWorkStart && dayWorkEnd) {
      return { dayWorkStart, dayWorkEnd };
    }
  }

  return { dayWorkStart: null, dayWorkEnd: null };
};

export const formatExperience = (number1, number2) => {
  if (number1 === "0" && number2 === "0") {
    return "Under 1 Year";
  }
  if (number1 === "6" && number2 === "6") {
    return "At least 5 Years";
  }
  if (number1 === number2) {
    return `${number1} ${parseInt(number1) === 1 ? "year" : "years"}`;
  }
  if (number1 !== "0" && number2 !== "0") {
    const minLabel = `${
      parseInt(number1) === 1 ? "1 year" : `${number1} years`
    }`;
    const maxLabel = `${
      parseInt(number2) === 1 ? "1 year" : `${number2} years`
    }`;

    return `${minLabel} - ${maxLabel}`;
  }
  return "No required experience";
};

export const formatSalary = (min, max) => {
  if (min === "0" && max === "0") {
    return "Agreement";
  }

  if (min === "0" && max !== "0") {
    return `To ${max}`;
  }

  if (min === max) {
    return `${min}`;
  }

  return `${min} - ${max}`;
};

export const checkTimeRange = (data, nameFrom, nameTo, label) => {
  let errors = {};

  if (!data[nameFrom]) {
    errors[nameFrom] = "This field is required";
  }

  if (!data[nameTo]) {
    errors[nameTo] = "This field is required";
  }

  const timePattern = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

  if (data[nameFrom] && !timePattern.test(data[nameFrom])) {
    errors[nameFrom] =
      "Invalid time format. Please enter a valid time (HH:mm).";
  }

  if (data[nameTo] && !timePattern.test(data[nameTo])) {
    errors[nameTo] = "Invalid time format. Please enter a valid time (HH:mm).";
  }

  if (data[nameFrom] && data[nameTo] && data[nameFrom] >= data[nameTo]) {
    errors[nameFrom] = `From ${label} cannot be greater than to ${label}`;
    errors[nameTo] = `To ${label} cannot be less than from ${label}`;
  }

  return errors;
};

export const checkNumber = (data, name, label, maxLength) => {
  let errors = {};

  if (data[name] === "") {
    errors[name] = "This field is required";
  }

  if (data[name] && (data[name].length < 1 || data[name].length > maxLength)) {
    errors[name] = `Max length of ${label} is 1 to ${maxLength} digits!`;
  }

  if (parseInt(data[name]) === 0) {
    errors[name] = `To ${label} must be at least 1`;
  }

  return errors;
};

export const checkNumberRange = (data, nameFrom, nameTo, label, maxLength) => {
  let errors = {};

  if (data[nameFrom] === "") {
    errors[nameFrom] = "This field is required";
  }

  if (data[nameTo] === "") {
    errors[nameTo] = "This field is required";
  }

  if (
    data[nameFrom] &&
    (data[nameFrom].length < 1 || data[nameFrom].length > maxLength)
  ) {
    errors[nameFrom] = `Max length of ${label} is 1 to ${maxLength} digits!`;
  }

  if (
    data[nameTo] &&
    (data[nameTo].length < 1 || data[nameTo].length > maxLength)
  ) {
    errors[nameTo] = `Max length of ${label} is 1 to ${maxLength} digits!`;
  }

  if (parseInt(data[nameFrom]) === 0 && parseInt(data[nameTo]) === 0) {
    errors[nameTo] = `To ${label} must be at least 1`;
  }

  if (
    data[nameFrom] &&
    data[nameTo] &&
    parseInt(data[nameFrom]) > parseInt(data[nameTo])
  ) {
    errors[nameFrom] = `From ${label} cannot be greater than to ${label}`;
    errors[nameTo] = `To ${label} cannot be less than from ${label}`;
  }

  return errors;
};

export const divideSalary = (salaryString) => {
  if (salaryString === "Agreement") {
    return { minSalary: "0", maxSalary: "1" };
  }

  if (salaryString.startsWith("Up to")) {
    const maxSalary = salaryString.replace("Up to", "").trim();
    return { minSalary: "0", maxSalary };
  }

  if (salaryString.startsWith("To")) {
    const maxSalary = salaryString.replace("To", "").trim();
    return { minSalary: "0", maxSalary };
  }

  const match = salaryString.match(/^(\d+)\s*-\s*(\d+)$/);
  if (match) {
    const minSalary = match[1];
    const maxSalary = match[2];
    return { minSalary, maxSalary };
  }

  return { minSalary: salaryString, maxSalary: salaryString };
};

export const divideExperience = (experienceString) => {
  if (experienceString.startsWith("Under")) {
    return { minExperience: "0", maxExperience: "0" };
  }

  if (experienceString === "At least 5 Years") {
    return { minExperience: "6", maxExperience: "6" };
  }

  const match = experienceString.match(
    /^(\d+)\s*year(s)?\s*-\s*(\d+)\s*year(s)?$/i
  );
  if (match) {
    const minExperience = match[1];
    const maxExperience = match[3];
    return { minExperience, maxExperience };
  }

  const experienceWithoutYears = experienceString.replace(/\s*years?$/, "");
  return {
    minExperience: experienceWithoutYears,
    maxExperience: experienceWithoutYears,
  };
};

export const hasValue = (value) => {
  return (
    value !== undefined && value !== null && value !== "" && value.length !== 0
  );
};

export const formatDay = (date) => {
  if (!date || !date.includes("-")) return "";
  const [year, month] = date.split("-");
  return `${month}/${year}`;
};
