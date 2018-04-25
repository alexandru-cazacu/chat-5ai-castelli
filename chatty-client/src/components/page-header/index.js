import React from 'react';
import './style.css';

export default function PageHeader(props) {
    var itemsList = props.items.map((item, index) => {
        if (item.label)
            return <div key={index} className="item" onClick={item.onClick}>{item.label}</div>;
        else
            return item;
    });

    return (
        <div className="page-header">
            <div className="page-header-title">Chatty</div>
            <div className="flex-filler"></div>
            {itemsList}
        </div>
    );
}
