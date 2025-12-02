package org.example.backend.security;


//import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.url}")
    private String appUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // schaltet alle CSRF Checks aus - Großes NONO für Prod!
                // wir filtern - ACHTUNG von SPEZIFISCH nach ALLGEMEIN, sonst gehen spezifische Blocks vielleicht verloren
                // was zuerst gefiltert wird, überschreibt spätere engere Filter
                .authorizeHttpRequests(a -> a //wir filtern welche Requests auf welche durchkommen
                        // es lässt sich mit HttpMethod.GET / HttpMethod.POST.. auch auf spezielle Endpunkte filtern
                        //.anyRequest().authenticated() // wenn ich für jede Anfrage eine Auth erwarte, komme ich nicht mal auf die Logion Seite
                        //.requestMatchers(HttpMethod.GET, "/api/dashboard").authenticated() // spezifischer Endpunkt zuerst gefiltert
                        .requestMatchers("/api/auth/me").authenticated() // anfrage hierauf geht nur wenn authentifiziert
                        .requestMatchers("/api/secured").authenticated()
                        .requestMatchers("api/warehouse/example").authenticated()
                        .anyRequest().permitAll() // hierauf sind alle nicht authentifizierten anfragen ok - ERST AM ENDE!
                )
                .oauth2Login(o -> o.defaultSuccessUrl(appUrl)); // AppUrl enthält die Ziel-Seite nach Login OK
                //.oauth2Login(o -> o.defaultSuccessUrl("http://localhost:5173")); // AppUrl enthält die Ziel-Seite nach Login OK
        return http.build();
    }
}
