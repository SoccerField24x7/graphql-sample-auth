import React from "react";
import { graphql } from "react-apollo";
import { hashHistory } from 'react-router';
import AuthForm from "./AuthForm";
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { errors: [] }
    }

    componentWillUpdate(nextProps) {
        if (!this.props.data.user && nextProps.data.user) {
            hashHistory.push('/dashboard');
        }
    }
    
    handleSubmit = ({ email, password }) => {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch((res) => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
        });
    };
    
    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <AuthForm onSubmit={this.handleSubmit} errors={this.state.errors} />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(SignupForm)
);
