package fis.baolm2.assignmentsystem.controller;

import fis.baolm2.assignmentsystem.entities.Assignment;
import fis.baolm2.assignmentsystem.entities.User;
import fis.baolm2.assignmentsystem.services.AssignmentService;
import fis.baolm2.assignmentsystem.services.UserService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "http://localhost:3000")
public class AssignmentController {

    private final AssignmentService assignmentService;
    private final UserService userService;

    public AssignmentController(AssignmentService assignmentService, UserService userService) {
        this.assignmentService = assignmentService;
        this.userService = userService;
    }

//    @GetMapping("/user/{id}")
//    public ResponseEntity<?> findAllAssignmentByUserId(@PathVariable Long id) {
//        List<Assignment> assignments = assignmentService.findAllByUser_Id(id);
//
//        return ResponseEntity.ok(assignments);
//    }

    @PostMapping("/create")
    @RolesAllowed({"teacher", "admin"})
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal Jwt jwt) {

        User user = userService.findByKeycloakId(jwt.getClaimAsString("sub"));

        Assignment assignment = new Assignment();
        assignment.setStatus("Need to be submitted");
        assignment.setUser(user);

        Assignment createdAssignment = assignmentService.createAssignment(assignment);

        return ResponseEntity.ok(createdAssignment);
    }

}
