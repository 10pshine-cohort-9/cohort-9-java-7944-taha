package com.tahashafiq.contactmanagement.controller;

import com.tahashafiq.contactmanagement.dto.GetUserDto;
import com.tahashafiq.contactmanagement.entity.ContactEntity;
import com.tahashafiq.contactmanagement.impl.ContactServiceImpl;
import com.tahashafiq.contactmanagement.impl.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@Tag(name="Admin Apis")
public class AdminController {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private ContactServiceImpl contactService;

    @GetMapping("/getAllUser")
    @Operation(summary="Returning all the All Users")
    @ApiResponses({
            @ApiResponse(responseCode = "201",description = "All User are returned"),
            @ApiResponse(responseCode = "401",description = "Unauthorized")
    })
    public ResponseEntity<List<GetUserDto>> getAllUser(){
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @DeleteMapping("/deleteUser/{userId}")
    @Operation(summary = "Delete the user by Id")
    @Parameter(description = "UserId")    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "User deleted successfully"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<GetUserDto> deleteUser(@PathVariable String userId){
        GetUserDto userDto = userService.findById(userId);
        if(userDto != null){
            userService.deleteUser(userId);
            return ResponseEntity.ok(userDto);
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/getAllContact")
    @Operation(summary = "get all the contact")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Contacts retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<List<ContactEntity>> getAllContact() {
        return ResponseEntity.ok(contactService.findAllContact());
    }

}
