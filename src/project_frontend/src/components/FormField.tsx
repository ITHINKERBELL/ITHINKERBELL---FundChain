import React, { ChangeEvent } from 'react';

interface FormFieldProps {
  id: string;
  labelName?: string;
  placeholder: string;
  inputType: string;
  isTextArea?: boolean;
  disable?: boolean;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ id, labelName, placeholder, inputType, isTextArea, value, handleChange, disable = false }) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">{labelName}</span>
      )}
      {isTextArea ? (
        <textarea
          required
          id={id}
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-[#1f1e1c] text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] caret-[#1f1e1c]"
        />
      ) : (
        <input
          required
          id={id}
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          disabled={disable}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-[#1f1e1c] text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] caret-[#1f1e1c]"
        />
      )}
    </label>
  );
};

export default FormField;
