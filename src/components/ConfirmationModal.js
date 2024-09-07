import React, { useEffect, useState } from 'react';
import './ConfirmationModal.css'; // Import the CSS file for modal styling

const ConfirmationModal = ({ isVisible, onClose, onConfirm }) => {
    const [show, setShow] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShow(true);
        } else {
            const timer = setTimeout(() => setShow(false), 300); // Match duration with CSS transition
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!show) return null;

    return (
        <div className={`modal-overlay ${isVisible ? 'modal-show' : 'modal-hide'}`}>
            <div className="modal-content">
                <h2>Confirm Action</h2>
                <p>Are you sure you want to remove this employee?</p>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="confirm-button">Yes</button>
                    <button onClick={onClose} className="cancel-button">No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
