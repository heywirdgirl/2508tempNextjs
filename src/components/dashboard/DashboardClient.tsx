
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { logOut } from "@/lib/firebase/auth";
import { getTasks, type Task } from "@/lib/firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut, LoaderCircle, Plus } from "lucide-react";
import TaskItem from "./TaskItem";
import AddTaskDialog from "./AddTaskDialog";

export default function DashboardClient() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (user) {
      setLoading(true);
      try {
        const userTasks = await getTasks(user.uid);
        setTasks(userTasks);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error fetching tasks",
          description: "Could not load your tasks. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }
  }, [user, toast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    try {
      await logOut();
      router.push("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message,
      });
      setIsLogoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-headline font-semibold">Dashboard</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={isLogoutLoading}
          >
            {isLogoutLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline">My Tasks</CardTitle>
            <AddTaskDialog onTaskAdded={fetchTasks}>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </AddTaskDialog>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : tasks.length > 0 ? (
              <ul className="space-y-4">
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} onTaskChange={fetchTasks} />
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="font-semibold">No tasks yet!</p>
                <p>Click "Add Task" to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
