import { Text, View } from "@react-pdf/renderer";

export default function RequisitionDetails({ formData }) {
  const ActualDate = new Date().toLocaleDateString();
  return (
    <View>
      <View style={{ paddingTop: 20, gap: 4 }}>
        <Text>Fecha: {ActualDate} </Text>
        <Text>Prioridad: {formData.priority} </Text>
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text>
          <Text
            style={{
              textDecoration: "underline",
              fontWeight: "bold",
              paddingRight: 20,
            }}
          >
            Observación:
          </Text>
          <Text> {formData.description}</Text>
        </Text>
      </View>
    </View>
  );
}
