"use client";

import { AddTaskForm } from "@/components/AddTaskForm";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { Modal } from "@/components/Modal"; // 1. IMPORTAÇÃO ADICIONADA
import { api } from "@/services/api";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  
  // Estados do Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  async function fetchTasks() {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas", error);
    }
  }

  // Abre o modal e guarda o ID
  function confirmDelete(id: number) {
    setIdToDelete(id);
    setIsDeleteModalOpen(true);
  }

  // Executa a exclusão real
  async function handleDeleteTask() {
    if (idToDelete === null) return;
    try {
      await api.delete(`/tasks/${idToDelete}`);
      await fetchTasks();
      setIsDeleteModalOpen(false);
      setIdToDelete(null);
    } catch (error) {
      console.error("Erro ao deletar tarefa", error);
    }
  }

  async function handleToggleStatus(task: Task) {
    try {
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed
      });
      await fetchTasks();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  }

  function handleEditInitiate(task: Task) {
    setTaskToEdit(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="min-h-screen">
      <Header />

      <section className="max-w-6xl mx-auto px-6 py-10 sm:px-8">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Suas tarefas
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Gerencie suas tarefas com foco na simplicidade e clareza.
              </p>
            </div>

            <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white">
              {tasks.length} tarefas
            </div>
          </div>
        </div>

        <AddTaskForm 
          taskToEdit={taskToEdit} 
          onCreated={() => {
            fetchTasks();
            setTaskToEdit(null);
          }} 
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onDelete={confirmDelete} // 2. AJUSTE: Chama o modal, não a função de delete direto
              onToggle={handleToggleStatus}
              onEdit={handleEditInitiate}
            />
          ))}
        </div>

        {/* Modal de Confirmação */}
        <Modal 
          isOpen={isDeleteModalOpen} 
          onClose={() => setIsDeleteModalOpen(false)} 
          title="Confirmar Exclusão"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-zinc-800 transition"
            >
              Cancelar
            </button>
            <button 
              onClick={handleDeleteTask}
              className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition shadow-sm"
            >
              Excluir Tarefa
            </button>
          </div>
        </Modal>
      </section>
    </main>
  );
}