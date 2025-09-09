import { useState } from 'react';

const Slot = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 8, 11)); 
  const [bookings, setBookings] = useState({}); 

  const now = new Date('2025-09-09T19:40:00+05:30'); 

  const generateTimeSlots = () => {
    const slots = [];
    let start = new Date(2025, 8, 11); 
    start.setHours(10, 0, 0, 0);
    const end = new Date(start);
    end.setHours(18, 30, 0, 0);
    
    while (start <= end) {
      let timeStr = start.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
      timeStr = timeStr.toLowerCase().replace(' ', '');
      slots.push(timeStr);
      start.setMinutes(start.getMinutes() + 30);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    const today = new Date(2025, 8, 9); 
    const empties = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < empties; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return { days, today };
  };

  const { days, today } = generateCalendar(selectedDate.getFullYear(), selectedDate.getMonth());

  const handleDayClick = (day) => {
    if (day && isDateAvailable(day)) {
      setSelectedDate(day);
    }
  };

  const handleBookSlot = (time) => {
    const dateKey = selectedDate.toDateString();
    setBookings(prev => {
      const currentBookings = prev[dateKey] || {};
      const currentCount = currentBookings[time] || 0;
      if (currentCount < 5) {
        return {
          ...prev,
          [dateKey]: {
            ...currentBookings,
            [time]: currentCount + 1
          }
        };
      }
      return prev;
    });
  };

  const isSlotBookedFull = (time) => {
    const dateKey = selectedDate.toDateString();
    const dateBookings = bookings[dateKey] || {};
    return (dateBookings[time] || 0) >= 5;
  };

  const getCurrentBookings = (time) => {
    const dateKey = selectedDate.toDateString();
    const dateBookings = bookings[dateKey] || {};
    return dateBookings[time] || 0;
  };

  const areAllSlotsFull = (date) => {
    const dateKey = date.toDateString();
    const dateBookings = bookings[dateKey] || {};
    return timeSlots.every(time => (dateBookings[time] || 0) >= 5);
  };

  const isDateAvailable = (date) => {
    if (!date || date < today) return false;
    if (date.toDateString() === today.toDateString() && now.getHours() >= 18 && now.getMinutes() > 30) return false; 
    return !areAllSlotsFull(date);
  };

  const availableSlots = timeSlots.filter(time => !isSlotBookedFull(time));

  const handleNext = () => {
    alert('Proceeding to the next step...');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 innerContainerWrapper">
      <div className="w-full lg:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => {
              const newMonth = selectedDate.getMonth() - 1;
              const newYear = selectedDate.getFullYear() + (newMonth < 0 ? -1 : 0);
              const adjustedMonth = newMonth < 0 ? 11 : newMonth;
              const daysInMonth = new Date(newYear, adjustedMonth + 1, 0).getDate();
              const day = Math.min(selectedDate.getDate(), daysInMonth);
              setSelectedDate(new Date(newYear, adjustedMonth, day));
            }}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            ‹
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button 
            onClick={() => {
              const newMonth = selectedDate.getMonth() + 1;
              const newYear = selectedDate.getFullYear() + (newMonth > 11 ? 1 : 0);
              const adjustedMonth = newMonth > 11 ? 0 : newMonth;
              const daysInMonth = new Date(newYear, adjustedMonth + 1, 0).getDate();
              const day = Math.min(selectedDate.getDate(), daysInMonth);
              setSelectedDate(new Date(newYear, adjustedMonth, day));
            }}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            ›
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm font-medium text-gray-500">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDayClick(day)}
              disabled={!day || !isDateAvailable(day)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                !day 
                  ? 'invisible' 
                  : !isDateAvailable(day)
                  ? 'text-gray-400 cursor-not-allowed'
                  : day.toDateString() === today.toDateString()
                  ? 'bg-[#f97c35] bg-opacity-20 text-[#f97c35]'
                  : day.toDateString() === selectedDate.toDateString()
                  ? 'bg-gradient-to-r from-[#f97c35] to-[#f03a74] text-white'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              {day && day.getDate()}
            </button>
          ))}
        </div>
        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border">
          <h3 className="font-semibold text-gray-900">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h3>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Slots</h3>
        <div className="bg-white rounded-lg shadow-sm border p-4 max-h-96 overflow-y-auto">
          {availableSlots.map((time, index) => {
            const bookedCount = getCurrentBookings(time);
            return (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-900 font-medium">{time}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{bookedCount}/5</span>
                  <button
                    onClick={() => handleBookSlot(time)}
                    className="bg-gradient-to-r from-[#f97c35] to-[#f03a74] hover:from-[#f88c45] hover:to-[#f04a84] text-white px-4 py-1 rounded-md text-sm transition-colors"
                  >
                    Book
                  </button>
                </div>
              </div>
            );
          })}
          {availableSlots.length === 0 && (
            <p className="text-gray-500 text-center py-4">No available slots</p>
          )}
        </div>
        {/* <button 
          onClick={handleNext}
          className="mt-4 bg-gradient-to-r from-[#f97c35] to-[#f03a74] hover:from-[#f88c45] hover:to-[#f04a84] text-white px-6 py-2 rounded-md font-semibold w-full lg:w-auto"
        >
          Next
        </button> */}
      </div>
    </div>
  );
};

export default Slot;