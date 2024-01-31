type AboutLayoutProps = {
  children: React.ReactNode;
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  return <main className="mx-auto flex min-h-dvh bg-white">{children}</main>;
}
