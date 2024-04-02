import React, { useEffect, useState } from "react";
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
const ReceiptDetail = () => {
  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailRow}>
        <Text style={styles.detailTitle}>Código de recibo:</Text>
        <Text style={styles.detailContent}>010001</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailTitle}>Fecha:</Text>
        <Text style={styles.detailContent}>26/03/24</Text>
      </View>
    </View>
  );
};
const DonnorSection = () => {
  return (
    <View style={styles.donnorContainer}>
      <View style={styles.donnorDetail}>
        <Text style={styles.donnorTitle}>Donante</Text>
        <Text>Banco de Alimentos de Bolivia</Text>
        <Text>La Paz</Text>
        <Text>74000001</Text>
      </View>
      <View style={styles.donnorDetail}>
        <Text style={styles.donnorTitle}>Receptor</Text>
        <Text>Albergue Municipal de La Paz</Text>
        <Text>La Paz</Text>
        <Text>74000002</Text>
      </View>
    </View>
  );
};
const TableHead = () => (
  <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
    <View style={[styles.theader, styles.theader2]}>
      <Text>Descripción</Text>
    </View>
    <View style={styles.theader}>
      <Text>Cantidad</Text>
    </View>
    <View style={styles.theader}>
      <Text>Unidad</Text>
    </View>
  </View>
);
const TableBody = (props) => (
  <View style={{ width: "100%", flexDirection: "row" }}>
    <View style={[styles.tbody, styles.tbody2]}>
      <Text>Frutas en conserva 200gr</Text>
    </View>
    <View style={styles.tbody}>
      <Text>20</Text>
    </View>
    <View style={styles.tbody}>
      <Text>Unidades</Text>
    </View>
  </View>
);
const DonationDetail = () => {
  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailRow}>
        <Text style={styles.detailTitle}>Fecha de donación:</Text>
        <Text style={styles.detailContent}>27/07/24</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailTitle}>Lugar donación</Text>
        <Text style={styles.detailContent}>26/03/24</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailTitle}>Nota:</Text>
        <Text style={styles.detailContent}>Sin ninguna nota en particular</Text>
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
  // console.log(props);
  console.log(props.receipt);
  const [receipt, setDataReceipt] = useState(props.receipt);
  const [test, setTest] = useState({ idrecibo: 2 });
  useEffect(() => {
    console.log("state receipt:", receipt);
  }, [receipt]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {receipt ? (
          <>
            <Text> idrecibo {receipt.idrecibo}</Text>
            <ReceiptTitle />
            <ReceiptDetail />
            <DonnorSection />
            <View>
              <TableHead />
              <TableBody receipt={receipt} />
            </View>
            <DonationDetail />
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
