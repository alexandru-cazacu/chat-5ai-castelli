import React from 'react';
import Button from 'components/common/button';
import './style.css';

export default class ButtonGroup extends React.Component {
    render() {
        var buttons = this.props.buttons.map((button) => {
            return <div
                key={button.label}
                className='button-container'>
                <Button label={button.label} handleClick={button.onClick} />
            </div>;
        });
        return (
            <div className="button-group">
                {buttons}
            </div>
        );
    }
}
