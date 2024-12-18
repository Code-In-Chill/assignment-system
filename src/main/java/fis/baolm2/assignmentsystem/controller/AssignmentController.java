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
import java.util.Set;
import java.util.stream.Collectors;

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

    @GetMapping("")
    @RolesAllowed({"student","teacher", "admin"})
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal Jwt jwt) {
        boolean isAdmin = jwt.getClaimAsMap("realm_access").get("roles").toString().contains("admin");

        if (isAdmin) {
            List<Assignment> sortedAssignment = assignmentService.findAll();
            return ResponseEntity.ok(sortedAssignment);
        }

        User user = userService.findByKeycloakId(jwt.getClaimAsString("sub"));

        Set<Assignment> assignments = assignmentService.findAllByUser_Id(user.getId());

        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/{id}")
    @RolesAllowed({"student","teacher", "admin"})
    public ResponseEntity<?> getAssignmentById(@PathVariable Long id) {
        Assignment assignment = assignmentService.findById(id);

        return ResponseEntity.ok(assignment);
    }

    @PutMapping("/{id}")
    @RolesAllowed({"teacher", "admin"})
    public ResponseEntity<?> updateAssignment(@PathVariable Long id, @RequestBody Assignment assignment) {

        Assignment savedAssignment = assignmentService.updateAssignment(id, assignment);

        if (savedAssignment == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(savedAssignment);
    }

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
