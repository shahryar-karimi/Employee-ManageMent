import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from "react-router-dom";

export const withRouter = (WrappedComponent) => (props) => {
  const navigate = useNavigate();

  return <WrappedComponent {...props} navigate={navigate} />;
};

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            employees : []
        }
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({employees: res.data});
        });
    }

    editEmployee(id) {
        this.props.navigate(`/update-employee/${id}`);
    }

    viewEmployee(id) {
        this.props.navigate(`/view-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id != id)});
        });
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Employees</h2>
                <div className='row'>
                    <button className='btn btn-primary opacity-75' onClick={() => this.props.navigate('/add-employee')}>Add Employee</button>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th> Firstname </th>
                                <th> Lastname </th>
                                <th> Email </th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key={employee.id}>
                                        <td>{employee.firstname}</td>
                                        <td>{employee.lastname}</td>
                                        <td>{employee.email}</td>
                                        <td> 
                                            <button onClick={() => this.editEmployee(employee.id)} className='btn btn-info opacity-75'>Edit</button>
                                            <button onClick={() => this.deleteEmployee(employee.id)} style={{marginLeft: "10px"}} className='btn btn-danger opacity-75'>Delete</button>
                                            <button onClick={() => this.viewEmployee(employee.id)} style={{marginLeft: "10px"}} className='btn btn-info opacity-75'>View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(ListEmployeeComponent);