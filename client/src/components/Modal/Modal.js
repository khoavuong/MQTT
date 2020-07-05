import React from "react";
import styles from "./Modal.module.css";
import Aus from "../../hoc/Aus";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <Aus>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={styles.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aus>
  );
};
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
  );
};
export default React.memo(Modal, areEqual);
