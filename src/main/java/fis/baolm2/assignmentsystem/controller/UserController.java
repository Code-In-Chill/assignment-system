package fis.baolm2.assignmentsystem.controller;

import fis.baolm2.assignmentsystem.dots.KeycloakSyncUserDto;
import fis.baolm2.assignmentsystem.entities.User;
import fis.baolm2.assignmentsystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody KeycloakSyncUserDto keycloakUserDto) {
        return ResponseEntity.ok(userService.createUser(keycloakUserDto));
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam String keycloakId) {
        boolean result = userService.deleteUser(keycloakId);
        return ResponseEntity.ok(result ? "User deleted" : "User not found");
    }
}
