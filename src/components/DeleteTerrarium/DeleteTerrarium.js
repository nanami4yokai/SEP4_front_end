// import React, { useState } from "react";
// import { Modal, Button } from 'react-bootstrap'
// import './DeleteTerrarium.css'

// export default function DeleteTerrarium({ terrariumId }) {
//     const [showModal, setShowModal] = useState(false);

//     const deleteTerrarium = () => {
//         setShowModal(true);
//     };

//     const handleModalClose = () => {
//         setShowModal(false);
//     }

//     const handleTerrariumDelete = () => {
//         const token = localStorage.getItem('jwtToken');
//         const xhr = new XMLHttpRequest();
//         xhr.open('DELETE', 'https://terrasense-service-dot-terrasense.ew.r.appspot.com/terrarium/delete');
//         xhr.setRequestHeader('Authorization', `Bearer ${token}`);
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === XMLHttpRequest.DONE) {
//                 if (xhr.status === 200) {
//                     console.log('Terrarium deleted');
//                 } else {
//                     console.error('Failed to delete terrarium');
//                 }
//             }
//         };
//         xhr.send(JSON.stringify({ terrariumId: terrariumId }));
//     }

//     return (
//         <div>
//             <div className="delete-terrarium">
//                 <button id="delete-bttn" onClick={deleteTerrarium}><b>Delete terrarium</b></button>
//             </div>

//             {/* Delete terrarium Modal */}
//             <Modal show={showModal} onHide={handleModalClose} centered data-testid="confirmation-modal">
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirmation</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div className='fields'>
//                         <p>Are you sure you want to delete this terrarium?</p>
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer className='footerBttns'>
//                     <Button id='cancel-btn' variant="secondary" onClick={handleModalClose}>
//                         Cancel
//                     </Button>
//                     <Button id='save-btn' variant="primary" onClick={handleTerrariumDelete}>
//                         Yes
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     )
// }



import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap'
import './DeleteTerrarium.css'
import axios from "axios";
import { API_ENDPOINTS } from "../../config";

export default function DeleteTerrarium({terrariumId}) {
    const [showModal, setShowModal] = useState(false);

    const deleteTerrarium = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    }

    const handleTerrariumDelete = async () => { 
        try {
            const token = localStorage.getItem('jwtToken'); 
            if (!token) {
                console.error('JWT token not found');
                return;
            }
             const config = {
             headers: {
            'Authorization': `Bearer ${token}`
             }
            };
            const response = await axios.delete(API_ENDPOINTS.delete, 
                { ...config, params: { terrariumId } }
            );

            if (response.status === 200) {
                console.log('Terrarium deleted');
                setShowModal(false);
            } else {
                console.error('Failed to delete terrarium');
            }
            
        } catch (error) {
            console.error('Error deleting terrarium:', error);
        }
        
    }

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
