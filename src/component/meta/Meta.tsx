// MODULE
import { Helmet } from "react-helmet-async";
// TYPE
type MetaType = {
  id: string;
  title: string;
  image: string;
  description: string;
};

const Meta: React.FC<MetaType> = ({ id }) => {
  return (
    <Helmet>
      <title>Whos' git?</title>
      <meta property="og:url" content="" />
      <meta name="author" content="Who's git?" />
      <meta property="og:title" content={id} />
      <meta property="og:description" content={id} />
      <meta property="og:image" content={id} />
    </Helmet>
  );
};

export default Meta;
