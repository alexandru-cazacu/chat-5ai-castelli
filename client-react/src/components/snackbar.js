import React from 'react';
import '../styles/snackbar.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Snackbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isShown: false };
        setTimeout(() => this.show(), 10);
    }

    show() { this.setState({ isShown: true }); }
    hide() { this.setState({ isShown: false }); }
    componentWillLeave() { this.hide(); }

    render() {
        setTimeout(() => this.hide(), 5000);

        return (
            <div className={this.state.isShown ? 'snackbar' : 'snackbar hidden'}>
                <p className="text">{this.props.text}</p>
            </div>
        );
    }
}
