package fis.baolm2.assignmentsystem.services;

import fis.baolm2.assignmentsystem.entities.Assignment;
import fis.baolm2.assignmentsystem.entities.User;

import java.util.List;
import java.util.Set;

public interface AssignmentService {

    Set<Assignment> findAllByUser_Id(Long id);

    Assignment createAssignment(Assignment assignment);

    List<Assignment> findAll();

    Assignment findById(Long id);

    Assignment updateAssignment(Long id, Assignment assignment);
}
