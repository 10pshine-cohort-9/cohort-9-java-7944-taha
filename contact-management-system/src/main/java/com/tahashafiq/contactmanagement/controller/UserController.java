package com.tahashafiq.contactmanagement.controller;
import com.tahashafiq.contactmanagement.dto.GetUserDto;
import com.tahashafiq.contactmanagement.dto.SignUpDto;
import com.tahashafiq.contactmanagement.entity.UserEntity;
import com.tahashafiq.contactmanagement.impl.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@Tag(name="User Apis")

public class UserController {
    @Autowired
    private UserServiceImpl userService;


    @GetMapping("/getUserById/{userId}")

    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Journals retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @Operation(summary = "Getting the User by Id")
    @Parameter(description = "UserId")
    public ResponseEntity<GetUserDto> getUserById(@PathVariable String userId){
        return ResponseEntity.ok(userService.findById(userId));
    }

    @GetMapping("/getUserByUserName")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Journals retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @Operation(summary = "Getting the User by UserName")
    public ResponseEntity<GetUserDto> getUserByUserName(Authentication authentication){
        String userName = authentication.getName();
        return ResponseEntity.ok(userService.findByUserName(userName));
    }

    @PutMapping("/changeUser")
    @Operation(summary = "Update a User entry")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User updated successfully"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "400", description = "Invalid User data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })

    public ResponseEntity<UserEntity> changeUser(
            @RequestBody SignUpDto updatedUser,Authentication authentication){

        String userName= authentication.getName();

        UserEntity byUserName = userService.findEntityByUserName(userName);
        UserEntity userEntity = userService.updateUser(byUserName, updatedUser);


        return ResponseEntity.ok(userEntity);
    }

}
