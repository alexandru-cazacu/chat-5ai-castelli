import React from 'react';

class RegisterPage extends React.Component {
    render() {
        return (
            <div className="centeredCard">
                <h1>Register</h1>
                <ul>
                    <li>
                        <input type="text" placeholder="First Name" className="inputField half" />
                        <input type="text" placeholder="Last Name" className="inputField half" /></li>
                    <li><input type="text" placeholder="Username" className="inputField" /></li>
                    <li><input type="text" placeholder="Email" className="inputField" /></li>
                    <li><input type="password" placeholder="Password" className="inputField" /></li>
                    <li>
                        <input type="text" placeholder="Day" className="inputField third" />
                        <select className="inputField third" placeholder="Month">
                            <option value="" disabled selected className="optionPlaceholder">Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                        <input type="text" placeholder="Year" className="inputField third" />
                    </li>
                    <li><input type="submit" value="Register" className="customButton"/></li>
                </ul>
            </div>
        );
    }
}

export default RegisterPage;
