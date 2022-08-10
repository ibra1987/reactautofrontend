import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAutos, setSelectedAuto } from "../../features/autoSlice";

const Header = () => {
  const { selectedAuto, autos } = useSelector((state) => state.autos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAutos());
  }, [dispatch]);
  const onChange = (e) => {
    dispatch(setSelectedAuto(e.target.value));
  };
  return (
    <div className="bg-white border shadow-sm rounded-sm  my-2 w-11/12 p-4">
      <span className="text-gray-700">Selectionner Auto Ecole: </span>
      <select
        onChange={onChange}
        value={selectedAuto}
        className="bg-white py-1 px-3 outline-none mx-4 border-2 border-gray-300 text-slate-600"
      >
        {autos.length > 0 &&
          autos.map((auto) => {
            return <option key={auto.Name}>{auto.Name}</option>;
          })}
      </select>
    </div>
  );
};

export default Header;
