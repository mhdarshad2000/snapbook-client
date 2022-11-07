import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Axios } from "../../helpers/Axios";
import Report from "../../adminComponents/Report";

export default function Notification() {
  const { admin } = useSelector((state) => ({ ...state }));
  const [reports, setReports] = useState([]);
  useEffect(() => {
    getReports();
  }, []);
  const getReports = async () => {
    try {
      const { data } = await Axios.get("/admin/getPostReports", {
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      setReports(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {reports.length &&
        reports.map((report) => (
          <Report report={report} reports={reports} setReports={setReports} token={admin.token} />
        ))}
    </>
    // <>{reports.length && reports.map((report) => <Report report={report} />)}</>
  );
}
