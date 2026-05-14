package com.olivia.taskmanager.controller;

import com.olivia.taskmanager.dto.TaskRequestDTO;
import com.olivia.taskmanager.entity.Task;
import com.olivia.taskmanager.service.TaskService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import jakarta.validation.Valid;

import java.util.List;

@RestController
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping("/tasks")
    public Task createTask(@Valid @RequestBody TaskRequestDTO dto) {
        return taskService.saveTask(dto);
    }

    @GetMapping("/tasks/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.findTaskById(id);
    }

    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @PutMapping("/tasks/{id}")
    public Task updateTask(
        @PathVariable Long id,
        @Valid @RequestBody TaskRequestDTO dto
    ) {
        return taskService.updateTask(id, dto);
    }
}