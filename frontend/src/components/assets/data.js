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
    ubicacion: "Av. Ballivian",
    unidad_medida: "gr",
    imagen: p1_img,
  },
  {
    id: 2,
    nombre: "Harina de Trigo",
    descripcion:
      "Harina de trigo todo uso, perfecta para hornear pan, pasteles y otros productos horneados.",
    tipo: "Ingrediente seco",
    fecha_vencimiento: "N/A",
    cantidad: 30,
    ubicacion: "Av. Mariscal Sta Cruz.",
    unidad_medida: "u",
    imagen: p2_img,
  },
  {
    id: 3,
    nombre: "Leche en Polvo",
    descripcion:
      "Leche en polvo fortificada, ideal para preparar bebidas lácteas y recetas.",
    tipo: "Alimento en polvo",
    fecha_vencimiento: "10/08/2025",
    cantidad: 200,
    ubicacion: "Av. Ballivian",
    unidad_medida: "g",
    imagen: p3_img,
  },
  {
    id: 4,
    nombre: "Atún enlatado",
    descripcion:
      "Atún enlatado en aceite vegetal, rico en proteínas y ácidos grasos omega-3.",
    tipo: "Alimento enlatado",
    fecha_vencimiento: "20/10/2025",
    cantidad: 10,
    ubicacion: "Av. Ballivian",
    unidad_medida: "Latas",
    imagen: p4_img,
  },
  {
    id: 5,
    nombre: "Arroz Blanco",
    descripcion: "Arroz blanco de grano largo, ideal para acompañar comidas.",
    tipo: "Alimento no perecedero",
    fecha_vencimiento: "30/06/2025",
    cantidad: 14,
    ubicacion: "Av. Ballivian",
    unidad_medida: "kg",
    imagen: p5_img,
  },
  {
    id: 6,
    nombre: "Cereal de Avena",
    descripcion:
      "Cereal de avena integral, una opción nutritiva para el desayuno. Rico en fibra y vitaminas.",
    tipo: "Cereal",
    fecha_vencimiento: "28/10/2025",
    cantidad: 5,
    ubicacion: "Av. Ballivian",
    unidad_medida: "Pqte.",
    imagen: p6_img,
  },
  {
    id: 7,
    nombre: "Mermelada de Fresa",
    descripcion:
      "Mermelada casera de fresa, elaborada con frutas frescas y azúcar. Deliciosa para untar en pan o galletas.",
    tipo: "Mermelada",
    fecha_vencimiento: "30/11/2025",
    cantidad: 150,
    ubicacion: "Av. Ballivian",
    unidad_medida: "g",
    imagen: p7_img,
  },
  {
    id: 8,
    nombre: "Salsa de tomate",
    descripcion:
      "Salsa de tomate enlatado, ideal para salsas y guisos. Hecho con tomates frescos y jugosos.",
    tipo: "Vegetal enlatado",
    fecha_vencimiento: "N/A",
    cantidad: 200,
    ubicacion: "Av. Ballivian",
    unidad_medida: "g",
    imagen: p8_img,
  },
];
let foodDefault = [
  {
    value: 0,
    label: "Otro",
    categoria: [],
  },
  {
    value: 1,
    label: "Arroz blanco",
    categoria: [7, 8],
  },
  {
    value: 2,
    label: "Frijoles negros",
    categoria: [7, 8],
  },
  {
    value: 3,
    label: "Leche desnatada",
    categoria: [8, 10],
  },
  {
    value: 4,
    label: "Pan integral",
    categoria: [7, 8],
  },
  {
    value: 5,
    label: "Manzanas",
    categoria: [1, 9],
  },
  {
    value: 6,
    label: "Zanahorias",
    categoria: [2, 9],
  },
  {
    value: 7,
    label: "Agua embotellada",
    categoria: [3, 8],
  },
  {
    value: 8,
    label: "Sopa de verduras en lata",
    categoria: [5, 8],
  },
  {
    value: 9,
    label: "Atún enlatado",
    categoria: [5, 8],
  },
  {
    value: 10,
    label: "Cereal de desayuno",
    categoria: [7, 8],
  },
  {
    value: 11,
    label: "Pasta",
    categoria: [7, 8],
  },
  {
    value: 12,
    label: "Salsa de tomate",
    categoria: [7, 8],
  },
  {
    value: 13,
    label: "Yogur natural",
    categoria: [8, 10],
  },
  {
    value: 14,
    label: "Cereal en caja",
    categoria: [7, 8],
  },
  {
    value: 15,
    label: "Pechuga de pollo",
    categoria: [7, 9],
  },
  {
    value: 16,
    label: "Espinacas",
    categoria: [2, 9],
  },
  {
    value: 17,
    label: "Jugo de naranja",
    categoria: [1, 3],
  },
  {
    value: 18,
    label: "Sardinas en lata",
    categoria: [5, 8],
  },
  {
    value: 19,
    label: "Mantequilla de maní",
    categoria: [7, 8],
  },
  {
    value: 20,
    label: "Tortillas de maíz",
    categoria: [7, 8],
  },
];
export default foodDefault;
