import React from "react";

export default function withAuth(AuthComponent) {
    return class AuthWrapped extends React.Component {
        componentWillMount() {
            if (!localStorage.getItem("jwtToken"))
                this.props.history.replace("/sign-in");
        }

        render() {
            if (localStorage.getItem("jwtToken")) {
                return (
                    <AuthComponent history={this.props.history} />
                );
            }
            else {
                return null;
            }
        }
    };
}