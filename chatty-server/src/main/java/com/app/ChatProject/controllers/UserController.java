package com.app.ChatProject.controllers;

import com.app.ChatProject.JsonMaps.UserMap;
import com.app.ChatProject.entities.User;
import com.app.ChatProject.exception.ResourceNotFoundException;
import com.app.ChatProject.exception.UsernameException;
import com.app.ChatProject.repositories.UsersRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.app.ChatProject.security.JwtUtil;
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
public class UserController {

    @Autowired
    private UsersRepository usersRepository;
    
    /**
     * Retrieve Users.
     *
     * @param username
     * @param mode
     * @return
     */
    @GetMapping("/search")
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
     * @param request
     * @return 200,
     */
    @GetMapping("/users")
    public User getUser(HttpServletRequest request) {

        String token = request.getHeader("Authorization");

        JwtUtil jwtUtil = new JwtUtil();
        String userName = jwtUtil.getUsernameFromToken(token);
        User user = usersRepository.findByUsername(userName);

        if (user == null) {
            throw new ResourceNotFoundException("User", "username", userName);
        }

        return user;
    }

    /**
     * Update User.
     *
     * @param request
     * @param userDetails
     * @param errors
     * @return 200, 400, 401, 404, 409
     */
    @PutMapping("/users")
    public ResponseEntity<?> updateUser(HttpServletRequest request,
            @Valid @RequestBody User userDetails, Errors errors) {

        String token = request.getHeader("Authorization");

        JwtUtil jwtUtil = new JwtUtil();
        String userName = jwtUtil.getUsernameFromToken(token);
        User user = usersRepository.findByUsername(userName);

        if (user == null) {
            throw new ResourceNotFoundException("User", "username", userName);
        }

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
     * @param request
     * @return 200, 400, 401, 404
     */
    @DeleteMapping("/users")
    public ResponseEntity<?> deleteUser(HttpServletRequest request) {

        String token = request.getHeader("Authorization");

        JwtUtil jwtUtil = new JwtUtil();
        String userName = jwtUtil.getUsernameFromToken(token);
        User user = usersRepository.findByUsername(userName);

        if (user == null) {
            throw new ResourceNotFoundException("User", "username", userName);
        }

        usersRepository.delete(user);

        return ResponseEntity.ok().build();
    }
}
