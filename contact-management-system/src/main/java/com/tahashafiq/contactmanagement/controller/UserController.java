package com.tahashafiq.contactmanagement.controller;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Users")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/getAllUser")
    public ResponseEntity<List<UserEntity>> getAllUser(){
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @GetMapping("/getUserById/{userId}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable String userId){
        UserEntity byId = userService.findById(userId);
        if(byId == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userService.findById(userId));
    }

    @PostMapping("/createUser")
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity user){
        UserEntity createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
       // return ResponseEntity.ok(userService.createUser(user));
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<UserEntity> deleteUser(@PathVariable String userId){
        UserEntity byId = userService.findById(userId);
        if(byId != null){
            userService.deleteUser(userId);
            return ResponseEntity.ok(byId);
        }
        return ResponseEntity.notFound().build();
    }
}
