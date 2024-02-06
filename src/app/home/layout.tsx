import NavBar from "@/components/NavBar";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main className="mx-auto flex min-h-dvh flex-col bg-white">
      <NavBar />
      {children}
    </main>
  );
}
