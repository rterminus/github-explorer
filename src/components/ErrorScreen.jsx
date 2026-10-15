const errors = {
  404: {
    title: "User not found",
    message: `We couldn't find anyone with the username `,
  },
  403: {
    title: "Request limit reached",
    message: "Request limit was reached. Try again later.",
  },
  400: {
    title: "Invalid user name",
    message: "Username provided is invalid. Try another user.",
  },
};
const defaultError = {
  title: "The server is currently down.",
  message: "It wasn't possible to connect to the server. Try again later.",
};

export default function ErrorScreen({ searchQuery, status }) {
  const errorInfo = errors[status] ?? defaultError;

  return (
    <div className="bg-surface-card border-border-subtle flex flex-col items-center justify-center gap-4 rounded-xl border py-20 text-center">
      <span className="text-text-muted material-symbols-outlined text-5xl">
        Error!
      </span>
      <h2 className="text-text-primary text-2xl font-bold">
        {errorInfo.title}
      </h2>
      <p className="text-text-secondary">
        {errorInfo.message}
        {status === 404 && (
          <>
            {" "}
            <span className="text-primary text-lg">@{searchQuery}</span>.
          </>
        )}
      </p>
    </div>
  );
}
