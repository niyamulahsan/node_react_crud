export default function Button(props) {
  return (
    <>
      <button {...props}>
        <span>{props.label}</span>
        <span>
          <i className={`${props.icon} mx-1`}></i>
        </span>
      </button>
    </>
  );
}
