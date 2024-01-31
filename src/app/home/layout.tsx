type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return <main className="mx-auto flex min-h-dvh bg-white">{children}</main>;
}
