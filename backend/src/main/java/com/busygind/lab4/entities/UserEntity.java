package com.busygind.lab4.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class UserEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="username", unique = true)
    private String username;
    private String password;
    private boolean enabled;
    @OneToMany(cascade = CascadeType.ALL)
    private List<UserAuthority> authorities = new ArrayList<>();

    public void addAuthority(String authority) {
        authorities.add(new UserAuthority(this, authority));
    }
}
