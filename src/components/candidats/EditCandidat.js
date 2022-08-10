import { useEffect, useState } from "react";
import helpers from "../../helpers";
import { useSelector, useDispatch } from "react-redux";
import {
  createCandidat,
  resetMessage,
  getSingleCandidat,
  editCandidat,
} from "../../features/candidatsSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
const EditCandidat = ({ closeEdit }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { candidatId } = useParams();
  const { message, selectedCandidat } = useSelector((state) => state.candidats);
  const dispatch = useDispatch();
  const { autos, selectedAuto } = useSelector((state) => state.autos);
  const { isEmpty } = helpers;
  const inputClass =
    "outline-none border border-gray-300 rounded-md w-full p-2 focus:border-blue-300";
  const labelClass = "text-cyan-800 tracking-wider";
  const [candidatInfo, setCandidatInfo] = useState({
    Fname: "",
    Lname: "",
    Cin: "",
    Adresse: "",
    Categorie: "B",
    Price: "",
    Referent: "",
    Tel: "",
    autoEcole: selectedAuto,
    Avance: "",
    dateEntree: moment().format("yyyy-MM-DD"),
  });
  useEffect(() => {
    if (candidatId) {
      dispatch(getSingleCandidat(candidatId));
      setCandidatInfo(selectedCandidat);
    }
  }, [candidatId, selectedCandidat]);
  console.log(selectedCandidat);

  const clearInputs = () => {
    setCandidatInfo({
      Fname: "",
      Lname: "",
      Cin: "",
      Adresse: "",
      Categorie: "B",
      Price: 0,
      Referent: "",
      Tel: "",
      autoEcole: "Auto école",
      Avance: 0,
      dateEntree: moment().format("yyyy-MM-DD"),
    });
  };
  const onChange = (e) => {
    setError("");

    setCandidatInfo({
      ...candidatInfo,
      [e.target.name]: e.target.value,
    });
    dispatch(resetMessage);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const {
      Fname,
      Lname,
      Cin,
      Adresse,
      Categorie,
      Price,
      Referent,
      Tel,
      autoEcole,
      Avance,
      dateEntree,
    } = candidatInfo;

    if (
      isEmpty(Fname) ||
      isEmpty(Lname) ||
      isEmpty(Cin) ||
      isEmpty(Categorie) ||
      isEmpty(Price) ||
      isEmpty(autoEcole) ||
      isEmpty(dateEntree)
    ) {
      return setError("Merci de remplir les champs obligatoires *");
    }
    const autoNames = autos.map((autoecole) => autoecole.Name);

    if (!autoNames.includes(autoEcole))
      return setError("Merci de renseigner l'auto école.");
    const editedCandidat = {
      _id: selectedCandidat._id,
      Fname,
      Lname,
      Cin,
      Adresse,
      Categorie,
      Price,
      Referent,
      Tel,
      autoEcole,
      Avance,
      dateEntree,
    };
    dispatch(editCandidat(editedCandidat));
    closeEdit();
    navigate("/candidats");
  };
  return (
    <div className="w-11/12  p-2 border shadow-md my-6  bg-white rounded-md flex flex-col justify-start items-center">
      <h1 className="w-full p-2 bg-gray-100 underline rounded-md text-center text-gray-600 tracking-widest">
        Modifier{" "}
      </h1>
      {
        <div
          className={
            message
              ? "w-full my-4 p-4 text-center  bg-green-100  text-green-700"
              : error
              ? "w-full my-4  bg-red-50 text-center p-4 text-red-600"
              : ""
          }
        >
          {error && error}
          {message && message}
        </div>
      }
      <form
        onSubmit={onSubmit}
        className="W-11/12 border rounded-md  my-4 p-4 text-gray-600 "
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3">
          <div className="flex flex-col justify-start items-start mx-2">
            <label className={labelClass} htmlFor="Fname">
              Prénom <em className="mr-1 text-red-600">*</em>:
            </label>
            <input
              onChange={onChange}
              value={candidatInfo.Fname}
              type="text"
              name="Fname"
              placeholder="Prénom"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col justify-start items-start mx-2">
            <label className={labelClass} htmlFor="Lname">
              Nom <em className="mr-1 text-red-600">*</em>:
            </label>

            <input
              value={candidatInfo.Lname}
              onChange={onChange}
              type="text"
              name="Lname"
              placeholder="Nom"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col justify-start items-start mx-2">
            <label className={labelClass} htmlFor="Cin">
              N° de CIN <em className="mr-1 text-red-600">*</em>:
            </label>

            <input
              value={candidatInfo.Cin}
              onChange={onChange}
              type="text"
              name="Cin"
              placeholder="N° de CIN"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col justify-start items-start mx-2">
            <label className={labelClass} htmlFor="dateEntree">
              Date d'inscription <em className="mr-1 text-red-600">*</em>:
            </label>

            <input
              value={moment(candidatInfo.dateEntree).format("yyyy-MM-DD")}
              onChange={onChange}
              type="date"
              name="dateEntree"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col justify-start items-start mx-2">
            <label className={labelClass} htmlFor="Adresse">
              Adresse:
            </label>

            <input
              type="text"
              value={candidatInfo.Adresse}
              onChange={onChange}
              name="Adresse"
              placeholder="Adresse"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col justify-start items-start mx-2">
            <label className={labelClass} htmlFor="Tel">
              N° de Télephone:
            </label>

            <input
              value={candidatInfo.Tel}
              onChange={onChange}
              type="text"
              name="Tel"
              placeholder="N° de Téléphone"
              className="outline-none border border-gray-300 rounded-md w-full p-2 focus:border-blue-300"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4 py-4 border-t">
          <div className="flex flex-col justify-start items-start mx-2">
            <label className={labelClass} htmlFor="Categorie">
              Catégorie <em className="mr-1 text-red-600">*</em>:
            </label>

            <select
              value={candidatInfo.Categorie}
              name="Categorie"
              onChange={onChange}
              className="outline-none w-full  bg-white border border-gray-300 rounded-md py-2.5  p-2 focus:border-blue-300"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>
          <div className="flex flex-col justify-start items-start mx-2">
            <label className={labelClass} htmlFor="autoEcole">
              Auto Ecole <em className="mr-1 text-red-600">*</em>:
            </label>

            <select
              value={candidatInfo.autoEcole}
              name="autoEcole"
              onChange={onChange}
              className="outline-none w-full bg-white border border-gray-300 py-2.5 rounded-md  p-2 focus:border-blue-300"
            >
              {autos.map((auto) => {
                return <option key={auto.Name}>{auto.Name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="w-full grid grid-1 md:grid-cols-3 gap-3 ">
          <div className="flex flex-col justify-start items-start mx-2">
            <label className={labelClass} htmlFor="Price">
              Prix <em className="mr-1 text-red-600">*</em>:
            </label>

            <input
              onChange={onChange}
              type="number"
              value={candidatInfo.Price}
              name="Price"
              placeholder="Prix de la formation"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col justify-start items-start mx-2">
            <label className={labelClass} htmlFor="Avance">
              Avance:
            </label>

            <input
              onChange={onChange}
              type="number"
              value={candidatInfo.Avance}
              name="Avance"
              placeholder="Avance"
              className={inputClass}
            />
          </div>
          <div className=" flex flex-col justify-start items-start mx-2">
            <label className={labelClass} htmlFor="Referent">
              Réferent:
            </label>

            <input
              value={candidatInfo.Referent}
              onChange={onChange}
              type="text"
              name="Referent"
              placeholder="Réferent"
              className="outline-none border border-gray-300 rounded-md w-full p-2 focus:border-blue-300"
            />
          </div>
        </div>

        <div className="w-full flex justify-center items-start">
          <button
            type="submit"
            className="w-1/3 md:w-1/5 my-6 bg-emerald-500 rounded-md hover:bg-emerald-600 p-2 text-white"
          >
            Enregister
          </button>
          <button
            onClick={clearInputs}
            type="button"
            className="w-1/3 md:w-1/5 mx-4 outline-none my-6 bg-gray-500 rounded-md hover:bg-gray-600 p-2 text-white"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCandidat;
