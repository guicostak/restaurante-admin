package com.foodtruck.hotdogdopc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodtruck.hotdogdopc.models.Report;
import com.foodtruck.hotdogdopc.services.ReportService;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/reports")
@Controller
public class ReportController {
    @Autowired
    private ReportService service;
    
    @GetMapping()
    public List<Report> getAllReports() {
        return service.getAll();
    }
    
}
