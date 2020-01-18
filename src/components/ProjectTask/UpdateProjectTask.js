import React, { Component } from "react";
import {getTaskById ,addProjectTask } from "../../actions/projectTaskActions";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

class UpdateProjectTask extends Component {


    constructor(){
        super();

        this.state = {
            id:"",
            summary :"",
            status :"",
            acceptanceCriteria:"",
            errors:{}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();

        var taskAfterUpdate = {
            "id":this.state.id,
            "summary": this.state.summary,
            "acceptanceCriteria": this.state.acceptanceCriteria,
            "status": this.state.status,
        }
        console.log(taskAfterUpdate);

        this.props.addProjectTask(taskAfterUpdate , this.props.history)
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    componentDidMount(){
        const {pt_id} = this.props.match.params;
        this.props.getTaskById(pt_id);
    }

    componentWillReceiveProps(nextProps){

        const {errors} = nextProps;
        // this.state.project_task = nextProps.project_task;
        const {
            id , summary ,status ,acceptanceCriteria 
        } = nextProps.project_task

        
        
        this.setState({
            id , summary ,status ,acceptanceCriteria ,errors
        })
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

                                    <input onChange={this.onChange} type="text" value={this.state.summary} className={classnames("form-control form-control-lg", { "is-invalid": errors.summary })}  name="summary" placeholder="Project Task summary" />
                                    {
                                        errors.summary && (
                                            <div className="invalid-feedback"> errors.summary</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <textarea onChange={this.onChange} className="form-control form-control-lg" placeholder="Acceptance Criteria" value={this.state.acceptanceCriteria} name="acceptanceCriteria"></textarea>
                                </div>
                                <div className="form-group">
                                    <select onChange={this.onChange}  value={this.state.status} className="form-control form-control-lg" name="status">
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input onSubmit={this.onSubmit} type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateProjectTask.propTypes = {
    project_task : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired,
    getTaskById :PropTypes.func.isRequired,
    addProjectTask : PropTypes.func.isRequired
}

const mapStateTpProps = state => ({
    project_task : state.project_tasks.project_task,
    errors : state.errors
})

export default connect( /** state */ mapStateTpProps ,  {getTaskById , addProjectTask}) ( UpdateProjectTask);