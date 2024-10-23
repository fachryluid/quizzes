import { Label } from "flowbite-react";
import { ErrorMessage, Field } from "formik";
import Select from 'react-select';

export default function FormSelect({ name, label, options, afterChange, isMulti = false, ...props }) {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <div>
          <Label htmlFor={name}>{label}</Label>
          <Select
            {...props}
            options={options}
            isMulti={isMulti} // Enable multi-select if needed
            value={
              isMulti
                ? options.filter(option => form.values[name]?.includes(option.value)) // For multi-select, filter selected options
                : options.find(option => option.value === form.values[name]) // For single select, find the selected option
            }
            onChange={(option) => {
              const value = isMulti
                ? option.map(opt => opt.value) // For multi-select, map selected options to values array
                : option.value; // For single select, use the selected option value

              form.setFieldValue(name, value); // Set the form value

              // Call additional afterChange logic if provided
              if (afterChange) {
                afterChange(option);
              }
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'rgb(31 41 55)',
              },
            })}
          />
          <ErrorMessage name={name}>
            {msg => <div className="text-xs text-red-500">{msg}</div>}
          </ErrorMessage>
        </div>
      )}
    </Field>
  );
};