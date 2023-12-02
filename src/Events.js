import React from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseApi = process.env.REACT_APP_SUPABASE_API;

const supabase = createClient(supabaseUrl, supabaseApi);

function Events() {
  const [bookingData, setBookingData] = React.useState([{}]);

  React.useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const { data, error } = await supabase.from("BOOKING").select("*");

        if (error) {
          throw error;
        }

        setBookingData(data);
      } catch (error) {
        console.error("Error fetching data from Supabase:", error.message);
      }
    };

    fetchBookingData();
  }, []);

  const eventElements = bookingData.map((data) => {
    return (
      <div className="event-container">
        <p>Club: {data.club}</p>
        <p>Event: {data.event}</p>
        <p>Hall: {data.hall}</p>
        <p>Date: {data.booking_date}</p>
        <p>Time: {data.time} pm</p>
      </div>
    );
  });

  return (
    <div>
      {bookingData.length > 0 ? (
        <div className="event-section">{eventElements}</div>
      ) : (
        <h1 className="no-event-title">No events so far..</h1>
      )}
    </div>
  );
}

export default Events;
