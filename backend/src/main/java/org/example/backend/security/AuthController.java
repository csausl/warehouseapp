package org.example.backend.security;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CustomOAuth2UserService customOAuth2UserService;

    public AuthController(CustomOAuth2UserService customOAuth2UserService) {
        this.customOAuth2UserService = customOAuth2UserService;
    }

    @GetMapping("/advanced/me")
    public AppUser getMe(@AuthenticationPrincipal OAuth2User user) {
        //return user.getAttributes().get("login").toString();
        //return user.getAttribute("login").toString();

        return customOAuth2UserService.findUserByUsername(user);

       // return new AppUser(
       //         user.getName(),
       //         user.getAttributes().get("login").toString(),
       //         user.getAttributes().get("avatar_url").toString(),
       //         user.getAttributes().get("role").toString()
       // );

    }

    @GetMapping("/standard/me")
    public String standardLogin(@AuthenticationPrincipal OAuth2User user) {
        //return user.getAttributes().get("login").toString();
        if (user == null){
            return "";
        }
        else return user.getAttribute("login").toString();
    }

    @GetMapping("/admin/**")
    public String isAdmin(@AuthenticationPrincipal OAuth2User user) {
        return "You are Admin"+customOAuth2UserService.findUserByUsername(user).role();
    }


}
