interface AppLayoutProps {
  children: React.ReactNode;
  className: string;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
  return (
    <div className={props.className}>{props.children}</div>
  );
};

export default AppLayout;
