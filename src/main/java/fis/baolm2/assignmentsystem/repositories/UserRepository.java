package fis.baolm2.assignmentsystem.repositories;

import fis.baolm2.assignmentsystem.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByKeycloakId(String sub);
}
