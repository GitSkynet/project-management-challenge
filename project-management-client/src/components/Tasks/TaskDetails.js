import React, { Component } from 'react';
import axios from 'axios';


class TaskDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getTheTask();
  }

  getTheTask = () => {
    const { params } = this.props.match;

axios.get(`http://localhost:4000/api/tasks/${params.taskId}`)

    .then( responseFromApi =>{
      const theTask = responseFromApi.data;
      this.setState(theTask);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    return(
      <div>
        <h3>TASK DETAILS</h3>
        <h2>{this.state.title}</h2>
        <p>{this.state.description}</p>

        {/* To go back we can use react-router-dom method `history.goBack()` available on `props` object */}
        <button onClick={this.props.history.goBack}>Go Back</button>
      </div>
    )
  }
}

export default TaskDetails;