import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Table, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup } from 'reactstrap'


const url = "http://localhost:3050/productos";
/*const data = [
    { Id: '1', Descripción: "Producto de Prueba", Valor_Unitario: "200", Estado: "Disponible" },
];*/

const data = [
    { id_producto: 1, descripcion: " Lapiz Fabel Castell HB",estado:"Disponible", cantidad: "2", valor_unitario: "1.000", almacen: "Principal"},
    { id_producto: 2, descripcion: " Lapiz Fabel Castell HB",estado:"Disponible", cantidad: "2", valor_unitario: "1.000", almacen: "Principal"},
    { id_producto: 3, descripcion: " Lapiz Fabel Castell HB",estado:"Disponible", cantidad: "2", valor_unitario: "1.000", almacen: "Principal"},
    { id_producto: 4, descripcion: " Lapiz Fabel Castell HB",estado:"Disponible", cantidad: "2", valor_unitario: "1.000", almacen: "Principal"},
  ];
  
  class App extends React.Component {
    state={
      data:[],
      modalInsertar: false,
      modalEliminar: false,
      form:{
        id_producto:'',
        descripcion:'',
        estado:'',
        cantidad:'',
        valor_unitario:'',
        almacen:'',
      },
    }
    
    peticionGet=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
    }
    
    peticionPost=async()=>{
      delete this.state.form.id;
     await axios.post(url,this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionGet();
      }).catch(error=>{
        console.log(error.message);
      })
    }
    
    peticionPut=()=>{
      axios.put(url+this.state.form.id, this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionGet();
      })
    }
    
    peticionDelete=()=>{
      axios.delete(url+this.state.form.id).then(response=>{
        this.setState({modalEliminar: false});
        this.peticionGet();
      })
    }
    
    modalInsertar=()=>{
      this.setState({modalInsertar: !this.state.modalInsertar});
    }
    
    seleccionarEmpresa=(empresa)=>{
      this.setState({
        tipoModal: 'actualizar',
        form: {
          id: empresa.id,
          nombre: empresa.nombre,
          pais: empresa.pais,
          capital_bursatil: empresa.capital_bursatil
        }
      })
    }
    
    handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
    }
    
      componentDidMount() {
        this.peticionGet();
      }
  
    render() {
      return (
        <> 
          <br />
          <Container> 
           <h2>Módulo administrador de productos</h2>
           <br />

           <label className="Lfind">Busqueda: </label>
           <input className="find" name="find" type="text" value={this.state.buscar} onChange={this.onChange} />
           <br />
            <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Agregar producto</Button>
            <br></br>
            <Table>
              <thead><tr>
                <th>Id producto</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Valor Unitario</th>
                <th>Almacen</th>
                <th>Estado</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr></thead>
              <tbody>
                {this.state.data.map((elemento) => (
                  <tr>
                    <td>{elemento.id_producto}</td>
                    <td>{elemento.descripcion}</td>
                    <td>{elemento.cantidad}</td>
                    <td>{elemento.valor_unitario}</td>
                    <td>{elemento.almacen}</td>
                    <td><select name="Lista_desplegable_Estado">
                      <option value="1">Disponible</option>
                      <option value="2">No disponible</option>
                    </select></td>
                    <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button ></td>
                    <td><Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
  
              </tbody>
            </Table>
          </Container>
  
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader>
              <div><h3>Registrar producto</h3></div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>
                  ID producto:
                </label>
                <input
                  className="form-control"
                  readOnly
                  type="text"
                  value={this.state.data.length+1}
                />
              </FormGroup>
              <FormGroup>
                <label>
                  Descripción:
                </label>
                <input
                  className="form-control"
                  name="descripcion"
                  type="text"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
              <label>
                Cantidad:
              </label>
              <input
                className="form-control"
                name="cantidad"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>
              <FormGroup>
                <label>
                  Valor Unitario:
                </label>
                <input
                  className="form-control"
                  name="valor_unitario"
                  type="text"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>
                  Almacén:
                </label>
                <input
                  className="form-control"
                  name="almacen"
                  type="text"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <ModalFooter>
                <Button color="success"onClick={()=>this.insertar()}>Agregar</Button>
                <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Eliminar</Button>
              </ModalFooter>
  
  
            </ModalBody>
          </Modal>
  
          <Modal isOpen={this.state.modalEditar}>
            <ModalHeader>
              <div><h3>Editar producto</h3></div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>
                  ID producto:
                </label>
                <input
                  className="form-control"
                  readOnly
                  type="text"
                  value={this.state.form.id_producto}
                />
              </FormGroup>
              <FormGroup>
                <label>
                  Descripción:
                </label>
                <input
                  className="form-control"
                  name="descripcion"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.descripcion}
                />
              </FormGroup>
              <FormGroup>
              <label>
                Cantidad:
              </label>
              <input
                className="form-control"
                name="cantidad"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.cantidad}
              />
            </FormGroup>
              <FormGroup>
                <label>
                  Valor unitario:
                </label>
                <input
                  className="form-control"
                  name="valor_unitario"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.form.valor_unitario}
                />
              </FormGroup>
              <FormGroup>
                <label>
                  Almacén:
                </label>
                <input
                  className="form-control"
                  name="almacen"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.almacen}
                />
              </FormGroup>
              <ModalFooter>
                <Button color="success"onClick={()=>this.editar(this.state.form)}>Editar</Button>
                <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
              </ModalFooter>
            </ModalBody>
          </Modal>
        </>
      )
    }
  };
  
  export default App;
