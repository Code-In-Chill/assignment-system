package fis.baolm2.assignmentsystem.services;

import fis.baolm2.assignmentsystem.dots.AssignmentRatingDto;
import fis.baolm2.assignmentsystem.entities.Assignment;
import fis.baolm2.assignmentsystem.entities.User;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface AssignmentService {

    Set<Assignment> findAllByUser_Id(UUID id);

    Assignment createAssignment(Assignment assignment);

    List<Assignment> findAll();

    Assignment findById(UUID id);

    Assignment updateAssignment(UUID id, Assignment assignment);

    Assignment ratingAssignment(UUID id, AssignmentRatingDto assignmentRatingDto);
}
