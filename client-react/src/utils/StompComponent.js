import React from 'react';
import SockJsClient from 'react-stomp';

export default class StompComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SockJsClient url='http://localhost:8080/payroll' topics={['/topic/addMessage']}
                    onMessage={(msg) => { console.log(msg); }} />
            </div>
        );
    }
}