import { Text, View } from "@react-pdf/renderer";

export default function RequisitionMath({ formData }) {
  const formatNumber = (value) => {
    return new Intl.NumberFormat("es-CO").format(value);
  };

  const subtotal = formData.items.reduce(
    (sum, item) => sum + Number(item.itemValue) * Number(item.itemAmount),
    0,
  );

  const valorIva = subtotal * 0.19;
  const finalValue = subtotal + valorIva;

  const subtotalFormatted = formatNumber(subtotal);
  const iva = formatNumber(valorIva);
  const totalValue = formatNumber(finalValue);

  return (
    <View
      style={{
        paddingTop: 20,

        alignItems: "flex-end",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderTop: 1,
            borderLeft: 1,
            borderBottom: 1,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            width: "95%",
          }}
        >
          <Text>Subtotal</Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            width: "25%",
          }}
        >
          <Text>{subtotalFormatted} $ </Text>
        </View>
      </View>
      {/* IVA */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderLeft: 1,
            borderBottom: 1,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            width: "25%",
          }}
        >
          <Text>Iva 19%</Text>
        </View>

        <View
          style={{
            borderRight: 1,
            borderBottom: 1,
            borderLeft: 1,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            width: "25%",
          }}
        >
          <Text>{iva} $</Text>
        </View>
      </View>
      {/* Total */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderLeft: 1,
            borderBottom: 1,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            width: "25%",
          }}
        >
          <Text>Valor total</Text>
        </View>

        <View
          style={{
            borderRight: 1,
            borderBottom: 1,
            borderLeft: 1,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            width: "25%",
          }}
        >
          <Text> {totalValue} $ </Text>
        </View>
      </View>
    </View>
  );
}
