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
    date: "",
    time: "",
  });

  const defaultFormData = {
    club: "",
    hall: "",
    date: "",
    time: "",
  };

  function handleChange(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }
  const [bookSuccess, setBookSuccess] = React.useState(null);

  async function submitData() {
    const missingFields = [];
    if (formData.club.trim() === "") {
      missingFields.push("Club");
    }
    if (formData.hall.trim() === "") {
      missingFields.push("Hall");
    }
    if (formData.date.trim() === "") {
      missingFields.push("Date");
    }
    if (formData.time.trim() === "") {
      missingFields.push("Time");
    }

    if (missingFields.length > 0) {
      setBookSuccess(null);
      const missingFieldsString = missingFields.join(", ");
      alert(`Please fill in the following fields: ${missingFieldsString}`);
      return;
    }
    try {
      // Make an API request to insert data into the 'booking' table
      const { data, error } = await supabase.from("BOOKING").insert({
        club: formData.club,
        hall: formData.hall,
        booking_date: formData.date,
        time: formData.time,
      });

      console.log(error);

      if (error) {
        setBookSuccess(false);
        console.error("Error inserting data:", error);
      } else {
        setBookSuccess(true);
        console.log("Data inserted successfully:", data);
        setFormData(defaultFormData);
      }
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  }

  return (
    <div className="bookslot-second-section">
      <div className="input-container">
        <div className="choose-club">
          <label>Choose the club</label>
          <select onChange={handleChange} name="club" value={formData.club}>
            <option value="" disabled selected>
              Choose an option
            </option>
            {clubElements}
          </select>
        </div>
        <div className="choose-hall">
          <label>Choose the venue</label>
          <select onChange={handleChange} name="hall" value={formData.hall}>
            <option value="" disabled selected>
              Choose an option
            </option>
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
            placeholder="Select a date"
            style={{ color: formData.date ? "black" : "gray" }}
          />
        </div>
        <div className="choose-time">
          <label>Choose the time</label>
          <select onChange={handleChange} name="time" value={formData.time}>
            <option value="" disabled selected>
              Choose an option
            </option>
            <option value="9-12" key="9-12">
              9-12
            </option>
            <option value="1-4" key="1-4">
              1-4
            </option>
            <option value="5-8" key="5-8">
              5-8
            </option>
          </select>
        </div>
      </div>
      <div>
        {bookSuccess !== null && (
          <p>{bookSuccess ? "Booked successfully" : "Unsuccessful"}</p>
        )}
        <button onClick={submitData} className="bookslot-button">
          Book slot
        </button>
      </div>
    </div>
  );
}

export default BookSlotForm;
