package com.tahashafiq.contactmanagement.controller;
import com.tahashafiq.contactmanagement.dto.GetUserDto;
import com.tahashafiq.contactmanagement.dto.SignUpDto;
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

    @GetMapping("/getUserById/{userId}")
    public ResponseEntity<GetUserDto> getUserById(@PathVariable String userId){
        return ResponseEntity.ok(userService.findById(userId));
    }
    @GetMapping("/getAllUser")
    public ResponseEntity<List<GetUserDto>> getAllUser(){
        return ResponseEntity.ok(userService.findAllUsers());
    }
    @PostMapping("/signup")
    public ResponseEntity<UserEntity> signup(@RequestBody SignUpDto postUserDto) {
        UserEntity userEntity= userService.createUser(postUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userEntity);
    }
    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<GetUserDto> deleteUser(@PathVariable String userId){
        GetUserDto userDto = userService.findById(userId);
        if(userDto != null){
            userService.deleteUser(userId);
            return ResponseEntity.ok(userDto);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/changeUser/{userName}")
    public ResponseEntity<UserEntity> changeUser(
            @PathVariable String userName,
            @RequestBody SignUpDto user){
        UserEntity byUserName = userService.findByUserName(userName);
        if(byUserName != null){
            if(user.getUserName()!=null && !user.getUserName().isEmpty()){
                byUserName.setUserName(user.getUserName());
            }
            if(user.getFirstName()!=null && !user.getFirstName().isEmpty()){
                byUserName.setFirstName(user.getFirstName());
            }
            if(user.getLastName()!=null && !user.getLastName().isEmpty()){
                byUserName.setLastName(user.getLastName());
            }
            if(user.getEmail()!=null && !user.getEmail().isEmpty()){
                byUserName.setEmail(user.getEmail());
            }
            if(user.getPassword()!=null && !user.getPassword().isEmpty()){
                byUserName.setPassword(user.getPassword());
            }
        }
        return ResponseEntity.ok(userService.saveUser(byUserName));
    }

//    @PutMapping("/updateUser/{userId}")
//    public ResponseEntity<GetUserDto> updateUser(@PathVariable String userId,@RequestBody PostUserDto user){
//        return ResponseEntity.ok(user);
//    }

}
