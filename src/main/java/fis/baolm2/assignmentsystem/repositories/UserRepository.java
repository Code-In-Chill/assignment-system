package fis.baolm2.assignmentsystem.repositories;

import fis.baolm2.assignmentsystem.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    User findByKeycloakIdOrUsername(String keycloakId, String username);

    User findByKeycloakId(String keycloakId);
}
