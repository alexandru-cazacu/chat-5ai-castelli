package com.app.ChatProject.security;

import com.app.ChatProject.jwtModel.JwtUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    private String secret="aASDOndGEd57VFASDf9N_SyidfBFC756394EB";

    public String generate(JwtUser jwtUser) {

        Claims claims =Jwts.claims()
                .setSubject(jwtUser.getUsername());
        claims.put("password", jwtUser.getPassword());



        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();

    }

    public JwtUser validate(String token) {

        JwtUser jwtUser=null;
        try {
            Claims body = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            jwtUser = new JwtUser();

            jwtUser.setUsername(body.getSubject());
            jwtUser.setPassword(body.get("password").toString());
        }
        catch (Exception e){
            System.out.println("ciao");
        }
        return jwtUser;
    }

    public String getUsernameFromToken(String token){
        String username;
        try {
            final Claims claims = getClaimsFromToken(token);
            username = claims.getSubject();
            System.out.println(username);
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    private Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
            System.out.println(claims);
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }
}
