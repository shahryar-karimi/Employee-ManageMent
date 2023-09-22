import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate, useParams } from "react-router-dom";

export const withRouter = (WrappedComponent) => (props) => {
    const navigate = useNavigate();
    const params = useParams();
  
    return <WrappedComponent {...props} params={params} navigate={navigate} />;
  };

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.params.id,
            employee: {}
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({employee: res.data});
        });
    }

    render() {
        return (
            <div>
                <br />
                <div className='card col-md-6 offset-md-3'>
                    <h3 className='text-center'>View Employee Details</h3>
                    <div className='card-body'>
                        <div className='row'>
                            <div>Employee Firstname: {this.state.employee.firstname}</div>
                            <div>Employee Lastname: {this.state.employee.lastname}</div>
                            <div>Employee Email: {this.state.employee.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewEmployeeComponent);