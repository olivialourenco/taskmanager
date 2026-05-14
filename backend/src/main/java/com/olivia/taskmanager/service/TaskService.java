package com.olivia.taskmanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.olivia.taskmanager.dto.TaskRequestDTO;
import com.olivia.taskmanager.entity.Task;
import com.olivia.taskmanager.repository.TaskRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task saveTask(TaskRequestDTO dto) {

        Task task = new Task();

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setCompleted(false);
        task.setCreatedAt(java.time.LocalDateTime.now());

        return taskRepository.save(task);
    }

    public Task findTaskById(Long id) {

        Optional<Task> task = taskRepository.findById(id);

        return task.orElseThrow(() ->
            new RuntimeException("Tarefa não encontrada")
        );
    }

    public void deleteTask(Long id) {

        if (!taskRepository.existsById(id)) {
        throw new RuntimeException("Tarefa não encontrada");
    }

    taskRepository.deleteById(id);
    }

    public Task updateTask(Long id, TaskRequestDTO dto) {

        Task task = findTaskById(id);

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());

        task.setCompleted(dto.isCompleted());

        return taskRepository.save(task);
    }
}