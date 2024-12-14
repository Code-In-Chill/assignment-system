package fis.baolm2.assignmentsystem.services;

import fis.baolm2.assignmentsystem.entities.Assignment;

import java.util.List;

public interface AssignmentService {

    List<Assignment> findAllByUser_Id(Long id);
}
