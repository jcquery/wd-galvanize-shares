import AssignmentReturned from 'material-ui/svg-icons/action/assignment-returned';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Joi from 'joi';
import Paper from 'material-ui/Paper';
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const schema = Joi.object({
  title: Joi.string().trim().max(255),
  topic: Joi.string().trim().max(50),
  url: Joi.string().trim().uri({ scheme: /^https?/ })
});

const PostForm = React.createClass({
  getInitialState() {
    return {
      errors: {},
      post: this.props.post
    }
  },

  handleBlur(event) {
    const { name, value } = event.target;
    const nextErrors = Object.assign({}, this.state.errors);
    const result = Joi.validate({ [name]: value }, schema);

    if (result.error) {
      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
      }

      return this.setState({ errors: nextErrors });
    }

    delete nextErrors[name];

    this.setState({ errors: nextErrors })
  },

  handleChange(event) {
    const nextPost = Object.assign({}, this.state.post, {
      [event.target.name]: event.target.value
    });

    this.setState({ post: nextPost });
  },

  handleTouchTapCancel() {
    this.props.stopEditingPost(this.props.post);
  },

  handleTouchTapSave() {
    const result = Joi.validate(this.state.post, schema, {
      abortEarly: false,
      allowUnknown: true
    });

    if (result.error) {
      const nextErrors = {};

      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
      }

      return this.setState({ errors: nextErrors });
    }

    const nextPost = Object.assign({}, result.value, {votes: 1});

    this.props.updatePost(this.props.post, nextPost);
  },

  render() {
    const { errors, post } = this.state;

    const styleRaisedButton = {
      marginRight: '10px',
      marginTop: '40px'
    };
    const styleTextField = {
      display: 'block'
    };

    return<Paper className="paper">
      <h3>New Post</h3>

      <TextField
        errorText={errors.url}
        floatingLabelText="URL"
        fullWidth={true}
        name="url"
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        style={styleTextField}
        value={post.url}
      />

      <TextField
        errorText={errors.title}
        floatingLabelText="Title"
        fullWidth={true}
        name="title"
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        style={styleTextField}
        value={post.title}
      />

      <TextField
        errorText={errors.topic}
        floatingLabelText="Topic"
        fullWidth={true}
        name="topic"
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        style={styleTextField}
        value={post.topic}
      />

      <RaisedButton
        style={styleRaisedButton}
        label="Cancel"
        primary={true}
        icon={<Cancel />}
        onTouchTap={this.handleTouchTapCancel}
      />

      <RaisedButton
        style={styleRaisedButton}
        label="Save"
        primary={true}
        icon={<AssignmentReturned />}
        onTouchTap={this.handleTouchTapSave}
      />

    </Paper>
  }
});

export default PostForm;
