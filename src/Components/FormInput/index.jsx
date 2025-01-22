export function FormInput({ id, value, labelValue }) {
  return (
    <>
      <div className="flex justify-between w-6/12 mx-auto bg-white rounded-md px-2 py-2 shadow-sm mb-2">
        <input type="radio" name="capital" id={id} value={value} />
        <label>{labelValue}</label>
      </div>
    </>
  );
}
