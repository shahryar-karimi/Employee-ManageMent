package com.shahryar.employeemanagement.employee;

import com.shahryar.employeemanagement.exception.EmployeeNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    public List<Employee> findAll() {
        return repository.findAll();
    }

    public Employee createEmployee(Employee employee) {
        return repository.save(employee);
    }

    public Employee findEmployeeById(long id) {
        Optional<Employee> optionalEmployee = repository.findById(id);
        return optionalEmployee.orElseThrow(
                () -> new EmployeeNotFoundException("Employee is not found with id: " + id)
        );
    }

    public Employee updateEmployee(long id, Employee employeeDetails) {
        Employee employee = findEmployeeById(id);
        setNewDetailsForEmployee(employeeDetails, employee);
        return repository.save(employee);
    }

    private void setNewDetailsForEmployee(Employee employeeDetails, Employee employee) {
        employee.setFirstname(employeeDetails.getFirstname());
        employee.setLastname(employeeDetails.getLastname());
        employee.setEmail(employeeDetails.getEmail());
    }

    public boolean deleteEmployeeById(long id) {
        Employee employee = findEmployeeById(id);
        repository.delete(employee);
        return true;
    }
}
