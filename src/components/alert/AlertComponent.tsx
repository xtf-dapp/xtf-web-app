import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import './AlertComponent.css'

function AlertComponent(props: any) {
    return (
        <div style={{ position: "absolute", top: 10, right: 0, zIndex: 999, width: 500 }}>
            <Alert
                variant="danger"
                show={props.show}
                onClose={() => props.setShowAlert(false)}
                className="alert-slide-right"
                dismissible
            >
                <Alert.Heading>{props.title}</Alert.Heading>
                <p>{props.body}</p>
            </Alert>
        </div>
    );
}

export default AlertComponent;