import { MouseEvent, useState, useEffect, Dispatch, SetStateAction } from "react";
interface Props {
    children: string;
    onClick: Dispatch<SetStateAction<boolean>>;
    darkMode: boolean;
}
const Button = ({children, onClick, darkMode}: Props) => {
  return (
    <button type="button" className={darkMode ? "btn btn-light light-dark-mode-btn " : "btn btn-dark light-dark-mode-btn "} onClick={() => onClick(!darkMode)}>{children}</button>
  )
}

export default Button