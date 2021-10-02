import React, { Component, Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup } from 'reactstrap'

const data = [
    { Id: '', Descripción: "", Valor_Unitario: "", Estado: "" },
];

class Productos extends Component {
    state = {
        data: data
    }
    render() {
        return (
            <Fragment>
                <h1>Módulo administrador de productos</h1>
                <Container>
                    <Button color="info" >Insertar Producto</Button>
                    <br />
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Descripción</th>
                                <th>Valor_Unitario</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((elemento) => (
                                <tr>
                                    <td>{elemento.Id}</td>
                                    <td>{elemento.Descripción}</td>
                                    <td>{elemento.Valor_Unitario}</td>
                                    <td>
                                        <select>
                                            <option{...elemento.Estado}>Disponible</option>
                                            <option{...elemento.Estado}>No Disponible</option>
                                        </select></td>
                                    <td><Button color="primary">Editar</Button> </td>
                                    <td><Button color="danger">Eliminar</Button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </Fragment>
        );
    }

}
export default Productos