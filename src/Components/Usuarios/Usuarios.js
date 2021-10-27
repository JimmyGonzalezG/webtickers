import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id_vendedor: 1, fecha_creacion: "20/09/2021", nombre_vendedor: "Juan Perez"},
  { id_vendedor: 2, fecha_creacion: "20/09/2021", nombre_vendedor: "Juan Perez"},
  { id_vendedor: 3, fecha_creacion: "20/09/2021", nombre_vendedor: "Juan Perez"},
  { id_vendedor: 4, fecha_creacion: "20/09/2021", nombre_vendedor: "Juan Perez"},

];


class App extends React.Component {
  state = { data: data,
    form:{
      id_vendedor:'',
      fecha_creacion:'',
      nombre_vendedor:'',
    },
    modalInsertar:false,
    modalEditar: false,
  };
  

  handleChange=e=>{
  this.setState({
    form:{
      ...this.state.form,
      [e.target.name]:e.target.value,
    }
  });
  };

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar:true});
  };
  ocultarModalInsertar=()=>{
    this.setState({modalInsertar:false});
  };

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar:true, form: registro});
  };
  ocultarModalEditar=()=>{
    this.setState({modalEditar:false});
  };

  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id_vendedor=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data:lista,modalInsertar:false});

  };

  editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if(dato.id_vendedor==registro.id_vendedor){
        lista[contador].fecha_creacion=dato.fecha_creacion;
        lista[contador].nombre_vendedor=dato.nombre_vendedor;
      }
      contador++;
    });
    
    this.setState({data:lista, modalEditar:false});
  };

  eliminar=(dato)=>{
    var opcion=window.confirm('Real desea eliminar el registro'+dato.id_vendedor);
    if(opcion){
      var contador=0;
      var lista=this.state.data;
      lista.map((registro)=>{
      if(registro.id_vendedor=dato.id_vendedor){
        lista.splice(contador,1);
      }
      contador++;
      });
      this.setState({data:lista});
    }

  };

  render() {
    return (
      <> 
        <br />
        <Container> 
           <h2>Módulo administrador de usuarios</h2>
           <br />

           <label className="Lfind">Busqueda: </label>
           <input className="find" name="find" type="text" value={this.state.buscar} onChange={this.onChange} />
           <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Agregar venta</Button>
          <br></br>
          <Table>
            <thead><tr>
              <th>Id vendedor</th>
              <th>Fecha de creación</th>
              <th>Nombre de usuario</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr></thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id_vendedor}</td>
                  <td>{elemento.fecha_creacion}</td>
                  <td>{elemento.nombre_vendedor}</td>
                  <td><select name="Lista_desplegable_Rol">
                    <option value="1">Administrador</option>
                    <option value="2">Vendedor</option>
                  </select></td>
                  <td><select name="Lista_desplegable_Estado">
                    <option value="1">Autorizado</option>
                    <option value="2">No autorizado</option>
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
            <div><h3>Agregar usuario</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
                ID vendedor:
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
                Fecha de creación:
              </label>
              <input
                className="form-control"
                name="fecha_creacion"
                type="date"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
            <label>
              Nombre del verdedor:
            </label>
            <input
              className="form-control"
              name="nombre_vendedor"
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
            <div><h3>Editar usuario</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
                ID usuario:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id_vendedor}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Fecha de creación:
              </label>
              <input
                className="form-control"
                name="fecha_creacion"
                type="date"
                onChange={this.handleChange}
                value={this.state.form.fecha_creacion}
              />
            </FormGroup>
            <FormGroup>
            <label>
              Nombre del vendedor:
            </label>
            <input
              className="form-control"
              name="nombre_vendedor"
              type="text"
              onChange={this.handleChange}
              value={this.state.form.nombre_vendedor}
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
