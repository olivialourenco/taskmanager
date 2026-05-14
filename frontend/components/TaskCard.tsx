import { Task } from "@/types/task";
import { CheckCircle, Trash2, Circle, Pencil } from "lucide-react"; // Adicionado Pencil

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void; // Nova Prop para disparar a edição
}

export function TaskCard({ task, onDelete, onToggle, onEdit }: TaskCardProps) {
  return (
    <div className={`group relative rounded-xl border p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 ${
      task.completed 
        ? "border-green-100 bg-green-50/30 dark:border-green-900/20 dark:bg-green-950/10" 
        : "border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50"
    }`}>
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className={`text-lg font-medium tracking-tight transition-all ${
              task.completed ? "text-slate-400 line-through" : "text-slate-900 dark:text-white"
            }`}>
              {task.title}
            </h3>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              {task.description}
            </p>
          </div>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* NOVO: Botão de Editar */}
            <button 
              onClick={() => onEdit(task)}
              title="Editar tarefa"
              className="p-2 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-950/30 transition"
            >
              <Pencil size={18} />
            </button>

            <button 
              onClick={() => onToggle(task)}
              title={task.completed ? "Reabrir tarefa" : "Concluir tarefa"}
              className={`p-2 rounded-lg transition ${
                task.completed ? "text-green-500" : "text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}
            >
              {task.completed ? <CheckCircle size={18} /> : <Circle size={18} />}
            </button>

            <button 
              onClick={() => onDelete(task.id)}
              title="Excluir tarefa"
              className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
            task.completed 
              ? "border-green-200 bg-green-100 text-green-700 dark:border-transparent dark:bg-green-900/40 dark:text-green-400" 
              : "border-slate-200 bg-slate-50 text-slate-700 dark:border-transparent dark:bg-zinc-800 dark:text-slate-300"
          }`}>
            {task.completed ? "Concluída" : "Pendente"}
          </span>
        </div>
      </div>
    </div>
  );
}