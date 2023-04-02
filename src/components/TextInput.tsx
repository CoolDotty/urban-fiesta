import React from "react";


interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  
}


const TextInput: React.FC<TextInputProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <input 
      {...rest}
    />
  )
};

export default TextInput;
