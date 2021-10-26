import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Table, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup } from 'reactstrap'


const url = "http://localhost:3050/productos/";

  class App extends React.Component {
    state={
      data:[],
      modalInsertar: false,
      modalEliminar: false,
      form:{
        id:'',
        producto:'',
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
      console.log("adas");
      axios.put(url+this.state.form.id, this.state.form).then(response=>{
        this.peticionGet();
        this.setState({ modalEditar: false });
      }).catch(error=>{
        console.log(error.message);
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
  
  mostrarModalInsertar = () => {
      this.setState({ modalInsertar: true });
  }
  mostrarModalEditar = (registro) => {
      this.setState({ modalEditar: true, form: registro });
  }

  ocultarModalInsertar = () => {
      this.setState({ modalInsertar: false });
  }
  ocultarModalEditar = () => {
      this.setState({ modalEditar: false });
  }
      componentDidMount() {
        this.peticionGet();
      }
  
    render() {
      const { form } = this.state
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
                <th>Producto</th>
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
                    <td>{elemento.id}</td>
                    <td>{elemento.producto}</td>
                    <td>{elemento.cantidad}</td>
                    <td>{elemento.valor_unitario}</td>
                    <td>{elemento.almacen}</td>
                    <td><select name="Lista_desplegable_Estado">
                      <option value="1">Disponible</option>
                      <option value="2">No disponible</option>
                    </select></td>
                    <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button ></td>
                    <td><Button color="danger" onClick={()=>this.peticionDelete(elemento)}>Eliminar</Button>
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
                  Producto:
                </label>
                <input
                  className="form-control"
                  name="producto"
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
                  value ={this.state.form.almacen}
                />
              </FormGroup>
              <ModalFooter>
                <Button color="success"onClick={()=>this.peticionPost()}>Agregar</Button>
                <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
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
                  value ={this.state.form.id}
                />
              </FormGroup>
              <FormGroup>
                <label>
                  Producto:
                </label>
                <input
                  className="form-control"
                  name="producto"
                  type="text"
                  onChange={this.handleChange}
                  value ={this.state.form.producto}
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
                value ={this.state.form.cantidad}
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
                  value ={this.state.form.valor_unitario}
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
                  value ={this.state.form.almacen}
                />
              </FormGroup>
              <ModalFooter>
                <Button color="success" onClick={()=>this.peticionPut()}>Editar</Button>
                <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
              </ModalFooter>
            </ModalBody>
          </Modal>
        </>
      )
    }
  };
  
  export default App;
