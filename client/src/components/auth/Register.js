import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            passport: '',
            passport2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);    
        this.onSubmit = this.onSubmit.bind(this);    
    }
    
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('login');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="fullscreen-video-wrap">
                    <video src="https://www.videvo.net/videvo_files/converted/2014_08/videos/Gatwick_Airport_1Videvo_1.mov32092.mp4"
                        autoPlay={true} loop={true}>
                    </video>
                </div>
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">S'inscrire</h1>
                                <p className="lead text-center">Creez votre compte Co-libry</p>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <TextFieldGroup
                                        placeholder="Nom"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                    <TextFieldGroup
                                        placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                        info="Ce site utilise Gravatar, donc si vous voulez une image de profile, vous pouvez utilisez un email Gravatar"
                                    />
                                    <TextFieldGroup
                                        placeholder="Mot de passe"
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error={errors.password}
                                    />
                                    <TextFieldGroup
                                        placeholder="Confirmation du mot de passe"
                                        name="password2"
                                        type="password"
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                        error={errors.password2}
                                    />
                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));