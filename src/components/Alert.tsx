import { ReactNode } from "react";

interface AlertProp {
  children: ReactNode;
}

const Alert = (props: AlertProp) => {
  return <div className="alert alert-primary">
    {props.children}
    </div>;
};

export default Alert;
 