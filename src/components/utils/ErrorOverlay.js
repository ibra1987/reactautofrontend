const ErrorOverlay = ({ error }) => {
  return (
    <div className="fixed top-0 right-0 w-full h-screen overlay z-10 flex justify-center items-center">
      <div className="w-1/3 p-4 h-40 flex rounded justify-center items-center bg-white text-red-500">
        <span> votre session a expiré, {error}</span>
      </div>
    </div>
  );
};

export default ErrorOverlay;
