import Link from "next/link";

interface AdminButtonProps {
  Name?: string; 
  link: string;  
  icon?: React.ReactElement; 
}

const AdminButton = ({ Name, link, icon }: AdminButtonProps) => {

  return (
    <div className="flex items-center w-12 justify-center bg-gray-900 p-2 rounded-md hover:bg-gray-700 transition duration-300" >
      {icon && <span className="mr-2">{icon}</span>}
      <Link href={link} className="text-white text-sm font-semibold">
        {Name}
      </Link>
    </div>
  );
};

export default AdminButton;
