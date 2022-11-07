export default function Bio({
  infos,
  handleChange,
  max,
  setShowBio,
  updateDetails,
  name,
  placeholder,
  detail,
  setShow,
  rel,
}) {
  return (
    <div className="add_bio_wrap">
      {rel ? (
        <select
          name={name}
          className="select_relation"
          value={infos.relationship}
          onChange={handleChange}
        >
          <option value="Single">Single</option>
          <option value="In a relationship">In a relationship</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
      ) : (
        <textarea
          placeholder={placeholder}
          name={name}
          value={infos?.[name]}
          maxLength={detail ? "25" : "100"}
          className="textarea_blue details_input"
          onChange={handleChange}
        ></textarea>
      )}
      {!detail && <div className="remaining">{max} Characters remaining</div>}
      <div className="flex">
        <div className="flex flex_right">
          <button
            className="gray_btn"
            onClick={() => (!detail ? setShowBio(false) : setShow(false))}
          >
            Cancel
          </button>
          <button
            className="blue_btn"
            onClick={() => {
              updateDetails();
              setShow(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
