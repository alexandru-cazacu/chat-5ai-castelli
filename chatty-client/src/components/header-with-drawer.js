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
        var items = [];
        if (this.props.links)
            items = this.props.links.map((link, index) =>
                <div className="item" key={index}>
                    {link}
                </div>);
        else if (this.props.items)
            items = this.props.items.map((item, index) =>
                <div
                    key={index}
                    className="item"
                    onClick={item.callback}>
                    <p>{item.name}</p>
                </div>);

        var headerStyle = this.state.showDrawer ? "header drawer" : "header";

        return (
            <div className={headerStyle}>
                <div className="wrapper-header">
                    <i className="material-icons burger" onClick={this.toggleDrawer}>menu</i>
                    <div className="title">Chatty</div>
                    <div className="nav">
                        <i className="material-icons back" onClick={this.toggleDrawer}>keyboard_backspace</i>
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}