import React from 'react';
import close from '../images/close.svg';

export default class PersonInGroupList extends React.Component {
    render() {
        return (
            <div className="line">
                <div className="col-5">{this.props.username}</div>
                <div className="col-5"><input type="checkbox" /> Admin</div>
                <div className="circle-button" onClick={() => this.props.onRemoveUser(this.props.username)}>
                    <img src={close} alt="Remove user from list" />
                </div>
            </div>
        );
    }
}
