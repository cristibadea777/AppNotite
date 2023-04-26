import axios from 'axios'

class NotiteService {

  state = {
    listaNotite: []
  }

  //~~~~~~~ GET REQUESTS ~~~~~~~ 
  async getNotite() {
    return axios.get(`http://localhost:8080/notite`)
  }

  async getNotiteArhivate(){
    return axios.get('http://localhost:8080/notite/arhivate')
  }

  //~~~~~~~ PUT REQUESTS ~~~~~~~
  async updateNotita(notita){
    axios.put(`http://localhost:8080/notite`, notita)  
  }

  async arhivareNotita(notita){
    axios.put('http://localhost:8080/notite/arhivare', notita)  
  }

   //~~~~~~~ POST REQUESTS ~~~~~~~
  async createNotita(notita){
    axios.post(`http://localhost:8080/notite`, notita)  
  }

  //~~~~~~~ DELETE REQUESTS ~~~~~~~
  async deleteNotita(notita){
    axios.delete('http://localhost:8080/notite', { data: notita })
  }


}

const notiteService = new NotiteService()

export default notiteService
