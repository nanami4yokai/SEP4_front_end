import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap'
import './DeleteTerrarium.css'

export default function DeleteTerrarium() {
    const [showModal, setShowModal] = useState(false);

    const deleteTerrarium = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    }

    const handleTerrariumDelete = () => { }

    return (
        <div>
            <div className="delete-terrarium">
                <button id="delete-bttn" onClick={deleteTerrarium}><b>Delete terrarium</b></button>
            </div>

            {/* Delete terrarium Modal */}
            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='fields'>
                        <p>Are you sure you want to delete this terrarium?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className='footerBttns'>
                    <Button id='cancel-btn' variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button id='save-btn' variant="primary" onClick={handleTerrariumDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
