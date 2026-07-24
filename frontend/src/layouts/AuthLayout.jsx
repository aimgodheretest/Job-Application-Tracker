import Logo from "../components/common/Logo";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 relative overflow-hidden">
      {/* Background Blur */}

      <div className="pointer-events-none absolute w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40 -top-20 -left-20" />

      <div className="pointer-events-none absolute w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40 bottom-0 right-0" />

      <div className="max-w-7xl mx-auto min-h-screen flex items-center">
        {/* Left */}

        <div className="hidden lg:flex flex-col w-1/2 px-10">
          <Logo />

          <h1 className="text-6xl font-bold mt-10 leading-tight">
            Track Every
            <span className="text-blue-600"> Opportunity</span>
          </h1>

          <p className="mt-8 text-xl text-gray-600 leading-9">
            Organize your job applications, interviews, reminders and offers
            from one beautiful dashboard.
          </p>

          <div className="grid grid-cols-2 gap-5 mt-14">
            <StatCard title="Applications" value="500+" />

            <StatCard title="Interviews" value="120+" />

            <StatCard title="Companies" value="350+" />

            <StatCard title="Offers" value="75+" />
          </div>
        </div>

        {/* Right */}

        <div className="w-full lg:w-1/2 flex justify-center">{children}</div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-4xl font-bold text-blue-600">{value}</h3>

      <p className="mt-2 text-gray-500">{title}</p>
    </div>
  );
}
