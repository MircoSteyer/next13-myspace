interface NavigationItemProps {
  children: React.ReactNode;
}

export const NavigationItem = ({ children }: NavigationItemProps) => {
  return <li className="flex h-14 items-center p-1">{children}</li>;
};

export default NavigationItem;
