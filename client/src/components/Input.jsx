export default function Input(props) {
  return (
    <>
      <div className="block w-full">
        <label
          htmlFor={props.id}
          className={`block ${props.label ? "mb-1" : "m-0"}`}
        >
          {props.label}
        </label>
        <input
          {...props}
          id={props.id}
          className={`w-full border border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 p-2 rounded text-sm ${props.className}`}
        />
        <div className="text-red-500 block text-xs">{props.err}</div>
      </div>
    </>
  );
}
