import {
  Document,
  Page,
  View,
  StyleSheet,
  PDFDownloadLink,
  Text,
} from "@react-pdf/renderer"; // ← todo de aquí
import RequisitionDetails from "./RequistionsDetails";
import HeaderPDF from "./HeaderPDF";
import RequisitionItems from "./RequisitionsItems";
import DownloadIcon from "../../icons/downloadIcon";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 72,
    fontSize: 12,
  },
});

export function RequisitionDocument({ formData }) {
  return (
    <Document
      title={`${formData.requisitionNumber + " " + formData.fileName}`}
      author="Alfa Industrial S.A.S."
    >
      <Page size="A4" style={styles.page}>
        <View style={{ width: "100%" }}>
          <HeaderPDF />
          <RequisitionDetails formData={formData} />
          <View
            style={{
              paddingTop: 20,
              textDecoration: "underline",
              width: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View
            style={{
              padding: 20,
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <Text>
              Requisición de compras
              <Text style={{ color: "#DC2626" }}>
                {" "}
                #{formData.requisitionNumber}{" "}
              </Text>
            </Text>
          </View>
          <RequisitionItems formData={formData} />
        </View>
      </Page>
    </Document>
  );
}

export default function Requisition({ formData }) {
  if (!formData) return null;
  return (
    <section>
      <div className="flex items-center py-4 bg-[#F5F7F8] justify-center w-full">
        <PDFDownloadLink
          document={<RequisitionDocument formData={formData} />}
          fileName={`${formData.requisitionNumber + " " + formData.fileName} `}
          className="..."
        >
          <DownloadIcon />
          Descargar
        </PDFDownloadLink>
      </div>
    </section>
  );
}
