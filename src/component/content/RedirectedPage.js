import { useParams } from "react-router-dom";

const RedirectedPage = () => {
  const { customUrl } = useParams();

  let link = null;

  fetch("https://kmdui-link-default-rtdb.firebaseio.com/links.json")
    .then((res) => res.json())
    .then((data) => {
      for (const i in data) {
        const key = data[i];
        if (key["customLink"] === customUrl) {
          link = key["link"];
          break;
        }
      }

      if (link != null) {
        window.location.href = link;
      } else {
        window.location.href = `https://kmhdui.link/notfound`;
      }
    });
};

export default RedirectedPage;
