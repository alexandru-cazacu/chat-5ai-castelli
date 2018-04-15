import React from "react";

import "../styles/header-with-drawer.css";

export default class HeaderWithDrawer extends React.Component {

    constructor(props) {
        super(props);

        this.state = { showDrawer: false };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer() {
        this.setState({ showDrawer: !this.state.showDrawer });
    }


    render() {
        var items = this.props.items.map((item) => {
            return (<div className="item">{item}</div>);
        });

        var headerStyle = this.state.showDrawer ? "header drawer" : "header";

        return (
            <div className={headerStyle}>
                <div className="wrapper-header">
                    <i className="material-icons burger" onClick={this.toggleDrawer}>menu</i>
                    <i className="material-icons back" onClick={this.toggleDrawer}>keyboard_backspace</i>
                    <div className="title">Chatty</div>
                    <div className="nav">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}