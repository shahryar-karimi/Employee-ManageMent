import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate, useParams } from "react-router-dom";

export const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return <WrappedComponent {...props} params={params} navigate={navigate} />;
};

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.id,
            firstname: '',
            lastname: '',
            email: ''
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then( (res) => {
            let employee = res.data;
            this.setState({firstname: employee.firstname,
                lastname: employee.lastname,
                email: employee.email,
            })
        });
    }

    updateEmployee = (event) => {
        event.preventDefault();
        
        let employee = {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email};
        EmployeeService.updateEmployee(this.state.id, employee).then(res => {
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
                            <h3 className='text-center'>Update Employee</h3>
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

                                    <button className='btn btn-success' onClick={this.updateEmployee}>Update</button>
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
export default withRouter(UpdateEmployeeComponent);