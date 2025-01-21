
interface MiniButtonProps {
  icon: React.ComponentType;
  link: string;
}

const MiniButton: React.FC<MiniButtonProps> = ({ icon: Icon, link }) => {
  return (
    <a href={link} className="text-black border-2 border-gray-200 p-2 inline-flex items-center">
      {/* <Icon className="text-black" /> */}
    </a>
  );
};

export default MiniButton;
