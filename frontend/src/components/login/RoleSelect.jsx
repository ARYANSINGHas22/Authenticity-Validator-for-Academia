
import React from "react";
import Select from "react-select";

const options = [
  { value: "Employer", label: "Employer" },
  { value: "Administrator", label: "Administrator" },
];

const RoleSelect = ({ role, setRole }) => {
  const handleChange = (selectedOption) => {
    setRole(selectedOption.value);
  };

 

  return (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Login as</label>
    <Select
      options={options}
      value={options.find((o) => o.value === role)}
      onChange={handleChange}
      styles={{
        control: (base) => ({
          ...base,
          padding: "5px",
          borderRadius: "10px",
          border: "2px solid black",
          boxShadow: "none",
          "&:hover": {
            border: "1px solid #888",
          },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#f0f0f0" : "white",
          color: "black",
          cursor: "pointer",
        }),
      }}
    />
  </div>
);

};

export default RoleSelect;
