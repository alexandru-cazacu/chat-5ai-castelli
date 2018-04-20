import React from 'react';
import { ClipLoader } from 'react-spinners';
import './style.css';

export default function CardSpinner({ visible }) {
    if (visible)
        return (
            <div className="card-spinner-outter-container">
                <div className="card-spinner-inner-container">
                    <ClipLoader />
                </div>
            </div>
        );
    else
        return null;
}
