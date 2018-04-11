package com.app.ChatProject.interfaces;

import com.app.ChatProject.entities.Message;
import java.util.Date;
import java.util.List;

/**
 *
 * @author alex
 */
public interface IUserAll {

    Integer getId();

    String getName();

    String getSurname();

    Date getBirthday();

    String getSex();

    String getMail();

    String getUsername();

    String getPassword();

    Date getLastSeen();
}
