package fis.baolm2.assignmentsystem.services.impl;

import fis.baolm2.assignmentsystem.dots.KeycloakSyncUserDto;
import fis.baolm2.assignmentsystem.entities.User;
import fis.baolm2.assignmentsystem.repositories.UserRepository;
import fis.baolm2.assignmentsystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByKeycloakId(String keycloakId) {
        return userRepository.findByKeycloakId(keycloakId);
    }

    @Override
    public User findByKeycloakIdOrUsername(String keycloakId, String username) {
        return userRepository.findByKeycloakIdOrUsername(keycloakId, username);
    }

    @Override
    public User createUser(KeycloakSyncUserDto keycloakUserDto) {
        User user = findByKeycloakIdOrUsername(keycloakUserDto.keycloakId(), keycloakUserDto.username());

        if (user == null) {
            user = new User();
            user.setKeycloakId(keycloakUserDto.keycloakId());
            user.setUsername(keycloakUserDto.username());
            user.setCreateDate(LocalDate.now());

            return userRepository.save(user);
        }

        return user;
    }

    @Override
    public boolean deleteUser(String keycloakId) {
        User user = findByKeycloakId(keycloakId);

        if (user != null) {
            userRepository.delete(user);
            return true;
        }

        return false;
    }
}
