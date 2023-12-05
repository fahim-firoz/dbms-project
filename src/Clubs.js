import React from "react";
import "./index.css";
import Club from "./Club";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseApi = process.env.REACT_APP_SUPABASE_API;

const supabase = createClient(supabaseUrl, supabaseApi);

export default function App() {
  const [clubData, setClubData] = React.useState([{}]);
  React.useEffect(() => {
    const fetchClubData = async () => {
      try {
        const { data, error } = await supabase.from("CLUB").select("*");

        if (error) {
          throw error;
        }

        setClubData(data);
      } catch (error) {
        console.error("Error fetching data from Supabase:", error.message);
      }
    };

    fetchClubData();
  }, []);
  const clubElements = clubData.map((data) => {
    return (
      <Club
        title={data.club}
        image={data.img}
        linkedin={data.linkedin}
        instagram={data.insta}
      />
    );
  });
  return (
    <div>
      <div className="club-section">{clubElements}</div>
    </div>
  );
}
