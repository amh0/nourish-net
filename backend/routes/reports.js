import express from "express";
import {
  // CategoryType,
  // UserType,
  contarMiembrosDonacionesAlimentos,
  // filterAdmin,
  // filterDonations,
  // filterDonor,
  // filterFood,
  // filterReceiver,
  // filterVolunteer,
  getAdminin,
  getAllUserData,
  getCateFoodUserx,
  getDonMonth,
  getDonRec,
  getDonationVolunteer,
  getDonationVolunteerMonth,
  getDonations,
  getDonationsUserx,
  getDonors,
  getFood,
  getRecMonth,
  getReceiver,
  getVolunteers,
  nroAlimentoCategorias,
  nroAlimentoDisponibleAgotado,
  nroAlimentosRecibidos,
  nroEstadoEntrega,
  nroInfoPerfil,
  nroTipoEnvio,
  nroTypeUser,
  nroUser,
  nroVencidosNoVencidos,
} from "../controllers/reports.js";

const router = express.Router();

// router.get("/filter-donations", filterDonations);
// router.get("/filter-admin", filterAdmin);
// router.get("/filter-food", filterFood);
// router.get("/filter-volunteer", filterVolunteer);
// router.get("/filter-receiver", filterReceiver);
// router.get("/filter-donor", filterDonor);
// router.get("/filter-category-type", CategoryType);
// router.get("/filter-user-type", UserType);

router.get("/contarMDA", contarMiembrosDonacionesAlimentos);
router.get("/get-users", getAllUserData);
router.get("/get-admins", getAdminin);
router.get("/get-volunteers", getVolunteers);
router.get("/get-donors", getDonors);
router.get("/get-receiver", getReceiver);
router.get("/get-food", getFood);
router.get("/get-donations", getDonations);
router.get("/get-nroUser", nroUser);
router.get("/get-typeUser", nroTypeUser);
router.get("/get-nroFechaVen", nroVencidosNoVencidos);
router.get("/get-nroDisponibleAgotado", nroAlimentoDisponibleAgotado);
router.get("/get-category-type", nroAlimentoCategorias);
router.get("/get-alimentosRec", nroAlimentosRecibidos);
router.get("/get-tipoEnvio", nroTipoEnvio);
router.get("/get-esatdoEntrega", nroEstadoEntrega);
router.get("/get-donations-user", getDonationsUserx);
router.get("/get-donations-category", getCateFoodUserx);
router.get("/get-donations-month", getDonMonth);
router.get("/get-donations-received", getDonRec);
router.get("/get-donations-received-month", getRecMonth);
router.get("/get-donations-volunteer", getDonationVolunteer);
router.get("/get-donations-volunteer-month", getDonationVolunteerMonth);
router.get("/get-nro-publ-rec-pet", nroInfoPerfil);

export default router;
