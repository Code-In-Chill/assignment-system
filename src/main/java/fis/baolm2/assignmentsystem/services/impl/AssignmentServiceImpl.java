package fis.baolm2.assignmentsystem.services.impl;

import fis.baolm2.assignmentsystem.entities.Assignment;
import fis.baolm2.assignmentsystem.repositories.AssignmentRepository;
import fis.baolm2.assignmentsystem.services.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;

    @Autowired
    public AssignmentServiceImpl(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    @Override
    public List<Assignment> findAllByUser_Id(Long id) {
        return assignmentRepository.findAllByUser_Id(id);
    }
}
