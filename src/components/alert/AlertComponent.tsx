import React from 'react';
import { Alert } from 'react-bootstrap';

function AlertComponent(props: any) {
    return (
        <div style={{ position: "absolute", top: 10, right: 0, zIndex: 10000, width: 500 }}>
            <Alert
                variant={props.variant ? props.variant : "danger"}
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