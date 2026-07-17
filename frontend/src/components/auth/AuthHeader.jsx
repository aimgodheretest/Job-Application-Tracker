import Logo from "../common/Logo";

export default function AuthHeader() {
  return (
    <div className="mb-10">
      <Logo />

      <h2
        className="
        text-4xl
        font-bold
        mt-10
        "
      >
        Welcome 👋
      </h2>

      <p
        className="
        text-gray-500
        mt-3
        leading-7
        "
      >
        Manage your job applications, interviews and offers from one place.
      </p>
    </div>
  );
}
