import { ReactNode } from "react";

interface AlertProp {
  children: ReactNode;
  className?: ReactNode;
  role?: string;

}

const Alert = (props: AlertProp) => {
  return <div className="alert alert-primary" >
    {props.children}
    </div>;
};

export default Alert;
 