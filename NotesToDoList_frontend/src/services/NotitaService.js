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

  async createNotita(notitaNoua){
    //POST REQUEST 
    const response = await axios.post(`http://localhost:8080/notite`, notitaNoua);  
    return response.data //pt a seta notita curenta cu raspunsul (in Controller se returneaza notita care se creaza)
  }


}

const notiteService = new NotiteService();

export default notiteService;
