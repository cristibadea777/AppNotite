import axios from 'axios';

class NotiteService {
  state = {
    listaNotite: []
  };

  async getNotite() {
    //GET REQUEST 
    return axios.get(`http://localhost:8080/notite`);
  }

  async updateNotita(notitaNoua){
    //PUT REQUEST 
    axios.put(`http://localhost:8080/notite`, notitaNoua);  
  }

}

const notiteService = new NotiteService();

export default notiteService;
