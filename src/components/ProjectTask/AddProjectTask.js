import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProjectTask } from '../../actions/projectTaskActions';
import classnames from "classnames";

class AddProjectTask extends Component {

    constructor() {
        super();
        this.state = {
            "summary": "",
            "acceptanceCriteria": "",
            "status": "",
            "errors": ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange(e) {
        //console.log("new val " + [e.target.name] + " : " + e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const newPojectTask = {
            "summary": this.state.summary,
            "acceptanceCriteria": this.state.acceptanceCriteria,
            "status": this.state.status,
        };
        this.props.addProjectTask(newPojectTask, this.props.history)
        // addProjectTask(newPojectTask , history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="addProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/" className="btn btn-light">
                                Back to Board
                            </Link>
                            <h4 className="display-4 text-center">Add /Update Project Task</h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input onChange={this.onChange} value={this.state.summary} type="text" className={classnames("form-control form-control-lg", { "is-invalid": errors.summary })} name="summary" placeholder="Project Task summary" />
                                    {
                                        errors.summary && (
                                            <div className="invalid-feedback">errors.summary</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" onChange={this.onChange} placeholder="Acceptance Criteria" value={this.state.acceptanceCriteria} name="acceptanceCriteria"></textarea>
                                </div>
                                <div className="form-group">
                                    <select value={this.state.status} onChange={this.onChange} className="form-control form-control-lg" name="status">
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addProjectTask })(AddProjectTask);