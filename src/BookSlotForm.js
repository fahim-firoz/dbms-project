import React from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseApi = process.env.REACT_APP_SUPABASE_API;

const supabase = createClient(supabaseUrl, supabaseApi);
function BookSlotForm() {
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
  const [hallData, setHallData] = React.useState([{}]);
  React.useEffect(() => {
    const fetchHallData = async () => {
      try {
        const { data, error } = await supabase.from("HALL").select("*");

        if (error) {
          throw error;
        }

        setHallData(data);
      } catch (error) {
        console.error("Error fetching data from Supabase:", error.message);
      }
    };

    fetchHallData();
  }, []);

  const clubElements = clubData.map((data) => {
    return (
      <option key={data.club} value={data.club}>
        {data.club}
      </option>
    );
  });
  const hallElements = hallData.map((data) => {
    return (
      <option key={data.hall_name} value={data.hall_name}>
        {data.hall_name}, capacity: {data.hall_capacity}
      </option>
    );
  });

  const [formData, setFormData] = React.useState({
    club: "",
    eventName: "",
    hall: "",
    date: "",
    time: "",
  });

  const defaultFormData = {
    club: "",
    eventName: "",
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
    if (formData.eventName.trim() === "") {
      missingFields.push("Event name");
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
        event: formData.eventName,
        hall: formData.hall,
        booking_date: formData.date,
        time: formData.time,
      });

      console.log(error);

      if (error) {
        setBookSuccess(false);
        console.error("Error inserting data:", error);
        setFormData(defaultFormData);
      } else {
        setBookSuccess(true);
        console.log("Data inserted successfully:", data);
        setFormData(defaultFormData);
      }
      setTimeout(() => {
        setBookSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  }
  console.log(formData);

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
        <div className="choose-event">
          <label>Event name</label>
          <input
            type="text"
            placeholder="Enter the event"
            name="eventName"
            onChange={handleChange}
            value={formData.eventName}
          />
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

      {bookSuccess !== null && (
        <div className="print-success">
          <p>
            {bookSuccess
              ? "Booked successfully! Check the events for confirmation."
              : "Slot unavailable!"}
          </p>
        </div>
      )}

      <button onClick={submitData} className="bookslot-button">
        Confirm slot
      </button>
    </div>
  );
}

export default BookSlotForm;
