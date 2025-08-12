
"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getTasks, type Task } from "@/lib/firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, Plus } from "lucide-react";
import TaskItem from "./TaskItem";
import AddTaskDialog from "./AddTaskDialog";

export default function DashboardClient() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    if (user) {
      setLoading(true);
      try {
        const userTasks = await getTasks(user.uid);
        setTasks(userTasks);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi khi tải công việc",
          description: "Không thể tải danh sách công việc của bạn. Vui lòng thử lại sau.",
        });
      } finally {
        setLoading(false);
      }
    }
  }, [user, toast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-secondary/50">
      <main className="container mx-auto p-4 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
                <CardTitle className="font-headline">Công việc của tôi</CardTitle>
                <CardDescription>Chào mừng trở lại! Đây là danh sách công việc của bạn.</CardDescription>
            </div>
            <AddTaskDialog onTaskAdded={fetchTasks}>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Thêm công việc
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
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                <p className="font-semibold">Chưa có công việc nào!</p>
                <p>Nhấn "Thêm công việc" để bắt đầu.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
