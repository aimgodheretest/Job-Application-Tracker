export default function UpcomingInterviews() {
  const interviews = [
    {
      company: "Netflix",
      date: "20 July",
      time: "11:00 AM",
    },
    {
      company: "Adobe",
      date: "22 July",
      time: "2:30 PM",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-5">Upcoming Interviews</h2>

      <div className="space-y-5">
        {interviews.map((item, index) => (
          <div key={index}>
            <h3 className="font-semibold">{item.company}</h3>

            <p className="text-gray-500 text-sm">
              {item.date} • {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
    