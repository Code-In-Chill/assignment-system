package fis.baolm2.assignmentsystem.services.impl;

import fis.baolm2.assignmentsystem.entities.Assignment;
import fis.baolm2.assignmentsystem.entities.User;
import fis.baolm2.assignmentsystem.repositories.AssignmentRepository;
import fis.baolm2.assignmentsystem.services.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;

    @Autowired
    public AssignmentServiceImpl(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    @Override
    public Set<Assignment> findAllByUser_Id(UUID id) {
        return assignmentRepository.findAllByUser_Id(id);
    }

    @Override
    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @Override
    public List<Assignment> findAll() {
        return assignmentRepository.findAll();
    }

    @Override
    public Assignment findById(UUID id) {
        return assignmentRepository.findById(id).orElse(null);
    }

    @Override
    public Assignment updateAssignment(UUID id, Assignment assignment) {
        Assignment updatedAssignment = assignmentRepository.findById(id).orElse(null);

        if (updatedAssignment == null) {
            return null;
        }

        updatedAssignment.setTitle(assignment.getTitle());
//        updatedAssignment.setDescription(assignment.getDescription());
        updatedAssignment.setStatus(assignment.getStatus());
        updatedAssignment.setGithubUrl(assignment.getGithubUrl());
        updatedAssignment.setBranch(assignment.getBranch());
        updatedAssignment.setCodeReviewVideoUrl(assignment.getCodeReviewVideoUrl());

        return assignmentRepository.save(updatedAssignment);
    }
}
