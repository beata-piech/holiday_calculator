import React from 'react';

const TripPanel = () => {
  const [tripId, setTripId] = React.useState(0);
  const [city_hotel, setCity_hotel] = React.useState('');
  const [board, setBoard] = React.useState('');
  const [hotel_cost, setHotel_cost] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [airportStart, setAirportStart] = React.useState('');
  const [startFlight_cost, setStartFlight_cost] = React.useState('');
  const [returnDate, setReturnDate] = React.useState('');
  const [airportReturn, setAirportReturn] = React.useState('');
  const [returnFlight_cost, setReturnFlight_cost] = React.useState('');
  const [addNote, setAddNote] = React.useState('');
  const [addCost, setAddCost] = React.useState('');
  const [newTripDetails, setNewTripDetails] = React.useState([]);

  let formInput = document.querySelector('form');
  let table = document.querySelector('table');
  let nextTripButton = document.querySelector('#trip-btn');
  let printButton = document.querySelector('#print-btn');

  //count the trip duration to days
  let tripDuration = 0;
  const countDays = () => {
    if (startDate !== '' && returnDate !== '') {
      let days = Date.parse(returnDate) - Date.parse(startDate);
      tripDuration = Math.floor(days / (1000 * 3600 * 24));
      if (tripDuration < 0) {
        tripDuration =
          'Change the Dates - your departure day later than return day';
      }
    } else {
      tripDuration = 'Trip dates not indicated';
    }
  };
  countDays();

  //count the trip total cost
  let totalCost =
    Number(hotel_cost) +
    Number(startFlight_cost) +
    Number(returnFlight_cost) +
    Number(addCost);

  //add to display the trip
  const addTrip = () => {
    let newTrip = newTripDetails;
    let trip = {
      keyTripId: tripId,
      toDisplayCity_hotel: city_hotel,
      toDisplayBoard: board,
      toDisplayHotel_cost: hotel_cost,
      toDisplayStartDate: startDate,
      toDisplayAirportStart: airportStart,
      toDisplayStartFlight_cost: startFlight_cost,
      toDisplayReturnDate: returnDate,
      toDisplayAirportReturn: airportReturn,
      toDisplayReturnFlight_cost: returnFlight_cost,
      toDisplayAddNote: addNote,
      toDisplayAddCost: addCost,
      toDisplayDuration: tripDuration,
      toDisplayTotalCost: totalCost,
    };
    newTrip.push(trip);
    setNewTripDetails(newTrip);
  };
  //on click Submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    let input = document.querySelectorAll('.cost');
    if (!totalCost) {
      window.alert('No costs indicated, enter at least one cost!');
      input.forEach((e) => e.classList.add('highlight'));
    } else {
      addTrip(
        tripId,
        city_hotel,
        board,
        hotel_cost,
        startDate,
        airportStart,
        startFlight_cost,
        returnDate,
        airportReturn,
        addNote,
        addCost,
        tripDuration,
        totalCost
      );
      setTripId(tripId + 1);
      setCity_hotel('');
      setBoard('');
      setHotel_cost('');
      setStartDate('');
      setAirportStart('');
      setStartFlight_cost('');
      setReturnDate('');
      setAirportReturn('');
      setReturnFlight_cost('');
      setAddNote('');
      setAddCost('');
      table.style.display = 'block';
      formInput.style.display = 'none';
      printButton.style.display = 'inline-block';
      nextTripButton.style.display = 'inline-block';
      input.forEach((e) => e.classList.remove('highlight'));
    }
  };
  //on click Add_next_trip button
  const handleNextTrip = () => {
    formInput.style.display = 'block';
    nextTripButton.style.display = 'none';
  };
  //map through the trip's list to dispaly every new trip in the table
  const listNewTrips = newTripDetails.map((e) => (
    <tr key={e.keyTripId}>
      <td>{e.toDisplayCity_hotel}</td>
      <td>{e.toDisplayBoard}</td>
      <td>{e.toDisplayHotel_cost}</td>
      <td>{e.toDisplayStartDate}</td>
      <td>{e.toDisplayAirportStart}</td>
      <td>{e.toDisplayStartFlight_cost}</td>
      <td>{e.toDisplayReturnDate}</td>
      <td>{e.toDisplayAirportReturn}</td>
      <td>{e.toDisplayReturnFlight_cost}</td>
      <td>{e.toDisplayAddNote}</td>
      <td>{e.toDisplayAddCost}</td>
      <td>{e.toDisplayDuration}</td>
      <td className="total">{e.toDisplayTotalCost} </td>
    </tr>
  ));

  return (
    <div>
      <form className="form">
        <h2>Your Holiday Calculator</h2>
        <h4>Destination:</h4>
        <input
          type="text"
          placeholder="City / Hotel"
          id="city_hotel"
          value={city_hotel}
          onChange={(e) => setCity_hotel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type of board"
          id="board"
          value={board}
          onChange={(e) => setBoard(e.target.value)}
        />
        <input
          type="number"
          placeholder="Hotel cost"
          id="hotel_cost"
          className="cost"
          min="0"
          value={hotel_cost}
          onChange={(e) => setHotel_cost(e.target.value)}
        />
        <br />

        <h4>Trip start date:</h4>
        <input
          type="date"
          placeholder="Trip start date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Departure airport"
          id="airportStart"
          value={airportStart}
          onChange={(e) => setAirportStart(e.target.value)}
        />
        <input
          type="number"
          placeholder="Departure flight cost"
          id="startFlight_cost"
          className="cost"
          min="0"
          value={startFlight_cost}
          onChange={(e) => setStartFlight_cost(e.target.value)}
        />
        <br />

        <h4>Trip return date:</h4>
        <input
          type="date"
          placeholder="Trip return date"
          id="returnDate"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Return Airport"
          id="airportReturn"
          value={airportReturn}
          onChange={(e) => setAirportReturn(e.target.value)}
        />
        <input
          type="number"
          placeholder="Return flight cost"
          id="returnFlight_cost"
          className="cost"
          min="0"
          value={returnFlight_cost}
          onChange={(e) => setReturnFlight_cost(e.target.value)}
        />
        <br />

        <h4>Additional:</h4>
        <input
          type="text"
          placeholder="Add notes"
          id="addNote"
          value={addNote}
          onChange={(e) => setAddNote(e.target.value)}
        />
        <input
          type="number"
          placeholder="Add other costs, e.g. taxi, restaurant"
          id="addCost"
          className="cost"
          min="0"
          value={addCost}
          onChange={(e) => setAddCost(e.target.value)}
        />
        <br />

        <button id="submit-btn" className="btn" onClick={handleSubmit}>
          Sumbit
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>City/Hotel</th>
            <th>Board</th>
            <th>Hotel cost</th>
            <th>Departure date</th>
            <th>Departure airport</th>
            <th>Departure flight cost</th>
            <th>Return date</th>
            <th>Return Airport</th>
            <th>Return flight cost</th>
            <th>Additional notes</th>
            <th>Additional costs</th>
            <th>Trip duration (days)</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>{listNewTrips}</tbody>
      </table>
      <button id="trip-btn" className="btn outside" onClick={handleNextTrip}>
        Add next trip
      </button>
      <button
        id="print-btn"
        className="btn outside"
        onClick={() => window.print()}
      >
        Print
      </button>
    </div>
  );
};

export default TripPanel;
