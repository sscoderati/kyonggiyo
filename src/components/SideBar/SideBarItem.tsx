type SideBarItemProps = {
  name: string;
};

export default function SideBarItem({ name }: SideBarItemProps) {
  return <div className={"px-4 py-2 hover:bg-blue-300"}>{name}</div>;
}
