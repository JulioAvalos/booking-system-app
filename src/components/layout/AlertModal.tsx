import {Snackbar} from "@mui/material";
import {createPortal} from "react-dom";
import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";

export default function AlertModal() {

    const {isOpen, closeModal, modalMessage} = useContext(AuthContext);

    return (
        createPortal(<Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            autoHideDuration={3000}
            open={isOpen}
            onClose={closeModal}
            message={modalMessage}
        />, document.body)
    )
}
