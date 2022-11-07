import Detail from "./Detail";
import useClickOutside from "../../helpers/useClickOutSide";
import { useRef } from "react";

export default function EditDetails({
  details,
  handleChange,
  updateDetails,
  infos,
  setVisible,
}) {
  const editRef = useRef(null);
  useClickOutside(editRef, () => {
    setVisible(false);
  });
  return (
    <div className="blur">
      <div className="postBox infosBox" ref={editRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className="details_wrapper scrollbar">
          <div className="details_col">
            <span>Customize Your Intro</span>
          </div>
          <div className="details_header">Other Name</div>
          <Detail
            value={details?.othername}
            img="studies"
            placeholder="add other name"
            name="othername"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="Other Name"
          />
          <div className="details_header">Work</div>
          <Detail
            value={details?.job}
            img="job"
            placeholder="add a job"
            name="job"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="a job"
          />
          <Detail
            value={details?.workplace}
            img="job"
            placeholder="add a workplace"
            name="workplace"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="a workplace"
          />
          <div className="details_header">Education</div>
          <Detail
            value={details?.highschool}
            img="studies"
            placeholder="add Your HighSchool"
            name="highschool"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="your highschool"
          />
          <Detail
            value={details?.college}
            img="studies"
            placeholder="add your college"
            name="college"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="your college"
          />
          <div className="details_header">current City</div>
          <Detail
            value={details?.currentCity}
            img="home"
            placeholder="add Your current City"
            name="currentCity"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="your Current City"
          />
          <div className="details_header">Home Town</div>
          <Detail
            value={details?.homeTown}
            img="home"
            placeholder="add Your Home Town"
            name="homeTown"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="your Home Town"
          />
          <div className="details_header">Relationship</div>
          <Detail
            value={details?.relationship}
            img="relationship"
            placeholder="Relationship"
            name="relationship"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="your relationship status"
            rel
          />
        </div>
      </div>
    </div>
  );
}
