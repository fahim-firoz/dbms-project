import React from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pexwzisgdtjnigphofua.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBleHd6aXNnZHRqbmlncGhvZnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5Njk2MTMsImV4cCI6MjAxNTU0NTYxM30.nSgV0UKrFpLsEM_zFQr8NrCl9sdjNgeflqBqp8vcw1w"
);

function BookSlotForm() {
  const clubs = [
    "iste",
    "iedc",
    "ieee",
    "iei",
    "csi",
    "acm",
    "tinkerhub",
    "sae",
    "gdsc",
  ];
  const halls = ["apj", "pta", "jubilee", "uhde", "csijewdew"];

  const clubElements = clubs.map((data) => {
    return (
      <option key={data} value={data}>
        {data}
      </option>
    );
  });
  const hallElements = halls.map((data) => {
    return (
      <option key={data} value={data}>
        {data}
      </option>
    );
  });

  const date = new Date();

  const [formData, setFormData] = React.useState({
    club: "",
    hall: "",
    date: date.toISOString().split("T")[0], // Format the date as YYYY-MM-DD
    time: `${date.getHours()}:${date.getMinutes()}`,
  });

  function handleChange(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function submitData() {
    try {
      // Format date and time
      const formattedDate = new Date(formData.date).toISOString().split("T")[0];
      const formattedTime = `${formData.time}:00`;

      // Insert data into the 'booking' table
      const { data, error } = await supabase.from("booking").upsert([
        {
          book_id: 100, // Assuming hall_id is numeric
          booking_date: "2023-11-28",
          club: "iste",
          hall: "apj",
          time: "12:00:00",
        },
      ]);
      console.log(data);

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted successfully:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="bookslot-second-section">
      <div className="input-container">
        <div className="choose-club">
          <label>Choose the club</label>
          <select onChange={handleChange} name="club" value={formData.club}>
            {clubElements}
          </select>
        </div>
        <div className="choose-hall">
          <label>Choose the venue</label>
          <select onChange={handleChange} name="hall" value={formData.hall}>
            {hallElements}
          </select>
        </div>
        <div className="choose-date">
          <label>Choose the date</label>
          <input
            type="date"
            onChange={handleChange}
            value={formData.date}
            name="date"
          />
        </div>
        <div className="choose-time">
          <label>Choose the time</label>
          <input
            type="time"
            onChange={handleChange}
            value={formData.time}
            name="time"
          />
        </div>
      </div>
      <div>
        <button onClick={submitData} className="bookslot-button">
          Book slot
        </button>
      </div>
    </div>
  );
}

export default BookSlotForm;
