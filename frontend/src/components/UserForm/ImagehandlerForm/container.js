import React, { Component } from 'react'
import ImagehandlerForm from './presenter';

class container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        const { updateUserInfo } = this.props;
        updateUserInfo(this.state.file);
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    render() {
        const { token, updateUserInfo } = this.props;
        return (
            <ImagehandlerForm
                token={token}
                updateUserInfo={updateUserInfo}
                onFormSubmit={this.onFormSubmit}
                onChange={this.onChange}
            />
        )
    }
}

export default container;
