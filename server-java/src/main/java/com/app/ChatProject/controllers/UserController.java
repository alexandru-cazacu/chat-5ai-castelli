package com.app.ChatProject.controllers;

import com.app.ChatProject.JsonMaps.UserMap;
import com.app.ChatProject.entities.User;
import com.app.ChatProject.exception.ResourceNotFoundException;
import com.app.ChatProject.exception.UsernameException;
import com.app.ChatProject.repositories.UsersRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Alex
 */
@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UsersRepository usersRepository;

    /**
     * Create User.
     *
     * @param user
     * @return
     */
    @PostMapping(value = "/users")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        try {
            usersRepository.save(user);
        }
        catch (DataIntegrityViolationException e) {
            throw new UsernameException(user.getUsername());
        }

        return ResponseEntity.ok().build();
    }

    /**
     * Retrieve Users.
     *
     * @param username
     * @param mode
     * @return
     */
    @GetMapping("/users")
    public List<?> getUsers(
            @RequestParam(value = "searchByUsername", required = true) String username,
            @RequestParam(value = "mode", required = false) String mode) {

        List<User> users = new ArrayList();

        // Searches Users by string.
        if (username != null && username.length() >= 1) {
            users = usersRepository.findByNameOrSurnameOrUsernameStartingWith(username, username, username);

            if (users.isEmpty()) {
                throw new ResourceNotFoundException("User", "username, name or lastname", username);
            }
        }

        if (mode != null && mode.equals("compact")) {
            List<UserMap> userMaps = new ArrayList();

            for (User user : users) {
                userMaps.add(new UserMap(user.getUsername()));
            }

            return userMaps;
        }

        return users;
    }

    /**
     * Retrieve User.
     *
     * @param id
     * @return 200, 
     */
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable("id") int id) {

        Optional<User> user = usersRepository.findById(id);

        if (!user.isPresent()) {
            throw new ResourceNotFoundException("User", "username", id);
        }

        return user.get();
    }

    /**
     * Update User.
     *
     * @param id
     * @param userDetails
     * @param errors
     * @return 200, 400, 401, 404, 409
     */
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable("id") int id,
            @Valid @RequestBody User userDetails, Errors errors) {

        Optional<User> optUser = usersRepository.findById(id);

        if (!optUser.isPresent()) {
            throw new ResourceNotFoundException("User", "username", id);
        }

        User user = optUser.get();

        user.setName(userDetails.getName());
        user.setSurname(userDetails.getSurname());
        user.setBirthday(userDetails.getBirthday());
        user.setMail(userDetails.getMail());
        user.setSex(userDetails.getSex());
        try {
            user.setUsername(userDetails.getUsername());
        }
        catch (DataIntegrityViolationException e) {
            throw new UsernameException(userDetails.getUsername());
        }
        user.setUsername(userDetails.getUsername());

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(userDetails.getPassword());
        user.setPassword(hashedPassword);

        User updateUser = usersRepository.save(user);

        return ResponseEntity.ok().build();
    }

    /**
     * Delete User.
     *
     * @param id
     * @return 200, 400, 401, 404
     */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") int id) {

        Optional<User> user = usersRepository.findById(id);

        if (!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        usersRepository.delete(user.get());

        return ResponseEntity.ok().build();
    }
}
