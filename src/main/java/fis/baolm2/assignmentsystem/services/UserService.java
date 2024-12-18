package fis.baolm2.assignmentsystem.services;

import fis.baolm2.assignmentsystem.entities.User;

public interface UserService {

    User findByKeycloakId(String sub);
}
