package com.app.ChatProject.repositories;

import com.app.ChatProject.entities.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author saul
 */
@Repository
public interface UsersRepository extends JpaRepository<User, Integer> {

    public List<User> findByNameOrSurnameOrUsernameStartingWith(String name, String surname, String username);

    public User findByUsername(String username);

}
