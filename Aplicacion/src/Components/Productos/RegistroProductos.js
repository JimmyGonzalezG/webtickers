import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Table, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup } from 'reactstrap'


const url = "http://localhost:3001/api";
/*const data = [
    { Id: '1', Descripción: "Producto de Prueba", Valor_Unitario: "200", Estado: "Disponible" },
];*/

class Productos extends Component {

    state = {
        data: [],
        form: {
            Id: '',
            Description: '',
            Estado: '',
            Valor_Unitario: '',
            
        },
        modalInsertar: false,
        modalEliminar: false,
        tipoModal: '',
        buscar: '',
        product: [],
    };

    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPost = async () => {
        delete this.state.form.Id;
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPut = () => {
        axios.put(url + this.state.form.Id, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionDelete = () => {
        axios.delete(url + this.state.form.Id).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }


    seleccionarDescription = (Description) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                Id: Description.Id,
                Valor_Unitario: Description,
                Estado: Description.Estado
            }
        })
    }


    handleChange = async e => {
        e.persist();
        await this.setState({

            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    componentDidMount() {
        this.peticionGet();
    }



    onChange = async e => {
        e.persist();
        await this.setState({ buscar: e.target.value });
        console.log(this.state.buscar);
        this.filtrarDescriptions();
    }

    /*
        editar = (dato) => {
            var contador = 0;
            var lista = this.state.data;
            lista.map((registro) => {
                if (dato.Id === registro.Id) {
                    lista[contador].Descripción = dato.Descripción;
                    lista[contador].Valor_Unitario = dato.Valor_Unitario;
                    lista[contador].Estado = dato.Estado;
                }
                contador++;
            });
            this.setState({ data: lista, modalEditar: false });
        }
    
        eliminar = (dato) => {
            var opcion = window.confirm("Esta seguro de eliminar el registro? " + dato.Id);
            if (opcion) {
                var contador = 0;
                var lista = this.state.data;
                lista.map((registro) => {
                    if (registro.Id === dato.Id) {
                        lista.splice(contador, 1);
                    }
                    contador++;
                });
                this.setState({ data: lista });
            }
        }
    */


    filtrarDescriptions = () => {
        var search = this.state.data.filter((Description) => {
            if (Description.Descripción.includes(this.state.buscar) ||
                Description.Estado.includes(this.state.buscar) ||
                Description.Id.toString().includes(this.state.buscar) ||
                Description.Valor_Unitario.toString().includes(this.state.buscar)) {
                return Description;
            }
        });
        this.setState({ product: search });
    }

    render() {
        const { form } = this.state;
        return (
            <Fragment>
                <Container className="CProductos">
                    <h2>Módulo administrador de productos</h2>
                    <br />

                    <label className="Lfind">Busqueda: </label>
                    <input className="find" name="find" type="text" value={this.state.buscar} onChange={this.onChange} />
                    <br />
                    <Button color="info" className="insertar" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }} >Insertar Producto</Button>
                    <br /> <br />
                    <Table className="table table-striped">
                        <thead className="thead-dark">
                            <tr key="Id">
                                <th>Id</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Valor_Unitario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.product.map(Description => {
                                return (
                                    <tr key="Id">
                                        <td>{Description.Id}</td>
                                        <td>{Description.Descripción}</td>
                                        <td>{Description.Estado}</td>
                                        <td>{Description.Valor_Unitario}</td>
                                        <td><Button color="primary" onClick={() => { this.seleccionarDescription(Description); this.modalInsertar() }}>Editar</Button> </td>
                                        {""}
                                        <td><Button color="danger" onClick={() => { this.seleccionarDescription(Description); this.setState({ modalEliminar: true }) }}>Eliminar</Button> </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    {/* REVIAR CIERRE DEL CONTAINER*/}
                    <Modal isOpen={this.state.modalInsertar}>
                        <ModalHeader>
                            <div>
                                <h3 style={{textAlign: 'center'}}>Insertar Registro</h3>
                                <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}></span>
                            </div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label htmlFor="Id">Id:</label>
                                <input className="form-control" name="Id" id="Id" readOnly type="text" onChange={this.handleChange} value={form ? form.Id : this.state.data.length + 1} />
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="Description">Descripción</label>
                                <input className="form-control" name="Description" type="text" id="Description" onChange={this.handleChange} value={form ? form.Description : ''} />
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="Estado">Estado</label>
                                <select className="form-control" name="Estado" id="Estado" onChange={this.handleChange} value={form ? form.Estado : ''} defaultValue="Disponible">
                                    <option>Disponible</option>
                                    <option>No Disponible</option>
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="Valor_Unitario">Valor_Unitario</label>
                                <input className="form-control" name="Valor_Unitario" id="Valor_Unitario" type="text" onChange={this.handleChange} placeholder="$" value={form ? form.Valor_Unitario : ''} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            {this.state.tipoModal === 'insertar' ?
                                <Button color="primary" onClick={() => this.peticionPost()}>Insertar</Button> :
                                <Button color="success" onClick={() => this.peticionPut()}>Actualizar</Button>}
                            <Button color="danger" onClick={() => this.modalInsertar()}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalEliminar}>
                        <ModalHeader>
                            <div>
                                <h3>Editar Registro</h3>
                            </div>
                        </ModalHeader>

                        <ModalBody>
                            Esta seguro que desea elminar el producto {form && form.Description}
                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={() => this.peticionDelete}>Sí</Button>
                            <Button color="danger" onClick={() => this.setState({ modalEliminar: false })}>No</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </Fragment>
        );
    }

}
export default Productos