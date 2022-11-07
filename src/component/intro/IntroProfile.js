import { useEffect, useState } from "react";
import "./style.scss";
import Bio from "./Bio";
import { Axios } from "../../helpers/Axios";
import { useSelector } from "react-redux";
import EditDetails from "./EditDetails";

export default function IntroProfile({ detailss, visitor, setOthername }) {
  const [details, setDetails] = useState();
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    setDetails(detailss);
    setInfos(detailss)
  }, [detailss]);
  const initial = {
    bio: details?.bio ? details.bio : "",
    othername: details?.othername ? details.othername : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    highschool: details?.highschool ? details.highschool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    homeTown: details?.homeTown ? details.homeTown : "",
    relationship: details?.relationship ? details.relationship : "",
  };
  const [infos, setInfos] = useState(initial);
  const [showBio, setShowBio] = useState(false);
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);

  const updateDetails = async () => {
    try {
      const { data } = await Axios.put(
        "/updateDetails",
        { infos },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setShowBio(false);
      setDetails(data);
      setOthername(data.othername)
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  };
  return (
    <div className="profile_card ">
      <div className="profile_card_header">Intros</div>
      {details?.bio && !showBio && (
        <div className="info_col">
          <span className="info_text">{details?.bio}</span>
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}
      {!visitor && !details?.bio && !showBio && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setShowBio(true)}
        >
          Add Bio
        </button>
      )}
      {showBio && (
        <Bio
          infos={infos}
          handleChange={handleChange}
          max={max}
          setShowBio={setShowBio}
          updateDetails={updateDetails}
          name="bio"
          placeholder="Edit Bio"
        />
      )}
      {details?.job && !details?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          work as {details?.job}
        </div>
      ) : details?.job && details?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          work as {details?.job} at <b>{details?.workplace}</b>
        </div>
      ) : (
        details?.workplace &&
        !details?.job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            works at <b>{details?.workplace}</b>
          </div>
        )
      )}
      {details?.relationship && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="" />
          Relation {details?.relationship}
        </div>
      )}
      {details?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Studied at {details?.college}
        </div>
      )}
      {details?.highschool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Studied at {details?.highschool}
        </div>
      )}
      {details?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Lives in {details?.currentCity}
        </div>
      )}
      {details?.homeTown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          From {details?.homeTown}
        </div>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100" onClick={()=>setVisible(true)}>Edit Details</button>
      )}
      {visible && !visitor && (
        <EditDetails
          details={details}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          setVisible={setVisible}
        />
      )}
    </div>
  );
}
