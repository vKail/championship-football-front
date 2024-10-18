import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";

export default function DefaultTable() {
  return (
    <Table aria-label="Ejemplo de tabla con acciones">
      <TableHeader>
        <TableColumn>DNI</TableColumn>
        <TableColumn>Nombre</TableColumn>
        <TableColumn>Apellido</TableColumn>
        <TableColumn>Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>1805805411</TableCell>
          <TableCell>Adrian</TableCell>
          <TableCell>Jurado</TableCell>
          <TableCell>
            <Button color="primary" size="sm" onPress={() => alert('Actualizar')}>Actualizar</Button>
            <Button color="danger" size="sm" onPress={() => alert('Eliminar')} style={{ marginLeft: "8px" }}>Eliminar</Button>
          </TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>0987654321</TableCell>
          <TableCell>Maria</TableCell>
          <TableCell>Gomez</TableCell>
          <TableCell>
            <Button color="primary" size="sm" onPress={() => alert('Actualizar')}>Actualizar</Button>
            <Button color="danger" size="sm" onPress={() => alert('Eliminar')} style={{ marginLeft: "8px" }}>Eliminar</Button>
          </TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>1122334455</TableCell>
          <TableCell>Carlos</TableCell>
          <TableCell>Perez</TableCell>
          <TableCell>
            <Button color="primary" size="sm" onPress={() => alert('Actualizar')}>Actualizar</Button>
            <Button color="danger" size="sm" onPress={() => alert('Eliminar')} style={{ marginLeft: "8px" }}>Eliminar</Button>
          </TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>2233445566</TableCell>
          <TableCell>Lucia</TableCell>
          <TableCell>Fernandez</TableCell>
          <TableCell>
            <Button color="primary" size="sm" onPress={() => alert('Actualizar')}>Actualizar</Button>
            <Button color="danger" size="sm" onPress={() => alert('Eliminar')} style={{ marginLeft: "8px" }}>Eliminar</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
