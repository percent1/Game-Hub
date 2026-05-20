import { Menu, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const HamburgerMenu = ({ isOpen, onToggle }: Props) => {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {isOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  );
};

export default HamburgerMenu;