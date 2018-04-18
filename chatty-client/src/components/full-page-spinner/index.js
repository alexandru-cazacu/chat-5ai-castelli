import React from "react";
import { ClipLoader } from "react-spinners";
import "./style.css";

export default class FullPageSpinner extends React.Component {
    render() {
        if (this.props.isVisible)
            return (
                <div className="spinner-container">
                    <ClipLoader
                        loading={true}
                    />
                </div>
            );
        else
            return null;
    }
}
