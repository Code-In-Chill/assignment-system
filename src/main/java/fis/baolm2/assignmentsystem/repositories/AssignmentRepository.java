package fis.baolm2.assignmentsystem.repositories;

import fis.baolm2.assignmentsystem.entities.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findAllByUser_Id(Long id);
}
