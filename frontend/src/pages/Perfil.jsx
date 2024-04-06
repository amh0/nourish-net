import React, { useState } from "react";

const Perfil = () => {
  useState(() => {
    window.onbeforeunload = function () {
      localStorage.clear();
    };
  }, []);
  // localStorage.clear();
  // window.onbeforeunload = function() {
  //    localStorage.clear();
  // }
  return <div>Perfil</div>;
};

export default Perfil;
