import React from 'react';
import { ClipLoader } from 'react-spinners';
import './style.css';

export default function PageSpinner({visible}) {
    if (visible)
        return (
            <div className="page-spinner-outter-container">
                <div className="page-spinner-inner-container">
                    <ClipLoader />
                </div>
            </div>
        );
    else
        return null;
}
