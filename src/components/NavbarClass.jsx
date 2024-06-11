import React from "react";
import { Link, useParams } from "react-router-dom";

const NavbarClass = () => {
  const { id } = useParams()
  return (
    <div>
      <div className="flex w-full items-center fixed top-16 bg-base-100 px-16 gap-4 font-medium z-30 border-b-2 border-t-0 py-3 text-sm">
        <Link to={`/home/class/${id}`} className="hover:bg-slate-100 h-full py-2 px-2 cursor-pointer">
          Forum
        </Link>
        <Link to={`/home/class/${id}/tugas`} className="hover:bg-slate-100 h-full py-2 px-2 cursor-pointer">
          Tugas kelas
        </Link>
        <Link to={`/home/class/${id}/orang`} className="hover:bg-slate-100 h-full py-2 px-2 cursor-pointer">
          Orang
        </Link>
        <div className="hover:bg-slate-100 h-full py-2 px-2 cursor-pointer">
          Nilai
        </div>
      </div>
    </div>
  );
};

export default NavbarClass;
