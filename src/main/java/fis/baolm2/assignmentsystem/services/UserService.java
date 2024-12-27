package fis.baolm2.assignmentsystem.services;

import fis.baolm2.assignmentsystem.dots.KeycloakSyncUserDto;
import fis.baolm2.assignmentsystem.entities.User;

public interface UserService {

    User findByKeycloakId(String keycloakId);

    User findByKeycloakIdOrUsername(String keycloakId, String username);

    User createUser(KeycloakSyncUserDto keycloakUserDto);

    boolean deleteUser(String keycloakId);
}
