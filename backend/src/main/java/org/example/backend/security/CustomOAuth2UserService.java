package org.example.backend.security;

import lombok.RequiredArgsConstructor;
import org.example.backend.security.AppUser;
import org.example.backend.security.AppUserRepository;
import org.springframework.boot.autoconfigure.task.TaskExecutionProperties;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final AppUserRepository appUserRepository;

    // wir erweitern die standard loadUser Methode, um unsere eigene createAppUser
    // das scheint automatisch im Hintergrund zu passieren
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Custom Block
        AppUser appUser = appUserRepository.findById(oAuth2User.getName())
                .orElseGet(() -> createAppUser(oAuth2User));

        return new DefaultOAuth2User(List.of(
                new SimpleGrantedAuthority(appUser.role())),
                oAuth2User.getAttributes(),
                "id");
    }


    public AppUser findUserByUsername(OAuth2User oAuth2User) {
        if (oAuth2User == null) return new AppUser("","","","");
        else return appUserRepository.findById(oAuth2User.getName()).orElse(new AppUser("","","",""));
    }

    private AppUser createAppUser(OAuth2User oAuth2User) {
        AppUser newUser = AppUser.builder()
                .id(oAuth2User.getName()) //User ID von Github
                .username(oAuth2User.getAttribute("login"))
                .avatarUrl(oAuth2User.getAttribute("avatar_Url"))
                .role("USER")
                .build();
        appUserRepository.save(newUser); // nicht direkt abspeichern, weil das manchmal zu langsam ist
        return newUser;
    }
}
