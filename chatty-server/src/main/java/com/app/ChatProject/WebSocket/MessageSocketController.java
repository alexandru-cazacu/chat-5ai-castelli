package com.app.ChatProject.WebSocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

/**
 *
 * @author Alex
 */
@Controller
public class MessageSocketController {

    /**
     * Message handling method. When a message gets be routed to the path
     * "/room/sendMessage/{roomId}", it will be sent to this method, which will
     * send the message to all the connected users of a specific connection with
     * path "/topic/room/{roomId}"
     *
     * @return
     * @throws java.lang.Exception
     */
    @MessageMapping("/sendMessages")
    @SendTo("/topic/getMessages")
    public Greeting greeting() throws Exception {
        System.out.println("====================> WebSocket was called");
        return new Greeting("Hello!");
    }

    public class Greeting {

        private String content;

        public Greeting() {
        }

        public Greeting(String content) {
            this.content = content;
        }

        public String getContent() {
            return content;
        }

    }

    public class HelloMessage {

        private String name;

        public HelloMessage() {
        }

        public HelloMessage(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
