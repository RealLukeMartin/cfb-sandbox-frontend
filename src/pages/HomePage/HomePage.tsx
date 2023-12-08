import { TeamSearchBox } from "../../components/TeamSearchBox";
import { Teams } from "../../components/Teams";
import { useLocation } from "react-router-dom";

export function HomePage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let page = Number(query.get("page"));
  let teamSearch = query.get("teamSearch");
  if (!page) {
    page = 0;
  }
  if (!teamSearch) {
    teamSearch = "";
  }
  return (
    <>
      <div>
        <div className="teams-search-box-container">
          <TeamSearchBox />
        </div>
        <Teams page={Number(page)} teamSearch={teamSearch} />
      </div>
    </>
  );
}