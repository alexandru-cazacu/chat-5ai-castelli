package com.app.ChatProject.WebSocket;

import com.app.ChatProject.entities.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.repository.annotation.HandleAfterCreate;
import org.springframework.data.rest.repository.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

/**
 *
 * @author Alex
 */
@Component
@RepositoryEventHandler(Message.class)
public class RepositoryEventsHandler {

    private final SimpMessagingTemplate websocket;

    private final EntityLinks entityLinks;
    
    static final String MESSAGE_PREFIX = "/topic";

    @Autowired
    public RepositoryEventsHandler(SimpMessagingTemplate websocket,
            EntityLinks entityLinks) {
        this.websocket = websocket;
        this.entityLinks = entityLinks;
    }

    @HandleAfterCreate
    public void newEmployee(Message message) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/newMessage", getPath(message));
    }

    /**
     * Take an {@link Message} and get the URI using Spring Data REST's
     * {@link EntityLinks}.
     *
     * @param employee
     */
    private String getPath(Message message) {
        return this.entityLinks.linkForSingleResource(message.getClass(),
                message.getId()).toUri().getPath();
    }
}
