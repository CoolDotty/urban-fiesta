import React from "react";


interface TextInputProps extends React.HTMLAttributes<HTMLInputElement> {
  
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
