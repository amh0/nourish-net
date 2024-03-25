import p1_img from "./product_1.jpg";
import p2_img from "./product_2.jpg";
import p3_img from "./product_3.jpg";
import p4_img from "./product_4.jpg";
import p5_img from "./product_5.jpg";
import p6_img from "./product_6.jpg";
import p7_img from "./product_7.jpg";
import p8_img from "./product_8.jpg";

let food_data = [
  {
    id: 1,
    nombre: "Frutas en Conserva",
    descripcion:
      "Frutas en conserva en almíbar ligero, una deliciosa opción como postre o refrigerio.",
    tipo: "Alimento en conserva",
    fecha_vencimiento: "25/12/2025",
    cantidad: 200,
    unidad_medida: "gr",
    proveedor: "",
    imagen: "product_1.jpg",
    idgeneral: 1,
  },

  {
    id: 2,
    nombre: "Harina de Trigo",
    descripcion:
      "Harina de trigo todo uso, perfecta para hornear pan, pasteles y otros productos horneados.",
    tipo: "Ingrediente seco",
    fecha_vencimiento: "N/A",
    cantidad: 30,
    unidad_medida: "u",
    proveedor: "",
    imagen: "product_2.jpg",
    idgeneral: 2,
  },
  {
    id: 3,
    nombre: "Leche en Polvo",
    descripcion:
      "Leche en polvo fortificada, ideal para preparar bebidas lácteas y recetas.",
    tipo: "Alimento en polvo",
    fecha_vencimiento: "10/08/2025",
    cantidad: 200,
    unidad_medida: "g",
    proveedor: "",
    imagen: "product_3.jpg",
    idgeneral: 2,
  },
  {
    id: 4,
    nombre: "Atún enlatado",
    descripcion:
      "Atún enlatado en aceite vegetal, rico en proteínas y ácidos grasos omega-3.",
    tipo: "Alimento enlatado",
    fecha_vencimiento: "20/10/2025",
    cantidad: 10,
    unidad_medida: "Latas",
    proveedor: "",
    imagen: "product_4.jpg",
    idgeneral: 2,
  },
  {
    id: 5,
    nombre: "Arroz Blanco",
    descripcion: "Arroz blanco de grano largo, ideal para acompañar comidas.",
    tipo: "Alimento no perecedero",
    fecha_vencimiento: "30/06/2025",
    cantidad: 14,
    unidad_medida: "kg",
    proveedor: "",
    imagen: "product_5.jpg",
    idgeneral: 2,
  },
  {
    id: 6,
    nombre: "Cereal de Avena",
    descripcion:
      "Cereal de avena integral, una opción nutritiva para el desayuno. Rico en fibra y vitaminas.",
    tipo: "Cereal",
    fecha_vencimiento: "28/10/2025",
    cantidad: 5,
    unidad_medida: "Pqte.",
    proveedor: "",
    imagen: "product_6.jpg",
    idgeneral: 2,
  },
  {
    id: 7,
    nombre: "Mermelada de Fresa",
    descripcion:
      "Mermelada casera de fresa, elaborada con frutas frescas y azúcar. Deliciosa para untar en pan o galletas.",
    tipo: "Mermelada",
    fecha_vencimiento: "30/11/2025",
    cantidad: 150,
    unidad_medida: "g",
    proveedor: "",
    imagen: "product_7.jpg",
    idgeneral: 2,
  },
  {
    id: 8,
    nombre: "Salsa de tomate",
    descripcion:
      "Salsa de tomate enlatado, ideal para salsas y guisos. Hecho con tomates frescos y jugosos.",
    tipo: "Vegetal enlatado",
    fecha_vencimiento: "N/A",
    cantidad: 200,
    unidad_medida: "g",
    proveedor: "",
    imagen: "product_8.jpg",
    idgeneral: 2,
  },
];

export default food_data;
