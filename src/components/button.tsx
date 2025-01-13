import { ReactNode } from "react";

interface buttonProp {
  children?: ReactNode;
  className?: string;
 onClick(): void;
}
const Button = ({ children,onClick,className }: buttonProp) => {
  return (
    <>
      <button
        type="button"
        className={`btn btn-primary ${className || ""}`} //dynamic className updating syntax
         onClick={onClick}
      >
        {children}
      </button>


    </>
  );
};

export default Button;
