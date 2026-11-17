import { Image, Text, View } from "@react-pdf/renderer";

export default function HeaderPDF() {
  return (
    <View style={{ gap: 4, width: "100%" }}>
      <Image
        src="/alfaIndustriasLogo.jpg"
        style={{ width: 100, height: 50, paddingBottom: 14 }}
      />
      <Text>Alfa Industrial S.A.S.</Text>
      <Text>Calle Ficticia 123, Ciudad Demo</Text>
      <Text>Área: Mantenimiento Industrial</Text>
      <Text
        style={{
          textDecoration: "underline",
          color: "#2563EB",
          fontWeight: "bold",
        }}
      >
           contacto@ejemplo.com
      </Text>
    </View>
  );
}
