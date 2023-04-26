import axios from 'axios'

class NotiteService {
  state = {
    listaNotite: []
  }

  async getNotite() {
    //GET REQUEST 
    return axios.get(`http://localhost:8080/notite`)
  }

  async updateNotita(notita){
    //PUT REQUEST 
    axios.put(`http://localhost:8080/notite`, notita)  
  }

  async createNotita(notita){
    //POST REQUEST 
    axios.post(`http://localhost:8080/notite`, notita)  
  }

  async deleteNotita(notita){
    axios.delete('http://localhost:8080/notite', { data: notita })
  }


}

const notiteService = new NotiteService()

export default notiteService
