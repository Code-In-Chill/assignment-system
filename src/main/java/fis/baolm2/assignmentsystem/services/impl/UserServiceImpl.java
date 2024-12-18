package fis.baolm2.assignmentsystem.services.impl;

import fis.baolm2.assignmentsystem.entities.User;
import fis.baolm2.assignmentsystem.repositories.UserRepository;
import fis.baolm2.assignmentsystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByKeycloakId(String sub) {
        return userRepository.findByKeycloakId(sub);
    }
}
