import { Alert } from "react-bootstrap";

const Message = ({ variant = "top", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
