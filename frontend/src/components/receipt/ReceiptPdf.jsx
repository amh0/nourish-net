import React, { Fragment } from "react";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import logo from "../assets/logo_64.png";
import OpenSansRegular from "./fonts/OpenSans-Regular.ttf";
import OpenSansBold from "./fonts/OpenSans-Bold.ttf";
import { getFormattedDate, padNumber } from "../utils/functionUtils";
import "../globals.css";
Font.register({
  family: "OpenSans",
  fonts: [
    {
      src: OpenSansRegular,
      fontWeight: 400,
    },
    {
      src: OpenSansBold,
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    font: "OpenSans",
    fontSize: 11,
    color: "#222222",
    padding: 64,
    // lineHeight: 1.5,
    flexDirection: "column",
    gap: 24,
  },

  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  titleContainer: {
    flexDirection: "row",
  },

  titleReceipt: {
    fontFamily: "OpenSans",
    fontWeight: "bold",
    fontSize: 24,
  },
  logo: {
    width: 32,
    height: 32,
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleLogo: {
    fontSize: 16,
  },
  section: {
    flexGrow: 1,
  },
  detailContainer: {
    flexDirection: "column",
    fontSize: 11,
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    gap: 16,
  },
  detailTitle: {
    width: 112,
  },
  detailContent: {
    color: "#888888",
  },
  boxText: {
    backgroundColor: "red",
  },
  boxText2: {
    backgroundColor: "blue",
    width: 464,
  },
  donnorDetail: {
    flexDirection: "column",
    gap: 8,
    width: 232,
  },
  donnorTitle: {
    fontFamily: "OpenSans",
    fontWeight: "bold",
    color: "#6DB4AC",
    fontSize: 16,
  },
  donnorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  theader: {
    fontFamily: "OpenSans",
    fontWeight: "bold",
    fontSize: 11,
    color: "#ffffff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    flex: 1,
    backgroundColor: "#6DB4AC",
    borderColor: "white",
    borderLeftWidth: 1,
  },

  theader2: {
    flex: 4,
  },

  theader3: {
    flex: 2,
  },
  tbody: {
    fontSize: 11,
    padding: 8,
    flex: 1,
    borderColor: "#6DB4AC",
    borderBottomWidth: 1,
  },
  tbody2: {
    flex: 4,
  },

  tbody3: {
    flex: 2,
  },
  alignRight: {
    textAlign: "right",
  },
  footerText: {
    fontSize: 9,
    gap: 4,
    color: "#222222",
    textAlign: "center",
  },
});
const ReceiptTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Text style={styles.titleReceipt}>Recibo de Donación</Text>
        <View style={styles.logoWrapper}>
          <Image style={styles.logo} src={logo}></Image>
          <Text style={styles.titleLogo}>NourishNet</Text>
        </View>
      </View>
    </View>
  );
};
const ReceiptDetail = (props) => {
  const recibo = props.recibo;
  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailRow}>
        <Text style={styles.detailTitle}>Código de recibo:</Text>
        <Text style={styles.detailContent}>
          {padNumber(recibo.idRecibo, 6, "0")}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailTitle}>Fecha:</Text>
        <Text style={styles.detailContent}>
          {getFormattedDate(recibo.fecha)}
        </Text>
      </View>
    </View>
  );
};
const DonnorSection = (props) => {
  const recibo = props.recibo;
  return (
    <View style={styles.donnorContainer}>
      <View style={styles.donnorDetail}>
        <Text style={styles.donnorTitle}>
          {recibo.aUsuario ? "Receptor" : "Donante"}
        </Text>
        <Text>{recibo.nombreGeneral}</Text>
        <Text>{recibo.direccionGeneral}</Text>
        <Text>{recibo.celularGeneral}</Text>
      </View>
      <View style={styles.donnorDetail}>
        <Text style={styles.donnorTitle}>Voluntario</Text>
        <Text>{recibo.nombreVoluntario}</Text>
        <Text>{recibo.direccionVoluntario}</Text>
        <Text>{recibo.celularVoluntario}</Text>
      </View>
    </View>
  );
};
const TableHead = (props) => {
  const recibo = props.recibo;
  return (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Descripción</Text>
      </View>
      {recibo.aUsuario ? (
        <View style={[styles.theader, styles.theader3]}>
          <Text>Donante</Text>
        </View>
      ) : null}
      <View style={styles.theader}>
        <Text>Cantidad</Text>
      </View>
      <View style={styles.theader}>
        <Text>Unidad</Text>
      </View>
    </View>
  );
};
const TableBody = (props) => {
  const products = props.products;
  const recibo = props.recibo;
  const tableRows = products.map((item) => {
    return (
      <Fragment key={item.idalimento}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{item.nombre}</Text>
          </View>
          {recibo.aUsuario ? (
            <View style={[styles.tbody, styles.tbody3]}>
              <Text>{item.nombreDonante}</Text>
            </View>
          ) : null}
          <View style={[styles.tbody, styles.alignRight]}>
            <Text>{item.cantidad}</Text>
          </View>
          <View style={[styles.tbody, styles.alignRight]}>
            <Text>{item.unidadMedida}</Text>
          </View>
        </View>
      </Fragment>
    );
  });
  return tableRows;
};
const DonationDetail = (props) => {
  const recibo = props.recibo;
  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailRow}>
        <Text style={styles.detailTitle}>Fecha de donación:</Text>
        <Text style={styles.detailContent}>
          {getFormattedDate(recibo.fechaEntrega)}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailTitle}>Lugar donación</Text>
        <Text style={styles.detailContent}>{recibo.direccionGenearl}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailTitle}>Nota:</Text>
        <Text style={styles.detailContent}>{recibo.nota}</Text>
      </View>
    </View>
  );
};
const ReceiptFooter = () => {
  return (
    <View style={[styles.detailContainer, styles.footerText]}>
      <Text style={styles.detailContent}>
        Nourishnet - Red de Solidaridad Alimentaria
      </Text>
      <Text style={styles.detailContent}>contact.nourishnet@gmail.com</Text>
      <Text style={styles.detailContent}>+591 74010203 </Text>
      <Text style={styles.detailContent}>
        Av. Mariscal Santa Cruz, La Paz Bolivia
      </Text>
    </View>
  );
};

const ReceiptPdf = (props) => {
  const recibo = props.receipt;
  const products = props.products;
  return (
    <Document title={`recibo_donacion_${recibo.idrecibo}`}>
      <Page size="A4" style={styles.page}>
        {recibo ? (
          <>
            <ReceiptTitle />
            <ReceiptDetail recibo={recibo} />
            <DonnorSection recibo={recibo} />
            <View>
              <TableHead recibo={recibo} />
              <TableBody products={products} recibo={recibo} />
            </View>
            <DonationDetail recibo={recibo} />
            <View></View>
            <View></View>
            <ReceiptFooter />
          </>
        ) : null}
      </Page>
    </Document>
  );
};

export default ReceiptPdf;
