
"use client";

import { useState } from "react";
import { deleteTask, updateTask, type Task } from "@/lib/firebase/firestore";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Check, X, LoaderCircle } from "lucide-react";

type TaskItemProps = {
  task: Task;
  onTaskChange: () => void;
};

export default function TaskItem({ task, onTaskChange }: TaskItemProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      await updateTask(task.id, { completed: !task.completed });
      onTaskChange();
    } catch (error) {
      toast({ variant: "destructive", title: "Error updating task" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateText = async () => {
    if (editText.trim() === "") {
        toast({ variant: "destructive", title: "Task cannot be empty" });
        return;
    }
    setIsLoading(true);
    try {
      await updateTask(task.id, { text: editText });
      onTaskChange();
      setIsEditing(false);
    } catch (error) {
      toast({ variant: "destructive", title: "Error updating task" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTask(task.id);
      toast({ title: "Task deleted successfully" });
      onTaskChange();
    } catch (error) {
      toast({ variant: "destructive", title: "Error deleting task" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={handleToggleComplete}
        disabled={isLoading}
      />
      <div className="flex-1">
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="h-8"
            disabled={isLoading}
          />
        ) : (
          <label
            htmlFor={`task-${task.id}`}
            className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}
          >
            {task.text}
          </label>
        )}
      </div>
      {isLoading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : (
        <div className="flex gap-1">
            {isEditing ? (
            <>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700" onClick={handleUpdateText}>
                    <Check className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4" />
                </Button>
            </>
            ) : (
            <>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </>
            )}
        </div>
      )}
    </li>
  );
}
