package fis.baolm2.assignmentsystem.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate groupStartDate;

    private String username;
    private String password;

    public LocalDate getGroupStartDate() {
        return groupStartDate;
    }

    public void setGroupStartDate(LocalDate groupStartDate) {
        this.groupStartDate = groupStartDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
