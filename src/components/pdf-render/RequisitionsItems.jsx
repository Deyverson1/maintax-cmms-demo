import { Text, View } from "@react-pdf/renderer";
import RequisitionMath from "./RequisitionsMath";

export default function RequisitionItems({ formData }) {
  if (!formData) return null;
  const formatNumber = (value) => {
    return new Intl.NumberFormat("es-CO").format(value);
  };

  return (
    <View style={{ paddingTop: 15 }}>
      <View style={{ gap: 4 }}>
        <Text>Sección: {formData.section} </Text>
        {formData.machine && <Text>Maquina: {formData.machine} </Text>}
        <Text>Proveedor: {formData.supplier} </Text>
      </View>
      <View style={{ paddingTop: 10, gap: 4 }}>
        <Text>Ítems:</Text>
        {formData.items?.map((item, index) => (
          <View key={index}>
            <Text style={{ paddingTop: 6, textDecoration: "underline" }}>
              {item.itemName}
            </Text>
            <Text>Cantidad: {item.itemAmount} </Text>
            <Text style={{ textDecoration: "underline" }}>{item.itemType}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Valor unitario</Text>

              <View
                style={{
                  flex: 1,
                  paddingTop: 10,
                  borderBottomWidth: 1,
                  marginHorizontal: 5,
                }}
              />
              <Text>{formatNumber(item.itemValue)} $</Text>
            </View>
          </View>
        ))}
        <RequisitionMath formData={formData} />
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
      </View>
    </View>
  );
}
