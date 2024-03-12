export const EntryForm = () => {
  return (
    <div>
      <h3>New Healthcheck Entry</h3>
      <form>
        <div>
          <label htmlFor="date">Date</label>
          <input id="date" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input id="description" />
        </div>
        <div>
          <label htmlFor="specialist">Specialist</label>
          <input />
        </div>
        <div>
          <label htmlFor="diagnosisCodes">diagnosis codes</label>
          <input id="diagnosisCodes" />
        </div>
        <div>
          <label htmlFor="healthCheckRating">Healthcheck Rating</label>
          <input id="healthCheckRating" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
