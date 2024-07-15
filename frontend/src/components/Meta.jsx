import { Helmet } from "react-helmet-async";
const Meta = ({
  title = "Welcome to Wamson",
  description = "Wamson Co-Living PG",
  keywords = "Home,PG,Rental",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
