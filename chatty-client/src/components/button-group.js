import React from 'react';
import Button from 'components/common/button';
import '../styles/button-group.css';

export default class ButtonGroup extends React.Component {
    render() {
        var buttons = this.props.buttons.map((button) => {
            return <div key={button.value} className='button-container'><Button value={button.value} onClick={button.callback} /></div>;
        });
        return (
            <div className="button-group">
                {buttons}
            </div>
        );
    }
}
