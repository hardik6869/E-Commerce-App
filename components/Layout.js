import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <p> I am the Layout Component. </p>
      {children}
    </div>
  );
};

export default Layout;
