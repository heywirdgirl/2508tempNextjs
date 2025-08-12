
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Database, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Xác thực an toàn",
      description: "Đăng nhập và đăng ký người dùng an toàn với Firebase Authentication.",
    },
    {
      icon: <Database className="w-8 h-8 text-primary" />,
      title: "Cơ sở dữ liệu thời gian thực",
      description: "Lưu trữ và đồng bộ dữ liệu ngay lập tức với Cloud Firestore.",
    },
    {
        icon: <Zap className="w-8 h-8 text-primary" />,
        title: "Tốc độ & Hiệu suất",
        description: "Xây dựng trên Next.js cho hiệu suất web tối ưu và trải nghiệm người dùng mượt mà.",
    },
    {
        icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
        title: "Sẵn sàng cho AI",
        description: "Tích hợp sẵn Genkit để dễ dàng mở rộng với các tính năng AI tạo sinh mạnh mẽ.",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Xây dựng ứng dụng Next.js với Firebase
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Một dự án khởi đầu mạnh mẽ, tích hợp sẵn xác thực, cơ sở dữ liệu và được xây dựng với các công nghệ web hiện đại nhất.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      Bắt đầu ngay
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="abstract technology"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Các tính năng chính
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Nền tảng vững chắc cho dự án của bạn
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tận dụng sức mạnh của Firebase và Next.js để xây dựng các ứng dụng có khả năng mở rộng, hiệu suất cao một cách nhanh chóng.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 xl:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                 <Card key={index} className="h-full">
                    <CardHeader className="flex flex-col items-center text-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            {feature.icon}
                        </div>
                        <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                 </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center w-full h-16 border-t bg-card">
        <p className="text-sm text-muted-foreground">
          tempNextjs25 © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
