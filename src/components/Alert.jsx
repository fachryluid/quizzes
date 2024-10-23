import { Alert as FlowbiteAlert } from "flowbite-react";
import { HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineInformationCircle, HiOutlineXCircle } from "react-icons/hi";

export default function Alert({ color = 'info', message, onDismiss }) {
  const icons = {
    success: HiOutlineCheckCircle,
    failure: HiOutlineXCircle,
    info: HiOutlineInformationCircle,
    warning: HiOutlineExclamationCircle,
  };

  if (!message) {
    return;
  }

  return (
    <FlowbiteAlert
      color={color}
      icon={icons[color] || icons['info']}
      onDismiss={onDismiss}
    >
      <span>{message}</span>
    </FlowbiteAlert>
  );
}