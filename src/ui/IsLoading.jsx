export default function IsLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/40 backdrop-blur-md backdrop-">
      <div className="loader"></div>
    </div>
  );
}
