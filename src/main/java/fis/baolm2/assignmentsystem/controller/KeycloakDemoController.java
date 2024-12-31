package fis.baolm2.assignmentsystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping("/api/keycloak-demo/")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:5173"})
public class KeycloakDemoController {

    @GetMapping("admin-only")
    public ResponseEntity<?> onlyAdminEndpoint() {

        Map<String, String> response = new HashMap<>();
        response.put("message", "This is the only admin endpoint");

        return okResponse(response);
    }

    @GetMapping("teacher-and-admin")
    public ResponseEntity<?> teacherAndAdminEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is the teacher and admin endpoint");

        return okResponse(response);
    }

    @GetMapping("has-any-role")
    public ResponseEntity<?> hasAnyRoleEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "User has any role can access this endpoint");
        return okResponse(response);
    }

    @GetMapping("public-endpoint")
    public ResponseEntity<?> publicEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is the public endpoint");
        return okResponse(response);
    }

    private ResponseEntity<?> okResponse(Object body) {
        return ResponseEntity.ok(body);
    }

}
