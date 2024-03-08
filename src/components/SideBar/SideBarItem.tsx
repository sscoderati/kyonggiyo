type SideBarItemProps = {
  name: string;
};

export default function SideBarItem({ name }: SideBarItemProps) {
  return (
    <div className={"cursor-pointer px-4 py-2 hover:bg-blue-300"}>{name}</div>
  );
}
