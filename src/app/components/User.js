import React from "react";

export class User extends React.Component {

    state = {
        athlete: {},
    };

    componentDidMount() {
        $.get('http://localhost:8000/athlete').then((res) => this.setState({athlete: res}));
    }

    render() {
        return (
            <div>
                <h3>User data</h3>
                <img src={this.state.athlete.profile} />
                <p>{"name: " + this.state.athlete.firstname + " " + this.state.athlete.lastname}</p>
                <p>{"city: " + this.state.athlete.city + ", " + this.state.athlete.state + ", " + this.state.athlete.country}</p>
                <p>{"email: " + this.state.athlete.email}</p>
            </div>

        );
    }
}
