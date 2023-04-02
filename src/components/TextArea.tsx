import React from "react";


interface TextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  
}


const TextArea: React.FC<TextAreaProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <textarea
      {...rest}
    />
  )
};

export default TextArea;
