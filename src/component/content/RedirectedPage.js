import { useParams } from "react-router-dom";

const RedirectedPage = () => {
  const { customUrl } = useParams();

  window.location.href = `https://kmhdui-link-api.herokuapp.com/${customUrl}`;
};

export default RedirectedPage;
