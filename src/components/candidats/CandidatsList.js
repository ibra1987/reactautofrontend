import { useEffect, useState } from "react";
import helpers from "../../helpers";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CandidatsList = ({ toggleEdit }) => {
  const { candidats } = useSelector((state) => state.candidats);
  const { all, selectedAuto } = useSelector((state) => state.autos);
  const [search, setSearch] = useState("");
  const [dispalyedCandidats, setDisplayedCandidats] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    all
      ? setDisplayedCandidats(candidats)
      : setDisplayedCandidats(
          candidats.filter((candidat) => candidat.autoEcole === selectedAuto)
        );
  }, [candidats, selectedAuto]);

  return (
    <section className=" bg-white border rounded-sm shadow-sm w-11/12 p-2  mx-auto  flex flex-col justify-start items-center">
      <div className="bg-white border rounded-sm my-2 p-4 shadow-md w-full flex justify-start items-center">
        <h2 className="mx-2">
          Total Candidat {/*selectedAuto*/} :{" "}
          <span className="text-white text-lg bg-green-500 px-4 py-1 rounded"></span>
        </h2>
        <h2 className="mx-2">
          Ayant payé :{" "}
          <span className="text-white text-lg bg-green-500 px-4 py-1 rounded"></span>
        </h2>
        <div className="mx-2 w-2/5 flex justify-start items-center">
          <span className="mx-2">Rechercher:</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="px-2 w-1/4 py-1 border outline-none border-gray-700 rounded text-gray-700"
          />
        </div>
      </div>
      <table className="w-full p-2 text-sm border rounded-md bg-white shadow-md ">
        <thead className="text-white bg-blue-400">
          <tr className="text-center">
            <th className="border p-2">Nom Du candidat</th>
            <th className="border">Catégorie</th>
            <th className="border">Prix</th>
            <th className="border">Somme avances</th>
            <th className="border">Date entrée</th>
          </tr>
        </thead>
        <tbody>
          {dispalyedCandidats.map((candidat, index) => {
            return (
              <tr
                className={
                  parseInt(candidat.Price) ===
                  helpers.sumOfPropertyOfArrayOfObjects(
                    candidat.Avances,
                    "Montant"
                  )
                    ? " text-sm !bg-green-200 border text-gray-600"
                    : "text-gray-700 text-sm duration-700 ease-in-out "
                }
                key={candidat._id}
              >
                <td
                  onClick={() => {
                    navigate("/candidats/edit/" + candidat._id);
                    toggleEdit();
                  }}
                  className="p-2 cursor-pointer hover:text-gray-600 hover:font-bold"
                >
                  {candidat.Fname + " " + candidat.Lname}
                </td>

                <td className="text-center">{candidat.Categorie}</td>
                <td className="text-center">{candidat.Price}</td>
                <td className="text-center">
                  {helpers.sumOfPropertyOfArrayOfObjects(
                    candidat.Avances,
                    "Montant"
                  )}
                </td>
                <td className="text-center">
                  {moment(candidat.dateEntree).format("DD-MM-YYYY")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        /*onClick={incrementSliceTo}*/
        className="w-full bg-gray-700 rounded-md text-white hover:bg-gray-600 p-2 my-4"
      >
        Voir Plus ...
      </button>
    </section>
  );
};

export default CandidatsList;
