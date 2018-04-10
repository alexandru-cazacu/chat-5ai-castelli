import React from 'react';
import Button from './button';
import '../styles/button-group.css';

export default class ButtonGroup extends React.Component {
    render() {
        var buttons = this.props.buttons.map((button) => {
            return <Button key={button.value} value={button.value} onClick={button.callback} />;
        });
        return (
            <div className="button-group">
                {buttons}
            </div>
        );
    }
}
