import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditProject from './EditProject';
import AddTask from '../Tasks/AddTask'

class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getSingleProject();
    }

    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        }
    }

    getSingleProject = () => {
        const { params } = this.props.match;
        axios
            .get(`http://localhost:4000/api/projects/${params.id}`)
            .then(responseFromApi => {
                const theProject = responseFromApi.data;
                this.setState(theProject);
            })
            .catch(err => {
                console.log(err);
            });
    };

    renderEditForm = () => {
        if(!this.state.title){
          this.getSingleProject();
        } else {
        //{...props} => so we can have 'this.props.history' in Edit.js
          return <EditProject theProject={this.state} getTheProject={this.getSingleProject} {...this.props} />
        }
    }

    renderAddTaskForm = () => {
        if(!this.state.title){
            this.getSingleProject();
        } else {
            return <AddTask theProject={this.state} getTheProject={this.getSingleProject} />
      }
  }

  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        {/* show the task heading only if there are tasks */}
        { this.state.tasks && this.state.tasks.length > 0 && <h3>Tasks</h3> }
        {/* map through the array of tasks and... */}
        { this.state.tasks && this.state.tasks.map((task, index) => {
            return(
                <div key={ index }>
                {/* ... make each task's title a link that goes to the task details page */}
                    <Link to={`/tasks/${task._id}`}>
                        { task.title }
                    </Link>
                </div>
            )

        }) }
        <div>{this.renderEditForm()} </div>
        <button onClick={() => this.deleteProject()}>Delete project</button> 
        <br/>
        <div> {/*<== !!! */}
            {this.renderAddTaskForm()} 
		</div>

		<br/><br/><br/><br/><br/>

        <Link to={'/projects'}>Back to projects</Link>
      </div>
    )
  }
}

export default ProjectDetails;