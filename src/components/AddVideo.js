import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

const Addvideo = () => {
    return (
        <div>
            <Modal.Dialog id="modal_add_video">
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

            <Modal.Body>
                 <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default Addvideo;
