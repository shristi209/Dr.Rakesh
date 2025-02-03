
interface MiniButtonProps {
  icon: React.ComponentType;
  link: string;
}

const MiniButton: React.FC<MiniButtonProps> = ({ link }) => {
  return (
    <a href={link} className="text-black border-2 border-gray-200 p-2 inline-flex items-center">
    </a>
  );
};

export default MiniButton;
