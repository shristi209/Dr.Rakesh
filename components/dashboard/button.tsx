import Link from "next/link";

interface AdminButtonProps {
  link: string;  
  icon?: React.ReactElement;
  title?: string;
  Name?: string;
  className?: string;
}

const AdminButton = ({ link, icon, title, Name, className }: AdminButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md transition duration-300";
  const iconClasses = "bg-gray-900 p-1.5 hover:bg-gray-700";
  const textClasses = "px-4 py-1.5 text-white text-sm font-medium";
  
  return (
    <Link 
      href={link} 
      className={`${baseClasses} ${Name ? textClasses : iconClasses} ${className || ''}`}
      title={title}
    >
      {icon}
      {Name && <span>{Name}</span>}
    </Link>
  );
};

export default AdminButton;
