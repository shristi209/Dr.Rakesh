import Link from 'next/link';

interface SidebarProps {
  title: string;
  link: string;
  icon: React.ElementType; 
}

const SideBar = ({ title, link, icon: Icon }: SidebarProps) => {
  return (
    <li>
      <Link
        href={link}
        className="flex items-center space-x-3 text-gray-300 hover:bg-gray-800 rounded-md px-3 py-2"
      >
        <Icon className="w-5 h-5" />
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default SideBar;
