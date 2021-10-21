import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Table, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup } from 'reactstrap'


const url = "http://localhost:3001/api";
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
    state = { data: data,
      form:{
        id_producto:'',
        descripcion:'',
        estado:'',
        cantidad:'',
        valor_unitario:'',
        almacen:'',
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
        if(dato.id_producto==registro.id_producto){
          lista[contador].descripcion=dato.descripcion;
          lista[contador].cantidad=dato.cantidad;
          lista[contador].valor_unitario=dato.valor_unitario;
          lista[contador].almacen=dato.almacen;
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
  


// class Productos extends Component {

//     state = {
//         data: data,
//         form: {
//             id_producto: '',
//             descripcion: '',
//             estado: '',
//             valor_unitario: '',
//             almacen: '',
            
//         },
//         modalInsertar: false,
//         modalEliminar: false,
//         tipoModal: '',
//         buscar: '',
//         product: [],
//     };

//     peticionGet = () => {
//         axios.get(url).then(response => {
//             this.setState({ data: response.data });
//         }).catch(error => {
//             console.log(error.message);
//         })
//     }

//     peticionPost = async () => {
//         delete this.state.form.Id;
//         await axios.post(url, this.state.form).then(response => {
//             this.modalInsertar();
//             this.peticionGet();
//         }).catch(error => {
//             console.log(error.message);
//         })
//     }

//     peticionPut = () => {
//         axios.put(url + this.state.form.Id, this.state.form).then(response => {
//             this.modalInsertar();
//             this.peticionGet();
//         }).catch(error => {
//             console.log(error.message);
//         })
//     }

//     peticionDelete = () => {
//         axios.delete(url + this.state.form.Id).then(response => {
//             this.setState({ modalEliminar: false });
//             this.peticionGet();
//         }).catch(error => {
//             console.log(error.message);
//         })
//     }

//     modalInsertar = () => {
//         this.setState({ modalInsertar: !this.state.modalInsertar });
//     }




//     seleccionarDescription = (Description) => {
//         this.setState({
//             tipoModal: 'actualizar',
//             form: {
//                 Id: Description.Id,
//                 Valor_Unitario: Description,
//                 Estado: Description.Estado
//             }
//         })
//     }


//     handleChange = async e => {
//         e.persist();
//         await this.setState({

//             form: {
//                 ...this.state.form,
//                 [e.target.name]: e.target.value,
//             }
//         });
//     }

//     componentDidMount() {
//         this.peticionGet();
//     }



//     onChange = async e => {
//         e.persist();
//         await this.setState({ buscar: e.target.value });
//         console.log(this.state.buscar);
//         this.filtrarDescriptions();
//     }

//     insertar=()=>{
//         var valorNuevo={...this.state.form};
//         valorNuevo.id=this.state.data.length+1;
//         var lista=this.state.data;
//         lista.push(valorNuevo);
//         this.setState({data:lista,modalInsertar:false});
    
//       };
    

//         editar = (dato) => {
//             var contador = 0;
//             var lista = this.state.data;
//             lista.map((registro) => {
//                 if (dato.Id === registro.Id) {
//                     lista[contador].Descripción = dato.Descripción;
//                     lista[contador].Valor_Unitario = dato.Valor_Unitario;
//                     lista[contador].Estado = dato.Estado;
//                 }
//                 contador++;
//             });
//             this.setState({ data: lista, modalEditar: false });
//         }
    
//         eliminar = (dato) => {
//             var opcion = window.confirm("Esta seguro de eliminar el registro? " + dato.Id);
//             if (opcion) {
//                 var contador = 0;
//                 var lista = this.state.data;
//                 lista.map((registro) => {
//                     if (registro.Id === dato.Id) {
//                         lista.splice(contador, 1);
//                     }
//                     contador++;
//                 });
//                 this.setState({ data: lista });
//             }
//         }


//     filtrarDescriptions = () => {
//         var search = this.state.data.filter((Description) => {
//             if (Description.Descripción.includes(this.state.buscar) ||
//                 Description.Estado.includes(this.state.buscar) ||
//                 Description.Id.toString().includes(this.state.buscar) ||
//                 Description.Valor_Unitario.toString().includes(this.state.buscar)) {
//                 return Description;
//             }
//         });
//         this.setState({ product: search });
//     }

//     render() {
//         const { form } = this.state;
//         return (
//             <Fragment>
//                 <Container className="CProductos">
//                     <h2>Módulo administrador de productos</h2>
//                     <br />

//                     <label className="Lfind">Busqueda: </label>
//                     <input className="find" name="find" type="text" value={this.state.buscar} onChange={this.onChange} />
//                     <br />
//                     <Button color="info" className="insertar" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }} >Insertar Producto</Button>
//                     <br /> <br />
//                     <Table className="table table-striped">
//                         <thead className="thead-dark">
//                             <tr key="Id">
//                                 <th>Id producto</th>
//                                 <th>Descripción</th>
//                                 <th>Estado</th>
//                                 <th>Valor_Unitario</th>
//                                 <th>Almacén</th>
//                                 <th>Acciones</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {this.state.product.map(Description => {
//                                 return (
//                                     <tr key="Id">
//                                         <td>{Description.id_producto}</td>
//                                         <td>{Description.descripcion}</td>
//                                         <td>{Description.estado}</td>
//                                         <td>{Description.valor_unitario}</td>
//                                         <td>{Description.almacen}</td>
//                                         <td><Button color="primary" onClick={() => { this.seleccionarDescription(Description); this.modalInsertar() }}>Editar</Button> </td>
//                                         {""}
//                                         <td><Button color="danger" onClick={() => { this.seleccionarDescription(Description); this.setState({ modalEliminar: true }) }}>Eliminar</Button> </td>
//                                     </tr>
//                                 )
//                             })}
//                         </tbody>
//                     </Table>

//                     {/* REVIAR CIERRE DEL CONTAINER*/}
//                     <Modal isOpen={this.state.modalInsertar}>
//                         <ModalHeader>
//                             <div>
//                                 <h3 style={{textAlign: 'center'}}>Registrar producto</h3>
//                                 <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}></span>
//                             </div>
//                         </ModalHeader>

//                         <ModalBody>
//                             <FormGroup>
//                                 <label htmlFor="Id">Id producto:</label>
//                                 <input className="form-control" name="Id" id="Id" readOnly type="text" onChange={this.handleChange} value={form ? form.Id : this.state.data.length + 1} />
//                             </FormGroup>

//                             <FormGroup>
//                                 <label htmlFor="Description">Descripción</label>
//                                 <input className="form-control" name="Description" type="text" id="Description" onChange={this.handleChange} value={form ? form.Description : ''} />
//                             </FormGroup>

//                             <FormGroup>
//                                 <label htmlFor="Estado">Estado</label>
//                                 <select className="form-control" name="Estado" id="Estado" onChange={this.handleChange} value={form ? form.Estado : ''} defaultValue="Disponible">
//                                     <option>Disponible</option>
//                                     <option>No Disponible</option>
//                                 </select>
//                             </FormGroup>
//                             <FormGroup>
//                                 <label htmlFor="Valor_Unitario">Valor_Unitario</label>
//                                 <input className="form-control" name="Valor_Unitario" id="Valor_Unitario" type="number" onChange={this.handleChange} placeholder="$" value={form ? form.Valor_Unitario : ''} />
//                             </FormGroup>
//                             <FormGroup>
//                                 <label htmlFor="Valor_Unitario">Almacen</label>
//                                 <input className="form-control" name="Valor_Unitario" id="Valor_Unitario" type="text" onChange={this.handleChange} placeholder="" value={form ? form.Almacen : ''} />
//                             </FormGroup>
//                         </ModalBody>
//                         <ModalFooter>
//                             {this.state.tipoModal === 'insertar' ?
//                                 <Button color="primary" onClick={() => this.peticionPost()}>Insertar</Button> :
//                                 <Button color="success" onClick={() => this.peticionPut()}>Actualizar</Button>}
//                             <Button color="danger" onClick={() => this.modalInsertar()}>Cancelar</Button>
//                         </ModalFooter>
//                     </Modal>

//                     <Modal isOpen={this.state.modalEliminar}>
//                         <ModalHeader>
//                             <div>
//                                 <h3>Editar Registro</h3>
//                             </div>
//                         </ModalHeader>

//                         <ModalBody>
//                             Esta seguro que desea elminar el producto {form && form.Description}
//                         </ModalBody>

//                         <ModalFooter>
//                             <Button color="primary" onClick={() => this.peticionDelete}>Sí</Button>
//                             <Button color="danger" onClick={() => this.setState({ modalEliminar: false })}>No</Button>
//                         </ModalFooter>
//                     </Modal>
//                 </Container>
//             </Fragment>
//         );
//     }

// }
// export default Productos