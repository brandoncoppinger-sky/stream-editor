import React from 'react';
import { Toast } from 'react-bootstrap';
import '../styles/toast.css'

export const Toastie = ({toggleToast, shouldShowToast, message}) => (
    <>
        <Toast className="toaster" onClose={toggleToast} show={shouldShowToast} delay={7000} autohide>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Stream-Editor</strong>
            </Toast.Header>
            <Toast.Body>
                {message}
          </Toast.Body>
        </Toast>
    </>
) 