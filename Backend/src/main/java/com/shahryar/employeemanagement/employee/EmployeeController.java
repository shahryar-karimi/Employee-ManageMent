package com.shahryar.employeemanagement.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EmployeeController {
    @Autowired
    private EmployeeService service;

    @GetMapping("/employees")
    public List<Employee> getAll() {
        return service.findAll();
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return service.createEmployee(employee);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id) {
        Employee employee = service.findEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee>  updateEmployee(@PathVariable long id, @RequestBody Employee employeeDetail) {
        Employee updatedEmployee = service.updateEmployee(id, employeeDetail);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable long id) {
        boolean resultValue = service.deleteEmployeeById(id);
        Map<String, Boolean> result = new HashMap<>();
        result.put("deleted", resultValue);
        return ResponseEntity.ok(result);
    }
}
