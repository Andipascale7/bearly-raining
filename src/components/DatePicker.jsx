function DatePicker({ selectedDate, onDateChange, availableDates }) {
  return (
    <div className="max-w-md mx-auto mb-8">
      <label className="block text-white text-sm font-semibold mb-2">
        Select Date
      </label>
      <select
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
      >
        {availableDates.map((date) => (
          <option key={date.value} value={date.value}>
            {date.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DatePicker;