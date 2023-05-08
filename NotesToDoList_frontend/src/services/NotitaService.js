import axios from 'axios'

const proxy = 'http://localhost:8080'
//const proxy = 'http://localhost:8080'

axios.defaults.headers.common['ngrok-skip-browser-warning'] = "any value";
//pt ngrok. pagina de pornire in cazul free-tier cauza o eroare cors

class NotiteService {

  state = {
    listaNotite: []
  }

  //~~~~~~~ GET REQUESTS ~~~~~~~ 
  async getNotite() {
    return axios.get(proxy + '/notite')
  }

  async getNotiteArhivate(){
    return axios.get(proxy + '/notite/arhivate')
  }

  async getNotiteCautare(text){
    return axios.get(proxy + '/notite/cautare/' + text)
  }

  async getNotiteCautareArhivate(text){
    return axios.get(proxy + '/notite/cautare/arhivate/' + text)
  }

  //~~~~~~~ PUT REQUESTS ~~~~~~~
  async updateNotita(notita){
    axios.put(proxy + '/notite', notita)  
  }

  async arhivareNotita(notita){
    axios.put(proxy + '/notite/arhivare', notita)  
  }

   //~~~~~~~ POST REQUESTS ~~~~~~~
  async createNotita(notita){
    axios.post(proxy + '/notite', notita)  
  }

  //~~~~~~~ DELETE REQUESTS ~~~~~~~
  async deleteNotita(notita){
    axios.delete(proxy + '/notite', { data: notita })
  }

}

const notiteService = new NotiteService()

export default notiteService
