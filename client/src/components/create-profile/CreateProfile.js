import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { getCurrentProfile } from '../../actions/profileActions';
//import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
      };
      
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
    }
    
  componentDidMount() {
    this.props.getCurrentProfile();
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('login');
    }
  }
  
  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram      
    }

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value} );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            errors={errors.twitter}
          />

          <InputGroup
            placeholder="facebook Profile URL"
            name="faceboojk"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            errors={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            errors={errors.linkedin}
          />

          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            errors={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            errors={errors.instagram}
          />
        </div>
      )
    }

    //Select options for status
    const options = [
      { label: 'Select professional Status', value: 0},
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or learning', value: 'Student or learning' },
      { label: 'Instructor or teacher', value: 'Instructor or teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' },      
    ];

    return (
      <div className='create-profile'>
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Créer votre profile</h1>
                    <p className="lead text-center">
                        Ajoutez des informations pour mettre votre profile opérationnel
                    </p>
                    <small className="d-block pb-3">* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                      <TextFieldGroup
                        placeholder="* Profile handle"
                        name="handle"
                        value={this.state.value}
                        onChange={this.onChange}
                        error={errors.handle}
                        info="A unique handle for your profile URL. Your full name, company name,
                        nickname"
                      />
                      <SelectListGroup
                        placeholder="Status"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                        options={options}
                        error={errors.status}
                        info="Give us an idea of where you at in your carrer"
                      />
                      <TextFieldGroup
                        placeholder="Company"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                        info="Could be your own company or one you work for"
                      />
                      <TextFieldGroup
                        placeholder="Website"
                        name="website"
                        value={this.state.website}
                        onChange={this.onChange}
                        error={errors.website}
                        info="Could be your own company or one you work for"
                      />
                      <TextFieldGroup
                        placeholder="Location"
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange}
                        error={errors.location}
                        info="City or city and state"
                      />
                      <TextFieldGroup
                        placeholder="Skills"
                        name="skills"
                        value={this.state.skills}
                        onChange={this.onChange}
                        error={errors.skills}
                        info="Please a coma separated valus "
                      />
                      <TextFieldGroup
                        placeholder="Github Username"
                        name="githubusername"
                        value={this.state.githubusername}
                        onChange={this.onChange}
                        error={errors.githubusername}
                        info="Include your username if you want you latest repo and Github link"
                      />
                      <TextFieldGroup
                        placeholder="Short Bio"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.onChange}
                        error={errors.bio}
                        info="Tell us a little about yourself"
                      />
                      <div className="mb-3">
                        <button
                          type="button" 
                          onClick={() => {
                          this.setState(prevState => ({
                            displaySocialInputs: !prevState.displaySocialInputs
                          }))
                        }} className="btn btn-light">
                          Add social Network Links
                        </button>
                        <span className="text-muted">Optional</span>
                      </div>
                      {socialInputs}
                      <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                    </form>
                </div>
            </div>
        </div>        
      </div>
    )
  }
}

CreateProfile.protoTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired      
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(withRouter(CreateProfile));