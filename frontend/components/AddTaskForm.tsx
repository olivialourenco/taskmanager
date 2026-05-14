"use client";

import { api } from "@/services/api";
import { Task } from "@/types/task"; // Certifique-se de que a importação da Task está aqui
import { isAxiosError } from "axios";
import { FormEvent, useState, useEffect } from "react";

const DEFAULT_DESCRIPTION = "Sem descrição detalhada.";

type AddTaskFormProps = {
  onCreated: () => void | Promise<void>;
  taskToEdit?: Task | null; // NOVO: Propriedade para receber a tarefa que será editada
};

export function AddTaskForm({ onCreated, taskToEdit }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // NOVO: Monitora se 'taskToEdit' mudou. Se sim, preenche o formulário.
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      // Se for a descrição padrão, podemos deixar vazio para a pessoa editar do zero
      setDescription(taskToEdit.description === DEFAULT_DESCRIPTION ? "" : taskToEdit.description);
    } else {
      setTitle("");
      setDescription("");
    }
    setError(null); // Limpa erros ao trocar de modo
  }, [taskToEdit]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 3) {
      setError("O título deve ter pelo menos 3 caracteres.");
      return;
    }

    const trimmedDescription = description.trim();
    if (trimmedDescription.length > 0 && trimmedDescription.length < 5) {
      setError("Se preencher a descrição, use pelo menos 5 caracteres (requisito da API).");
      return;
    }

    const payload = {
      title: trimmedTitle,
      description: trimmedDescription.length >= 5 ? trimmedDescription : DEFAULT_DESCRIPTION,
      // Se estiver editando, enviamos também o status atual de 'completed'
      ...(taskToEdit && { completed: taskToEdit.completed })
    };

    setIsSubmitting(true);
    try {
      if (taskToEdit) {
        // MODO EDIÇÃO: Chamada PUT
        await api.put(`/tasks/${taskToEdit.id}`, payload);
      } else {
        // MODO CRIAÇÃO: Chamada POST
        await api.post("/tasks", payload);
      }

      setTitle("");
      setDescription("");
      await onCreated(); // Avisa a Home para recarregar a lista e limpar taskToEdit
    } catch (err) {
      if (isAxiosError(err) && err.response?.data && typeof err.response.data === "object") {
        const data = err.response.data as Record<string, string>;
        const first = Object.values(data)[0];
        setError(typeof first === "string" ? first : "Não foi possível salvar a tarefa.");
      } else {
        setError("Não foi possível salvar a tarefa. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
      {/* Título dinâmico para UX */}
      <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
        {taskToEdit ? "Editar tarefa" : "Nova tarefa"}
      </h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        {taskToEdit ? "Altere as informações abaixo e clique em salvar." : "O título é obrigatório. A descrição é opcional."}
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="task-title" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Título <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            id="task-title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200 disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
            placeholder="Ex.: Revisar documentação"
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="task-description" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Descrição <span className="font-normal text-slate-500 dark:text-slate-500">(opcional)</span>
          </label>
          <textarea
            id="task-description"
            name="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200 disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
            placeholder="Detalhes adicionais (mín. 5 caracteres se preencher)"
          />
        </div>

        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex min-w-[8.5rem] items-center justify-center rounded-2xl border px-5 py-2.5 text-sm font-medium shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
              taskToEdit 
                ? "bg-blue-600 text-white border-transparent hover:bg-blue-700" 
                : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:bg-zinc-800/80"
            }`}
          >
            {isSubmitting ? "A guardar…" : taskToEdit ? "Salvar alterações" : "Criar tarefa"}
          </button>
        </div>
      </form>
    </div>
  );
}