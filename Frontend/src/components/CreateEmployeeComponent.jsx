import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from "react-router-dom";

export const withRouter = (WrappedComponent) => (props) => {
  const navigate = useNavigate();

  return <WrappedComponent {...props} navigate={navigate} />;
};

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            email: ''
        }
        // this.changeFirstnameHandler = this.changeFirstnameHandler.bind(this);
        // this.changeLastnameHandler = this.changeLastnameHandler.bind(this);
        // this.changeEmailHandler = this.changeEmailHandler.bind(this);
        // this.saveEmployee = this.saveEmployee.bind(this);
    }

    saveEmployee = (event) => {
        event.preventDefault();
        
        let employee = {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email};
        EmployeeService.createEmployee(employee).then(res => {
            this.props.navigate('/');
        })
    }

    cancel = () => {
        this.props.navigate('/');
    }

    changeFirstnameHandler = (event) => {
        this.setState({firstname: event.target.value});
    }

    changeLastnameHandler = (event) => {
        this.setState({lastname: event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    render() {
        return (
            <div>
                <br />
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3'>
                            <h3 className='text-center'>Add Employee</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label> Firstname: </label>
                                        <input placeholder='Firstname' name="firstname" className='form-control' 
                                        value={this.state.firstname} onChange={this.changeFirstnameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label> Lastname: </label>
                                        <input placeholder='Lastname' name="lastname" className='form-control' 
                                        value={this.state.lastname} onChange={this.changeLastnameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label> Email Address: </label>
                                        <input placeholder='Email Address' name="email" className='form-control' 
                                        value={this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>

                                    <button className='btn btn-success' onClick={this.saveEmployee}>Save</button>
                                    <button className='btn btn-danger' onClick={this.cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateEmployeeComponent);