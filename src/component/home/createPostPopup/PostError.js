export default function PostError({ error, setError }) {
  return (
    <div className="post_error">
      <div className="post_error_error">{error}</div>
      <button
        className="blue_btn"
        onClick={() => {
          setError("");
        }}
      >
        Post again
      </button>
    </div>
  );
}
