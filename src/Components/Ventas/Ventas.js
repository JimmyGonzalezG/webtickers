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
  { id: 1, fecha: "20/09/2021", id_producto: "9876", descripcion: " Lapiz Fabel Castell HB", cantidad: "2", valor_unitario: "1.000", valor_total: "2000", nombre_cliente: "Naruto", id_cliente: "123", id_vendedor: "1001", nombre_vendedor: "Juan Perez" },
  { id: 2, fecha: "21/09/2021", id_producto: "9876", descripcion: " Lapiz Mirado Rojo", cantidad: "1", valor_unitario: "1.000", valor_total: "1000", nombre_cliente: "Naruto", id_cliente: "123", id_vendedor: "1001", nombre_vendedor: "Juan Perez" },
  { id: 3, fecha: "20/09/2021", id_producto: "9876", descripcion: " Lapiz Fabel Castell HB", cantidad: "2", valor_unitario: "1.000", valor_total: "1000", nombre_cliente: "Naruto", id_cliente: "123", id_vendedor: "1001", nombre_vendedor: "Juan Perez" },
  { id: 4, fecha: "20/09/2021", id_producto: "9876", descripcion: " Lapiz Fabel Castell HB", cantidad: "2", valor_unitario: "1.000", valor_total: "2000", nombre_cliente: "Naruto", id_cliente: "123", id_vendedor: "1001", nombre_vendedor: "Juan Perez" },
  { id: 5, fecha: "20/09/2021", id_producto: "9876", descripcion: " Lapiz Fabel Castell HB", cantidad: "2", valor_unitario: "1.000", valor_total: "2000", nombre_cliente: "Naruto", id_cliente: "123", id_vendedor: "1001", nombre_vendedor: "Juan Perez" },
  { id: 6, fecha: "20/09/2021", id_producto: "9876", descripcion: " Lapiz Fabel Castell HB", cantidad: "2", valor_unitario: "1.000", valor_total: "2000", nombre_cliente: "Naruto", id_cliente: "123", id_vendedor: "1001", nombre_vendedor: "Juan Perez" },

];


class App extends React.Component {
  state = { data: data,
    form:{
      id:'',
      fecha:'',
      id_producto:'',
      descripcion:'',
      cantidad:'',
      valor_unitario:'',
      valor_total:'',
      id_cliente:'',
      nombre_cliente:'',
      id_vendedor:'',
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
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data:lista,modalInsertar:false});

  };

  editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[contador].fecha=dato.fecha;
        lista[contador].id_producto=dato.id_producto;
        lista[contador].descripcion=dato.descripcion;
        lista[contador].cantidad=dato.cantidad;
        lista[contador].valor_unitario=dato.valor_unitario;
        lista[contador].valor_total=dato.valor_total;
        lista[contador].nombre_cliente=dato.nombre_cliente;
        lista[contador].id_cliente=dato.id_cliente;
        lista[contador].nombre_vendedor=dato.nombre_vendedor;
        lista[contador].id_vendedor=dato.id_vendedor;
      }
      contador++;
    });
    
    this.setState({data:lista, modalEditar:false});
  };

  eliminar=(dato)=>{
    var opcion=window.confirm('Real desea eliminar el registro'+dato.id);
    if(opcion){
      var contador=0;
      var lista=this.state.data;
      lista.map((registro)=>{
      if(registro.id=dato.id){
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
           <h2>Módulo administrador de ventas</h2>
           <br />

           <label className="Lfind">Busqueda: </label>
           <input className="find" name="find" type="text" value={this.state.buscar} onChange={this.onChange} />
           <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Agregar venta</Button>
          <br></br>
          <Table>
            <thead><tr>
              <th>Id venta</th>
              <th>Fecha</th>
              <th>Productos vendidos</th>
              <th>Cantidad</th>
              <th>Valor Unitario</th>
              <th>Valor total</th>
              <th>Cliente</th>
              <th>ID Cliente</th>
              <th>Vendedor</th>
              <th>ID Vendedor</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr></thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.fecha}</td>
                  <td>{elemento.descripcion}</td>
                  <td>{elemento.cantidad}</td>
                  <td>{elemento.valor_unitario}</td>
                  <td>{elemento.valor_total}</td>
                  <td>{elemento.nombre_cliente}</td>
                  <td>{elemento.id_cliente}</td>
                  <td>{elemento.nombre_vendedor}</td>
                  <td>{elemento.id_vendedor}</td>
                  <td><select name="Lista_desplegable_Estado">
                    <option value="1">En proceso</option>
                    <option value="2">Cancelada</option>
                    <option value="3">Entregada</option>
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
            <div><h3>Insertar venta</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
                ID venta:
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
                Fecha:
              </label>
              <input
                className="form-control"
                name="fecha"
                type="date"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
            <label>
              ID producto:
            </label>
            <input
              className="form-control"
              name="id_producto"
              type="number"
              onChange={this.handleChange}
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
                Valor unitario:
              </label>
              <input
                className="form-control"
                name="valor_unitario"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Valor total:
              </label>
              <input
                className="form-control"
                name="valor_total"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Nombre cliente:
              </label>
              <input
                className="form-control"
                name="nombre_cliente"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                ID cliente:
              </label>
              <input
                className="form-control"
                name="id_cliente"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Nombre vendedor:
              </label>
              <input
                className="form-control"
                name="nombre_vendedor"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                ID vendedor:
              </label>
              <input
                className="form-control"
                name="id_vendedor"
                type="number"
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
            <div><h3>Editar venta</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
                ID venta:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Fecha:
              </label>
              <input
                className="form-control"
                name="fecha"
                type="date"
                onChange={this.handleChange}
                value={this.state.form.fecha}
              />
            </FormGroup>
            <FormGroup>
            <label>
              ID producto:
            </label>
            <input
              className="form-control"
              name="id_producto"
              type="number"
              onChange={this.handleChange}
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
                Valor total:
              </label>
              <input
                className="form-control"
                name="valor_total"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.valor_total}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Nombre cliente:
              </label>
              <input
                className="form-control"
                name="nombre_cliente"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre_cliente}
              />
            </FormGroup>
            <FormGroup>
              <label>
                ID cliente:
              </label>
              <input
                className="form-control"
                name="id_cliente"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.id_cliente}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Nombre vendedor:
              </label>
              <input
                className="form-control"
                name="nombre_vendedor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre_vendedor}
              />
            </FormGroup>
            <FormGroup>
              <label>
                ID vendedor:
              </label>
              <input
                className="form-control"
                name="id_vendedor"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.id_vendedor}
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
