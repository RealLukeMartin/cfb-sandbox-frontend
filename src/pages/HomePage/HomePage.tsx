import { Teams } from "../../components/Teams";
import { useLocation } from "react-router-dom";

export function HomePage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let page = Number(query.get("page"));
  if (!page) {
    page = 0;
  }
  return (
    <>
      <div>
        <Teams page={Number(page)} />
      </div>
    </>
  );
}